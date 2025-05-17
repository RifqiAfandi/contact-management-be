'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Inventories', [
      {
        itemName: 'Coffee Beans Arabica',
        itemUrl: 'https://example.com/coffee-beans-arabica.jpg',
        purchasePrice: 100000,
        expiredDate: new Date('2026-05-17'),
        entryDate: new Date('2025-05-17'),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        itemName: 'Fresh Milk',
        itemUrl: 'https://example.com/fresh-milk.jpg',
        purchasePrice: 25000,
        expiredDate: new Date('2025-05-24'),
        entryDate: new Date('2025-05-17'),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        itemName: 'Green Tea Powder',
        itemUrl: 'https://example.com/green-tea-powder.jpg',
        purchasePrice: 50000,
        expiredDate: new Date('2026-01-17'),
        entryDate: new Date('2025-05-17'),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Inventories', null, {});
  }
};
