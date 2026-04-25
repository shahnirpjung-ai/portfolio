import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import SEO from '../components/SEO';

export default function BlogPostPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data: post, loading, error } = useApi(`/blog/${slug}`);

  if (loading) return <LoadingState navigate={navigate} />;
  if (error || !post) return <NotFound navigate={navigate} />;

  return (
    <div style={{ minHeight: '100vh', background: '#FCF6F5', fontFamily: 'Inter, sans-serif', color: '#111' }}>
      <SEO title={`${post.title} — Nirp`} description={post.excerpt} />
      <TopBar navigate={navigate} />

      {/* Hero banner */}
      <div style={{ background: post.gradient, paddingTop: '64px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '64px 24px 56px', position: 'relative' }}>

          {/* Category + read time */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.3)' }}>
              {post.category}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{post.readTime}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: '#fff', marginBottom: '24px', textShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
            {post.title}
          </h1>

          {/* Author row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px', fontWeight: 700, flexShrink: 0 }}>
              N
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{post.author}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>{formatDate(post.date)}</div>
            </div>
          </div>

          {/* Big icon */}
          <div style={{ position: 'absolute', right: '32px', bottom: '40px', fontSize: '80px', opacity: 0.25, userSelect: 'none' }}>
            {post.icon}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* White article card */}
        <div style={{ background: '#FCF6F5', borderRadius: '16px', padding: '48px', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', marginTop: '-32px', position: 'relative', zIndex: 1 }}>

          {/* Excerpt pull quote */}
          <p style={{ fontSize: '18px', color: '#555', lineHeight: 1.8, borderLeft: '4px solid #990011', paddingLeft: '20px', marginBottom: '36px', fontStyle: 'italic' }}>
            {post.excerpt}
          </p>

          <div style={{ height: '1px', background: '#f0f0f0', marginBottom: '36px' }} />

          {/* Content blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {post.content.map((block, i) => {
              if (block.type === 'heading') return (
                <h2 key={i} style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#111', marginTop: '12px', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
                  {block.text}
                </h2>
              );
              if (block.type === 'paragraph') return (
                <p key={i} style={{ fontSize: '16px', color: '#555', lineHeight: 1.9 }}>{block.text}</p>
              );
              if (block.type === 'list') return (
                <ul key={i} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px 24px', background: '#FCF6F5', border: '1px solid #f0f0f0', borderRadius: '8px' }}>
                  {block.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '15px', color: '#555', lineHeight: 1.7 }}>
                      <span style={{ color: '#990011', flexShrink: 0, marginTop: '3px', fontWeight: 700 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              );
              return null;
            })}
          </div>

          {/* Tags */}
          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '11px', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Tags</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map(t => (
                <span key={t} style={{ padding: '5px 14px', background: '#f5f5f5', border: '1px solid #e8e8e8', borderRadius: '100px', fontSize: '12px', color: '#777' }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Author card */}
          <div style={{ marginTop: '40px', padding: '24px', background: '#FCF6F5', border: '1px solid #f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg,#990011,#b30014)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: 700, flexShrink: 0 }}>
              N
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>{post.author}</div>
              <div style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>Digital Marketing Strategist helping brands grow through data-driven campaigns and creative strategy.</div>
            </div>
            <button onClick={() => navigate('/contact')}
              style={{ padding: '10px 18px', background: '#990011', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 500, fontFamily: 'Inter, sans-serif', cursor: 'pointer', flexShrink: 0 }}>
              Hire Me
            </button>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '32px', padding: '48px', background: '#111', borderRadius: '16px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', marginBottom: '10px' }}>Want results like this for your brand?</h3>
          <p style={{ fontSize: '15px', color: '#666', marginBottom: '24px', lineHeight: 1.7 }}>
            I help brands grow through the same strategies I write about. Let's talk.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/contact')}
              style={{ padding: '13px 28px', background: '#990011', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
              Work With Me →
            </button>
            <button onClick={() => navigate('/blog')}
              style={{ padding: '13px 28px', background: 'transparent', color: '#888', border: '1px solid #333', borderRadius: '8px', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
              More Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState({ navigate }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FCF6F5', fontFamily: 'Inter, sans-serif' }}>
      <TopBar navigate={navigate} />
      <div style={{ height: '300px', background: 'linear-gradient(90deg,#ddd 25%,#eee 50%,#ddd 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', paddingTop: '64px' }} />
      <div style={{ maxWidth: '780px', margin: '-32px auto 0', padding: '0 24px' }}>
        <div style={{ background: '#FCF6F5', borderRadius: '16px', padding: '48px', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[300, 160, 240, 160, 200].map((h, i) => (
            <div key={i} style={{ height: `${h}px`, background: 'linear-gradient(90deg,#f0f0f0 25%,#f8f8f8 50%,#f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: '8px' }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    </div>
  );
}

function NotFound({ navigate }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FCF6F5', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
      <TopBar navigate={navigate} />
      <div style={{ fontSize: '56px' }}>📭</div>
      <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Post not found</h2>
      <p style={{ color: '#999' }}>This article may have been moved or deleted.</p>
      <button onClick={() => navigate('/blog')} style={{ marginTop: '8px', padding: '12px 24px', background: '#990011', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
        Back to Blog
      </button>
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function TopBar({ navigate }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1a1a1a', zIndex: 100 }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e8e8e8', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>
        nirp<span style={{ color: '#990011' }}>.</span>
      </button>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button onClick={() => navigate('/blog')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
          All Posts
        </button>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: '1px solid #333', cursor: 'pointer', color: '#888', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '7px 16px', borderRadius: '8px', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.target.style.borderColor = '#990011'; e.target.style.color = '#990011'; }}
          onMouseLeave={e => { e.target.style.borderColor = '#333'; e.target.style.color = '#888'; }}>
          ← Back
        </button>
      </div>
    </div>
  );
}
