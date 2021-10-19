module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define(
    'Follwer',

    {
      underscored: true,
    }
  );

  Follower.associate = models => {
    Follower.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Follower.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        as: 'FollowerId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Follower;
};
