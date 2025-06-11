'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Change item column from STRING to TEXT to support JSON data
    await queryInterface.changeColumn('Transactions', 'item', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // Change total column from INTEGER to DECIMAL for accurate price calculation
    await queryInterface.changeColumn('Transactions', 'total', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });

    // Change subTotal column from INTEGER to DECIMAL for accurate price calculation
    await queryInterface.changeColumn('Transactions', 'subTotal', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert back to original data types
    await queryInterface.changeColumn('Transactions', 'item', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Transactions', 'total', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('Transactions', 'subTotal', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
