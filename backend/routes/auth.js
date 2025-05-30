import { Router } from "express";
import User from "../models/User.js";
import sign from "jsonwebtoken";
const router = Router();

// Register a new user
router.post("/register", async (req, res) => {
  const user = req.body; //sent in request
  if (
    !user.fname ||
    !user.lname ||
    !user.username ||
    !user.email ||
    !user.password
  ) {
    return res.status(400).json({
      success: false,
      error: "Please fill out all required fields.",
    });
  }
  try {
    const newUser = User.build(user);
    try {
      await newUser.save();
      return res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error("Error while creating a User: ", error.message);
      return res
        .status(400)
        .json({ success: false, error: "User already exixts" });
    }
  } catch (error) {
    console.error("Error while creating a User: ", error.message);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
});

//Login user and generate JWT token
router.post("/login", async (req, res) => {
  const loginInfo = req.body;
  if (!(loginInfo.username || loginInfo.email) || !loginInfo.password) {
    return res.status(400).json({
      success: false,
      error: "Please fill out all required fields.",
    });
  }
  var whereStatement = {};
  if (loginInfo.username) whereStatement.username = loginInfo.username;
  if (loginInfo.email) whereStatement.email = loginInfo.email;
  try {
    const user = await User.findOne({ where: whereStatement });
    if (!user)
      return res.status(404).json({ suzzess: false, error: "User not found" });

    const isMatch = await user.validatePassword(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ suzzess: false, error: "Invalid credentials" });

    const token = sign({ userId: user.ID }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ suzzess: false, error: "Server error" });
  }
});

export default router;
