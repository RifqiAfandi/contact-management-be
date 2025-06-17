"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Inventories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemName: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.TEXT,
      },
      purchasePrice: {
        type: Sequelize.INTEGER,
      },
      expiredDate: {
        type: Sequelize.DATE,
      },      entryDate: {
        type: Sequelize.DATE,
      },
      supplierName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      useDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('Baik', 'Segera Expired', 'Expired', 'Terpakai'),
        allowNull: false,
        defaultValue: 'Baik',
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Inventories");
  },
};
