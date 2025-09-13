const express = require("express");
// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// import question controller
const {
  askQuestion,
  singleQuestion,
  getAllQuestions,
  getAllQuestionsWithUser,
} = require("../controllers/questionsControllers");

const authMiddleware = require("../middleware/authMiddleware");
// authentication middleware
// router.get("/all-questions", authMiddleware, questions);

//question routes
router.post("/askQuestion", authMiddleware, askQuestion);
router.get("/all-questions", getAllQuestions);
router.get("/questions/:userId", getAllQuestionsWithUser);
router.get("/:questionId", singleQuestion);

module.exports = router;
