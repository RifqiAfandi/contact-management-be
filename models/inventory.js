"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventory.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Inventory.init(
    {
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: {
            msg: "Item name is required",
          },
        },
      },
      imageUrl: {
        // Diganti dari itemUrl ke imageUrl untuk konsistensi
        type: DataTypes.TEXT,
        allowNull: true,
      },
      purchasePrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          notNull: {
            msg: "Purchase price is required",
          },
        },
      },
      expiredDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },      entryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      supplierName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      useDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('Baik', 'Segera Expired', 'Expired', 'Terpakai'),
        allowNull: false,
        defaultValue: 'Baik',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        validate: {
          notNull: {
            msg: "User ID is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Inventory",
    }
  );
  return Inventory;
};
