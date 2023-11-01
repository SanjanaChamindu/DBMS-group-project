import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const permission_level_id = userInfo.permission_level_id;

      if (permission_level_id > '8193600002'){

        const q = "SELECT * FROM user WHERE user_name = ?";

        db.query(q, [req.body.user_name], (err, data) => {
          // return res.json(data);
          if (err) return res.status(500).json(err);
          if (data.length) return res.status(409).json("User already exists!");
      
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(req.body.password, salt);
      
          const q =
            "INSERT INTO user(`user_name`, `password`, `permission_level_id`) VALUES (?)";
          const values = [req.body.user_name, hash, req.body.permission_level_id];
      
          db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created!");
          });
        });
      } else{
          return res.status(403).json("You are not authorized to view this data!");
      }
});
}

export const allEmp = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      const permission_level_id = userInfo.permission_level_id;
      if (permission_level_id >= '8193600003'){
        let job_titles;
        db.query("SELECT * FROM job_title", (err, data) => {
          if (err) return res.status(500).json(err);
          job_titles = data;
        })
        const q = "SELECT * FROM employee";
        db.query(q, (err, data) => {
          if (err) return res.status(500).json(err);
          data.forEach((item) => {
            item.job_title_name= job_titles.find((j) => j.job_title_id === item.job_title_id).job_title_name;
          })
          return res.json(data);
        });
      }
});
}


export const registerEmployee = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const permission_level_id = userInfo.permission_level_id;

      if (permission_level_id > '8193600003'){
        const q1 = "SELECT attribute_name FROM custum_attributes"
        db.query(q1, (err, data1) => {
            if (err) return res.status(500).json(err);

            // const attribute_names = data1.map((item) => item.attribute_name);
            // const attribute_values = attribute_names.map((name) => req.body[name]);
            const values = [
              req.body.employee_id, //
              req.body.nic, //
              req.body.full_name, //
              req.body.gender, //
              req.body.supervisor_id, //
              req.body.job_title_id, // name
              req.body.department_id, // name
              // req.body.employment_status,
              // req.body.birth_day,
              // req.body.marital_status,
              // ...attribute_values
            ];
            // const q = "INSERT INTO employee (`Employee_id`, `NIC`, `Full_Name`, `Gender`, `supervisor_id`, `job_title_id`, `department_id`, `employment_status`, `birth_day`, `marital_status`, `"+ attribute_names.join("`, `") +"`) VALUES (?)";
            const q = "INSERT INTO employee (`Employee_id`, `NIC`, `Full_Name`, `Gender`, `supervisor_id`, `job_title_id`, `department_id`) VALUES (?)";
            db.query(q, [values], (err, result) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json("Employee has been created!");
            });
            
        });

      } else{
          return res.status(403).json("You are not authorized to view this data!");
      }
});
}


export const registerUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const permission_level_id = userInfo.permission_level_id;

      if (permission_level_id > '8193600002'){
        const q = "SELECT * FROM user WHERE user_name = ?";

        db.query(q, [req.body.user_name], (err, data) => {
          // return res.json(data);
          if (err) return res.status(500).json(err);
          if (data.length) return res.status(409).json("User already exists!");
      
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync("password", salt);
          const user_name = req.body.user_name;
          const q =
            "INSERT INTO user(`user_name`, `password`, `permission_level_id`) VALUES (?)";
          const values = [user_name, hash, req.body.permission_level_id];
      
          db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            const q2 = `UPDATE employee SET user_name = "${user_name}" WHERE Employee_id = '${req.params.id}'`
            db.query(q2, [user_name, req.params.id], (err, data) => {
              if (err) return res.status(500).json(err);

              const q3 = "SELECT * FROM employee WHERE employee_id = ?"
              db.query(q3, req.params.id, (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
              });

              // return res.status(200).json("User has been created!");
            });
          });
        });
      } else{
          return res.status(403).json("You are not authorized to view this data!");
      }
});
}

export const registerEmployee2 = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const permission_level_id = userInfo.permission_level_id;

      if (permission_level_id > '8193600002'){
        const q1 = "SELECT attribute_name FROM custum_attributes"
        db.query(q1, (err, data1) => {
            if (err) return res.status(500).json(err);
            
            const values = [
              req.body.employee_id, //
              req.body.nic, //
              req.body.full_name, //
              req.body.supervisor_id, //
              req.body.job_title_id, // name
              req.body.department_id, // name
            ];
            const q = "INSERT INTO employee (Employee_id, NIC, Full_Name, supervisor_id, job_title_id, department_id) VALUES (?)";
            db.query(q, [values], (err, result) => {
              if (err) return res.status(500).json(err);
              const q2 = "INSERT INTO contact_details (employee_id) VALUES (?)";
              db.query(q2, [req.body.employee_id], (err, result) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("Employee has been created!");
              })
            });
            
        });

      } else{
          return res.status(403).json("You are not authorized to view this data!");
      }
});
}

export const deleteEmployee = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const permission_level_id = userInfo.permission_level_id;

    if (permission_level_id > '8193600003'){
      const employee_id = req.params.id;
      if (employee_id === '8193600004') return res.status(403).json("You are not authorized to delete this data!");
      const q = "SELECT user_name FROM employee WHERE employee_id = ?"
      db.query(q, employee_id, (err, data) => {
        if (err) return res.status(500).json(err);
        const user_name = data[0].user_name;
        const q = "DELETE FROM user WHERE user_name = ?"
        db.query(q, user_name, (err, result) => {
          if (err) return res.status(500).json(err);
          const q = "DELETE FROM employee WHERE employee_id = ?"
          db.query(q, employee_id, (err, result) => {
            if (err) return res.status(500).json(err);
            
            const q1 = "DELETE FROM contact_details WHERE employee_id = ?"
            db.query(q1, employee_id, (err, result) => {
              if (err) return res.status(500).json(err);
              return res.json({ message: "Employee and user account deleted successfully" });
            });
          });
        });
      });
    } else{
      return res.status(403).json("You are not authorized to delete this data!");
    }
  });
}