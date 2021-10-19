module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define(
    'Follwer',
    {},
    {
      underscored: true,
    }
  );

  Follower.associate = models => {
    Follower.belongTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Follower.belongTo(models.User, {
      foreignKey: {
        name: 'userId',
        as: 'follower',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Follower;
};
