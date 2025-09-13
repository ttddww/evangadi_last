const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

const askQuestion = async (req, res) => {
  // req.body.questionId = uuidv4();

  const { userId, title, description, tag } = req.body;

  if (!userId || !title || !description || !tag) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const questionId = uuidv4();
  // const question = { userid, questionId, title, description, tag };
  try {
    await dbConnection.query(
      "INSERT INTO questions(userId, questionId, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [userId, questionId, title, description, tag]
    );
    return res.status(201).json({ msg: "Question asked successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again" });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const [questions] = await dbConnection.query(
      "SELECT q.title, q.description, q.questionId, u.userName FROM questions q JOIN users u ON q.userId = u.userId ORDER BY q.id DESC"
    );
    return res.status(200).json({ questions });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const getAllQuestionsWithUser = async (req, res) => {
  const {userId }= req.params;
  try {
    const [questions] = await dbConnection.query(
      "SELECT * FROM questions WHERE userId = ? ORDER BY id DESC",
      [userId]
    );
    return res.status(200).json({ questions });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
const singleQuestion = async (req, res) => {
  const { questionId } = req.params;

  try {
    const [question] = await dbConnection.query(
      "SELECT q.title, q.description FROM questions q WHERE q.questionId = ?",
      [questionId]
    );
    if (question.length === 0) {
      return res
        .status(404)
        .json({ message: "No question found with that ID" });
    } else {
      return res.status(200).json(question[0]);
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again" });
  }
};

module.exports = { askQuestion, getAllQuestions, getAllQuestionsWithUser, singleQuestion };
