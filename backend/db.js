import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qqqqq",
  // password: "process.env.DB_KEY",
  database: "hrms",
});
