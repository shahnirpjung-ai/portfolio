const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../data/contacts.json');

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: 'All fields are required.' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ error: 'Invalid email address.' });

  const contacts = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  contacts.unshift({
    id: Date.now(),
    name, email, message,
    date: new Date().toISOString(),
    read: false,
  });
  fs.writeFileSync(FILE, JSON.stringify(contacts, null, 2));

  res.json({ success: true, message: "Message received! I'll get back to you soon." });
});

module.exports = router;
