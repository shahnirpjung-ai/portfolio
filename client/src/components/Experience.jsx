import { useApi } from '../hooks/useApi';

export default function Experience() {
  const { data: experience, loading } = useApi('/experience');

  return (
    <section id="experience" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{ marginBottom: '60px' }}>
          <span className="section-label">Background</span>
          <h2 className="section-title">Experience.</h2>
          <p className="section-subtitle">A track record of delivering measurable results across industries.</p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '160px' }} />)}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {experience?.map((job, i) => (
              <div key={job.id} style={{
                padding: '32px', background: 'var(--bg)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                marginBottom: i < experience.length - 1 ? '16px' : 0,
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.01em' }}>{job.role}</h3>
                    <span style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 500 }}>{job.company}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--muted)', background: 'var(--bg-3)', padding: '4px 12px', borderRadius: '100px', border: '1px solid var(--border)', whiteSpace: 'nowrap' }}>
                    {job.period}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>{job.description}</p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {job.highlights.map(h => (
                    <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
