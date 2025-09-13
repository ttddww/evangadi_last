const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// POST /answers
async function createAnswer(req, res) {
  const { answer, userId, questionId } = req.body;

  try {
    const [result] = await dbConnection.query(
      "INSERT INTO answers (userId, questionId, answer) VALUES (?, ?, ?)",
      [userId, questionId, answer]
    );
    return res.status(StatusCodes.CREATED).json({
      msg: "Answer created successfully",
      answerId: result.insertId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong, please try again later",
    });
  }
}

// GET /answers/:questionId
async function getAnswersByQuestionId(req, res) {
  const { qId } = req.params;

  try {
    const [answers] = await dbConnection.query(
      `SELECT * FROM answers WHERE questionId = ? 
       ORDER BY answerId ASC`,
      [qId]
    );
    return res.status(StatusCodes.OK).json(answers);
  } catch (err) {
    console.error(err.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to retrieve answers from database" });
  }
}

// GET /answers
async function allAnswers(req, res) {
  try {
    const [answers] = await dbConnection.query(
      `SELECT a.answerId, a.answer, u.userName 
FROM answers a 
JOIN users u ON a.userId = u.userId 
ORDER BY a.answerId DESC`
    );
    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
}

module.exports = { createAnswer, allAnswers, getAnswersByQuestionId };
