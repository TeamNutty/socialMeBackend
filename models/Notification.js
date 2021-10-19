module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      message: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      noticeType: {
        type: DataTypes.ENUM('comment', 'follwer', 'buyPost'),
        allowNull: false,
      },
    },
    {
      underscored: false,
    }
  );

  Notification.associate = models => {
    Notification.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Notification.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        as: 'interactedUserId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Notification;
};
