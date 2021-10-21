module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      message: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      noticeType: {
        type: DataTypes.ENUM('comment', 'follwer', 'buyPost', 'chat'),
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
      as: 'userNotice',
      foreignKey: {
        name: 'userNoticeId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Notification.belongsTo(models.User, {
      as: 'interactedUser',
      foreignKey: {
        name: 'interactedUserId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Notification;
};
