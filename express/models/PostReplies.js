const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const PostReplies = sequelize.define("post_replies", {
        post_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: db.posts,
                key: "post_id"
            }
        },
        reply_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
                model: db.replies,
                key: "reply_id"
            }
        },
    }, {
        // Removes the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    });

    return PostReplies;
}