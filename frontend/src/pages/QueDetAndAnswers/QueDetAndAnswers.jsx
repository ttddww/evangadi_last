import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./QueDetAndAnswers.module.css";
import axios from "axios";
import AllAnswers from "../../components/AllAnswers/AllAnswers";
import { AppState } from "./../../App";
import ForwardIcon from "@mui/icons-material/Forward";


function QueDetAndAnswers() {
  const { qId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState("");
  const {user} = useContext(AppState);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5600/api/question/${qId}`
        );
        console.log(res.data);
        
        setQuestion(res.data);
      } catch (err) {
        setError("Failed to load question.");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [qId]);


 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
    await axios.post(
      "http://localhost:5600/api/answer/create-answer",
      {
        userId: user.userId,
        questionId: qId,
        answer,
      },
      {
        headers: { Authorization: `Bearer ` + token },
      }
    );

     alert("Answer posted successfully");
     setAnswer("");
     // Refresh answers list
     const res = await axios.get(
       `http://localhost:5600/api/answer/answers/${qId}`
     );
     setAnswers(res.data);
   } catch (err) {
     console.error("Failed to submit answer:", err);
   }
 };


  return (
    <div className={classes.container}>
      <div className={classes.question}>
        <h2>Question</h2>
        <p className={classes.main}><ForwardIcon color="primary" fontSize="large" />{question?.title}</p>
        <p>{question?.description}</p>
      </div>

      {/* Community Answers */}
      <div className={classes.answers}>
        <h2>Answer From The Community</h2>
        <div className={classes.answer}>
          <AllAnswers />
        </div>
      </div>
      <div className={classes.ask}>
        <h2>Answer The Top Question</h2>
        <Link to="/ask">Go to Ask Question page</Link>
      </div>
      {/* Answer Form */}
      <div className={classes.answer_form}>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your Answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <button type="submit">Post Your Answer</button>
        </form>
      </div>
    </div>
  );
}

export default QueDetAndAnswers;

