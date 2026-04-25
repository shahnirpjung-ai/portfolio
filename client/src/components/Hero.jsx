import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const xpRef = useRef(0.5);
  const targetRef = useRef(0.5);
  const isHovering = useRef(false);
  const [split, setSplit] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      targetRef.current = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0.05), 0.95);
    };

    const loop = () => {
      xpRef.current += (targetRef.current - xpRef.current) / 12;
      setSplit(+xpRef.current.toFixed(4));
      if (isHovering.current) animRef.current = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      isHovering.current = true;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      isHovering.current = false;
      targetRef.current = 0.5;
      if (animRef.current) cancelAnimationFrame(animRef.current);
      const ret = () => {
        xpRef.current += (0.5 - xpRef.current) / 8;
        setSplit(+xpRef.current.toFixed(4));
        if (Math.abs(xpRef.current - 0.5) > 0.0005) {
          animRef.current = requestAnimationFrame(ret);
        } else {
          xpRef.current = 0.5;
          setSplit(0.5);
        }
      };
      animRef.current = requestAnimationFrame(ret);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const lPct  = (split * 100).toFixed(3);
  const lTextOp = Math.max(0.15, Math.min(1, 1 - (split - 0.5) * 5));
  const rTextOp = Math.max(0.15, Math.min(1, (split - 0.5) * 5 + 1 - 1 + 1));

  // shared image style — both images centered identically so the face aligns perfectly
  const imgStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100%',
    width: 'auto',
    maxWidth: 'none',
    pointerEvents: 'none',
    userSelect: 'none',
    display: 'block',
  };

  return (
    <section
      ref={containerRef}
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '64px',
        cursor: 'ew-resize',
        userSelect: 'none',
      }}
    >

      {/* ── LAYER 1: Real photo — always full width, always visible ── */}
      <div style={{ position: 'absolute', inset: 0, background: '#111', zIndex: 0 }}>
        <img src="/nirp-real.png" alt="" style={imgStyle} draggable={false} />
      </div>

      {/* ── LAYER 2: Art photo — clipped to LEFT side of divider ── */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          clipPath: `inset(0 ${(100 - +lPct).toFixed(3)}% 0 0)`,
          background: '#FCF6F5',
        }}
      >
        <img src="/nirp-art.png" alt="" style={imgStyle} draggable={false} />
      </div>

      {/* ── LEFT TEXT (over art image) ── */}
      <div
        onClick={() => navigate('/about')}
        style={{
          position: 'absolute', inset: 0, zIndex: 3,
          clipPath: `inset(0 ${(100 - +lPct).toFixed(3)}% 0 0)`,
          cursor: 'pointer',
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          left: 'clamp(24px, 5vw, 60px)', maxWidth: '260px',
          opacity: lTextOp, transition: 'opacity 0.05s',
        }}>
          <span style={{
            display: 'inline-block', fontSize: '13px', fontWeight: 600,
            color: '#555', border: '1.5px solid #ccc', borderRadius: '100px',
            padding: '5px 16px', marginBottom: '20px', fontFamily: 'Inter, sans-serif',
            background: 'rgba(255,255,255,0.8)',
          }}>Hello!</span>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 58px)', fontWeight: 800,
            letterSpacing: '-0.04em', color: '#111',
            lineHeight: 1.05, fontFamily: 'Inter, sans-serif', margin: 0,
          }}>
            I'm <span style={{ color: '#990011' }}>Nirp</span>,
          </h1>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 58px)', fontWeight: 800,
            letterSpacing: '-0.04em', color: '#111',
            lineHeight: 1.05, fontFamily: 'Inter, sans-serif', marginBottom: '18px',
          }}>
            Strategist.
          </h1>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
            Performance marketing driving brand growth through creative campaigns.
          </p>
        </div>
      </div>

      {/* ── RIGHT TEXT (over real image) ── */}
      <div
        onClick={() => navigate('/skills')}
        style={{
          position: 'absolute', inset: 0, zIndex: 3,
          clipPath: `inset(0 0 0 ${lPct}%)`,
          cursor: 'pointer',
          background: 'rgba(0,0,0,0.5)',
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', transform: 'translateY(-50%)',
          right: 'clamp(24px, 5vw, 60px)', maxWidth: '260px', textAlign: 'right',
          opacity: rTextOp, transition: 'opacity 0.05s',
        }}>
          <span style={{
            display: 'inline-block', fontSize: '13px', fontWeight: 600,
            color: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '100px',
            padding: '5px 16px', marginBottom: '20px', fontFamily: 'Inter, sans-serif',
          }}>Hello!</span>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 58px)', fontWeight: 800,
            letterSpacing: '-0.04em', color: '#fff',
            lineHeight: 1.05, fontFamily: 'Inter, sans-serif', margin: 0,
          }}>
            I'm <span style={{ color: '#ff6b6b' }}>Nirp</span>,
          </h1>
          <h1 style={{
            fontSize: 'clamp(28px, 4vw, 58px)', fontWeight: 800,
            letterSpacing: '-0.04em', color: '#fff',
            lineHeight: 1.05, fontFamily: 'Inter, sans-serif', marginBottom: '18px',
          }}>
            Analyst.
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
            Data-driven decisions backed by deep analytics and performance tracking.
          </p>
        </div>
      </div>

      {/* ── DIVIDER LINE + HANDLE ── */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: `${lPct}%`,
        width: '2px',
        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.9) 80%, transparent)',
        zIndex: 10,
        transform: 'translateX(-1px)',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '44px', height: '44px', borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '15px', color: '#888',
        }}>
          ⟺
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '28px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        zIndex: 20, pointerEvents: 'none',
        animation: 'bounce 2s ease-in-out infinite',
      }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>scroll</span>
        <div style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(7px); }
        }
      `}</style>
    </section>
  );
}
