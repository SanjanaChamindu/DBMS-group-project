import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getReport = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT employee_id, nic, full_name, gender, user_name, supervisor_id, job_title_id, department_id, employment_status, birth_day, marital_status FROM employee where user_name = ?";

    db.query(q, [userInfo.user_name], (err, data) => {
      if (err) return res.status(500).json(err);
      
      const q1 = "SELECT attribute_name FROM custum_attributes"
            db.query(q1, (err, data1) => {
                if (err) return res.status(500).json(err);
                
                const attribute_names = data1.map((item) => item.attribute_name);
                const q2 = "SELECT " + attribute_names.join(", ") + " FROM employee where user_name = ?";
                db.query(q2, [userInfo.user_name], (err, data2) => {
                    if (err) return res.status(500).json(err);

                    const q3 = "SELECT * FROM contact_details where employee_id = ?"
                    db.query(q3, [data[0].employee_id], (err, data3) => {
                        if (err) return res.status(500).json(err);

                        const q4 = "SELECT job_title_name FROM job_title where job_title_id = ?"
                        db.query(q4, [data[0].job_title_id], (err, data4) => {
                            if (err) return res.status(500).json(err);
                            data[0].job_title_id = data4[0].job_title_name;

                            const q5 = "SELECT department_name FROM department where department_id = ?"
                            db.query(q5, [data[0].department_id], (err, data5) => {
                                if (err) return res.status(500).json(err);
                                data[0].department_id = data5[0].department_name;
                                const reportData = {data, data2, data3}
                                return res.json(reportData);
                            });
                        });
                    });
                });
            });
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
    const permission_level_id = userInfo.permission_level_id;
    const employee_id = userInfo.employee_id;
    const sub_employee_id = req.params.id;

    const q1 = "SELECT supervisor_id FROM employee where employee_id = ?";
    db.query(q1, [sub_employee_id], (err, data1) => {
      if (err) return res.status(500).json(err);
      if (data1[0].supervisor_id === employee_id || permission_level_id == '8193600004') {
        
        const q2 = "SELECT attribute_name FROM custum_attributes"
        db.query(q2, (err, data2) => {
            if (err) return res.status(500).json(err);
            const attribute_names = data2.map((item) => item.attribute_name);
            const q3 = "UPDATE `Employee`  SET `NIC`=?,`Full_Name`=?,`Gender`=?,`user_name`=?,`supervisor_id`=?,`job_title_id`=?,`department_id`=?,`employment_status`=?,`birth_day`=?,`marital_status`=? where Employee_id=?";
            const values1 = [
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
            req.params.id
            ]
            db.query(q3, [...values1], (err, data3) => {
              if (err) return res.status(500).json(err);
              const q3 = `UPDATE Employee SET ${attribute_names.map((name) => `${name}=?`).join(",")} WHERE Employee_id=?`
              const attribute_values = attribute_names.map((name) => req.body[name]);
              db.query(q3, [...attribute_values, req.params.id], (err, data4) => {
                if (err) return res.status(500).json(err);
                const q4 = "UPDATE `contact_details` SET `primary_phone_number`=?,`secondary_phone_number`=?,`email_address`=?, `primary_emergency_contact`=?, `primary_emergency_contact`=?, `Address`=?, `Mothers_name`=?, `Fathers_name`=?, `Health_conditions`=? WHERE employee_id = ?";
                const values2 = [
                  req.body.Primary_phone_number,
                  req.body.Secondary_phone_number,
                  req.body.Email_address,
                  req.body.Primary_emergency_contact,
                  req.body.Secondary_emergency_contact,
                  req.body.Address,
                  req.body.Mothers_name,
                  req.body.Fathers_name,
                  req.body.Health_conditions,
                  req.params.id,
                ];
                db.query(q4, [...values2], (err, data5) => {
                  if (err) return res.status(500).json(err);
                  return res.json("Employee has been updated!");
                });
              });
            });

        });

      } else
        return res
          .status(403)
          .json("You are not authorized to view this page!");
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

export const getDepts = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    db.query("SELECT * FROM department", (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    })
  });
};