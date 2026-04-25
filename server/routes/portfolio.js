const express = require('express');
const router = express.Router();
const projects = require('../data/projects.json');
const skills = require('../data/skills.json');
const experience = require('../data/experience.json');
const blog = require('../data/blog.json');
const services = require('../data/services.json');

router.get('/projects', (req, res) => {
  const { category } = req.query;
  if (category && category !== 'All') {
    return res.json(projects.filter(p => p.category === category));
  }
  res.json(projects);
});

router.get('/skills', (req, res) => res.json(skills));

router.get('/experience', (req, res) => res.json(experience));

router.get('/blog', (req, res) => {
  const { category } = req.query;
  const posts = blog.map(({ content, ...rest }) => rest); // strip content from list
  if (category && category !== 'All') {
    return res.json(posts.filter(p => p.category === category));
  }
  res.json(posts);
});

router.get('/blog/:slug', (req, res) => {
  const post = blog.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

router.get('/services', (_req, res) => res.json(services));

module.exports = router;
