const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '../data');
const read = file => JSON.parse(fs.readFileSync(path.join(DATA, file), 'utf8'));

router.get('/projects', (req, res) => {
  const projects = read('projects.json');
  const { category } = req.query;
  if (category && category !== 'All') {
    return res.json(projects.filter(p => p.category === category));
  }
  res.json(projects);
});

router.get('/skills', (_req, res) => res.json(read('skills.json')));

router.get('/experience', (_req, res) => res.json(read('experience.json')));

router.get('/blog', (req, res) => {
  const { category } = req.query;
  const posts = read('blog.json').map(({ content, ...rest }) => rest);
  if (category && category !== 'All') {
    return res.json(posts.filter(p => p.category === category));
  }
  res.json(posts);
});

router.get('/blog/:slug', (req, res) => {
  const post = read('blog.json').find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

router.get('/services', (_req, res) => res.json(read('services.json')));

router.get('/contact-info', (_req, res) => res.json(read('contact-info.json')));

router.get('/seo', (_req, res) => res.json(read('seo.json')));

router.get('/about', (_req, res) => res.json(read('about.json')));

router.get('/services-page', (_req, res) => res.json(read('services-page.json')));

router.get('/home', (_req, res) => res.json(read('home.json')));

module.exports = router;
