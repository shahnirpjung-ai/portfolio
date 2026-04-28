import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import useSEO from '../hooks/useSEO';

const CATEGORIES = ['All', 'Paid Media', 'SEO + Content', 'Social Media', 'Email Marketing'];
const labelStyle = { display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#990011', marginBottom: '16px' };

export default function ProjectsPage() {
  const navigate = useNavigate();
  const seo = useSEO('projects');
  const [activeCategory, setActiveCategory] = useState('All');
  const endpoint = activeCategory === 'All' ? '/projects' : `/projects?category=${encodeURIComponent(activeCategory)}`;
  const { data: projects, loading } = useApi(endpoint);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Inter, sans-serif', color: '#e8e8e8' }}>
      <SEO title={seo.title} description={seo.description} />
      <TopBar navigate={navigate} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        <div style={{ marginBottom: '56px' }}>
          <span style={labelStyle}>Work</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
            Selected Projects.
          </h1>
          <p style={{ fontSize: '17px', color: '#666', lineHeight: 1.8, maxWidth: '500px' }}>
            Real campaigns across real industries. Every number here is a real result.
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px', borderRadius: '100px', fontSize: '13px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
                background: activeCategory === cat ? '#990011' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#666',
                border: activeCategory === cat ? '1px solid #990011' : '1px solid #222',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Project cards */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
            {Array(4).fill(0).map((_, i) => (
              <div key={i} style={{ height: '300px', background: 'linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: '8px' }} />
            ))}
          </div>
        ) : projects?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#444' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
            <p>No projects found in this category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '20px', marginBottom: '64px' }}>
            {projects?.map(project => (
              <div key={project.id} style={{
                background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#990011'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.transform = 'translateY(0)'; }}>

                {/* Card header */}
                <div style={{ padding: '28px 28px 20px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', color: '#990011', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {project.category}
                    </span>
                    <a href={project.link} style={{ color: '#444', fontSize: '18px', lineHeight: 1, transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#990011'}
                      onMouseLeave={e => e.target.style.color = '#444'}>↗</a>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '10px' }}>{project.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7 }}>{project.description}</p>
                </div>

                {/* Metrics bar */}
                <div style={{ padding: '16px 28px', borderTop: '1px solid #1a1a1a', display: 'flex', gap: '24px' }}>
                  {project.metrics.map(m => (
                    <div key={m.label}>
                      <div style={{ fontSize: '20px', fontWeight: 700, color: '#990011', letterSpacing: '-0.01em' }}>{m.value}</div>
                      <div style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ padding: '14px 28px', borderTop: '1px solid #1a1a1a', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {project.tags.map(t => (
                    <span key={t} style={{ padding: '3px 10px', background: '#1a1a1a', border: '1px solid #222', borderRadius: '100px', fontSize: '11px', color: '#555' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ padding: '60px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>Want results like these?</h3>
          <p style={{ color: '#666', marginBottom: '28px', fontSize: '15px' }}>Let's build a campaign tailored to your brand and goals.</p>
          <button onClick={() => navigate('/contact')} style={{ padding: '13px 28px', background: '#990011', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
            Start a Project →
          </button>
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
