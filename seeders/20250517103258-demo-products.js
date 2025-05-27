"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", [
      {
        productName: "Coffee Latte",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Coffe%20Latte.jfif?updatedAt=1748331977880",
        sellingPrice: 25000,
        servingType: "Hot/Ice",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Cappuccino",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Cappucino.jfif?updatedAt=1748331977733",
        sellingPrice: 28000,
        servingType: "Hot/Ice",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Green Tea",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Green%20Tea.jfif?updatedAt=1748331977924",
        sellingPrice: 20000,
        servingType: "Hot/Ice",
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
