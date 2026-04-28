import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const DEFAULT = { label: 'Expertise', heading: 'What I bring to the table.', subheading: 'A broad skill set covering every layer of digital marketing — strategy, execution, and analysis.', buttonText: 'View My Services →' };

export default function Skills() {
  const navigate = useNavigate();
  const { data: skills, loading } = useApi('/skills');
  const [sec, setSec] = useState(DEFAULT);

  useEffect(() => { fetch('/api/home').then(r => r.json()).then(d => { if (d.skills) setSec(d.skills); }); }, []);

  return (
    <section id="skills" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-label">{sec.label}</span>
          <h2 className="section-title">{sec.heading}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 28px' }}>{sec.subheading}</p>
          <button onClick={() => navigate('/services')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 24px', borderRadius: '100px', background: '#990011', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#7a0010'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#990011'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            {sec.buttonText}
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '20px' }}>
            {Array(4).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '200px' }} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '20px' }}>
            {skills?.map(group => (
              <div key={group.category} style={{ padding: '28px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>{group.category}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {group.items.map(skill => (
                    <li key={skill} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--muted)' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
