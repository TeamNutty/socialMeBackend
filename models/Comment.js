module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      message: {
        type: DataTypes.STRING(2000),
      },
      pictureComment: {
        type: DataTypes.STRING,
      },
    },

    {
      underscored: true,
    }
  );

  Comment.associate = models => {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  Comment.associate = models => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        as: 'CommentUserId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Comment;
};
