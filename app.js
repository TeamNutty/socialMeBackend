const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
// import Route ...
const authRoute = require("./route/authRoute");
const UserRoute = require("./route/UserRoute");
const PostRoute = require("./route/PostRoute");
const OmiseRoute = require("./route/OmiseRoute");
const FollowRoute = require("./route/FollowRoute");
const CommentRoute = require("./route/CommentRoute");
const likeRoute = require("./route/likeRoute");
const { socketConnection } = require("./utils/socket");
//database
// sequelize.sync({ force: true });
// sequelize.sync({ alter: true });
// sequelize.sync();
// omise

// read req.body
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route
app.use("/comment", CommentRoute);
app.use("/check-payment", OmiseRoute);
app.use("/post", PostRoute);
app.use("/user", UserRoute);
app.use("/follow", FollowRoute);
app.use("/like", likeRoute);
app.use("/", authRoute);

/// Err

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err });
});

socketConnection(server);

// Port

let port = process.env.PORT || 8888;

server.listen(port, () => console.log(`Server is Running on ${port}`));
