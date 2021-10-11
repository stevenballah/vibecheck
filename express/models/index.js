'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


//--- ONE TO MANY --- || One user has many posts and a post can belong to one user //
// db.users.hasMany(db.posts, {
//   foreignKey: {
//     name: "user_id",
//     allowNull: false
//   }
// });
db.posts.belongsTo(db.users, {
  foreignKey: {
    name: "user_id"
  }
});

//THE FOREIGN KEY POINTS TO THE {PK} IN THE POSTS MODEL
//THE TARGET KEY POINTS TO THE UNIQUE KEY IN THE POSTS MODEL
db.posts.hasMany(db.replies, {
  foreignKey: "post_id",
  sourceKey: "post_id"
});

db.replies.belongsTo(db.users, {
  foreignKey: {
    name: "user_id"
  }
});

//--- ONE TO MANY --- || A user has many replies and many replies can belong to one user //
// db.users.hasMany(db.replies, {
//   foreignKey: "user_id"
// });
// db.replies.belongsTo(db.users, {
//   foreignKey: {
//     name: "user_id",
//     allowNull: false
//   }
// });



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
