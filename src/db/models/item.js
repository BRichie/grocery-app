'use strict';
module.exports = (sequelize, DataTypes) => {
  
  var Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    purchased: DataTypes.BOOLEAN
  }, {});
  
  
  Item.associate = function(models) {


  };
  return Item;
};