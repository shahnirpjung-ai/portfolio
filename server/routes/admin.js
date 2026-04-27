const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const DATA = path.join(__dirname, '../data');
const UPLOADS = path.join(__dirname, '../../client/public/uploads');
const ALLOWED = ['skills', 'experience', 'projects', 'services', 'blog', 'contact-info', 'seo', 'about', 'services-page', 'home'];
const CONTACTS = path.join(DATA, 'contacts.json');
const PASSWORD = process.env.ADMIN_PASSWORD || 'nirp2024';
const TOKEN    = process.env.ADMIN_TOKEN    || 'nirp-admin-secret-99';

if (!fs.existsSync(UPLOADS)) fs.mkdirSync(UPLOADS, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const auth = (req, res, next) => {
  const t = (req.headers.authorization || '').replace('Bearer ', '');
  if (t !== TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

router.post('/login', (req, res) => {
  if (req.body.password !== PASSWORD)
    return res.status(401).json({ error: 'Wrong password' });
  res.json({ token: TOKEN });
});

router.post('/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// contacts routes must be before /:type to avoid being swallowed by the param
router.get('/contacts', auth, (_req, res) => {
  res.json(JSON.parse(fs.readFileSync(CONTACTS, 'utf8')));
});

router.patch('/contacts/:id/read', auth, (req, res) => {
  const contacts = JSON.parse(fs.readFileSync(CONTACTS, 'utf8'));
  const updated = contacts.map(c => c.id === Number(req.params.id) ? { ...c, read: true } : c);
  fs.writeFileSync(CONTACTS, JSON.stringify(updated, null, 2));
  res.json({ success: true });
});

router.delete('/contacts/:id', auth, (req, res) => {
  const contacts = JSON.parse(fs.readFileSync(CONTACTS, 'utf8'));
  fs.writeFileSync(CONTACTS, JSON.stringify(contacts.filter(c => c.id !== Number(req.params.id)), null, 2));
  res.json({ success: true });
});

router.get('/:type', auth, (req, res) => {
  const { type } = req.params;
  if (!ALLOWED.includes(type)) return res.status(400).json({ error: 'Invalid' });
  res.json(JSON.parse(fs.readFileSync(path.join(DATA, `${type}.json`), 'utf8')));
});

router.put('/:type', auth, (req, res) => {
  const { type } = req.params;
  if (!ALLOWED.includes(type)) return res.status(400).json({ error: 'Invalid' });
  fs.writeFileSync(path.join(DATA, `${type}.json`), JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

module.exports = router;
