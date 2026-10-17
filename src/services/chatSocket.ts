import { ChatMessage } from '../types';
import { getStoredToken } from './api';

const WS_BASE_URL = (import.meta as any).env?.VITE_WS_URL || 'ws://localhost:4000/ws';

export type ChatEventType =
  | 'INIT'
  | 'NEW_MESSAGE'
  | 'ONLINE_COUNT'
  | 'MESSAGE_DELETED'
  | 'RATE_LIMITED'
  | 'BANNED'
  | 'CONNECTION_CHANGE';

export interface ChatEventListener {
  (type: ChatEventType, payload: any): void;
}

class ChatSocketManager {
  private ws: WebSocket | null = null;
  private listeners: Set<ChatEventListener> = new Set();
  private isConnecting = false;
  private reconnectTimeout: any = null;
  private pingInterval: any = null;
  public isConnected = false;
  public onlineCount = 0;

  public connect() {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const token = getStoredToken();
    if (!token) {
      console.warn('[WebSocket] Cannot connect without auth token');
      return;
    }

    this.isConnecting = true;
    try {
      this.ws = new WebSocket(`${WS_BASE_URL}?token=${token}`);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.isConnecting = false;
        this.emit('CONNECTION_CHANGE', { isConnected: true });
        this.startHeartbeat();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'INIT') {
            this.onlineCount = data.payload.onlineCount || 1;
            this.emit('INIT', data.payload);
          } else if (data.type === 'NEW_MESSAGE') {
            this.emit('NEW_MESSAGE', data.payload);
          } else if (data.type === 'ONLINE_COUNT') {
            this.onlineCount = data.payload.count || 1;
            this.emit('ONLINE_COUNT', data.payload);
          } else if (data.type === 'MESSAGE_DELETED') {
            this.emit('MESSAGE_DELETED', data.payload);
          } else if (data.type === 'RATE_LIMITED') {
            this.emit('RATE_LIMITED', data.payload);
          } else if (data.type === 'BANNED') {
            this.emit('BANNED', data.payload);
          }
        } catch (err) {
          console.error('[WebSocket] Message parse error:', err);
        }
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.isConnecting = false;
        this.stopHeartbeat();
        this.emit('CONNECTION_CHANGE', { isConnected: false });
        this.scheduleReconnect();
      };

      this.ws.onerror = (err) => {
        console.warn('[WebSocket] Connection error:', err);
        this.ws?.close();
      };
    } catch (err) {
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.pingInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'PING' }));
      }
    }, 25000);
  }

  private stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    this.reconnectTimeout = setTimeout(() => {
      if (!this.isConnected && getStoredToken()) {
        this.connect();
      }
    }, 4000);
  }

  public sendMessage(content: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }
    this.ws.send(JSON.stringify({
      type: 'SEND_MESSAGE',
      payload: { content }
    }));
  }

  public subscribe(listener: ChatEventListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(type: ChatEventType, payload: any) {
    for (const listener of this.listeners) {
      try {
        listener(type, payload);
      } catch (err) {
        console.error('[WebSocket] Listener error:', err);
      }
    }
  }

  public disconnect() {
    this.stopHeartbeat();
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }
}

export const chatSocket = new ChatSocketManager();
