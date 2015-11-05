'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    song_name: DataTypes.TEXT,
    artist_name: DataTypes.TEXT,
    preview_link: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    itunes_link: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.favorite.belongsTo(models.user);
        // associations can be defined here
      }
    }
  });
  return favorite;
};