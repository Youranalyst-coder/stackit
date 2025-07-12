// routes/index.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Homepage: Show all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.render('pages/home', { questions });
  } catch (err) {
    console.error("❌ Error fetching questions:", err); // debug log
    res.status(500).send('Error loading questions');
  }
});

// Ask a question form
router.get('/ask', (req, res) => {
  res.render('pages/ask');
});

// Handle question submission
router.post('/ask', async (req, res) => {
  const { title, description } = req.body;
  try {
    await Question.create({ title, description });
    res.redirect('/');
  } catch (err) {
    console.error("❌ Error saving question:", err); // optional debug
    res.status(500).send('Failed to submit question');
  }
});

module.exports = router;

