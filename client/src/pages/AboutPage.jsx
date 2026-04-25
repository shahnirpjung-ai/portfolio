import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const pageStyle = { minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Inter, sans-serif', color: '#e8e8e8' };
const labelStyle = { display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#990011', marginBottom: '16px' };

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <SEO title="About — Nirp | Digital Marketing Strategist" description="Learn about Nirp, a digital marketing strategist with 5+ years helping brands grow through data-driven campaigns and creative strategy." />
      <TopBar navigate={navigate} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '80px' }}>
          <span style={labelStyle}>About Me</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px' }}>
            I turn digital noise<br />into real results.
          </h1>
          <p style={{ fontSize: '18px', color: '#888', lineHeight: 1.8, maxWidth: '560px' }}>
            Digital marketing strategist with 5+ years helping brands grow online through data-driven campaigns and creative strategy.
          </p>
        </div>

        {/* Bio + stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', marginBottom: '80px', alignItems: 'start' }}>
          <div>
            <p style={{ color: '#aaa', lineHeight: 1.9, fontSize: '16px', marginBottom: '20px' }}>
              I started in digital marketing because I was fascinated by the intersection of psychology and data — understanding why people click, convert, and come back. Over the years I've worked with e-commerce brands, SaaS companies, and local businesses, helping each of them find their voice online and turn it into revenue.
            </p>
            <p style={{ color: '#aaa', lineHeight: 1.9, fontSize: '16px', marginBottom: '20px' }}>
              My approach is simple: understand the business deeply, identify the highest-leverage channel, run fast experiments, and double down on what works. I don't believe in vanity metrics — every campaign I run is tied to a real business outcome.
            </p>
            <p style={{ color: '#aaa', lineHeight: 1.9, fontSize: '16px' }}>
              Outside of work, I stay sharp by following industry shifts — algorithm updates, new ad formats, emerging platforms — and testing them before most agencies even know they exist.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { val: '5+', label: 'Years of Experience', desc: 'Across agencies and in-house roles' },
              { val: '50+', label: 'Brands Worked With', desc: 'From startups to 8-figure companies' },
              { val: '$2M+', label: 'Ad Spend Managed', desc: 'Google, Meta, TikTok, LinkedIn' },
              { val: '4.2x', label: 'Average ROAS', desc: 'Across paid media campaigns' },
            ].map(({ val, label, desc }) => (
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
            {[
              { icon: '🎯', title: 'Results first', desc: 'Every campaign is tied to a real business metric — not impressions or followers.' },
              { icon: '🔬', title: 'Always testing', desc: 'Hypotheses, experiments, learnings. I never "set and forget" a campaign.' },
              { icon: '📖', title: 'Transparent', desc: "Clear reporting, honest assessments, no jargon. You always know what's happening." },
              { icon: '⚡', title: 'Fast execution', desc: 'Speed matters in marketing. I move fast, iterate, and scale what works.' },
            ].map(({ icon, title, desc }) => (
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
          <h3 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>Want to work together?</h3>
          <p style={{ color: '#666', marginBottom: '28px', fontSize: '15px' }}>Let's talk about your brand and how I can help you grow.</p>
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
