'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stock.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
      Stock.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
  }
  Stock.init({
    total: DataTypes.INTEGER,
    expiredDate: DataTypes.DATE,
    entryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};