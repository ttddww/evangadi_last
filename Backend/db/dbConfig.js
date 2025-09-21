const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

connection.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return; // prevent crash
  }
  console.log("DB connected!");
});

module.exports = dbConnection.promise();

// const mysql2 = require("mysql2");

// const dbConnection = mysql2.createPool({
//   host: process.env.DB_HOST, // e.g. Render DB hostname
//   user: process.env.DB_USER, // your DB username
//   password: process.env.DB_PASS, // your DB password
//   database: process.env.DB_NAME, // your DB name
//   connectionLimit: 10,
// });

// module.exports = dbConnection.promise();
