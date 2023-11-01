import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerEmployee = (req, res) => {
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
            const q = "INSERT INTO employee (`Employee_id`, `NIC`, `Full_Name`, `supervisor_id`, `job_title_id`, `department_id`) VALUES (?)";
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

export const registerEmployee1 = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const permission_level_id = userInfo.permission_level_id;
    const sub_employee_id = req.params.id;

    const q1 = "SELECT supervisor_id FROM employee where employee_id = ?";
    db.query(q1, [sub_employee_id], (err, data1) => {
      if (err) return res.status(500).json(err);
      if (permission_level_id >= '8193600003') {
        
        const q2 = "SELECT attribute_name FROM custum_attributes"
        db.query(q2, (err, data2) => {
            if (err) return res.status(500).json(err);
            const attribute_names = data2.map((item) => item.attribute_name);
            const q3 = "UPDATE `Employee`  SET `NIC`=?,`Full_Name`=?,`Gender`=?,`user_name`=?,`supervisor_id`=?,`job_title_id`=?,`department_id`=?,`employment_status`=?,`birth_day`=?,`marital_status`=? where Employee_id=?";
            const values1 = [
            req.body.data[0].nic,
            req.body.data[0].full_name,
            req.body.data[0].gender,
            req.body.data[0].user_name,
            req.body.data[0].supervisor_id,
            req.body.data[0].job_title_id,
            req.body.data[0].department_id,
            req.body.data[0].employment_status,
            req.body.data[0].birth_day,
            req.body.data[0].marital_status,
            req.params.id
            ]
            db.query(q3, [...values1], (err, data3) => {
              if (err) return res.status(500).json(err);
              const q3 = `UPDATE Employee SET ${attribute_names.map((name) => `${name}=?`).join(",")} WHERE Employee_id=?`
              const attribute_values = attribute_names.map((name) => req.body.data2[0][name]);
              db.query(q3, [...attribute_values, req.params.id], (err, data4) => {
                if (err) return res.status(500).json(err);
                const q4 = "UPDATE `contact_details` SET `primary_phone_number`=?,`secondary_phone_number`=?,`email_address`=?, `primary_emergency_contact`=?, `primary_emergency_contact`=?, `Address`=?, `Mothers_name`=?, `Fathers_name`=?, `Health_conditions`=? WHERE employee_id = ?";
                const values2 = [
                  req.body.data3[0].primary_phone_number,
                  req.body.data3[0].secondary_phone_number,
                  req.body.data3[0].email_address,
                  req.body.data3[0].primary_emergency_contact,
                  req.body.data3[0].secondary_emergency_contact,
                  req.body.data3[0].address,
                  req.body.data3[0].mothers_name,
                  req.body.data3[0].fathers_name,
                  req.body.data3[0].health_conditions,
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



export const deleteEmployee = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const permission_level_id = userInfo.permission_level_id;

    if (permission_level_id > '8193600003'){
      const employee_id = req.params.id;
      if (employee_id === '8193600003') return res.status(403).json("You are not authorized to delete this data!");
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
            return res.json({ message: "Employee and user account deleted successfully" });
          });
        });
      });
    } else{
      return res.status(403).json("You are not authorized to delete this data!");
    }
  });
}