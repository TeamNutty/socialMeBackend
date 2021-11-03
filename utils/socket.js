const { Notification, User } = require("../models");
const { Op, where } = require("sequelize");
const socket = require("socket.io");

exports.socketConnection = server => {
  const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const users = [];

  //when user connects
  io.on("connection", socket => {
    //first thing is to connect to chat room
    // socket.on("hello", msg => console.log(msg));
    try {
      socket.on("notification", async msg => {
        // console.log(msg);
        await Notification.create({
          noticeType: msg.noticeType,
          userNoticeId: msg.userNoticeId,
          postId: msg.postId,
          interactedUserId: msg.interactedUserId,
        });
        // console.log(newNoti);
        const newNoti = await Notification.findAll({
          include: [
            {
              model: User,
              as: "userNotice",
              attributes: ["firstName", "lastName", "profilePicture"],
              require: true,
            },
          ],
        });
        io.emit("shownoti", newNoti);
      });

      socket.on("fetchNoti", async msg => {
        const fetchNewNoti = await Notification.findAll({
          include: [
            {
              model: User,
              as: "userNotice",
              attributes: ["firstName", "lastName", "profilePicture"],
              require: true,
            },
          ],
        });
        socket.emit("shownoti", fetchNewNoti);
      });
      socket.on("clearnoti", msg => {
        msg.forEach(async item => {
          const editStatusNoti = await Notification.update(
            {
              status: true,
            },
            {
              where: {
                id: item.id,
              },
            }
          );
        });
      });
    } catch (err) {
      console.log(err);
    }
  });
};
