import { useNavigate } from 'react-router-dom';

export default function ContactCTA() {
  const navigate = useNavigate();

  return (
    <section id="contact" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{
          padding: '80px 60px', background: 'var(--bg-2)',
          border: '1px solid var(--border)', borderRadius: '12px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '32px',
        }}>
          <div>
            <span className="section-label">Ready to grow?</span>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Let's build something great.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7, maxWidth: '460px' }}>
              Have a project in mind? I'd love to hear about it. Let's talk strategy, goals, and how I can help grow your brand.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>
              Contact Me →
            </button>
            <button className="btn btn-outline" onClick={() => navigate('/contact')}>
              Let's Talk
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #contact .container > div { padding: 40px 24px !important; flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
