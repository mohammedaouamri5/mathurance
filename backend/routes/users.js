const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { connectDB } = require("../config/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await connectDB();
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/me", async (req, res) => {
  try {
    await connectDB();
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token", req.headers.authorization);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is required" });
    }

    // Verify the token and extract the user information
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      const userId = decoded._id;
      console.log("decoded", decoded);
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
    });
  } catch (error) {
    console.error("Error in /me route:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
