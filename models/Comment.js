module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
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
    Comment.belongsTo(models.User, {
      as: 'commentUser',
      foreignKey: {
        name: 'commentUserId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Comment;
};
