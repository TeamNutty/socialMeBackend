module.exports = (sequelize, DataTypes) => {
  const OrderItemPost = sequelize.define(
    'OrderItemPost',

    {
      underscored: true,
    }
  );

  OrderItemPost.associate = models => {
    OrderItemPost.belongsTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    OrderItemPost.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return OrderItemPost;
};
