"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {  async up(queryInterface, Sequelize) {
    // Check if data already exists to prevent duplicates
    const existingInventories = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Inventories"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingInventories[0].count > 0) {
      console.log('Inventory data already exists, skipping seed...');
      return;
    }

    return queryInterface.bulkInsert("Inventories", [
      {
        itemName: "Ayam Bebek",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/ayam%20bebek.jpg?updatedAt=1750113829017",
        purchasePrice: 75000,
        expiredDate: new Date("2025-06-19"), // 2 hari (daging segar)
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bawang Merah",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/bawang%20merah.jpg?updatedAt=1750113829348",
        purchasePrice: 20000,
        expiredDate: new Date("2025-08-17"), // 2 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bawang Putih",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/bawang%20putih.jpg?updatedAt=1750113829037",
        purchasePrice: 15000,
        expiredDate: new Date("2025-09-17"), // 3 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bubuk Rasa Coklat",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/bubuk%20rasa%20coklat%20%20.jpg?updatedAt=1750113829119",
        purchasePrice: 40000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bubuk Rasa Matcha",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/bubuk%20rasa%20matcha.jpg?updatedAt=1750113829375",
        purchasePrice: 50000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bubuk Rasa Red Velvet",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/bubuk%20rasa%20red%20velvet..jpg?updatedAt=1750113829373",
        purchasePrice: 45000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Cabai",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/cabai.jpg?updatedAt=1750113829388",
        purchasePrice: 18000,
        expiredDate: new Date("2025-07-01"), // 2 minggu
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Coklat",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/coklat.jpg?updatedAt=1750113829037",
        purchasePrice: 35000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Daun Bawang",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/daun%20bawang.jpg?updatedAt=1750113829760",
        purchasePrice: 8000,
        expiredDate: new Date("2025-06-24"), // 1 minggu
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Daun Mint",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/daun%20mint.jpg?updatedAt=1750113829555",
        purchasePrice: 10000,
        expiredDate: new Date("2025-06-24"), // 1 minggu (segar)
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Gula",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/gula.jpg?updatedAt=1750113832606",
        purchasePrice: 15000,
        expiredDate: new Date("2027-06-17"), // 2 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Jahe",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/jahe.jpg?updatedAt=1750113832677",
        purchasePrice: 15000,
        expiredDate: new Date("2025-09-17"), // 3 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Keju",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/keju.jpg?updatedAt=1750113833276",
        purchasePrice: 45000,
        expiredDate: new Date("2025-09-17"), // 3 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Kentang",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/kentang.jpg?updatedAt=1750113832679",
        purchasePrice: 20000,
        expiredDate: new Date("2025-08-17"), // 2 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Kol",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/kol.jpg?updatedAt=1750113833624",
        purchasePrice: 10000,
        expiredDate: new Date("2025-07-17"), // 1 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Kopi Robusta & Arabica",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/kopi%20robusta%20&%20arabica.jpg?updatedAt=1750113833667",
        purchasePrice: 120000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Krimer",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/krimer.jpg?updatedAt=1750113834336",
        purchasePrice: 25000,
        expiredDate: new Date("2026-12-17"), // 1.5 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Leci",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/leci.jpg?updatedAt=1750113834313",
        purchasePrice: 30000,
        expiredDate: new Date("2025-06-20"), // 3 hari (buah segar)
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Lemon",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/lemon.jpg?updatedAt=1750113834277",
        purchasePrice: 25000,
        expiredDate: new Date("2025-07-01"), // 2 minggu
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Madu",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/madu.jpg?updatedAt=1750113834288",
        purchasePrice: 40000,
        expiredDate: new Date("2028-06-17"), // 3 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Margarin",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/margarin.jpg?updatedAt=1750113836943",
        purchasePrice: 18000,
        expiredDate: new Date("2025-12-17"), // 6 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Mayonaise",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/mayonaise.jpg?updatedAt=1750113837452",
        purchasePrice: 22000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Mentega",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/mentega.jpg?updatedAt=1750113837382",
        purchasePrice: 25000,
        expiredDate: new Date("2025-12-17"), // 6 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Nugget",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/nugget.jpg?updatedAt=1750113837395",
        purchasePrice: 35000,
        expiredDate: new Date("2025-12-17"), // 6 bulan (frozen)
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Penyedap Rasa Masako",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/penyedap%20rasa%20masako.jpg?updatedAt=1750113837925",
        purchasePrice: 8000,
        expiredDate: new Date("2027-06-17"), // 2 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Pineapple Kering",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/pineapple%20kering.jpg?updatedAt=1750113837961",
        purchasePrice: 45000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Roti",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/roti.jpg?updatedAt=1750113838274",
        purchasePrice: 12000,
        expiredDate: new Date("2025-06-21"), // 4 hari
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Saos",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/saos%C2%A0.jpg?updatedAt=1750113837962",
        purchasePrice: 18000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Selada",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/selada.jpg?updatedAt=1750113838341",
        purchasePrice: 12000,
        expiredDate: new Date("2025-06-24"), // 1 minggu
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Siomay",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/siomay.jpg?updatedAt=1750113839510",
        purchasePrice: 25000,
        expiredDate: new Date("2025-09-17"), // 3 bulan (frozen)
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "SKM",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/skm.jpg?updatedAt=1750113841709",
        purchasePrice: 15000,
        expiredDate: new Date("2026-12-17"), // 1.5 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Soda",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/soda.jpg?updatedAt=1750113841653",
        purchasePrice: 20000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Sosis",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/sosis.jpg?updatedAt=1750113841907",
        purchasePrice: 28000,
        expiredDate: new Date("2025-12-17"), // 6 bulan (frozen)
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Susu UHT",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/susu%20uht.jpg?updatedAt=1750113841884",
        purchasePrice: 25000,
        expiredDate: new Date("2025-12-17"), // 6 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Syrup",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/syrup.jpg?updatedAt=1750113841966",
        purchasePrice: 35000,
        expiredDate: new Date("2026-06-17"), // 1 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Teh",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/teh.jpg?updatedAt=1750113842351",
        purchasePrice: 18000,
        expiredDate: new Date("2027-06-17"), // 2 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Telur",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/telur.jpg?updatedAt=1750113842282",
        purchasePrice: 30000,
        expiredDate: new Date("2025-07-17"), // 1 bulan
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Tepung",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/tepung.jpg?updatedAt=1750113842372",
        purchasePrice: 12000,
        expiredDate: new Date("2026-12-17"), // 1.5 tahun
        entryDate: new Date("2025-06-17"),
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Thai Tea",
        imageUrl: "https://ik.imagekit.io/RifqiAfandi/Inventory/thai%20tea.jpg?updatedAt=1750113842385",
        purchasePrice: 35000,
        expiredDate: new Date("2027-06-17"), // 2 tahun
        entryDate: new Date("2025-06-17"),
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
