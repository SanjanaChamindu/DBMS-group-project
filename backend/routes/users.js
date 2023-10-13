import express from "express";

const user = express.Router();

user.get("/", (req, res) => {
  res.json("This is a user");
});

export default user;
