import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  Users,
  Shield,
  AlertTriangle,
  Lock,
  UserCheck
} from 'lucide-react';
import { ReportModal } from '../components/ReportModal';

export const PublicChatView: React.FC = () => {
  const { chatMessages, sendChat, onlineUsersCount, user, t } = useApp();
  const [inputText, setInputText] = useState('');
  const [reportingMessageId, setReportingMessageId] = useState<string | null>(null);
  const [reportingUserId, setReportingUserId] = useState<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChat(inputText.trim());
    setInputText('');
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', minHeight: 520 }}>
      {/* Header and Guidelines Notice */}
      <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <MessageSquare size={22} color="var(--accent-cyan)" />
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{t.chatTitle}</h2>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {t.chatSubtitle}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-cyan">
              <Users size={12} />
              <span>{onlineUsersCount} {t.chatOnlineUsers.split(' ')[0]}</span>
            </span>
            <span className="badge badge-amber" title={t.chatNoDMsNotice}>
              <Shield size={12} />
              <span>{t.chatPublicOnlyBadge}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}>
        {chatMessages.length === 0 ? (
          <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--text-muted)' }}>
            <MessageSquare size={36} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
            <p>{t.chatEmpty}</p>
          </div>
        ) : (
          chatMessages.map((msg) => {
            const isMe = msg.userId === user?.id;
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  alignSelf: isMe ? 'flex-end' : 'flex-start'
                }}
              >
                {/* Username and Timestamp */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.2rem',
                  padding: '0 0.4rem'
                }}>
                  <span style={{ fontWeight: 700, color: isMe ? 'var(--accent-cyan)' : 'var(--text-primary)' }}>
                    {msg.username}
                  </span>
                  <span>•</span>
                  <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {!isMe && (
                    <button
                      onClick={() => {
                        setReportingMessageId(msg.id);
                        setReportingUserId(msg.userId);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-muted)',
                        padding: 0,
                        marginLeft: 4
                      }}
                      title={t.chatReportBtn}
                    >
                      <AlertTriangle size={12} />
                    </button>
                  )}
                </div>

                {/* Message Bubble */}
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: isMe
                    ? 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))'
                    : 'var(--bg-card)',
                  color: isMe ? '#FFFFFF' : 'var(--text-primary)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  fontSize: '0.95rem',
                  wordBreak: 'break-word',
                  lineHeight: 1.5,
                  border: isMe ? 'none' : '1px solid var(--border-color)'
                }}>
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Form */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.chatMessagePlaceholder}
          maxLength={500}
          className="input"
          style={{ flex: 1, borderRadius: 'var(--radius-lg)' }}
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="btn btn-primary"
          style={{ borderRadius: 'var(--radius-lg)', padding: '0.8rem 1.4rem' }}
        >
          <Send size={18} />
          <span>{t.chatSendBtn}</span>
        </button>
      </form>

      <ReportModal
        messageId={reportingMessageId}
        reportedUserId={reportingUserId}
        isOpen={Boolean(reportingMessageId)}
        onClose={() => {
          setReportingMessageId(null);
          setReportingUserId(undefined);
        }}
      />
    </div>
  );
};
