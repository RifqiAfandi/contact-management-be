"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Inventories", [
      {
        itemName: "Coffee Beans Arabica",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Coffe%20Bean%20Arabica.jfif?updatedAt=1748363660950",
        purchasePrice: 100000,
        expiredDate: new Date("2026-05-17"),
        entryDate: new Date("2025-05-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Fresh Milk",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Fresh%20Milk.jfif?updatedAt=1748363660854",
        purchasePrice: 25000,
        expiredDate: new Date("2025-05-24"),
        entryDate: new Date("2025-05-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Green Tea Powder",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Green%20Tea%20Powder.jfif?updatedAt=1748363661002",
        purchasePrice: 50000,
        expiredDate: new Date("2026-01-17"),
        entryDate: new Date("2025-05-17"),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Sugar",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Sugar.jfif?updatedAt=1748363660985",
        purchasePrice: 15000,
        expiredDate: new Date("2026-12-31"),
        entryDate: new Date("2025-04-10"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Cocoa Powder",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Cocoa%20Powder.jfif?updatedAt=1748363660851",
        purchasePrice: 75000,
        expiredDate: new Date("2026-08-15"),
        entryDate: new Date("2025-03-22"),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Vanilla Syrup",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Vanilla%20Syrup.jfif?updatedAt=1748363660850",
        purchasePrice: 35000,
        expiredDate: new Date("2025-11-30"),
        entryDate: new Date("2025-05-01"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Paper Cups",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Paper%20Cup.jfif?updatedAt=1748363660846",
        purchasePrice: 80000,
        expiredDate: new Date("2027-12-31"),
        entryDate: new Date("2025-02-14"),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Whipped Cream",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Whipped%20Cream.jfif?updatedAt=1748363660850",
        purchasePrice: 45000,
        expiredDate: new Date("2025-07-20"),
        entryDate: new Date("2025-05-15"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Cinnamon Powder",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Cinnamon%20Powder.jfif?updatedAt=1748363661037",
        purchasePrice: 30000,
        expiredDate: new Date("2026-10-05"),
        entryDate: new Date("2025-04-28"),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Ice Cubes",
        itemUrl:
          "https://ik.imagekit.io/RifqiAfandi/Ice%20Cube.jfif?updatedAt=1748363660948",
        purchasePrice: 20000,
        expiredDate: new Date("2025-06-01"),
        entryDate: new Date("2025-05-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Inventories", null, {});
  },
};
