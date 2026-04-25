import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', budget: '', service: '', message: '' });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
      setForm({ name: '', email: '', budget: '', service: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: '#111', border: '1px solid #222',
    borderRadius: '8px', color: '#e8e8e8',
    fontSize: '14px', fontFamily: 'Inter, sans-serif',
    outline: 'none', transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block', fontSize: '12px', color: '#666',
    marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Inter, sans-serif', color: '#e8e8e8' }}>
      <SEO title="Contact — Nirp | Hire a Digital Marketing Strategist" description="Get in touch with Nirp to discuss your brand's digital marketing strategy. Available for SEO, paid media, social media, and full marketing audits." />

      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(16px)', borderBottom: '1px solid #1a1a1a', zIndex: 100,
      }}>
        <button onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e8e8e8', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>
          nirp<span style={{ color: '#990011' }}>.</span>
        </button>
        <button onClick={() => navigate(-1)}
          style={{ background: 'none', border: '1px solid #222', cursor: 'pointer', color: '#666', fontFamily: 'Inter, sans-serif', fontSize: '13px', padding: '7px 16px', borderRadius: '8px', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.target.style.borderColor = '#990011'; e.target.style.color = '#990011'; }}
          onMouseLeave={e => { e.target.style.borderColor = '#222'; e.target.style.color = '#666'; }}>
          ← Back
        </button>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '120px 24px 80px' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#990011', marginBottom: '16px' }}>
            Contact
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px' }}>
            Let's work<br />together.
          </h1>
          <p style={{ fontSize: '17px', color: '#666', lineHeight: 1.8, maxWidth: '480px' }}>
            Ready to grow your brand? Fill in the form and I'll get back to you within 24 hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px', alignItems: 'start' }}>

          {/* Left — info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { icon: '✉', label: 'Email', value: 'nirp@email.com' },
                { icon: '📍', label: 'Location', value: 'Available Worldwide · Remote' },
                { icon: '⏱', label: 'Response Time', value: 'Within 24 hours' },
                { icon: '🟢', label: 'Status', value: 'Open to new projects' },
              ].map(({ icon, label, value }, i, arr) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '20px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid #1a1a1a' : 'none',
                }}>
                  <span style={{ fontSize: '20px', width: '32px', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>{label}</div>
                    <div style={{ fontSize: '15px' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Services offered */}
            <div style={{ marginTop: '40px', padding: '24px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#990011', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                Services
              </div>
              {['SEO / SEM', 'Paid Advertising', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'Brand Strategy'].map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', fontSize: '14px', color: '#888', borderBottom: '1px solid #1a1a1a' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#990011', flexShrink: 0 }} />
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'success' ? (
              <div style={{
                padding: '60px 40px', background: '#111', border: '1px solid #990011',
                borderRadius: '8px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
                <h2 style={{ fontWeight: 600, fontSize: '22px', marginBottom: '12px' }}>Message sent!</h2>
                <p style={{ color: '#666', fontSize: '15px', lineHeight: 1.7 }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button onClick={() => setStatus(null)}
                  style={{ marginTop: '28px', padding: '11px 24px', background: 'transparent', border: '1px solid #222', color: '#e8e8e8', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="John Doe" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#990011'}
                      onBlur={e => e.target.style.borderColor = '#222'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="john@company.com" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#990011'}
                      onBlur={e => e.target.style.borderColor = '#222'} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Service Needed</label>
                    <select name="service" value={form.service} onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor = '#990011'}
                      onBlur={e => e.target.style.borderColor = '#222'}>
                      <option value="">Select a service</option>
                      <option>SEO / SEM</option>
                      <option>Paid Advertising</option>
                      <option>Social Media Marketing</option>
                      <option>Content Strategy</option>
                      <option>Email Marketing</option>
                      <option>Brand Strategy</option>
                      <option>Full Marketing Audit</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Monthly Budget</label>
                    <select name="budget" value={form.budget} onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => e.target.style.borderColor = '#990011'}
                      onBlur={e => e.target.style.borderColor = '#222'}>
                      <option value="">Select budget</option>
                      <option>Under $1,000</option>
                      <option>$1,000 – $3,000</option>
                      <option>$3,000 – $5,000</option>
                      <option>$5,000 – $10,000</option>
                      <option>$10,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Tell me about your project</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="What are your goals? What challenges are you facing? The more detail, the better."
                    required rows={6}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                    onFocus={e => e.target.style.borderColor = '#990011'}
                    onBlur={e => e.target.style.borderColor = '#222'} />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#f87171', fontSize: '13px' }}>{errorMsg}</p>
                )}

                <button type="submit" disabled={status === 'loading'}
                  style={{
                    padding: '14px 24px', background: '#990011', color: '#fff',
                    border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500,
                    fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1, transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (status !== 'loading') e.target.style.background = '#7a0010'; }}
                  onMouseLeave={e => e.target.style.background = '#990011'}>
                  {status === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .name-email-grid { grid-template-columns: 1fr !important; }
          .service-budget-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
