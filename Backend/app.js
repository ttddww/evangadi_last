require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// dbConnection
const dbConnection = require("./db/dbConfig");

// Routes
const usersRoutes = require("./routes/usersRoutes");
const questionsRoutes = require("./routes/questionsRoutes");
const answersRoutes = require("./routes/answersRoutes");

app.use("/api/users", usersRoutes);
app.use("/api/question", questionsRoutes);
app.use("/api/answer", answersRoutes);

// Test endpoint
app.get("/testing", (req, res) => {
  res.json({ message: "Hello from Evangadi Backend!" });
});

// Start server
async function start() {
  try {
    await dbConnection.execute("select 'test'");
    console.log("✅ Database connection established");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start:", error); // log full error
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
