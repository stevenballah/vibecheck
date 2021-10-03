const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const replies = sequelize.define("replies", {
        reply_id: {
            type: DataTypes.STRING,
            allowNull: false,
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
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        // Removes the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    });


    return replies;
}