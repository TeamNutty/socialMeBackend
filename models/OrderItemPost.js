module.exports = (sequelize, DataTypes) => {
  const OrderItemPost = sequelize.define(
    'OrderItemPost',
    {
      price: DataTypes.DECIMAL(15, 2),
      defaultValue: 30,
    },
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
