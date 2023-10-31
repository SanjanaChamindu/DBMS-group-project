import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const login = (req, res) => {
  const q = "SELECT * FROM user WHERE user_name = ?";
  db.query(q, [req.body.user_name], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong password or username");
    // return res.json("Login success!");

    const q2 = "SELECT employee_id FROM employee WHERE user_name = ?";
    db.query(q2, [req.body.user_name], (err, data2) => {
      if (err) return res.status(500).json(err);

      // Creating tokens
      const token = jwt.sign(
        {
          user_name: data[0].user_name,
          permission_level_id: data[0].permission_level_id,
          employee_id: data2[0].employee_id,
        },
        "secretkey"
      );
      const { password, ...others } = data[0]; // Sending other attributes of the user except the password
      res
        .cookie("access_token", token, { httpOnly: true }) // httpOnly is used to prevent client-side script from accessing the cookie
        .status(200)
        .json(data[0]);
    });
  });
};

export const register = (req, res) => {
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
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

export const changePassword = (req, res) => {
  // {
  //   "current_password" : "password",
  //   "new_password" : "test"
  // }
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    
    const q = "SELECT password FROM user WHERE user_name = ?";
    db.query(q, [userInfo.user_name], (err, data) => {
      if (err) return res.status(500).json(err);
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.current_password, salt);
      const isPasswordCorrect  = bcrypt.compareSync(req.body.current_password, data[0].password)
      const newPassword = bcrypt.hashSync(req.body.new_password, salt);
      if (isPasswordCorrect) {
        db.query(
          "UPDATE user SET password = ? WHERE user_name = ?",
          [newPassword, userInfo.user_name],
          (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Password has been changed!");
          }
        );
      } else {
        return res.status(400).json("Wrong password!");
      }
    });
  });
};
