import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import useSEO from '../hooks/useSEO';

const labelStyle = { display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#990011', marginBottom: '16px' };

const tools = [
  { name: 'Google Analytics 4', category: 'Analytics' },
  { name: 'Google Ads', category: 'Paid' },
  { name: 'Meta Ads Manager', category: 'Paid' },
  { name: 'Looker Studio', category: 'Analytics' },
  { name: 'Semrush', category: 'SEO' },
  { name: 'Ahrefs', category: 'SEO' },
  { name: 'Klaviyo', category: 'Email' },
  { name: 'Mailchimp', category: 'Email' },
  { name: 'HubSpot', category: 'CRM' },
  { name: 'Hotjar', category: 'CRO' },
  { name: 'Canva', category: 'Design' },
  { name: 'TikTok Ads', category: 'Paid' },
  { name: 'LinkedIn Ads', category: 'Paid' },
  { name: 'Zapier', category: 'Automation' },
  { name: 'Notion', category: 'Productivity' },
  { name: 'Slack', category: 'Productivity' },
];

export default function SkillsPage() {
  const navigate = useNavigate();
  const seo = useSEO('skills');
  const { data: skills, loading } = useApi('/skills');

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Inter, sans-serif', color: '#e8e8e8' }}>
      <SEO title={seo.title} description={seo.description} />
      <TopBar navigate={navigate} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        <div style={{ marginBottom: '64px' }}>
          <span style={labelStyle}>Expertise</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
            What I bring<br />to the table.
          </h1>
          <p style={{ fontSize: '17px', color: '#666', lineHeight: 1.8, maxWidth: '500px' }}>
            A full-stack marketing skill set — from top-of-funnel awareness to bottom-of-funnel conversion.
          </p>
        </div>

        {/* Skills from API */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '64px' }}>
            {Array(4).fill(0).map((_, i) => (
              <div key={i} style={{ height: '220px', background: 'linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: '8px' }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '64px' }}>
            {skills?.map(group => (
              <div key={group.category} style={{ padding: '28px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#990011', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px' }}>
                  {group.category}
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {group.items.map(skill => (
                    <li key={skill} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#888' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#990011', flexShrink: 0 }} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Tools */}
        <div style={{ marginBottom: '64px' }}>
          <span style={labelStyle}>Tools & Platforms</span>
          <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '32px' }}>My toolkit.</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {tools.map(({ name, category }) => (
              <div key={name} style={{
                padding: '8px 16px', background: '#111', border: '1px solid #1a1a1a',
                borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#990011'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <span style={{ fontSize: '13px', color: '#ccc' }}>{name}</span>
                <span style={{ fontSize: '10px', color: '#444', background: '#1a1a1a', padding: '2px 7px', borderRadius: '100px' }}>{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div style={{ marginBottom: '64px' }}>
          <span style={labelStyle}>Process</span>
          <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '32px' }}>How I approach every project.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px' }}>
            {[
              { step: '01', title: 'Audit & Research', desc: 'Deep dive into your current state, competitors, and market opportunity.' },
              { step: '02', title: 'Strategy', desc: 'Build a focused plan around your highest-leverage channels and goals.' },
              { step: '03', title: 'Execute', desc: 'Launch fast, with precision. Every asset, copy line, and targeting detail matters.' },
              { step: '04', title: 'Optimize', desc: 'Measure, iterate, and scale. Data drives every decision from day one.' },
            ].map(({ step, title, desc }, i) => (
              <div key={step} style={{
                padding: '32px 24px', background: '#111',
                borderTop: '1px solid #1a1a1a',
                borderBottom: '1px solid #1a1a1a',
                borderLeft: i === 0 ? '1px solid #1a1a1a' : 'none',
                borderRight: '1px solid #1a1a1a',
                borderRadius: i === 0 ? '8px 0 0 8px' : i === 3 ? '0 8px 8px 0' : '0',
              }}>
                <div style={{ fontSize: '11px', color: '#990011', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '12px' }}>{step}</div>
                <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '8px' }}>{title}</div>
                <div style={{ fontSize: '13px', color: '#555', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '60px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>Ready to put these skills to work?</h3>
          <p style={{ color: '#666', marginBottom: '28px', fontSize: '15px' }}>Let's talk about your brand and build something that performs.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/contact')} style={{ padding: '13px 28px', background: '#990011', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
              Hire Me →
            </button>
            <button onClick={() => navigate('/projects')} style={{ padding: '13px 28px', background: 'transparent', color: '#e8e8e8', border: '1px solid #222', borderRadius: '8px', fontSize: '15px', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
              See My Work
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
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
