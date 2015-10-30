'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
      type: DataTypes.TEXT,
      validate: {
        len: [5,12]
      }
    },
    email: {
      type: DataTypes.TEXT,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.TEXT,
    accuracy: DataTypes.INTEGER,
    average_time: DataTypes.INTEGER,
    total_ids: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};