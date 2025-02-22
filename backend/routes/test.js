const express = require("express");
const { connectDB } = require("../config/db");
const User = require("../models/User");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await connectDB();
    const user = {
      username: "amdjed",
      email: "amdjed@gmail.com",
      password: "amdjed2004",
      phonenumber: "0793798095",
    };
    User.insertOne(user);
    return res.status(200).json({ message: "success message " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error message ", error: error });
  }
});
module.exports = router;
