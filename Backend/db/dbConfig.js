const mysql2 = require("mysql2");

// Create a connection pool
const dbConnection = mysql2.createPool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
});


// Export the connection with promises
module.exports = dbConnection.promise();

