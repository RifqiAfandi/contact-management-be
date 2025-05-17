'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        productName: 'Coffee Latte',
        productUrl: 'https://example.com/coffee-latte.jpg',
        sellingPrice: 25000,
        servingType: 'Hot/Ice',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Cappuccino',
        productUrl: 'https://example.com/cappuccino.jpg',
        sellingPrice: 28000,
        servingType: 'Hot/Ice',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productName: 'Green Tea',
        productUrl: 'https://example.com/green-tea.jpg',
        sellingPrice: 20000,
        servingType: 'Hot/Ice',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
