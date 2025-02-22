const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { connectDB } = require("../config/db");
const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, _id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

router.post("/register", async (req, res) => {
  try {
    const { name, familyName, email, phoneNumber, password } = req.body;
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      familyName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing up", error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    await connectDB();
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    console.log(user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;
