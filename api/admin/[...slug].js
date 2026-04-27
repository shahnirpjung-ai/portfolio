const supabase = require('../../lib/supabase');

const TOKEN   = process.env.ADMIN_TOKEN || 'nirp-admin-secret-99';
const ALLOWED = ['skills','experience','projects','services','blog','contact-info','seo','about','services-page','home'];

const isAuthed = (req) => {
  const t = (req.headers.authorization || '').replace('Bearer ', '');
  return t === TOKEN;
};

const parseBody = (req) =>
  typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!isAuthed(req)) return res.status(401).json({ error: 'Unauthorized' });

  const raw  = req.query.slug;
  const slug = Array.isArray(raw) ? raw : (raw ? [raw] : []);
  const [route, id, action] = slug;

  // POST /api/admin/upload — not supported on Vercel (no writable filesystem)
  if (route === 'upload') {
    return res.status(501).json({ error: 'Image uploads are only supported in local dev.' });
  }

  // GET /api/admin/contacts
  // PATCH /api/admin/contacts/:id/read
  // DELETE /api/admin/contacts/:id
  if (route === 'contacts') {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) return res.status(500).json({ error: error.message });
      return res.json(data.map(c => ({ ...c, date: c.created_at })));
    }

    if (req.method === 'PATCH' && id && action === 'read') {
      const { error } = await supabase.from('contacts').update({ read: true }).eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      return res.json({ success: true });
    }

    if (req.method === 'DELETE' && id) {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      return res.json({ success: true });
    }

    return res.status(405).end();
  }

  // GET /api/admin/:type  (load data for editing)
  // PUT /api/admin/:type  (save data)
  if (ALLOWED.includes(route)) {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('portfolio_data')
        .select('data')
        .eq('key', route)
        .single();
      if (error) return res.status(500).json({ error: error.message });
      return res.json(data.data);
    }

    if (req.method === 'PUT') {
      const body  = parseBody(req);
      const { error } = await supabase
        .from('portfolio_data')
        .upsert({ key: route, data: body, updated_at: new Date().toISOString() }, { onConflict: 'key' });
      if (error) return res.status(500).json({ error: error.message });
      return res.json({ success: true });
    }
  }

  res.status(404).json({ error: 'Not found' });
};
