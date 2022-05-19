const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST_LOCAL,
  user: process.env.MYSQL_USER_LOCAL,
  password: process.env.MYSQL_PASSWORD_LOCAL,
  database: process.env.MYSQL_DATABASE_LOCAL,
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  // eslint-disable-next-line no-console
  console.log("You're now connected db mysql ...");
});

module.exports = connection;
