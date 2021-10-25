const { Post } = require("../models");
const { User } = require("../models");

exports.getAllMyPost = async (req, res, next) => {
    try {
        const myPostList = await Post.findAll({
            where: {
                userId: req.user.id,
            },
            include: [
                {
                    model: User,
                    attributes: ["firstName", "lastName", "profilePicture"],
                    require: true,
                },
            ],
        });
        return res.status(200).json({ myPostList });
    } catch (err) {
        next(err);
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const { userId, message, status } = req.body;
        if (req.file) {
            result = await uploadPromise(req.file.path);
            fs.unlinkSync(req.file.path);
        }
        const newPost = await Post.create({
            userId,
            message,
            status,
        });
        res.status(200).json({ message: "create post success" });
    } catch (error) {
        res.json({ message: error });
    }
};
