import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import useSEO from '../hooks/useSEO';

const pageStyle = { minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Inter, sans-serif', color: '#e8e8e8' };
const labelStyle = { display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#990011', marginBottom: '16px' };

const DEFAULT = {
  heading: 'I turn digital noise\ninto real results.',
  subheading: 'Digital marketing strategist with 5+ years helping brands grow online through data-driven campaigns and creative strategy.',
  bio: [
    "I started in digital marketing because I was fascinated by the intersection of psychology and data — understanding why people click, convert, and come back.",
    "My approach is simple: understand the business deeply, identify the highest-leverage channel, run fast experiments, and double down on what works.",
    "Outside of work, I stay sharp by following industry shifts — algorithm updates, new ad formats, emerging platforms — and testing them before most agencies even know they exist.",
  ],
  stats: [
    { val: '5+', label: 'Years of Experience', desc: 'Across agencies and in-house roles' },
    { val: '50+', label: 'Brands Worked With', desc: 'From startups to 8-figure companies' },
    { val: '$2M+', label: 'Ad Spend Managed', desc: 'Google, Meta, TikTok, LinkedIn' },
    { val: '4.2x', label: 'Average ROAS', desc: 'Across paid media campaigns' },
  ],
  values: [
    { icon: '🎯', title: 'Results first', desc: 'Every campaign is tied to a real business metric — not impressions or followers.' },
    { icon: '🔬', title: 'Always testing', desc: 'Hypotheses, experiments, learnings. I never "set and forget" a campaign.' },
    { icon: '📖', title: 'Transparent', desc: "Clear reporting, honest assessments, no jargon. You always know what's happening." },
    { icon: '⚡', title: 'Fast execution', desc: 'Speed matters in marketing. I move fast, iterate, and scale what works.' },
  ],
  ctaHeading: 'Want to work together?',
  ctaSubtext: "Let's talk about your brand and how I can help you grow.",
};

export default function AboutPage() {
  const navigate = useNavigate();
  const seo = useSEO('about');
  const [info, setInfo] = useState(DEFAULT);

  useEffect(() => {
    fetch('/api/about').then(r => r.json()).then(d => { if (!d.error) setInfo(d); });
  }, []);

  return (
    <div style={pageStyle}>
      <SEO title={seo.title} description={seo.description} />
      <TopBar navigate={navigate} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '80px' }}>
          <span style={labelStyle}>About Me</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
            {info.heading.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p style={{ fontSize: '18px', color: '#888', lineHeight: 1.8, maxWidth: '560px' }}>
            {info.subheading}
          </p>
        </div>

        {/* Bio + stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', marginBottom: '80px', alignItems: 'start' }}>
          <div>
            {info.bio.map((para, i) => (
              <p key={i} style={{ color: '#aaa', lineHeight: 1.9, fontSize: '16px', marginBottom: i < info.bio.length - 1 ? '20px' : 0 }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {info.stats.map(({ val, label, desc }) => (
              <div key={label} style={{ padding: '20px 24px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', color: '#990011', flexShrink: 0, minWidth: '64px' }}>{val}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: '#555' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: '80px' }}>
          <span style={labelStyle}>Values</span>
          <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '32px' }}>How I work.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {info.values.map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: '28px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#990011'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{icon}</div>
                <div style={{ fontWeight: 600, marginBottom: '8px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '60px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>{info.ctaHeading}</h3>
          <p style={{ color: '#666', marginBottom: '28px', fontSize: '15px' }}>{info.ctaSubtext}</p>
          <button onClick={() => navigate('/contact')}
            style={{ padding: '13px 28px', background: '#990011', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
            Get in Touch →
          </button>
        </div>
      </div>

      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

function TopBar({ navigate }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1a1a1a', zIndex: 100 }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e8e8e8', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>
        nirp<span style={{ color: '#990011' }}>.</span>
      </button>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: '1px solid #222', cursor: 'pointer', color: '#666', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '7px 16px', borderRadius: '8px', transition: 'all 0.2s' }}
        onMouseEnter={e => { e.target.style.borderColor = '#990011'; e.target.style.color = '#990011'; }}
        onMouseLeave={e => { e.target.style.borderColor = '#222'; e.target.style.color = '#666'; }}>
        ← Back
      </button>
    </div>
  );
}
