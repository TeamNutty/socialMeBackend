module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      message: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
    },
    {
      underscored: false,
    }
  );

  Notification.associate = models => {
    Notification.belongTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Notification.belongTo(models.Comment, {
      foreignKey: {
        name: 'commentId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Notification.belongTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Notification.belongTo(models.Follower, {
      foreignKey: {
        name: 'followerId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Notification.belongTo(models.NoticeType, {
      foreignKey: {
        name: 'noticeTypeId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Notification;
};
