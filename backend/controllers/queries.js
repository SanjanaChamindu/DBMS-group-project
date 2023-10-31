import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const departmentQuery = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const permission_level_id = userInfo.permission_level_id;

        if (permission_level_id > '8193600002'){
            const q1 = "SELECT department_id FROM department where department_name = ?"
            db.query(q1, req.body.department_name, (err, data1) => {
                if (err) return res.status(500).json(err);
                const department_id = data1[0].department_id;
                
                const q2 = "SELECT employee_id, Full_name, job_title_id, employment_status FROM employee where department_id = ?"
                db.query(q2, department_id, (err, data2) => {
                    if (err) return res.status(500).json(err);
                    const q3 = "SELECT job_title_name FROM job_title where job_title_id = ?"
                    db.query(q3, data2[0].job_title_id, (err, data3) => {
                        if (err) return res.status(500).json(err);
                        data2[0].job_title_id = data3[0].job_title_name;
                        return res.json(data2);
                    });
                });
            });
        }
    });
};


export const departmentLeaves = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const permission_level_id = userInfo.permission_level_id;
  
      if (permission_level_id > "8193600002") {
        const q1 = "SELECT department_id FROM department where department_name = ?";
        db.query(q1, req.body.department_name, (err, data1) => {
          if (err) return res.status(500).json(err);
          const department_id = data1[0].department_id;
  
          const q2 = "SELECT employee_id FROM employee where department_id = ?";
          db.query(q2, department_id, (err, data2) => {
            if (err) return res.status(500).json(err);
            const employee_ids = data2.map((item) => item.employee_id);
            let leaves = 0;
            employee_ids.forEach((employee_id, index) => {
              const q3 =
                "SELECT * FROM leave_record where employee_id = ?";
              db.query(q3, employee_id, (err, data3) => {
                if (err) return res.status(500).json(err);
                leaves +=
                  data3[0].Annual_leaves_taken +
                  data3[0].Casual_leaves_taken +
                  data3[0].Maternity_leaves_taken +
                  data3[0].No_pay_leaves_taken;
                if (index === employee_ids.length - 1) {
                  return res.json(leaves);
                }
              });
            });
          });
        });
      }
    });
  };


export const manyAttributes = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const permission_level_id = userInfo.permission_level_id;
        if (permission_level_id > '8193600002'){
            const department_name = req.body.department_name;
            const job_title_name = req.body.job_title_name;
            const gender = req.body.Gender;
            const q1 = "SELECT department_id FROM department where department_name = ?"
            db.query(q1, department_name, (err, data1) => {
                if (err) return res.status(500).json(err);
                const department_id = data1[0].department_id;
                
                const q2 = "SELECT job_title_id FROM job_title where job_title_name = ?"
                db.query(q2, job_title_name, (err, data2) => {
                    const job_title_id = data2[0].job_title_id;
                    
                    const q3 = "SELECT employee_id, Full_name, employment_status FROM employee where department_id = ? AND job_title_id = ? AND Gender = ?"
                    db.query(q3, [department_id, job_title_id, gender] , (err, data3) => {
                        if (err) return res.status(500).json(err);
                        return res.json(data3);
                    });
                });
            });
        } else{
            return res.status(403).json("You are not authorized to view this data!");
        }
    });
};


export const customAttribute = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const permission_level_id = userInfo.permission_level_id;

        if (permission_level_id > '8193600002'){
            const q = "SELECT employee_id, Full_name, job_title_id, employment_status FROM employee WHERE " + req.body.attribute_name + " = ?"
            db.query(q, req.body.attribute_value, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.json(data);
            });
        }
    });
};


// For the frontend

export const returnCustomAttribute = (req, res) => {
    q = "SELECT attribute_name FROM custum_attributes"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}

export const returnDistinctValues = (req, res) => {
    const attribute_name = req.params.attribute_name;
    const q = "SELECT DISTINCT " + attribute_name + " FROM employee"
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
}

export const leavesByDateRange = (req, res) => {
    // return res.json(req.body)
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const permission_level_id = userInfo.permission_level_id;
        if (permission_level_id >= '8193600004') {
            const q1 = `SELECT l.leave_request_id, l.employee_id, l.date, l.leave_type, e.full_name, e.department_id FROM leave_request l LEFT JOIN employee e ON e.employee_id = l.employee_id WHERE date BETWEEN ? AND ? AND e.department_id = ? `;
            db.query(q1, [req.body.start_date, req.body.end_date, req.body.department_id], (err, data1) => {
                if (err) return res.status(500).json(err);
                return res.json(data1);
            });
        }
    });
}

export const getEmpReport = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const permission_level_id = userInfo.permission_level_id;
        if (permission_level_id >= '8193600004') {
            const q1 = `SELECT * FROM employee where job_title_id = ? AND department_id = ? AND gender = ?`;
            db.query(q1, [req.body.job_title_id, req.body.department_id, req.body.gender], (err, data1) => {
                if (err) return res.status(500).json(err);
                return res.json(data1);
            });
        }});
}
