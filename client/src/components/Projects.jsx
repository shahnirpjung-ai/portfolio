import { useState } from 'react';
import { useApi } from '../hooks/useApi';

const CATEGORIES = ['All', 'Paid Media', 'SEO + Content', 'Social Media', 'Email Marketing'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const endpoint = activeCategory === 'All' ? '/projects' : `/projects?category=${encodeURIComponent(activeCategory)}`;
  const { data: projects, loading } = useApi(endpoint);

  return (
    <section id="projects" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ marginBottom: '48px' }}>
          <span className="section-label">Work</span>
          <h2 className="section-title">Selected Projects.</h2>
          <p className="section-subtitle">Real campaigns, real results. Numbers don't lie.</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 16px', borderRadius: '100px', fontSize: '13px', cursor: 'pointer',
                fontFamily: 'var(--font)', transition: 'all 0.2s',
                background: activeCategory === cat ? 'var(--accent)' : 'transparent',
                color: activeCategory === cat ? '#fff' : 'var(--muted)',
                border: activeCategory === cat ? '1px solid var(--accent)' : '1px solid var(--border)',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {Array(4).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '280px' }} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {projects?.map(project => (
              <div key={project.id} style={{
                padding: '28px', background: 'var(--bg-2)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                display: 'flex', flexDirection: 'column', gap: '16px',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {project.category}
                  </span>
                  <a href={project.link} style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1 }}>↗</a>
                </div>

                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '8px', letterSpacing: '-0.01em' }}>{project.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>{project.description}</p>
                </div>

                <div style={{ display: 'flex', gap: '12px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                  {project.metrics.map(m => (
                    <div key={m.label}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent)' }}>{m.value}</div>
                      <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
