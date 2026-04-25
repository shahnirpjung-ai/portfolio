import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useEffect, useRef } from 'react';

function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('revealed');
        observer.disconnect();
      }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function BlogPreview() {
  const navigate = useNavigate();
  const { data: posts, loading } = useApi('/blog');
  const latest = posts?.slice(0, 3);
  const leftRef = useReveal();

  return (
    <section style={{ borderTop: '1px solid var(--border)', background: '#0a0a0a', padding: '100px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'start' }}>

          {/* Left — slides in from left */}
          <div ref={leftRef} className="reveal-left" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#fff' }}>
                Latest Blog
              </h2>
              <div style={{ flex: 1, height: '3px', background: 'linear-gradient(90deg, #990011, transparent)', borderRadius: '2px', minWidth: '40px', maxWidth: '80px', marginTop: '8px' }} />
            </div>

            <p style={{ fontSize: '16px', color: '#aaa', lineHeight: 1.8, marginBottom: '40px', maxWidth: '340px' }}>
              Stay updated with fresh insights on digital marketing, paid media, and growth strategy. Short, practical articles without the jargon.
            </p>

            <button onClick={() => navigate('/blog')}
              style={{ display: 'inline-flex', alignItems: 'center', padding: '0', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '48px' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: '#990011', borderRadius: '12px 0 0 12px' }}>
                <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>→</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', padding: '0 24px', height: '48px', background: 'rgba(153,0,17,0.15)', border: '1px solid rgba(153,0,17,0.4)', borderLeft: 'none', borderRadius: '0 12px 12px 0', color: '#ffb3b3', fontSize: '15px', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                More Blogs
              </span>
            </button>

            {/* Social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex' }}>
                {['#e879f9', '#a78bfa', '#60a5fa', '#34d399'].map((color, i) => (
                  <div key={i} style={{ width: '36px', height: '36px', borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${color}, ${color}88)`, border: '2px solid #0a0a0a', marginLeft: i > 0 ? '-10px' : '0', flexShrink: 0 }} />
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '3px' }}>
                  {Array(5).fill(0).map((_, i) => <span key={i} style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '13px', color: '#777', margin: 0 }}>
                  Trusted by <strong style={{ color: '#ffb3b3' }}>500+</strong> readers
                </p>
              </div>
            </div>
          </div>

          {/* Right — cards stagger in from right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading
              ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : latest?.map((post, i) => <PostCard key={post.id} post={post} navigate={navigate} index={i} />)
            }
          </div>
        </div>
      </div>

      <style>{`
        /* Reveal base states */
        .reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal-left.revealed,
        .reveal-right.revealed {
          opacity: 1;
          transform: translateX(0);
        }

        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        @media (max-width: 768px) {
          .reveal-left { position: static !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function PostCard({ post, navigate, index }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="reveal-right"
      style={{ transitionDelay: `${index * 0.15}s` }}
      onClick={() => navigate(`/blog/${post.slug}`)}
    >
      <div
        style={{
          display: 'flex', gap: '20px', alignItems: 'flex-start',
          padding: '20px', borderRadius: '16px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          cursor: 'pointer', transition: 'background 0.25s, border-color 0.25s, transform 0.25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(153,0,17,0.12)';
          e.currentTarget.style.borderColor = 'rgba(153,0,17,0.4)';
          e.currentTarget.style.transform = 'translateX(6px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}>

        {/* Thumbnail */}
        <div style={{ width: '88px', height: '88px', borderRadius: '12px', flexShrink: 0, background: post.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
          {post.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '8px', letterSpacing: '-0.01em' }}>
            {post.title}
          </h3>
          <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.65, marginBottom: '14px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#990011,#b30014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 700 }}>N</div>
            <span style={{ fontSize: '12px', color: '#aaa' }}>
              <span style={{ color: '#666', fontStyle: 'italic' }}>by</span>{' '}
              <strong style={{ fontStyle: 'normal', color: '#ffb3b3', fontWeight: 600 }}>{post.author}</strong>
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#666', whiteSpace: 'nowrap' }}>
              {formatDate(post.date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ width: '88px', height: '88px', borderRadius: '12px', flexShrink: 0, background: 'rgba(255,255,255,0.06)', animation: 'pulse 1.5s infinite' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ height: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', width: '80%', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', width: '60%', animation: 'pulse 1.5s infinite' }} />
        <div style={{ height: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', width: '40%', marginTop: '8px', animation: 'pulse 1.5s infinite' }} />
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const suffix = [1,21,31].includes(day) ? 'st' : [2,22].includes(day) ? 'nd' : [3,23].includes(day) ? 'rd' : 'th';
  return `${day}${suffix} ${d.toLocaleString('en-US', { month: 'short' })} '${String(d.getFullYear()).slice(2)}`;
}
