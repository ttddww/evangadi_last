import React, { useEffect, useState } from "react";
import classes from "./AllAnswers.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axiosBase from "../../assets/axiosConfig";

function AllAnswers() {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axiosBase.get("/answer/all-Answers");
        // Adjust depending on backend response: res.data OR res.data.questions
        setAnswers(res.data.answers || res.data);
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
      {answers.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        answers.map((a) => (
          <div key={a.answerId} className={classes.container}>
            <div>
              <AccountCircleIcon style={{ fontSize: "50px", color: "#777" }} />
              <span>{a.userName}</span>
            </div>
            <p>{a.answer}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AllAnswers;
