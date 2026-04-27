import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT = {
  label: 'Ready to grow?',
  heading: "Let's build something great.",
  body: "Have a project in mind? I'd love to hear about it. Let's talk strategy, goals, and how I can help grow your brand.",
  primaryButton: 'Contact Me →',
  secondaryButton: "Let's Talk",
};

export default function ContactCTA() {
  const navigate = useNavigate();
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch('/api/home').then(r => r.json()).then(d => { if (d.cta) setData(d.cta); });
  }, []);

  return (
    <section id="contact" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ padding: '80px 60px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <span className="section-label">{data.label}</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>{data.heading}</h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7, maxWidth: '460px' }}>{data.body}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>{data.primaryButton}</button>
            <button className="btn btn-outline" onClick={() => navigate('/contact')}>{data.secondaryButton}</button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:640px){#contact .container>div{padding:40px 24px!important;flex-direction:column;align-items:flex-start}}`}</style>
    </section>
  );
}
