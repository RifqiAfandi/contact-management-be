"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const hashedPasswords = await Promise.all([
      bcrypt.hash("admin123", 10),
      bcrypt.hash("user123", 10),
      bcrypt.hash("user456", 10),
    ]);

    return queryInterface.bulkInsert("Users", [
      {
        name: "Admin User",
        username: "admin",
        password: hashedPasswords[0],
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John Doe",
        username: "user1",
        password: hashedPasswords[1],
        role: "kasir",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jane Smith",
        username: "user2",
        password: hashedPasswords[2],
        role: "gudang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("Users", null, {});
  },
};
