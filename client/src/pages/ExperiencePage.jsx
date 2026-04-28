import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useApi } from '../hooks/useApi';
import useSEO from '../hooks/useSEO';

const labelStyle = { display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#990011', marginBottom: '16px' };

const education = [
  { degree: 'BSc Marketing & Communications', school: 'University Name', year: '2018', note: 'Graduated with Honours' },
  { degree: 'Google Ads Certification', school: 'Google', year: '2023', note: 'Search, Display & Performance Max' },
  { degree: 'Meta Blueprint Certification', school: 'Meta', year: '2023', note: 'Advanced Advertising' },
  { degree: 'HubSpot Content Marketing', school: 'HubSpot Academy', year: '2022', note: 'Content Strategy & SEO' },
];

export default function ExperiencePage() {
  const navigate = useNavigate();
  const seo = useSEO('experience');
  const { data: experience, loading } = useApi('/experience');

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Inter, sans-serif', color: '#e8e8e8' }}>
      <SEO title={seo.title} description={seo.description} />
      <TopBar navigate={navigate} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        <div style={{ marginBottom: '64px' }}>
          <span style={labelStyle}>Background</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
            Experience.
          </h1>
          <p style={{ fontSize: '17px', color: '#666', lineHeight: 1.8, maxWidth: '500px' }}>
            5+ years of hands-on experience across agencies, in-house teams, and freelance engagements.
          </p>
        </div>

        <div className="exp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '48px', alignItems: 'start' }}>

          {/* Timeline */}
          <div>
            <span style={labelStyle}>Work History</span>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} style={{ height: '180px', background: 'linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: '8px' }} />
                ))}
              </div>
            ) : (
              <div style={{ position: 'relative', marginTop: '16px' }}>
                {/* Timeline line */}
                <div style={{ position: 'absolute', left: '15px', top: '8px', bottom: '8px', width: '1px', background: '#1a1a1a' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {experience?.map((job, i) => (
                    <div key={job.id} style={{ display: 'flex', gap: '28px', paddingBottom: i < experience.length - 1 ? '32px' : 0 }}>
                      {/* Dot */}
                      <div style={{ flexShrink: 0, width: '30px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#990011', border: '2px solid #0a0a0a', outline: '1px solid #990011' }} />
                      </div>

                      {/* Card */}
                      <div style={{ flex: 1, padding: '28px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px', marginBottom: '0', transition: 'border-color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = '#990011'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '3px' }}>{job.role}</h3>
                            <span style={{ fontSize: '14px', color: '#990011', fontWeight: 500 }}>{job.company}</span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#555', background: '#1a1a1a', padding: '4px 12px', borderRadius: '100px', border: '1px solid #222', whiteSpace: 'nowrap' }}>
                            {job.period}
                          </span>
                        </div>

                        <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, margin: '12px 0' }}>{job.description}</p>

                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {job.highlights.map(h => (
                            <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: '#666' }}>
                              <span style={{ color: '#990011', flexShrink: 0, marginTop: '2px' }}>✓</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Education & Certifications */}
            <div style={{ padding: '28px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
              <span style={labelStyle}>Education & Certs</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {education.map(({ degree, school, year, note }, i) => (
                  <div key={degree} style={{ paddingTop: i > 0 ? '16px' : 0, paddingBottom: i < education.length - 1 ? '16px' : 0, borderBottom: i < education.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '3px' }}>{degree}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#555' }}>{school}</span>
                      <span style={{ fontSize: '11px', color: '#990011' }}>{year}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div style={{ padding: '28px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
              <span style={labelStyle}>Quick Facts</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'Location', value: 'Remote · Worldwide' },
                  { label: 'Languages', value: 'English, Arabic' },
                  { label: 'Availability', value: 'Open to projects' },
                  { label: 'Focus', value: 'D2C, SaaS, B2B' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', paddingBottom: '14px', borderBottom: '1px solid #1a1a1a' }}>
                    <span style={{ color: '#555' }}>{label}</span>
                    <span style={{ color: '#ccc', fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => navigate('/contact')} style={{ padding: '14px', background: '#990011', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, fontFamily: 'Inter, sans-serif', cursor: 'pointer', width: '100%' }}>
              Work With Me →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @media(max-width:900px){
          .exp-grid{grid-template-columns:1fr!important}
        }
      `}</style>
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
