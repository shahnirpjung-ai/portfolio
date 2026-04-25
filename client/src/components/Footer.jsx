export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 0',
      background: 'var(--bg-2)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ fontWeight: 700, fontSize: '16px' }}>nirp<span style={{ color: 'var(--accent)' }}>.</span></span>
        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>© {new Date().getFullYear()} Nirp. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['LinkedIn', 'Twitter', 'Email'].map(link => (
            <a key={link} href="#" style={{ fontSize: '13px', color: 'var(--muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--text)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
