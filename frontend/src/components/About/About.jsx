import React from "react";
import classes from "./about.module.css";

function About() {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div>
          <p className={classes.brand}>About</p>
          <h3>Evangadi Networks Q&A</h3>
        </div>
        <p>
          Evangadi Networks is a platform designed to bring people together
          through collaboration and shared knowledge. Our mission is to provide
          a space where individuals can ask questions, share insights, and learn
          from each other in a supportive community.
        </p>
        <p>
          Whether you are a student seeking help, a professional sharing your
          expertise, or someone looking to grow through networking, Evangadi
          makes it possible to connect with others who share your interests and
          goals.
        </p>
        <p>
          Join us and be part of a network that values curiosity, learning, and
          the power of working together. With Evangadi Networks Q&A, no question
          is too small and every contribution makes a difference.
        </p>
        <button className={classes.btn}>How it Works</button>
      </div>
    </div>
  );
}

export default About;
