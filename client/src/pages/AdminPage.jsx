import { useState, useEffect } from 'react';

const TOKEN_KEY = 'nirp_admin_token';
const api = (path, method = 'GET', body) => {
  const token = localStorage.getItem(TOKEN_KEY);
  return fetch(`/api/admin${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: body ? JSON.stringify(body) : undefined,
  }).then(r => r.json());
};

/* ─── colour tokens ─────────────────────────── */
const C = {
  bg: '#0f0f0f', sidebar: '#161616', card: '#1c1c1c',
  border: '#2a2a2a', text: '#e8e8e8', muted: '#666',
  red: '#990011', redDim: 'rgba(153,0,17,0.15)',
  green: '#16a34a', danger: '#dc2626',
};

/* ─── reusable primitives ───────────────────── */
const Input = ({ label, ...p }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <label style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>}
    <input {...p} style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.text, fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', width: '100%', boxSizing: 'border-box', ...(p.style || {}) }}
      onFocus={e => e.target.style.borderColor = C.red}
      onBlur={e => e.target.style.borderColor = C.border} />
  </div>
);

const Textarea = ({ label, ...p }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <label style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>}
    <textarea {...p} style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.text, fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', resize: 'vertical', minHeight: 80, width: '100%', boxSizing: 'border-box', ...(p.style || {}) }}
      onFocus={e => e.target.style.borderColor = C.red}
      onBlur={e => e.target.style.borderColor = C.border} />
  </div>
);

const Btn = ({ children, danger, outline, small, ...p }) => (
  <button {...p} style={{
    padding: small ? '7px 16px' : '10px 22px', borderRadius: 8, border: outline ? `1px solid ${C.border}` : 'none',
    background: danger ? C.danger : outline ? 'transparent' : C.red,
    color: '#fff', fontFamily: 'Inter,sans-serif', fontSize: small ? 12 : 14,
    fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s', ...(p.style || {}),
  }}
    onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
    {children}
  </button>
);

/* ─── Image Upload ──────────────────────────── */
function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    const token = localStorage.getItem(TOKEN_KEY);
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    }).then(r => r.json());
    setUploading(false);
    if (res.url) onChange(res.url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</label>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {value && (
          <img src={value} alt="preview"
            style={{ width: 72, height: 52, objectFit: 'cover', borderRadius: 8, border: `1px solid ${C.border}` }} />
        )}
        <label style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '9px 18px', borderRadius: 8, border: `1px solid ${C.border}`,
          background: '#111', color: C.text, fontSize: 13, cursor: 'pointer',
          fontFamily: 'Inter,sans-serif', fontWeight: 500,
        }}>
          {uploading ? 'Uploading…' : value ? 'Change Image' : 'Upload Image'}
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        </label>
        {value && (
          <button onClick={() => onChange('')}
            style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 13, fontFamily: 'Inter,sans-serif' }}>
            Remove
          </button>
        )}
      </div>
      {value && !value.startsWith('/uploads') && (
        <Input label="Or paste image URL" value={value} onChange={e => onChange(e.target.value)} style={{ marginTop: 4 }} />
      )}
    </div>
  );
}

const Toast = ({ msg, type }) => msg ? (
  <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, padding: '12px 24px', borderRadius: 10, background: type === 'error' ? C.danger : C.green, color: '#fff', fontSize: 14, fontWeight: 600, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
    {msg}
  </div>
) : null;

/* ─── Login ─────────────────────────────────── */
function Login({ onLogin }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault(); setErr(''); setLoading(true);
    const res = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    }).then(r => r.json());
    setLoading(false);
    if (res.token) { localStorage.setItem(TOKEN_KEY, res.token); onLogin(); }
    else setErr(res.error || 'Invalid password');
  };

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ width: 380, padding: 48, background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }}>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 auto 16px' }}>N</div>
          <h1 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Admin Panel</h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 6 }}>Enter your admin password</p>
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Password" type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" required />
          {err && <p style={{ color: C.danger, fontSize: 13, margin: 0 }}>{err}</p>}
          <Btn type="submit" style={{ width: '100%', marginTop: 4 }}>{loading ? 'Checking...' : 'Login →'}</Btn>
        </form>
      </div>
    </div>
  );
}

/* ─── Sidebar ────────────────────────────────── */
const NAV = [
  { key: 'skills', icon: '🎯', label: 'Skills' },
  { key: 'experience', icon: '💼', label: 'Experience' },
  { key: 'projects', icon: '🚀', label: 'Projects' },
  { key: 'services', icon: '⚡', label: 'Services' },
  { key: 'blog', icon: '📝', label: 'Blog' },
  { key: 'home', icon: '🏠', label: 'Home' },
  { key: 'about', icon: '👤', label: 'About' },
  { key: 'services-page', icon: '⚡', label: 'Services Page' },
  { key: 'seo', icon: '🔍', label: 'SEO' },
  { key: 'contact-info', icon: '📋', label: 'Contact Info' },
  { key: 'contact', icon: '✉️', label: 'Messages' },
];

function Sidebar({ active, setActive, onLogout }) {
  return (
    <div style={{ width: 220, minHeight: '100vh', background: C.sidebar, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <div style={{ padding: '24px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#fff' }}>N</div>
        <div>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>nirp<span style={{ color: C.red }}>.</span></div>
          <div style={{ color: C.muted, fontSize: 11 }}>Admin Panel</div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {NAV.map(n => (
          <button key={n.key} onClick={() => setActive(n.key)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 14px', borderRadius: 8, border: 'none',
            background: active === n.key ? C.redDim : 'transparent',
            color: active === n.key ? '#fff' : C.muted,
            fontFamily: 'Inter,sans-serif', fontSize: 14, fontWeight: active === n.key ? 600 : 400,
            cursor: 'pointer', marginBottom: 2, textAlign: 'left', transition: 'all 0.15s',
          }}>
            <span>{n.icon}</span>{n.label}
            {active === n.key && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: C.red }} />}
          </button>
        ))}
      </nav>
      <div style={{ padding: '16px 10px', borderTop: `1px solid ${C.border}` }}>
        <Btn outline small onClick={onLogout} style={{ width: '100%' }}>Logout</Btn>
      </div>
    </div>
  );
}

/* ─── Section Header ─────────────────────────── */
const SectionHead = ({ title, sub, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
    <div>
      <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>{title}</h2>
      <p style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>{sub}</p>
    </div>
    {action}
  </div>
);

/* ─── Skills Editor ─────────────────────────── */
function SkillsEditor() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/skills').then(setData); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };

  const save = async () => {
    setSaving(true);
    await api('/skills', 'PUT', data);
    setSaving(false); toast_('Skills saved!');
  };

  const addCategory = () => setData(d => [...d, { category: 'New Category', items: [] }]);
  const removeCategory = i => setData(d => d.filter((_, x) => x !== i));
  const updateCat = (i, val) => setData(d => d.map((c, x) => x === i ? { ...c, category: val } : c));
  const addItem = i => setData(d => d.map((c, x) => x === i ? { ...c, items: [...c.items, 'New Skill'] } : c));
  const removeItem = (i, j) => setData(d => d.map((c, x) => x === i ? { ...c, items: c.items.filter((_, y) => y !== j) } : c));
  const updateItem = (i, j, val) => setData(d => d.map((c, x) => x === i ? { ...c, items: c.items.map((it, y) => y === j ? val : it) } : c));

  if (!data) return <Loader />;

  return (
    <div>
      <SectionHead title="Skills" sub="Manage skill categories and items" action={
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn outline small onClick={addCategory}>+ Category</Btn>
          <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
        </div>
      } />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {data.map((cat, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <input value={cat.category} onChange={e => updateCat(i, e.target.value)}
                style={{ flex: 1, background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '7px 12px', color: C.red, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter,sans-serif', outline: 'none' }} />
              <button onClick={() => removeCategory(i)} style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 16, padding: '0 4px' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cat.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: 6 }}>
                  <input value={item} onChange={e => updateItem(i, j, e.target.value)}
                    style={{ flex: 1, background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '7px 12px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                  <button onClick={() => removeItem(i, j)} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', fontSize: 14 }}>✕</button>
                </div>
              ))}
              <button onClick={() => addItem(i)} style={{ background: C.redDim, border: `1px dashed ${C.red}`, borderRadius: 6, padding: '6px', color: C.red, fontSize: 12, cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>+ Add Skill</button>
            </div>
          </div>
        ))}
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── Experience Editor ──────────────────────── */
function ExperienceEditor() {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/experience').then(d => { setData(d); setEditing(d[0]?.id ?? null); }); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };

  const save = async () => {
    setSaving(true); await api('/experience', 'PUT', data);
    setSaving(false); toast_('Experience saved!');
  };

  const newJob = () => {
    const id = Date.now();
    const job = { id, role: 'New Role', company: 'Company Name', period: '2024 – Present', description: '', highlights: [] };
    setData(d => [job, ...d]); setEditing(id);
  };

  const update = (id, key, val) => setData(d => d.map(j => j.id === id ? { ...j, [key]: val } : j));
  const addHL = id => setData(d => d.map(j => j.id === id ? { ...j, highlights: [...j.highlights, ''] } : j));
  const updateHL = (id, idx, val) => setData(d => d.map(j => j.id === id ? { ...j, highlights: j.highlights.map((h, i) => i === idx ? val : h) } : j));
  const removeHL = (id, idx) => setData(d => d.map(j => j.id === id ? { ...j, highlights: j.highlights.filter((_, i) => i !== idx) } : j));
  const removeJob = id => { setData(d => d.filter(j => j.id !== id)); setEditing(data.find(j => j.id !== id)?.id ?? null); };

  if (!data) return <Loader />;
  const job = data.find(j => j.id === editing);

  return (
    <div>
      <SectionHead title="Experience" sub="Manage work history" action={
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn outline small onClick={newJob}>+ Add Job</Btn>
          <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
        </div>
      } />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.map(j => (
            <button key={j.id} onClick={() => setEditing(j.id)} style={{
              background: editing === j.id ? C.redDim : C.card,
              border: `1px solid ${editing === j.id ? C.red : C.border}`,
              borderRadius: 10, padding: '12px 14px', textAlign: 'left', cursor: 'pointer',
              color: editing === j.id ? '#fff' : C.muted, fontFamily: 'Inter,sans-serif',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: editing === j.id ? '#fff' : C.text, marginBottom: 2 }}>{j.role}</div>
              <div style={{ fontSize: 12 }}>{j.company}</div>
              <div style={{ fontSize: 11, marginTop: 3, color: C.muted }}>{j.period}</div>
            </button>
          ))}
        </div>
        {job && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Input label="Role / Title" value={job.role} onChange={e => update(job.id, 'role', e.target.value)} />
              <Input label="Company" value={job.company} onChange={e => update(job.id, 'company', e.target.value)} />
            </div>
            <Input label="Period" value={job.period} onChange={e => update(job.id, 'period', e.target.value)} placeholder="2022 – 2024" />
            <Textarea label="Description" value={job.description} onChange={e => update(job.id, 'description', e.target.value)} rows={3} />
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Highlights</label>
                <Btn small outline onClick={() => addHL(job.id)}>+ Add</Btn>
              </div>
              {job.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input value={h} onChange={e => updateHL(job.id, i, e.target.value)}
                    style={{ flex: 1, background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                  <button onClick={() => removeHL(job.id, i)} style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 14 }}>✕</button>
                </div>
              ))}
            </div>
            <Btn danger small onClick={() => removeJob(job.id)} style={{ alignSelf: 'flex-start' }}>Delete Job</Btn>
          </div>
        )}
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── Projects Editor ────────────────────────── */
function ProjectsEditor() {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/projects').then(d => { setData(d); setEditing(d[0]?.id ?? null); }); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };
  const save = async () => { setSaving(true); await api('/projects', 'PUT', data); setSaving(false); toast_('Projects saved!'); };

  const newProject = () => {
    const id = Date.now();
    const p = { id, title: 'New Project', category: 'Paid Media', description: '', tags: [], metrics: [], link: '#' };
    setData(d => [p, ...d]); setEditing(id);
  };

  const update = (id, key, val) => setData(d => d.map(p => p.id === id ? { ...p, [key]: val } : p));
  const removeProject = id => { setData(d => d.filter(p => p.id !== id)); setEditing(data.find(p => p.id !== id)?.id ?? null); };

  if (!data) return <Loader />;
  const proj = data.find(p => p.id === editing);

  return (
    <div>
      <SectionHead title="Projects" sub="Manage case studies and campaigns" action={
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn outline small onClick={newProject}>+ Add Project</Btn>
          <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
        </div>
      } />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.map(p => (
            <button key={p.id} onClick={() => setEditing(p.id)} style={{
              background: editing === p.id ? C.redDim : C.card,
              border: `1px solid ${editing === p.id ? C.red : C.border}`,
              borderRadius: 10, padding: '12px 14px', textAlign: 'left', cursor: 'pointer', fontFamily: 'Inter,sans-serif',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: editing === p.id ? '#fff' : C.text, marginBottom: 2 }}>{p.title}</div>
              <div style={{ fontSize: 11, color: C.red }}>{p.category}</div>
            </button>
          ))}
        </div>
        {proj && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Input label="Title" value={proj.title} onChange={e => update(proj.id, 'title', e.target.value)} />
              <Input label="Category" value={proj.category} onChange={e => update(proj.id, 'category', e.target.value)} />
            </div>
            <ImageUpload label="Project Image" value={proj.image || ''} onChange={val => update(proj.id, 'image', val)} />
            <Textarea label="Description" value={proj.description} onChange={e => update(proj.id, 'description', e.target.value)} rows={3} />
            <Input label="Link" value={proj.link} onChange={e => update(proj.id, 'link', e.target.value)} />
            <Input label="Tags (comma separated)" value={proj.tags.join(', ')} onChange={e => update(proj.id, 'tags', e.target.value.split(',').map(t => t.trim()))} />
            <div>
              <label style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 10 }}>Metrics</label>
              {proj.metrics.map((m, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, marginBottom: 8 }}>
                  <input placeholder="Value (e.g. 3.8x)" value={m.value} onChange={e => update(proj.id, 'metrics', proj.metrics.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}
                    style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                  <input placeholder="Label (e.g. ROAS)" value={m.label} onChange={e => update(proj.id, 'metrics', proj.metrics.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                    style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                  <button onClick={() => update(proj.id, 'metrics', proj.metrics.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer' }}>✕</button>
                </div>
              ))}
              <Btn small outline onClick={() => update(proj.id, 'metrics', [...proj.metrics, { value: '', label: '' }])}>+ Add Metric</Btn>
            </div>
            <Btn danger small onClick={() => removeProject(proj.id)} style={{ alignSelf: 'flex-start' }}>Delete Project</Btn>
          </div>
        )}
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── Services Editor ────────────────────────── */
function ServicesEditor() {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/services').then(d => { setData(d); setEditing(d[0]?.id ?? null); }); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };
  const save = async () => { setSaving(true); await api('/services', 'PUT', data); setSaving(false); toast_('Services saved!'); };

  const newService = () => {
    const id = Date.now();
    const s = { id, title: 'New Service', description: '', icon: '⚡', highlights: [] };
    setData(d => [s, ...d]); setEditing(id);
  };

  const update = (id, key, val) => setData(d => d.map(s => s.id === id ? { ...s, [key]: val } : s));
  const addHL = id => setData(d => d.map(s => s.id === id ? { ...s, highlights: [...s.highlights, ''] } : s));
  const updateHL = (id, i, val) => setData(d => d.map(s => s.id === id ? { ...s, highlights: s.highlights.map((h, j) => j === i ? val : h) } : s));
  const removeHL = (id, i) => setData(d => d.map(s => s.id === id ? { ...s, highlights: s.highlights.filter((_, j) => j !== i) } : s));
  const removeService = id => { setData(d => d.filter(s => s.id !== id)); setEditing(data.find(s => s.id !== id)?.id ?? null); };

  if (!data) return <Loader />;
  const svc = data.find(s => s.id === editing);

  return (
    <div>
      <SectionHead title="Services" sub="Manage service offerings" action={
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn outline small onClick={newService}>+ Add Service</Btn>
          <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
        </div>
      } />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.map(s => (
            <button key={s.id} onClick={() => setEditing(s.id)} style={{
              background: editing === s.id ? C.redDim : C.card,
              border: `1px solid ${editing === s.id ? C.red : C.border}`,
              borderRadius: 10, padding: '12px 14px', textAlign: 'left', cursor: 'pointer', fontFamily: 'Inter,sans-serif',
            }}>
              <span style={{ marginRight: 8 }}>{s.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: editing === s.id ? '#fff' : C.text }}>{s.title}</span>
            </button>
          ))}
        </div>
        {svc && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 16 }}>
              <Input label="Icon" value={svc.icon} onChange={e => update(svc.id, 'icon', e.target.value)} />
              <Input label="Title" value={svc.title} onChange={e => update(svc.id, 'title', e.target.value)} />
            </div>
            <Textarea label="Description" value={svc.description} onChange={e => update(svc.id, 'description', e.target.value)} rows={3} />
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Highlights</label>
                <Btn small outline onClick={() => addHL(svc.id)}>+ Add</Btn>
              </div>
              {svc.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input value={h} onChange={e => updateHL(svc.id, i, e.target.value)}
                    style={{ flex: 1, background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                  <button onClick={() => removeHL(svc.id, i)} style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 14 }}>✕</button>
                </div>
              ))}
            </div>
            <Btn danger small onClick={() => removeService(svc.id)} style={{ alignSelf: 'flex-start' }}>Delete Service</Btn>
          </div>
        )}
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── Blog Editor ────────────────────────────── */
function BlogEditor() {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/blog').then(d => { setData(d); setEditing(d[0]?.id ?? null); }); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };
  const save = async () => { setSaving(true); await api('/blog', 'PUT', data); setSaving(false); toast_('Blog saved!'); };

  const newPost = () => {
    const id = Date.now();
    const post = {
      id, slug: `new-post-${id}`, title: 'New Post', excerpt: '',
      category: 'Paid Media', icon: '📈',
      gradient: 'linear-gradient(135deg,#990011,#b30014)',
      author: 'Nirp', date: new Date().toISOString().split('T')[0],
      readTime: '5 min read', tags: [],
      content: [{ type: 'paragraph', text: 'Start writing here...' }],
    };
    setData(d => [post, ...d]); setEditing(id);
  };

  const update = (id, key, val) => setData(d => d.map(p => p.id === id ? { ...p, [key]: val } : p));
  const removePost = id => { setData(d => d.filter(p => p.id !== id)); setEditing(data.find(p => p.id !== id)?.id ?? null); };

  const addBlock = (id, type) => setData(d => d.map(p => p.id === id ? {
    ...p, content: [...p.content, type === 'list' ? { type: 'list', items: [''] } : { type, text: '' }]
  } : p));

  const updateBlock = (id, bi, val) => setData(d => d.map(p => p.id === id ? {
    ...p, content: p.content.map((b, i) => i === bi ? { ...b, ...val } : b)
  } : p));

  const removeBlock = (id, bi) => setData(d => d.map(p => p.id === id ? { ...p, content: p.content.filter((_, i) => i !== bi) } : p));

  const updateListItem = (id, bi, li, val) => setData(d => d.map(p => p.id === id ? {
    ...p, content: p.content.map((b, i) => i === bi ? { ...b, items: b.items.map((it, j) => j === li ? val : it) } : b)
  } : p));

  if (!data) return <Loader />;
  const post = data.find(p => p.id === editing);

  return (
    <div>
      <SectionHead title="Blog" sub="Write and manage blog posts" action={
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn outline small onClick={newPost}>+ New Post</Btn>
          <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
        </div>
      } />
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Post list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.map(p => (
            <button key={p.id} onClick={() => setEditing(p.id)} style={{
              background: editing === p.id ? C.redDim : C.card,
              border: `1px solid ${editing === p.id ? C.red : C.border}`,
              borderRadius: 10, padding: '12px 14px', textAlign: 'left', cursor: 'pointer', fontFamily: 'Inter,sans-serif',
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: editing === p.id ? '#fff' : C.text, marginBottom: 2 }}>{p.title}</div>
              <div style={{ fontSize: 11, color: C.red }}>{p.category}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{p.date}</div>
            </button>
          ))}
        </div>

        {/* Post editor */}
        {post && (
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Input label="Title" value={post.title} onChange={e => update(post.id, 'title', e.target.value)} />
              <Input label="Slug (URL)" value={post.slug} onChange={e => update(post.id, 'slug', e.target.value)} />
            </div>
            <Textarea label="Excerpt" value={post.excerpt} onChange={e => update(post.id, 'excerpt', e.target.value)} rows={2} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 60px', gap: 16 }}>
              <Input label="Category" value={post.category} onChange={e => update(post.id, 'category', e.target.value)} />
              <Input label="Date" type="date" value={post.date} onChange={e => update(post.id, 'date', e.target.value)} />
              <Input label="Read Time" value={post.readTime} onChange={e => update(post.id, 'readTime', e.target.value)} />
              <Input label="Icon" value={post.icon} onChange={e => update(post.id, 'icon', e.target.value)} />
            </div>
            <Input label="Tags (comma separated)" value={post.tags.join(', ')} onChange={e => update(post.id, 'tags', e.target.value.split(',').map(t => t.trim()))} />
            <ImageUpload label="Cover Image" value={post.image || ''} onChange={val => update(post.id, 'image', val)} />

            {/* Content blocks */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <label style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Content Blocks</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['heading', 'paragraph', 'list'].map(t => (
                    <Btn key={t} small outline onClick={() => addBlock(post.id, t)}>+ {t}</Btn>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {post.content.map((block, bi) => (
                  <div key={bi} style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 8, padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{block.type}</span>
                      <button onClick={() => removeBlock(post.id, bi)} style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 13 }}>✕</button>
                    </div>
                    {block.type === 'list' ? (
                      <div>
                        {block.items.map((item, li) => (
                          <div key={li} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                            <input value={item} onChange={e => updateListItem(post.id, bi, li, e.target.value)}
                              style={{ flex: 1, background: '#1a1a1a', border: `1px solid ${C.border}`, borderRadius: 6, padding: '7px 10px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                            <button onClick={() => updateBlock(post.id, bi, { items: block.items.filter((_, j) => j !== li) })}
                              style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 13 }}>✕</button>
                          </div>
                        ))}
                        <Btn small outline onClick={() => updateBlock(post.id, bi, { items: [...block.items, ''] })}>+ Item</Btn>
                      </div>
                    ) : (
                      <textarea value={block.text} onChange={e => updateBlock(post.id, bi, { text: e.target.value })} rows={block.type === 'heading' ? 1 : 3}
                        style={{ width: '100%', background: '#1a1a1a', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 10px', color: block.type === 'heading' ? C.text : '#aaa', fontSize: block.type === 'heading' ? 15 : 13, fontWeight: block.type === 'heading' ? 700 : 400, fontFamily: 'Inter,sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Btn danger small onClick={() => removePost(post.id)} style={{ alignSelf: 'flex-start' }}>Delete Post</Btn>
          </div>
        )}
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── Home Editor ────────────────────────────── */
function HomeEditor() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/home').then(setData); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };
  const save = async () => { setSaving(true); await api('/home', 'PUT', data); setSaving(false); toast_('Home page saved!'); };
  const setH = (key, val) => setData(d => ({ ...d, hero: { ...d.hero, [key]: val } }));
  const setA = (key, val) => setData(d => ({ ...d, about: { ...d.about, [key]: val } }));
  const setC = (key, val) => setData(d => ({ ...d, cta: { ...d.cta, [key]: val } }));

  if (!data) return <Loader />;

  return (
    <div>
      <SectionHead title="Home Page" sub="Edit hero, about section, and CTA" action={
        <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
      } />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Hero */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Hero Section</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>Left Side (Art / Light)</div>
              <Input label="Badge Text" value={data.hero.leftBadge} onChange={e => setH('leftBadge', e.target.value)} />
              <Input label="Title (after 'I'm Nirp,')" value={data.hero.leftTitle} onChange={e => setH('leftTitle', e.target.value)} />
              <Textarea label="Description" value={data.hero.leftDesc} onChange={e => setH('leftDesc', e.target.value)} rows={2} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>Right Side (Photo / Dark)</div>
              <Input label="Badge Text" value={data.hero.rightBadge} onChange={e => setH('rightBadge', e.target.value)} />
              <Input label="Title (after 'I'm Nirp,')" value={data.hero.rightTitle} onChange={e => setH('rightTitle', e.target.value)} />
              <Textarea label="Description" value={data.hero.rightDesc} onChange={e => setH('rightDesc', e.target.value)} rows={2} />
            </div>
          </div>
        </div>

        {/* About section */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>About Section</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Label" value={data.about.label} onChange={e => setA('label', e.target.value)} />
            <Input label="Button Text" value={data.about.buttonText} onChange={e => setA('buttonText', e.target.value)} />
          </div>
          <Textarea label="Heading (use \n for line break)" value={data.about.heading} onChange={e => setA('heading', e.target.value)} rows={2} />
          <Textarea label="Paragraph 1" value={data.about.para1} onChange={e => setA('para1', e.target.value)} rows={3} />
          <Textarea label="Paragraph 2" value={data.about.para2} onChange={e => setA('para2', e.target.value)} rows={3} />
          <div>
            <label style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 10 }}>Feature Cards</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.about.cards.map((card, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '46px 1fr 2fr', gap: 8 }}>
                  <input value={card.icon} onChange={e => setA('cards', data.about.cards.map((c, j) => j === i ? { ...c, icon: e.target.value } : c))}
                    style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px', color: C.text, fontSize: 18, fontFamily: 'Inter,sans-serif', outline: 'none', textAlign: 'center' }} />
                  <input value={card.title} onChange={e => setA('cards', data.about.cards.map((c, j) => j === i ? { ...c, title: e.target.value } : c))}
                    style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                  <input value={card.desc} onChange={e => setA('cards', data.about.cards.map((c, j) => j === i ? { ...c, desc: e.target.value } : c))}
                    style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.muted, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills section */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Skills Section</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Label" value={data.skills.label} onChange={e => setData(d => ({ ...d, skills: { ...d.skills, label: e.target.value } }))} />
            <Input label="Button Text" value={data.skills.buttonText} onChange={e => setData(d => ({ ...d, skills: { ...d.skills, buttonText: e.target.value } }))} />
          </div>
          <Input label="Heading" value={data.skills.heading} onChange={e => setData(d => ({ ...d, skills: { ...d.skills, heading: e.target.value } }))} />
          <Textarea label="Subheading" value={data.skills.subheading} onChange={e => setData(d => ({ ...d, skills: { ...d.skills, subheading: e.target.value } }))} rows={2} />
        </div>

        {/* Experience section */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Experience Section</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Label" value={data.experience.label} onChange={e => setData(d => ({ ...d, experience: { ...d.experience, label: e.target.value } }))} />
            <Input label="Heading" value={data.experience.heading} onChange={e => setData(d => ({ ...d, experience: { ...d.experience, heading: e.target.value } }))} />
          </div>
          <Textarea label="Subheading" value={data.experience.subheading} onChange={e => setData(d => ({ ...d, experience: { ...d.experience, subheading: e.target.value } }))} rows={2} />
        </div>

        {/* Blog section */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Blog Preview Section</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Heading" value={data.blog.heading} onChange={e => setData(d => ({ ...d, blog: { ...d.blog, heading: e.target.value } }))} />
            <Input label="Button Text" value={data.blog.buttonText} onChange={e => setData(d => ({ ...d, blog: { ...d.blog, buttonText: e.target.value } }))} />
          </div>
          <Textarea label="Subheading" value={data.blog.subheading} onChange={e => setData(d => ({ ...d, blog: { ...d.blog, subheading: e.target.value } }))} rows={2} />
          <Input label="Social Proof Number (e.g. 500+)" value={data.blog.socialProof} onChange={e => setData(d => ({ ...d, blog: { ...d.blog, socialProof: e.target.value } }))} />
        </div>

        {/* CTA */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bottom CTA</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Label" value={data.cta.label} onChange={e => setC('label', e.target.value)} />
            <Input label="Heading" value={data.cta.heading} onChange={e => setC('heading', e.target.value)} />
          </div>
          <Textarea label="Body Text" value={data.cta.body} onChange={e => setC('body', e.target.value)} rows={2} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Input label="Primary Button" value={data.cta.primaryButton} onChange={e => setC('primaryButton', e.target.value)} />
            <Input label="Secondary Button" value={data.cta.secondaryButton} onChange={e => setC('secondaryButton', e.target.value)} />
          </div>
        </div>
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── About Editor ───────────────────────────── */
function AboutEditor() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/about').then(setData); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };
  const save = async () => { setSaving(true); await api('/about', 'PUT', data); setSaving(false); toast_('About page saved!'); };
  const set = (key, val) => setData(d => ({ ...d, [key]: val }));

  if (!data) return <Loader />;

  return (
    <div>
      <SectionHead title="About Page" sub="Edit all content on the about page" action={
        <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
      } />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Header */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Header</div>
          <Textarea label="Heading (use \n for line break)" value={data.heading} onChange={e => set('heading', e.target.value)} rows={2} />
          <Textarea label="Subheading" value={data.subheading} onChange={e => set('subheading', e.target.value)} rows={2} />
        </div>

        {/* Bio paragraphs */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bio Paragraphs</div>
            <Btn small outline onClick={() => set('bio', [...data.bio, ''])}>+ Add</Btn>
          </div>
          {data.bio.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 8 }}>
              <textarea value={p} onChange={e => set('bio', data.bio.map((x, j) => j === i ? e.target.value : x))} rows={3}
                style={{ flex: 1, background: '#111', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.text, fontSize: 14, fontFamily: 'Inter,sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              <button onClick={() => set('bio', data.bio.filter((_, j) => j !== i))}
                style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 16, alignSelf: 'flex-start', paddingTop: 10 }}>✕</button>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Stats</div>
            <Btn small outline onClick={() => set('stats', [...data.stats, { val: '', label: '', desc: '' }])}>+ Add</Btn>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.stats.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr auto', gap: 8, alignItems: 'center' }}>
                <input placeholder="5+" value={s.val} onChange={e => set('stats', data.stats.map((x, j) => j === i ? { ...x, val: e.target.value } : x))}
                  style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.red, fontSize: 14, fontWeight: 700, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                <input placeholder="Label" value={s.label} onChange={e => set('stats', data.stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                  style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                <input placeholder="Description" value={s.desc} onChange={e => set('stats', data.stats.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))}
                  style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.muted, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                <button onClick={() => set('stats', data.stats.filter((_, j) => j !== i))}
                  style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 16 }}>✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Values / How I Work</div>
            <Btn small outline onClick={() => set('values', [...data.values, { icon: '⭐', title: '', desc: '' }])}>+ Add</Btn>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.values.map((v, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 2fr auto', gap: 8, alignItems: 'center' }}>
                <input placeholder="🎯" value={v.icon} onChange={e => set('values', data.values.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))}
                  style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px', color: C.text, fontSize: 18, fontFamily: 'Inter,sans-serif', outline: 'none', textAlign: 'center' }} />
                <input placeholder="Title" value={v.title} onChange={e => set('values', data.values.map((x, j) => j === i ? { ...x, title: e.target.value } : x))}
                  style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                <input placeholder="Description" value={v.desc} onChange={e => set('values', data.values.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))}
                  style={{ background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.muted, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                <button onClick={() => set('values', data.values.filter((_, j) => j !== i))}
                  style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 16 }}>✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Bottom CTA</div>
          <Input label="Heading" value={data.ctaHeading} onChange={e => set('ctaHeading', e.target.value)} />
          <Input label="Subtext" value={data.ctaSubtext} onChange={e => set('ctaSubtext', e.target.value)} />
        </div>
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── Services Page Editor ───────────────────── */
function ServicesPageEditor() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/services-page').then(setData); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };
  const save = async () => { setSaving(true); await api('/services-page', 'PUT', data); setSaving(false); toast_('Services page saved!'); };
  const set = (key, val) => setData(d => ({ ...d, [key]: val }));

  if (!data) return <Loader />;

  return (
    <div>
      <SectionHead title="Services Page" sub="Edit the page header and CTA section" action={
        <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
      } />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 680 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Page Header</div>
          <Textarea label="Heading (use \n for line break)" value={data.heading} onChange={e => set('heading', e.target.value)} rows={2} />
          <Textarea label="Subheading" value={data.subheading} onChange={e => set('subheading', e.target.value)} rows={2} />
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Bottom CTA</div>
          <Input label="CTA Heading" value={data.ctaHeading} onChange={e => set('ctaHeading', e.target.value)} />
          <Input label="CTA Subtext" value={data.ctaSubtext} onChange={e => set('ctaSubtext', e.target.value)} />
          <Input label="Button Text" value={data.ctaButton} onChange={e => set('ctaButton', e.target.value)} />
        </div>
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── SEO Editor ─────────────────────────────── */
const SEO_PAGES = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'projects', label: 'Projects' },
  { key: 'services', label: 'Services' },
  { key: 'blog', label: 'Blog' },
];

function SeoEditor() {
  const [data, setData] = useState(null);
  const [active, setActive] = useState('home');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/seo').then(setData); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };
  const save = async () => { setSaving(true); await api('/seo', 'PUT', data); setSaving(false); toast_('SEO saved!'); };
  const set = (page, key, val) => setData(d => ({ ...d, [page]: { ...d[page], [key]: val } }));

  if (!data) return <Loader />;
  const page = data[active] || { title: '', description: '' };

  return (
    <div>
      <SectionHead title="SEO" sub="Edit meta title and description for every page" action={
        <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
      } />
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {SEO_PAGES.map(p => (
            <button key={p.key} onClick={() => setActive(p.key)} style={{
              background: active === p.key ? C.redDim : C.card,
              border: `1px solid ${active === p.key ? C.red : C.border}`,
              borderRadius: 10, padding: '11px 14px', textAlign: 'left',
              cursor: 'pointer', fontFamily: 'Inter,sans-serif',
              fontSize: 13, fontWeight: active === p.key ? 600 : 400,
              color: active === p.key ? '#fff' : C.text,
            }}>{p.label}</button>
          ))}
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {SEO_PAGES.find(p => p.key === active)?.label} Page
          </div>
          <Input label="Meta Title" value={page.title} onChange={e => set(active, 'title', e.target.value)} />
          <div style={{ fontSize: 11, color: C.muted }}>
            {page.title.length}/60 characters {page.title.length > 60 && <span style={{ color: C.danger }}>— too long</span>}
          </div>
          <Textarea label="Meta Description" value={page.description} onChange={e => set(active, 'description', e.target.value)} rows={3} />
          <div style={{ fontSize: 11, color: C.muted }}>
            {page.description.length}/160 characters {page.description.length > 160 && <span style={{ color: C.danger }}>— too long</span>}
          </div>
        </div>
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── Contact Info Editor ────────────────────── */
function ContactInfoEditor() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({});

  useEffect(() => { api('/contact-info').then(setData); }, []);

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };
  const save = async () => { setSaving(true); await api('/contact-info', 'PUT', data); setSaving(false); toast_('Contact info saved!'); };
  const set = (key, val) => setData(d => ({ ...d, [key]: val }));

  if (!data) return <Loader />;

  return (
    <div>
      <SectionHead title="Contact Info" sub="Edit what visitors see on the contact page" action={
        <Btn small onClick={save}>{saving ? 'Saving…' : 'Save Changes'}</Btn>
      } />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ paddingBottom: 16, borderBottom: `1px solid ${C.border}`, marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: C.red, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>SEO Meta Tags</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Input label="Meta Title" value={data.metaTitle || ''} onChange={e => set('metaTitle', e.target.value)} />
              <Textarea label="Meta Description" value={data.metaDescription || ''} onChange={e => set('metaDescription', e.target.value)} rows={2} />
            </div>
          </div>
          <Input label="Your Email" value={data.email} onChange={e => set('email', e.target.value)} />
          <Input label="Location" value={data.location} onChange={e => set('location', e.target.value)} />
          <Input label="Response Time" value={data.responseTime} onChange={e => set('responseTime', e.target.value)} />
          <Input label="Availability Status" value={data.status} onChange={e => set('status', e.target.value)} />
          <Textarea label="Page Heading (use \n for line break)" value={data.heading} onChange={e => set('heading', e.target.value)} rows={2} />
          <Textarea label="Subheading" value={data.subheading} onChange={e => set('subheading', e.target.value)} rows={2} />
        </div>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <label style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Services List</label>
            <Btn small outline onClick={() => set('services', [...data.services, 'New Service'])}>+ Add</Btn>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {data.services.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <input value={s} onChange={e => set('services', data.services.map((x, j) => j === i ? e.target.value : x))}
                  style={{ flex: 1, background: '#111', border: `1px solid ${C.border}`, borderRadius: 6, padding: '8px 12px', color: C.text, fontSize: 13, fontFamily: 'Inter,sans-serif', outline: 'none' }} />
                <button onClick={() => set('services', data.services.filter((_, j) => j !== i))}
                  style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', fontSize: 14 }}>✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toast {...toast} />
    </div>
  );
}

/* ─── Contact Inbox ──────────────────────────── */
function ContactInbox() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState({});

  const toast_ = (msg, type = 'ok') => { setToast({ msg, type }); setTimeout(() => setToast({}), 3000); };

  const load = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    fetch('/api/admin/contacts', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setData(d); if (d.length) setSelected(d[0].id); });
  };

  useEffect(() => { load(); }, []);

  const markRead = async id => {
    const token = localStorage.getItem(TOKEN_KEY);
    await fetch(`/api/admin/contacts/${id}/read`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
    setData(d => d.map(c => c.id === id ? { ...c, read: true } : c));
  };

  const del = async id => {
    const token = localStorage.getItem(TOKEN_KEY);
    await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setData(d => {
      const next = d.filter(c => c.id !== id);
      setSelected(next[0]?.id ?? null);
      return next;
    });
    toast_('Message deleted');
  };

  const selectMsg = msg => {
    setSelected(msg.id);
    if (!msg.read) markRead(msg.id);
  };

  if (!data) return <Loader />;
  const msg = data.find(c => c.id === selected);
  const unread = data.filter(c => !c.read).length;

  return (
    <div>
      <SectionHead title="Contact" sub={`${data.length} message${data.length !== 1 ? 's' : ''}${unread ? ` · ${unread} unread` : ''}`} />
      {data.length === 0 ? (
        <div style={{ textAlign: 'center', color: C.muted, padding: '80px 0', fontSize: 14 }}>No messages yet</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {data.map(c => (
              <button key={c.id} onClick={() => selectMsg(c)} style={{
                background: selected === c.id ? C.redDim : C.card,
                border: `1px solid ${selected === c.id ? C.red : C.border}`,
                borderRadius: 10, padding: '12px 14px', textAlign: 'left',
                cursor: 'pointer', fontFamily: 'Inter,sans-serif',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  {!c.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.red, flexShrink: 0, display: 'inline-block' }} />}
                  <span style={{ fontSize: 13, fontWeight: c.read ? 400 : 700, color: selected === c.id ? '#fff' : C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                </div>
                <div style={{ fontSize: 11, color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.email}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{new Date(c.date).toLocaleDateString()}</div>
              </button>
            ))}
          </div>
          {msg && (
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ color: C.text, fontSize: 18, fontWeight: 700 }}>{msg.name}</div>
                  <a href={`mailto:${msg.email}`} style={{ color: C.red, fontSize: 13, textDecoration: 'none' }}>{msg.email}</a>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{new Date(msg.date).toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href={`mailto:${msg.email}`} style={{ textDecoration: 'none' }}>
                    <Btn small>Reply via Email</Btn>
                  </a>
                  <Btn small danger onClick={() => del(msg.id)}>Delete</Btn>
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, color: '#ccc', fontSize: 15, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {msg.message}
              </div>
            </div>
          )}
        </div>
      )}
      <Toast {...toast} />
    </div>
  );
}

/* ─── Loader ─────────────────────────────────── */
const Loader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
    <div style={{ color: C.muted, fontSize: 14 }}>Loading…</div>
  </div>
);

/* ─── Main AdminPage ─────────────────────────── */
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem(TOKEN_KEY));
  const [section, setSection] = useState('skills');

  const logout = () => { localStorage.removeItem(TOKEN_KEY); setLoggedIn(false); };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const editors = { home: HomeEditor, about: AboutEditor, 'services-page': ServicesPageEditor, skills: SkillsEditor, experience: ExperienceEditor, projects: ProjectsEditor, services: ServicesEditor, blog: BlogEditor, seo: SeoEditor, 'contact-info': ContactInfoEditor, contact: ContactInbox };
  const Editor = editors[section];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: 'Inter,sans-serif' }}>
      <Sidebar active={section} setActive={setSection} onLogout={logout} />
      <main style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }}>
        <Editor />
      </main>
    </div>
  );
}
