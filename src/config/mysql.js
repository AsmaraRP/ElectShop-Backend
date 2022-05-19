const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const connection = mysql.createConnection({
  // host: process.env.MYSQL_HOST,
  // user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST_LOCAL,
  user: process.env.MYSQL_USER_LOCAL,
  password: process.env.MYSQL_PASSWORD_LOCAL,
  database: process.env.MYSQL_DATABASE_LOCAL,
});
connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("You are now connected db mysql ...");
});
module.exports = connection;
