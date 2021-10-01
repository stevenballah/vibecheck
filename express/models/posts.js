const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define("posts", {
        post_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        datetime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dislikes: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        // Removes the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    });
    return posts;
}