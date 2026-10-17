import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MessageSquare, AlertTriangle, Users, HeartHandshake, EyeOff, FileText } from 'lucide-react';

export const CommunityRulesView: React.FC = () => {
  const { t } = useApp();

  const rules = [
    {
      num: 1,
      title: 'Empathy & Dignity First | التعاطف والكرامة أولاً',
      desc: 'Our community is built on mutual respect and encouragement. Shaming, mocking, or judging another member’s struggle is strictly prohibited.',
      icon: <HeartHandshake size={20} color="var(--accent-cyan)" />
    },
    {
      num: 2,
      title: 'Public Community Only — No DMs | غرفة عامة فقط دون رسائل خاصة',
      desc: 'Direct messaging and 1-on-1 private conversations are intentionally barred to prevent solicitation, targeted harassment, or illicit trade.',
      icon: <Users size={20} color="var(--accent-blue)" />
    },
    {
      num: 3,
      title: 'No Medical Prescriptions or Dosages | منع الوصفات والجرعات الطبية',
      desc: 'Never prescribe medications, detox regimens, or specific dosages. Personal recovery experiences are welcome, but official healthcare advice must come from licensed practitioners.',
      icon: <AlertTriangle size={20} color="var(--accent-amber)" />
    },
    {
      num: 4,
      title: 'Zero Promotion of Substances | منع الترويج للمواد أو المحفزات',
      desc: 'Posting links to vendors, glorifying substance use, or sharing methods to bypass quit protocols results in immediate and permanent account suspension.',
      icon: <ShieldCheck size={20} color="var(--accent-rose)" />
    },
    {
      num: 5,
      title: 'Protect Anonymity & Privacy | حماية الهوية والخصوصية',
      desc: 'Do not post real names, personal phone numbers, physical locations, or personal social media handles. Maintain your anonymity and respect others’.',
      icon: <EyeOff size={20} color="var(--accent-violet)" />
    },
    {
      num: 6,
      title: 'No Spam or Automated Flooding | منع الإغراق والتكرار',
      desc: 'Repeatedly posting identical messages, commercial links, or automated bot outputs will trigger instant rate-limiting and moderator review.',
      icon: <MessageSquare size={20} color="var(--accent-green)" />
    }
  ];

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{t.navRules}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Guidelines designed to keep the KHOTWATI community safe, supportive, and focused on freedom.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rules.map((rule) => (
          <div key={rule.num} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {rule.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                {rule.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {rule.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
