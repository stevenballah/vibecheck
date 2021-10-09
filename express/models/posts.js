const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define("posts", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        post_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        // Removes the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    });

    posts.associate = models => {
        posts.belongsTo(models.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        });
    }

    // posts.associate = models => {
    //     posts.belongsToMany(models.replies, {
    //         through: "post_replies",
    //         as: "postid",
    //         foreignKey: "post_id"
    //     });
    // };

    return posts;
}