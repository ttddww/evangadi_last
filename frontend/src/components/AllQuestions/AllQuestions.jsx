import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classes from "./AllQuestions.module.css";
import axiosBase from "../../assets/axiosConfig";

function AllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axiosBase.get("/question/all-questions");
        // Adjust depending on backend response: res.data OR res.data.questions
        console.log(res.data);
        
        setQuestions(res.data.questions || res.data);
      } catch (err) {
        setError("Failed to load questions.");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={classes.all}>
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        questions.map((q) => (
          <Link
            to={`/question/${q.questionId}`}
            key={q.questionId}
            className={classes.container}
          >
            <div>
              <AccountCircleIcon style={{ fontSize: "50px", color: "#777" }} />
              <span>{q.userName || "Anonymous"}</span>
            </div>
            <h3>{q.title}</h3>
            <ArrowForwardIosIcon />
          </Link>
        ))
      )}
    </div>
  );
}

export default AllQuestions;
