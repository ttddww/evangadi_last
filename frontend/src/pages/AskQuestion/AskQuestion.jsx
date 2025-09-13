import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ correct
import classes from "./AskQuestion.module.css";
import { AppState } from "../../App";

function AskQuestion() {
  const { qId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [message, setMessage] = useState("");
  const {user} = useContext(AppState);

  // ✅ Decode userId safely from JWT
  const token = localStorage.getItem("token");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5600/api/question/askQuestion",
        {
          userId: user.userId,
          title,
          description,
          tag,
        },
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );

      setMessage("Question posted successfully!");
      setTitle("");
      setDescription("");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Failed to post question.");
    }
  };

  return (
    <section className={classes.container}>
      {/* Instruction Section */}
      <div className={classes.instructions}>
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <div className={classes.formBox}>
        <h3>Ask a public question</h3>
        <Link to={`/`}>Go to Questions(Home) page</Link>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Question Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Title..."
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
          <button type="submit">Post Your Question</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </section>
  );
}

export default AskQuestion;

// import React, { useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import classes from "./AskQuestion.module.css";
// import axios from "axios";

// function AskQuestion() {
//   const { qId } = useParams();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:5600/api/question/askQuestion",
//         {
//           userId: localStorage.getItem("userId"),
//           questionId: qId,
//           title,
//           description,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // if using JWT
//           },
//         }
//       );

//       setMessage("Question posted successfully!");
//       setTitle("");
//       setDescription("");
//       console.log(res.data);
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to post question.");
//     }
//   };

//   return (
//     <section className={classes.container}>
//       {/* Instruction Section */}
//       <div className={classes.instructions}>
//         <h2>Steps to write a good question</h2>
//         <ul>
//           <li>Summarize your problem in a one-line title.</li>
//           <li>Describe your problem in more detail.</li>
//           <li>Describe what you tried and what you expected to happen.</li>
//           <li>Review your question and post it to the site.</li>
//         </ul>
//       </div>

//       {/* Form Section */}
//       <div className={classes.formBox}>
//         <h3>Ask a public question</h3>
//         <Link to={`/question/${qId}`}>Go to Question page</Link>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title..."
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//           <textarea
//             placeholder="Question Description..."
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//           <button type="submit">Post Your Question</button>
//         </form>

//         {message && <p>{message}</p>}
//       </div>
//     </section>
//   );
// }

// export default AskQuestion;
