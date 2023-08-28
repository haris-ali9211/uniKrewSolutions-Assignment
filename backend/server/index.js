const express = require("express");
const app = express();
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("../config/db");
require("dotenv").config();
const port = process.env.PORT;

// const usersRoute = require("./routes/usersRoute");
// const userBillRoute = require("./routes/userBillRoute");
var cors = require("cors");
app.use(cors());

//env
dotenv.config();

// connect to database
connectDB();

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/api/user/", usersRoute);
// app.use("/api/bill/", userBillRoute);

app.listen(port, () => {
  console.log(`Server running on PORT ${port}...🚀`);
});
