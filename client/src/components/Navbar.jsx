import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LEFT_LINKS  = ['About', 'Services', 'Projects'];
const RIGHT_LINKS = ['Experience', 'Blog', 'Contact'];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (name) => {
    if (name === 'Home') return location.pathname === '/';
    return location.pathname === `/${name.toLowerCase()}` ||
           location.pathname.startsWith(`/${name.toLowerCase()}/`);
  };

  const go = (name) => {
    navigate(name === 'Home' ? '/' : `/${name.toLowerCase()}`);
    setMenuOpen(false);
  };

  const linkBtn = (name) => {
    const active = isActive(name);
    return (
      <button key={name} onClick={() => go(name)}
        style={{
          padding: '8px 18px', borderRadius: '100px', border: 'none',
          cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          fontSize: '14px', fontWeight: active ? 700 : 400,
          background: active ? '#990011' : 'transparent',
          color: active ? '#fff' : '#aaa',
          transition: 'all 0.2s', whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#fff'; } }}
        onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#aaa'; } }}>
        {name}
      </button>
    );
  };

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <nav style={{
        position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, width: 'calc(100% - 48px)', maxWidth: '900px',
      }}>
        {/* Desktop */}
        <div className="nav-desktop" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#1a1a1a', borderRadius: '100px',
          padding: '6px 6px 6px 6px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
          gap: '4px',
        }}>
          {/* Left links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', paddingLeft: '4px' }}>
            {/* Home pill */}
            {linkBtn('Home')}
            {LEFT_LINKS.map(l => linkBtn(l))}
          </div>

          {/* Center logo */}
          <button onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 16px', flexShrink: 0,
            }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#990011',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '14px', color: '#fff', letterSpacing: '-0.02em',
              flexShrink: 0,
            }}>N</div>
            <span style={{ fontWeight: 700, fontSize: '18px', color: '#fff', letterSpacing: '-0.02em' }}>
              nirp<span style={{ color: '#990011' }}>.</span>
            </span>
          </button>

          {/* Right links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', paddingRight: '4px' }}>
            {RIGHT_LINKS.map(l => linkBtn(l))}
          </div>
        </div>

        {/* Mobile */}
        <div className="nav-mobile" style={{
          display: 'none', alignItems: 'center', justifyContent: 'space-between',
          background: '#1a1a1a', borderRadius: '100px',
          padding: '6px 16px', boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        }}>
          <button onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#990011', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', color: '#fff' }}>N</div>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#fff' }}>nirp<span style={{ color: '#990011' }}>.</span></span>
          </button>
          <button onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer', lineHeight: 1 }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            marginTop: '8px', background: '#1a1a1a', borderRadius: '20px',
            padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px',
            boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
          }}>
            {['Home', ...LEFT_LINKS, ...RIGHT_LINKS].map(l => {
              const active = isActive(l);
              return (
                <button key={l} onClick={() => go(l)}
                  style={{
                    padding: '12px 16px', borderRadius: '12px', border: 'none',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '15px',
                    textAlign: 'left', fontWeight: active ? 700 : 400,
                    background: active ? '#990011' : 'transparent',
                    color: active ? '#fff' : '#aaa',
                  }}>
                  {l}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 700px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
