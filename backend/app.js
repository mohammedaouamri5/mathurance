require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const testRoute = require("./routes/test");
const app = express();
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3003",
      "http://localhost:3004",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use("/test", testRoute);
app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.get("/", (req, res) => {
  res.send("Express Server is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
