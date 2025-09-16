import React, { useContext } from "react";
import AllQuestions from "./../../components/AllQuestions/AllQuestions";
import { Link } from "react-router-dom";
import classes from "./home.module.css";
import { AppState } from "../../App";
function Home({title}) {
  const { user } = useContext(AppState);
  console.log(user);
  
  return (
    <section className={classes.container}>
      <div>
        <Link to="/ask">Ask Question</Link>
        <h3>Welcome: {user?.userName}</h3>
      </div>
      <div className="put">
        <h1 style={{ color: "black" }}>Questions</h1>
        <input
          type="text"
          placeholder="Search Questions"
          value={title}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <h2>Questions</h2>
      <AllQuestions />
    </section>
  );
}

export default Home;
