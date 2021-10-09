const db = require(".");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        account_created: {
            type: DataTypes.DATE,
            allowNull: false
        },
        profile_pic_url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // Removes the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    });

    //USERS CAN HAVE 1 TO MANY POSTS
    //https://sequelize.org/master/manual/assocs.html
    users.associate = models => {
        users.hasMany(models.posts, {
            foreignKey: "user_id"
        });
    };

    return users;
};