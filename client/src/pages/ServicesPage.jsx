import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../hooks/useApi';
import { FAQSchema } from '../components/SchemaMarkup';


const DEFAULT = {
  heading: 'What I can do\nfor your brand.',
  subheading: 'End-to-end digital marketing built around measurable outcomes — not vanity metrics.',
  ctaHeading: 'Ready to grow your brand?',
  ctaSubtext: "Let's build a marketing strategy tailored to your goals and budget.",
  ctaButton: 'Start a Project →',
};

export default function ServicesPage() {
  const navigate = useNavigate();
  const { data: services, loading } = useApi('/services');
  const [page, setPage] = useState(DEFAULT);

  useEffect(() => {
    fetch('/api/services-page').then(r => r.json()).then(d => { if (!d.error) setPage(d); });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      <Helmet>
        <title>Services — BD, Digital Marketing & AI Automation | Nirp Jung Shah Nepal</title>
        <meta name="description" content="Business development, digital marketing, and AI automation services for NGOs, startups, banks, and businesses across Nepal. View packages and pricing." />
        <link rel="canonical" href="https://nirp.com.np/services" />
      </Helmet>
      <FAQSchema />
      <TopBar navigate={navigate} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        <div style={{ marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#990011', display: 'block', marginBottom: '16px' }}>Services</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
            {page.heading.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p style={{ fontSize: '17px', color: '#555', lineHeight: 1.8, maxWidth: '500px' }}>
            {page.subheading}
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '16px' }}>
            {Array(6).fill(0).map((_, i) => (
              <div key={i} style={{ height: '280px', borderRadius: '16px', background: '#1a1a1a', opacity: 0.6 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '16px', marginBottom: '64px' }}>
            {services?.map(s => (
              <div key={s.id}
                style={{ background: '#1c1c1c', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', transition: 'background 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#232323'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1c1c1c'; e.currentTarget.style.transform = 'translateY(0)'; }}>

                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(153,0,17,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                  {s.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '19px', fontWeight: 700, color: '#fff', marginBottom: '12px', letterSpacing: '-0.01em' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.75 }}>{s.description}</p>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #2a2a2a', paddingTop: '20px' }}>
                  {s.highlights.map(h => (
                    <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#555' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#990011', flexShrink: 0 }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ padding: '60px', background: '#1c1c1c', borderRadius: '16px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>{page.ctaHeading}</h3>
          <p style={{ color: '#555', marginBottom: '28px', fontSize: '15px', lineHeight: 1.7 }}>{page.ctaSubtext}</p>
          <button onClick={() => navigate('/contact')}
            style={{ padding: '14px 32px', background: '#990011', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '15px', fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
            {page.ctaButton}
          </button>
        </div>
      </div>
    </div>
  );
}

function TopBar({ navigate }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1a1a1a', zIndex: 100 }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>
        nirp<span style={{ color: '#990011' }}>.</span>
      </button>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: '1px solid #333', cursor: 'pointer', color: '#888', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '7px 16px', borderRadius: '8px', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.target.style.borderColor = '#990011'; e.target.style.color = '#990011'; }}
        onMouseLeave={e => { e.target.style.borderColor = '#333'; e.target.style.color = '#888'; }}>
        ← Back
      </button>
    </div>
  );
}
