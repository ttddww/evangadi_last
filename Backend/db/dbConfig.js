const mysql = require("mysql2");

// Create a connection pool
const dbConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the connection with promises
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
