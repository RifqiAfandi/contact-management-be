'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transactions.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Transactions.belongsToMany(models.Product, {
        foreignKey: 'productId',
        as: 'products'   
      });
    }
  }
  Transactions.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    subTotal: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};