const express = require("express");
const app = express();
const colors = require("colors");
const connectDB = require("../config/db");
const userRoute = require('../config/router/userRoute')
const productRoute = require('../config/router/productRoute')
const orderRoute = require('../config/router/orderRoute')
require("dotenv").config();

// const usersRoute = require("./routes/usersRoute");
// const userBillRoute = require("./routes/userBillRoute");
var cors = require("cors");
app.use(cors());


// connect to database
connectDB();

//env
const port = process.env.PORT;

//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user/", userRoute);
app.use("/api/product/", productRoute);
app.use("/api/order/", orderRoute);

app.listen(port, () => {
  console.log(`Server running on PORT ${port}...🚀`);
});
