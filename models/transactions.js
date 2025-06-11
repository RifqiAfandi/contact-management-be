"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */    static associate(models) {
      // define association here
      Transactions.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  
  Transactions.init(
    {
      item: DataTypes.TEXT, // Changed to TEXT to store JSON string
      total: DataTypes.DECIMAL(10, 2), // Changed to DECIMAL for accurate price calculation
      subTotal: DataTypes.DECIMAL(10, 2), // Changed to DECIMAL for accurate price calculation
      paymentMethod: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
