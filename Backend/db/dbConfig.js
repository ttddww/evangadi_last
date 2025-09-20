const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST, // e.g. Render DB hostname
  user: process.env.DB_USER, // your DB username
  password: process.env.DB_PASS, // your DB password
  database: process.env.DB_NAME, // your DB name
  connectionLimit: 10,
});

module.exports = dbConnection.promise();
