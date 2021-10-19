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
        name: 'orderItemPostId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return OrderItemPost;
};
