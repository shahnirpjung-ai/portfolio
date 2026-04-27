import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT = {
  label: 'About Me',
  heading: 'Turning clicks into\ncustomers.',
  para1: "I'm a digital marketing strategist with 5+ years of experience helping businesses grow their online presence, generate leads, and scale revenue. I combine creative thinking with analytical rigor to deliver campaigns that perform.",
  para2: "Whether it's architecting a paid media funnel, building an organic content engine, or running A/B tests to squeeze out every percentage point of conversion — I'm obsessed with results that move the needle.",
  buttonText: "Let's talk →",
  cards: [
    { icon: '📈', title: 'Growth Strategy', desc: 'Full-funnel marketing strategies built for sustainable, scalable growth.' },
    { icon: '🎯', title: 'Paid Advertising', desc: 'Google, Meta, TikTok — precision targeting that maximizes every dollar.' },
    { icon: '✍️', title: 'Content Marketing', desc: 'Content that ranks, resonates, and converts — at every stage of the funnel.' },
    { icon: '📊', title: 'Data & Analytics', desc: 'Every decision backed by data. GA4, Looker Studio, A/B testing.' },
  ],
};

export default function About() {
  const navigate = useNavigate();
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch('/api/home').then(r => r.json()).then(d => { if (d.about) setData(d.about); });
  }, []);

  return (
    <section id="about" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <span className="section-label">{data.label}</span>
            <h2 className="section-title">
              {data.heading.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '20px' }}>{data.para1}</p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '32px' }}>{data.para2}</p>
            <button className="btn btn-outline" onClick={() => navigate('/contact')}>{data.buttonText}</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {data.cards.map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: '24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>{icon}</div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#about .container>div{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </section>
  );
}
