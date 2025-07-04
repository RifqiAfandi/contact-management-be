"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingUsers = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Users"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingUsers[0].count > 0) {
      console.log("Users data already exists, skipping seed...");
      return;
    }

    const hashedPasswords = await Promise.all([
      bcrypt.hash("admin123", 10),
      bcrypt.hash("user123", 10),
    ]);

    return queryInterface.bulkInsert("Users", [
      {
        name: "Admin",
        username: "admin",
        password: hashedPasswords[0],
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rifqi",
        username: "user1",
        password: hashedPasswords[1],
        role: "kasir",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hakim",
        username: "user2",
        password: hashedPasswords[1],
        role: "gudang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yuda",
        username: "user3",
        password: hashedPasswords[1],
        role: "kasir",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Oca",
        username: "user4",
        password: hashedPasswords[1],
        role: "gudang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Putri",
        username: "user5",
        password: hashedPasswords[1],
        role: "kasir",
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
