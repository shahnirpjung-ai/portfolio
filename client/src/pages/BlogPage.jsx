import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import useSEO from '../hooks/useSEO';

const CATEGORIES = ['All', 'Paid Media', 'SEO', 'Email Marketing', 'Analytics'];

export default function BlogPage() {
  const navigate = useNavigate();
  const seo = useSEO('blog');
  const [activeCategory, setActiveCategory] = useState('All');
  const endpoint = activeCategory === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(activeCategory)}`;
  const { data: posts, loading } = useApi(endpoint);

  return (
    <div style={{ minHeight: '100vh', background: '#FCF6F5', fontFamily: 'Inter, sans-serif', color: '#111' }}>
      <SEO title={seo.title} description={seo.description} />
      <TopBar navigate={navigate} />

      {/* Hero banner */}
      <div style={{ background: '#0a0a0a', paddingTop: '64px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px 56px' }}>
          <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#990011', marginBottom: '16px' }}>
            Blog
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: '16px' }}>
            Marketing insights<br />from the field.
          </h1>
          <p style={{ fontSize: '17px', color: '#666', lineHeight: 1.7, maxWidth: '480px' }}>
            Practical frameworks, campaign breakdowns, and lessons from real work — no fluff.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 500,
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s',
                background: activeCategory === cat ? '#0a0a0a' : '#FCF6F5',
                color: activeCategory === cat ? '#fff' : '#888',
                border: activeCategory === cat ? '1px solid #0a0a0a' : '1px solid #e0e0e0',
                boxShadow: activeCategory === cat ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
            {Array(4).fill(0).map((_, i) => (
              <div key={i} style={{ background: '#FCF6F5', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
                <div style={{ height: '200px', background: 'linear-gradient(90deg,#eee 25%,#f5f5f5 50%,#eee 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ height: '12px', background: '#eee', borderRadius: '4px', width: '30%' }} />
                  <div style={{ height: '20px', background: '#eee', borderRadius: '4px', width: '90%' }} />
                  <div style={{ height: '20px', background: '#eee', borderRadius: '4px', width: '70%' }} />
                  <div style={{ height: '14px', background: '#eee', borderRadius: '4px', width: '85%', marginTop: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : posts?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#aaa' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <p style={{ fontSize: '16px' }}>No posts in this category yet.</p>
          </div>
        ) : (
          <>
            {/* Featured hero card */}
            {activeCategory === 'All' && posts?.[0] && (
              <FeaturedCard post={posts[0]} navigate={navigate} />
            )}

            {/* Grid of remaining posts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '24px', marginTop: activeCategory === 'All' ? '32px' : '0' }}>
              {(activeCategory === 'All' ? posts?.slice(1) : posts)?.map(post => (
                <PostCard key={post.id} post={post} navigate={navigate} />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}

function FeaturedCard({ post, navigate }) {
  return (
    <div className="featured-grid" onClick={() => navigate(`/blog/${post.slug}`)}
      style={{
        background: '#FCF6F5', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr',
        transition: 'transform 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.14)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)'; }}>

      {/* Image area */}
      <div style={{
        background: post.gradient, minHeight: '300px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      }}>
        <span style={{ fontSize: '72px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>{post.icon}</span>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.3)' }}>
            Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#990011' }}>
          {post.category}
        </span>
        <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3, color: '#111' }}>
          {post.title}
        </h2>
        <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.75 }}>{post.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg,#990011,#b30014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: 700 }}>
            N
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{post.author}</div>
            <div style={{ fontSize: '12px', color: '#aaa' }}>{formatDate(post.date)} · {post.readTime}</div>
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#990011', fontWeight: 500 }}>Read article →</span>
        </div>
      </div>

      <style>{`
        @media(max-width:700px){
          .featured-grid { grid-template-columns:1fr!important; }
          .featured-grid>div:first-child { min-height:200px!important; }
        }
      `}</style>
    </div>
  );
}

function PostCard({ post, navigate }) {
  return (
    <div onClick={() => navigate(`/blog/${post.slug}`)}
      style={{
        background: '#FCF6F5', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column',
        transition: 'transform 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.13)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'; }}>

      {/* Image / gradient thumbnail */}
      <div style={{
        background: post.gradient, height: '180px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '52px', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.2))' }}>{post.icon}</span>
        <span style={{
          position: 'absolute', top: '14px', left: '14px',
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
          color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px',
          border: '1px solid rgba(255,255,255,0.3)',
        }}>
          {post.category}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.4, color: '#111' }}>
          {post.title}
        </h3>
        <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.75, flex: 1 }}>{post.excerpt}</p>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#990011,#b30014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
          N
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#333' }}>{post.author}</div>
          <div style={{ fontSize: '11px', color: '#bbb' }}>{formatDate(post.date)}</div>
        </div>
        <span style={{ fontSize: '12px', color: '#aaa' }}>{post.readTime}</span>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function TopBar({ navigate }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1a1a1a', zIndex: 100 }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e8e8e8', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>
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
