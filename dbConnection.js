const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.APP_DATABASE_HOSTNAME,
  user: process.env.APP_DATABASE_USER,
  password: process.env.APP_DATABASE_PASSWORD,
  database: process.env.APP_DATABASE_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log(" Database connection " + connection);
  }
});

module.exports = pool;
