const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Log to console (replace with nodemailer/DB in production)
  console.log(`\n--- New Contact Message ---`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  console.log(`---------------------------\n`);

  res.json({ success: true, message: 'Message received! I\'ll get back to you soon.' });
});

module.exports = router;
