const mysql = require('mysql');

var env = process.env.NODE_ENV || "development";
var isDev = env === "development" ? true : false;
const host = isDev ? 'localhost' : 'mysql';
const user = 'root';
const password = isDev ? 'example' :  process.env.MYSQL_PASSWORD || 'example';
const database = 'kasyOnline';
const port = 3306

const mc = mysql.createConnection({
  host,
  user,
  password,
  database,
  port
});

mc.connect();

mc.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) throw error;
  const mySqlStatus = (results[0].solution === 2) ? 'OK' : 'ERROR';
  console.log(`MYSQL: ${mySqlStatus}`);
});

module.exports = mc;