module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
        "Notification",
        {
            message: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            noticeType: {
                type: DataTypes.ENUM("Comment", "Follow", "Buypost", "Like"),
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            underscored: true,
        }
    );

    Notification.associate = models => {
        Notification.belongsTo(models.User, {
            as: "userNotice",
            foreignKey: {
                name: "userNoticeId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });

        Notification.belongsTo(models.Post, {
            as: "post",
            foreignKey: {
                name: "postId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });

        Notification.belongsTo(models.User, {
            as: "interactedUser",
            foreignKey: {
                name: "interactedUserId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    };
    return Notification;
};
