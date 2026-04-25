import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('srv-visible'); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Services() {
  const navigate = useNavigate();
  const { data: services, loading } = useApi('/services');
  const headRef = useReveal();

  return (
    <section style={{ background: '#0f0f0f', padding: '100px 0', borderTop: '1px solid #1a1a1a' }}>
      <div className="container">

        {/* Header */}
        <div ref={headRef} className="srv-reveal-up" style={{ marginBottom: '56px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#990011', display: 'block', marginBottom: '14px' }}>
            Services
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
            What I can do for your brand.
          </h2>
          <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.75, maxWidth: '480px' }}>
            End-to-end digital marketing — from strategy to execution. Every service is built around measurable outcomes.
          </p>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {Array(6).fill(0).map((_, i) => (
              <div key={i} style={{ height: '220px', borderRadius: '16px', background: '#1a1a1a', animation: 'srv-pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {services?.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <button onClick={() => navigate('/contact')}
            style={{ padding: '14px 32px', background: '#990011', color: '#fff', border: 'none', borderRadius: '100px', fontSize: '15px', fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#7a0010'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#990011'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Discuss Your Project →
          </button>
        </div>
      </div>

      <style>{`
        .srv-reveal-up { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .srv-reveal-up.srv-visible { opacity: 1; transform: translateY(0); }
        .srv-card-wrap { opacity: 0; transform: translateY(30px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .srv-card-wrap.srv-visible { opacity: 1; transform: translateY(0); }
        @keyframes srv-pulse { 0%,100%{opacity:0.4} 50%{opacity:0.7} }
      `}</style>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const ref = useReveal();

  return (
    <div ref={ref} className="srv-card-wrap" style={{ transitionDelay: `${index * 0.08}s` }}>
      <div style={{
        background: '#1c1c1c', borderRadius: '16px', padding: '32px',
        height: '100%', display: 'flex', flexDirection: 'column', gap: '20px',
        transition: 'background 0.25s, transform 0.25s',
        cursor: 'default',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = '#222'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#1c1c1c'; e.currentTarget.style.transform = 'translateY(0)'; }}>

        {/* Icon badge */}
        <div style={{
          width: '48px', height: '48px', borderRadius: '12px',
          background: 'rgba(249,115,22,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', flexShrink: 0,
        }}>
          {service.icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '12px', letterSpacing: '-0.01em' }}>
            {service.title}
          </h3>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.75 }}>
            {service.description}
          </p>
        </div>

        {/* Highlights */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #2a2a2a', paddingTop: '20px' }}>
          {service.highlights.map(h => (
            <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#555' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#990011', flexShrink: 0 }} />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
