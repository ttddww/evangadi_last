require("dotenv").config();
const express = require("express");
const cors =  require('cors');
const port = 5600;


const app = express();
app.use(cors());

//middleware to parse json data from request body
app.use(express.json());


//dbConnection
const dbConnection = require("./db/dbConfig");

//user routes middleware file
const usersRoutes = require("./routes/usersRoutes");

//question routes middleware file
const questionsRoutes = require("./routes/questionsRoutes");

//answer routes middleware file
const answersRoutes = require("./routes/answersRoutes");


//user routes middleware
app.use("/api/users", usersRoutes);

//questions routes middleware 
app.use("/api/question", questionsRoutes);

//answers routes middleware 
app.use("/api/answer", answersRoutes);


async function start() {
  try {
    await dbConnection.execute("select 'test'");
    app.listen(port);
    console.log("database connection established");
    console.log(`listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
