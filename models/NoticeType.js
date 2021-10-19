module.exports = (sequelize, DataTypes) => {
  const NoticeType = sequelize.define(
    'NoticeType',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscore: true,
    }
  );
  return NoticeType;
};
