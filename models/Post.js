module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      picturePost: {
        type: DataTypes.JSON,
      },
      videoPost: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('private', 'public'),
        defaultValue: 'public',
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 60,
      },
    },
    {
      underscored: true,
      paranoid: true,
    }
  );

  Post.associate = models => {
    Post.hasMany(models.OrderItemPost, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Post.hasMany(models.Comment, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Post.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Post.hasMany(models.Like, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Post;
};
