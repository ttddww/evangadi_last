const express = require("express");
const router = express.Router();
const {
  allAnswers,
  createAnswer,
  getAnswersByQuestionId,
} = require("../controllers/answersControllers");
const authMiddleware = require("../middleware/authMiddleware");
// Route to create a new answer for a question
router.post("/create-answer", authMiddleware, createAnswer);

// Route to get all the answers for a specific question by its id
router.get("/answers/:qId", getAnswersByQuestionId);

router.get("/all-Answers", allAnswers);

module.exports = router;
