const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");
require("dotenv").config();
// import Route ...
const authRoute = require("./route/authRoute");
const UserRoute = require("./route/UserRoute");
const PostRoute = require("./route/PostRoute");
//database
// sequelize.sync();

// read req.body
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route

app.use("/post", PostRoute);
app.use("/user", UserRoute);
app.use("/", authRoute);

/// Err

app.use((err, req, res, next) => {
    res.status(400).json({ message: err });
});

// Port

let port = process.env.PORT || 8888;

app.listen(port, () => console.log(`Server is Running on ${port}`));
