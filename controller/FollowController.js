const { Follower, Post, User } = require("../models");

// follower
exports.addFollow = async (req, res, next) => {
    try {
        const { id } = req.params;
        const follower = await Follower.create({
            userId: req.user.id,
            followerId: id,
        });
        res.status(200).send({ follower });
    } catch (err) {
        next(err);
    }
};

// unfollow
exports.unfollow = async (req, res, next) => {
    try {
        const { id } = req.params;
        const unfollower = await Follower.destroy({
            where: {
                followerId: id,
                userId: req.user.id,
            },
        });
        res.status(200).send({ unfollower });
    } catch (err) {
        next(err);
    }
};

// getallfollow
exports.getAllFollow = async (req, res, next) => {
    try {
        const allFollow = await Follower.findAll({
            where: {
                userId: req.user.id,
            },
            include: [
                {
                    model: User,
                    as: "followera",
                    require: true,
                    include: [
                        {
                            model: Post,
                            require: true,
                        },
                    ],
                },
            ],
        });
        res.status(200).send({ allFollow });
    } catch (err) {
        next(err);
    }
};
