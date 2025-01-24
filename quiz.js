const express = require('express');
const Quiz = require('../models/Quiz');
const router = express.Router();

// Create a new quiz
router.post('/', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).send(quizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Correct DELETE route to accept the quiz ID from the URL parameters
router.delete("/:id", async (req, res) => {
  try {
    const quizId = req.params.id; // Capture the ID from the URL
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    // Check if a quiz was found and deleted
    if (!deletedQuiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ error: "Error deleting quiz", details: error.message }); // Send detailed error response
  }
});



module.exports = router;
