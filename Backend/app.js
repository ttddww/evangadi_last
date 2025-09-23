require("dotenv").config();
const express = require("express");
const cors =  require('cors');

const PORT = process.env.PORT || 3000;  // ✅ use Render's PORT

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

// Test endpoint
app.get("/testing", (req, res) => {
  res.json({ 
    message: "Hello from Evangadi Backend!",
  });
});
async function start() {
  try {
    await dbConnection.execute("select 'test'");
    app.listen(PORT, "0.0.0.0", () => {
      console.log("✅ Database connection established");
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start:", error.message);
  }
}

// Global error logging (to see hidden crashes)
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

start();
