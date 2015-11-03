'use strict';

var bcrypt = require('bcrypt');
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: {
      type: DataTypes.TEXT,
      validate: {
        len: [4,12]
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
      },
      authenticate: function(email, password, callback) {
          this.find({where: {email: email}}).then(function(user){
            if (user) {
              bcrypt.compare(password, user.password, 
                function(err, result){
                  if (err){
                    callback(err);
                  } else {
                    callback(null, result ? user : false);
                  }
                });
            } else {
              callback(null, false);
            }
          }).catch(callback);
        }
      },
      hooks: {
        beforeCreate: function(user, options, callback) {
          if (!user.password) return callback(null, user);
          bcrypt.hash(user.password, 10, function(err, hash){
            if (err) return callback(err);
            user.password = hash;
            callback(null, user);
          });
        }
      }
  });
  return user;
};