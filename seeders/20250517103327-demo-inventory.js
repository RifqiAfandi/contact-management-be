"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingInventories = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Inventories"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const maxInsertions = 3;
    const itemsPerInsertion = 39;
    const maxAllowedItems = maxInsertions * itemsPerInsertion;

    if (existingInventories[0].count >= maxAllowedItems) {
      console.log(
        `Inventory data already inserted ${maxInsertions} times (${maxAllowedItems} items), skipping seed...`
      );
      return;
    }

    const currentInsertionNumber =
      Math.floor(existingInventories[0].count / itemsPerInsertion) + 1;
    console.log(
      `Inserting inventory data (insertion ${currentInsertionNumber} of ${maxInsertions})...`
    );

    const calculateStatus = (expiredDate) => {
      const currentDate = new Date("2025-06-17");
      const expiry = new Date(expiredDate);
      const diffTime = expiry - currentDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) return "Expired";
      if (diffDays <= 7) return "Segera Expired";
      return "Baik";
    };
    return queryInterface.bulkInsert("Inventories", [
      {
        itemName: "Ayam Bebek 1.5kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/ayam%20bebek.jpg?updatedAt=1750113829017",
        purchasePrice: 90000,
        expiredDate: new Date("2025-06-19"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Mbak Heni dan Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-06-19")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bawang Merah 20 Siung",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/bawang%20merah.jpg?updatedAt=1750113829348",
        purchasePrice: 18000,
        expiredDate: new Date("2025-07-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-07-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bawang Putih 20 Siung",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/bawang%20putih.jpg?updatedAt=1750113829037",
        purchasePrice: 15000,
        expiredDate: new Date("2025-07-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-07-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bubuk Rasa Coklat 1kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/bubuk%20rasa%20coklat%20%20.jpg?updatedAt=1750113829119",
        purchasePrice: 55000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Champoan Indonesia",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bubuk Rasa Matcha 1kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/bubuk%20rasa%20matcha.jpg?updatedAt=1750113829375",
        purchasePrice: 95000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Champoan Indonesia",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bubuk Rasa Red Velvet 500g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/bubuk%20rasa%20red%20velvet..jpg?updatedAt=1750113829373",
        purchasePrice: 65000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Champoan Indonesia",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Bubuk Taro 320g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/bubuk%20rasa%20taro.jpg?updatedAt=1750176592727",
        purchasePrice: 48000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Champoan Indonesia",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Cabai 200 Gram",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/cabai.jpg?updatedAt=1750113829388",
        purchasePrice: 12000,
        expiredDate: new Date("2025-06-24"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-06-24")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Coklat 150 Gram",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/coklat.jpg?updatedAt=1750113829037",
        purchasePrice: 25000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Daun Bawang 1 Ikat",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/daun%20bawang.jpg?updatedAt=1750113829760",
        purchasePrice: 3000,
        expiredDate: new Date("2025-06-20"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-06-20")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Daun Mint 75g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/daun%20mint.jpg?updatedAt=1750113829555",
        purchasePrice: 8000,
        expiredDate: new Date("2025-06-24"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-06-24")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Gula 6kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/gula.jpg?updatedAt=1750113832606",
        purchasePrice: 78000,
        expiredDate: new Date("2027-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2027-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Jahe 1 Buah",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/jahe.jpg?updatedAt=1750113832677",
        purchasePrice: 5000,
        expiredDate: new Date("2025-07-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-07-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Keju 320g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/keju.jpg?updatedAt=1750113833276",
        purchasePrice: 35000,
        expiredDate: new Date("2025-09-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2025-09-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Kentang 2kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/kentang.jpg?updatedAt=1750113832679",
        purchasePrice: 20000,
        expiredDate: new Date("2025-08-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Finna Frozen Food",
        useDate: null,
        status: calculateStatus(new Date("2025-08-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Kol 2 Buah",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/kol.jpg?updatedAt=1750113833624",
        purchasePrice: 14000,
        expiredDate: new Date("2025-07-01"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-07-01")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Kopi Robusta & Arabica 2kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/kopi%20robusta%20&%20arabica.jpg?updatedAt=1750113833667",
        purchasePrice: 120000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Champoan Indonesia",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Krimer 1L",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/krimer.jpg?updatedAt=1750113834336",
        purchasePrice: 25000,
        expiredDate: new Date("2025-12-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2025-12-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Leci 2 Kaleng",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/leci.jpg?updatedAt=1750113834313",
        purchasePrice: 28000,
        expiredDate: new Date("2027-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2027-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Lemon 6 Buah",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/lemon.jpg?updatedAt=1750113834277",
        purchasePrice: 18000,
        expiredDate: new Date("2025-06-24"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-06-24")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Madu 40g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/madu.jpg?updatedAt=1750113834288",
        purchasePrice: 18000,
        expiredDate: new Date("2027-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2027-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Margarin 1.5kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/margarin.jpg?updatedAt=1750113836943",
        purchasePrice: 42000,
        expiredDate: new Date("2025-12-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2025-12-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Mayonaise 500g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/mayonaise.jpg?updatedAt=1750113837452",
        purchasePrice: 18000,
        expiredDate: new Date("2025-12-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Trifal",
        useDate: null,
        status: calculateStatus(new Date("2025-12-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Mentega 71 Gram",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/mentega.jpg?updatedAt=1750113837382",
        purchasePrice: 15000,
        expiredDate: new Date("2025-09-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2025-09-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Nugget 1kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/nugget.jpg?updatedAt=1750113837395",
        purchasePrice: 45000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Finna Frozen Food",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Penyedap Rasa Masako 70 Gram",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/penyedap%20rasa%20masako.jpg?updatedAt=1750113837925",
        purchasePrice: 8000,
        expiredDate: new Date("2027-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2027-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Pineapple Kering 50g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/pineapple%20kering.jpg?updatedAt=1750113837961",
        purchasePrice: 15000,
        expiredDate: new Date("2025-12-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-12-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Roti 1 Bungkus",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/roti.jpg?updatedAt=1750113838274",
        purchasePrice: 12000,
        expiredDate: new Date("2025-06-20"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Indomaret",
        useDate: null,
        status: calculateStatus(new Date("2025-06-20")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Saos 500g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/saos%C2%A0.jpg?updatedAt=1750113837962",
        purchasePrice: 15000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Trifal",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Selada 4 Ikat",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/selada.jpg?updatedAt=1750113838341",
        purchasePrice: 16000,
        expiredDate: new Date("2025-06-20"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-06-20")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Siomay 660g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/siomay.jpg?updatedAt=1750113839510",
        purchasePrice: 32000,
        expiredDate: new Date("2025-09-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Trifal",
        useDate: null,
        status: calculateStatus(new Date("2025-09-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "SKM 500g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/skm.jpg?updatedAt=1750113841709",
        purchasePrice: 22000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Soda 1L",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/soda.jpg?updatedAt=1750113841653",
        purchasePrice: 12000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Sosis 500g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/sosis.jpg?updatedAt=1750113841907",
        purchasePrice: 28000,
        expiredDate: new Date("2025-12-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Finna Frozen Food",
        useDate: null,
        status: calculateStatus(new Date("2025-12-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Susu UHT 12L",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/susu%20uht.jpg?updatedAt=1750113841884",
        purchasePrice: 180000,
        expiredDate: new Date("2025-09-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Sales Susu Diamond",
        useDate: null,
        status: calculateStatus(new Date("2025-09-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Syrup 3.5L",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/syrup.jpg?updatedAt=1750113841966",
        purchasePrice: 45000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Champoan Indonesia",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Teh 400g",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/teh.jpg?updatedAt=1750113842351",
        purchasePrice: 35000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Sales Teh Dandang",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Telur 1kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/telur.jpg?updatedAt=1750113842282",
        purchasePrice: 32000,
        expiredDate: new Date("2025-07-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Pasar Tanjung",
        useDate: null,
        status: calculateStatus(new Date("2025-07-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Tepung 2kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/tepung.jpg?updatedAt=1750113842372",
        purchasePrice: 24000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemName: "Thai Tea 1kg",
        imageUrl:
          "https://ik.imagekit.io/RifqiAfandi/Inventory/thai%20tea.jpg?updatedAt=1750113842385",
        purchasePrice: 85000,
        expiredDate: new Date("2026-06-17"),
        entryDate: new Date("2025-06-17"),
        supplierName: "Toko Bahan Kue Jecho",
        useDate: null,
        status: calculateStatus(new Date("2026-06-17")),
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Inventories", null, {});
  },
};
