"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Products.init(
    {
      productName: DataTypes.STRING,
      productUrl: DataTypes.TEXT,
      sellingPrice: DataTypes.INTEGER,
      category: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
