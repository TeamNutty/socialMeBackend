module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Chat.associate = models => {
    Chat.belongsTo(models.User, {
      as: 'sender',
      foreignKey: {
        name: 'senderId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Chat.belongsTo(models.User, {
      as: 'receiver',
      foreignKey: {
        name: 'receiverId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Chat;
};
