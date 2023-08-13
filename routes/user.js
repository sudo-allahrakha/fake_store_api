const express = require("express");
const Users = require("../models/user");
const mongodb = require("mongodb");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET /users
router.get("/", async (req, res) => {
  try {
    const users = await Users.find({});
    res.json(users);
  } catch (error) {
    console.log("Error: ", error);
  }
});

//create user/
router.post("/register", async (req, res) => {
   console.log(req.body);
  try {
    const { name, password, email } = req.body;

    const hasedPassword = await bcrypt.hash(password, 10); //  10 is salt round
    console.log(`hased password: ${hasedPassword}`);
    const newUser = new Users({
      name: name,
      email: email,
      password: hasedPassword,
    });
    newUser
      .save()
      .then(() => {
        res.send({ message: "User is created" });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "failed to create user", error: error });
      });
  } catch (error) {
    console.log(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    // check either email is valid or not
    // Server side data validation
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (matchedPassword) {
      const token = jwt.sign({ userId: user._id }, "jwt_token");
      let { email, name } = user;

      res.json({ name, email, token });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).json({ message: "failed to login", error:error });
  }
});

module.exports = router;
