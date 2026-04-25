import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
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
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'var(--bg-3)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text)',
    fontSize: '14px', fontFamily: 'var(--font)',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let's work together.</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              Have a project in mind, want to talk strategy, or just want to say hi? Drop me a message and I'll get back to you within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Email', value: 'nirp@email.com', icon: '✉' },
                { label: 'Location', value: 'Available Worldwide · Remote', icon: '📍' },
                { label: 'Status', value: 'Open to new projects', icon: '🟢' },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '18px', width: '28px' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '14px' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div style={{
                padding: '40px', background: 'var(--bg-2)', border: '1px solid var(--accent)',
                borderRadius: 'var(--radius)', textAlign: 'center',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Message sent!</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>I'll get back to you within 24 hours.</p>
                <button className="btn btn-outline" style={{ marginTop: '24px' }} onClick={() => setStatus(null)}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@company.com' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {label}
                    </label>
                    <input
                      type={type} name={name} value={form[name]}
                      onChange={handleChange} placeholder={placeholder} required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Message
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project..." required rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                {status === 'error' && (
                  <p style={{ color: '#f87171', fontSize: '13px' }}>{errorMsg}</p>
                )}

                <button type="submit" className="btn btn-primary" disabled={status === 'loading'}
                  style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
