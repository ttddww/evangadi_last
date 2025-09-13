import React, { useContext } from "react";
import AllQuestions from "./../../components/AllQuestions/AllQuestions";
import { Link } from "react-router-dom";
import classes from "./home.module.css";
import { AppState } from "../../App";
function Home() {
  const { user } = useContext(AppState);
  return (
    <section className={classes.container}>
      <div>
        <Link to="/ask">Ask Question</Link>
        <h3>Welcome: {user?.userName}</h3>
      </div>
      <h2>Questions</h2>
      <AllQuestions />
    </section>
  );
}

export default Home;
