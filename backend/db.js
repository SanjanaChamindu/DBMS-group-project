import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "6105",
  // password: "process.env.DB_KEY",
  database: "hrms",
});
