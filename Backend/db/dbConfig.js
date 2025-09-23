const mysql2 = require("mysql2");

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // make sure this is the MySQL protocol port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // temporary, safer: use CA certificate later
  },
});

// Export the connection with promises
module.exports = db.promise();
