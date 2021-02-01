const mysql2 = require("mysql2");
// const mysql = require("mysql");

const connection = mysql2.createConnection({
  host: "localhost",
  user: "name",
  password: "password",
  database: "pvdb",
  port: "3306",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected!!!");
  }
});

module.exports = connection;
