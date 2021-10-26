module.exports = (sequelize, DataTypes) => {
    const Follower = sequelize.define(
        "Follower",
        {},
        {
            underscored: true,
        }
    );

    Follower.associate = models => {
        Follower.belongsTo(models.User, {
            as: "user",
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
        Follower.belongsTo(models.User, {
            as: "followera",
            foreignKey: {
                name: "followerId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
        });
    };

    return Follower;
};
