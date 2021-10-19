module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      message: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },
      picturePost: {
        type: DataTypes.STRING,
      },
      videoPost: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('private', 'public'),
        defaultValue: 'public',
      },
    },
    {
      underscored: true,
    }
  );

  Post.associate = models => {
    Post.hasMany(models.OrderItemPost, {
      foreignKey: {
        name: 'orderItemPostId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  Post.associate = models => {
    Post.hasMany(models.Comment, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Post;
};
