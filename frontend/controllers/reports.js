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
      // console.log(data1);
      const q2 = "SELECT user_name FROM employee where employee_id = ?";

      db.query(q2, [data1[0].supervisor_id], (err, data2) => {
        if (err) return res.status(500).json(err);
        if (data2[0].user_name === userInfo.user_name) {
          const q3 =
            "UPDATE `Employee`  SET `NIC`=?,`Full_Name`=?,`Gender`=?,`user_name`=?,`supervisor_id`=?,`job_title_id`=?,`department_id`=?,`employment_status`=?,`birth_day`=?,`marital_status`=? where Employee_id=?";
          const values = [
            req.body.NIC,
            req.body.Full_Name,
            req.body.Gender,
            req.body.user_name,
            req.body.supervisor_id,
            req.body.job_title_id,
            req.body.department_id,
            req.body.employment_status,
            req.body.birth_day,
            req.body.marital_status,
            req.params.id,
          ];
          db.query(q3, [...values], (err, data3) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated!");
          });
        } else
          return res
            .status(403)
            .json("You are not authorized to view this page!");
      });
    });
  });
};

export const editLeaves = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT permission_level_id FROM user WHERE user_name = ?";
    console.log(userInfo.user_name);

    db.query(q, [userInfo.user_name], (err, data) => {
      console.log(data);
      if (err) return res.status(500).json(err);
      const q1 =
        "SELECT absence_related_access  FROM permission_level WHERE permission_level_id = ?";
      db.query(q1, [data[0].permission_level_id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data[0].absence_related_access === 1) {
          // return res.json([req.body]);
          const q2 =
            "UPDATE `pay_grades` SET `number_of_annual_leaves` = ?, `number_of_casual_leaves` = ?, `number_of_maternity_leaves` = ?, `number_of_no_pay_leaves` = ? WHERE (`paygrade_id` = ?);";
          db.query(
            q2,
            [
              req.body.number_of_annual_leaves,
              req.body.number_of_casual_leaves,
              req.body.number_of_maternity_leaves,
              req.body.number_of_no_pay_leaves,
              req.body.paygrade_id,
            ],
            (err, data2) => {
              if (err) return res.status(500).json(err);
              return res.json("Leaves have been updated!");
            }
          );
        }
      });
    });
  });
};
