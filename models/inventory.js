'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventory.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  Inventory.init({
    itemName: DataTypes.STRING,
    itemUrl: DataTypes.TEXT,
    purchasePrice: DataTypes.INTEGER,
    expiredDate: DataTypes.DATE,
    entryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};