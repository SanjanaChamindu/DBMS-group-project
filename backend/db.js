import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2^2+0.2ismyGPA",
  // password: "process.env.DB_KEY",
  database: "hrms",
});
