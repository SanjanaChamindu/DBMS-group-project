import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getReport = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM employee where user_name = ?";
    console.log(userInfo.user_name);

    db.query(q, [userInfo.user_name], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });
};

export const getSub = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q1 = "SELECT employee_id FROM employee where user_name = ?";

    console.log(userInfo.user_name);

    db.query(q1, [userInfo.user_name], (err, data1) => {
      console.log("Hello");
      if (err) return res.status(500).json(err);

      const q2 =
        "SELECT employee_id, Full_name, job_title_id FROM employee where supervisor_id = ?";

      db.query(q2, [data1[0].employee_id], (err, data2) => {
        if (err) return res.status(500).json(err);
        return res.json(data2);
      });
    });
  });
};

export const subDetails = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q1 = "SELECT supervisor_id FROM employee where employee_id = ?";

    db.query(q1, [req.params.id], (err, data1) => {
      console.log("Hello");
      if (err) return res.status(500).json(err);

      const q2 = "SELECT user_name FROM employee where employee_id = ?";

      db.query(q2, [data1[0].supervisor_id], (err, data2) => {
        if (err) return res.status(500).json(err);
        if (data2[0].user_name === userInfo.user_name) {
          const q3 = "SELECT * FROM employee where Employee_id = ?";
          // return res.json(data2);
          db.query(q3, [req.params.id], (err, data3) => {
            if (err) return res.status(500).json(err);
            return res.json(data3);
          });
        } else
          return res
            .status(403)
            .json("You are not authorized to view this page!");
      });
    });
  });
};

export const editEmp = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q1 = "SELECT supervisor_id FROM employee where employee_id = ?";

    db.query(q1, [req.params.id], (err, data1) => {
      console.log("Hello");
      if (err) return res.status(500).json(err);

      const q2 = "SELECT user_name FROM employee where employee_id = ?";

      db.query(q2, [data1[0].supervisor_id], (err, data2) => {
        if (err) return res.status(500).json(err);
        if (data2[0].user_name === userInfo.user_name) {
          const q3 = "SELECT * FROM employee where Employee_id = ?";
          // return res.json(data2);
          db.query(q3, [req.params.id], (err, data3) => {
            if (err) return res.status(500).json(err);
            return res.json(data3);
          });
        } else
          return res
            .status(403)
            .json("You are not authorized to view this page!");
      });
    });
  });
};
