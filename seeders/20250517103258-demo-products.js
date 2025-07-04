"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingProducts = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM "Products"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (existingProducts[0].count > 0) {
      console.log("Products data already exists, skipping seed...");
      return;
    }

    return queryInterface.bulkInsert("Products", [
      {
        productName: "Affogato",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Affogato.jpg?updatedAt=1750112894634",
        sellingPrice: 18000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Amerta",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Amerta.jpg?updatedAt=1750112894616",
        sellingPrice: 20000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Ayam Kampung Goreng",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Ayam%20Kampung%20Goreng.jpg?updatedAt=1750112895211",
        sellingPrice: 35000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Ayam Potong Goreng",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Ayam%20Potong%20Goreng.jpg?updatedAt=1750112894832",
        sellingPrice: 30000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Bebek Goreng",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Bebek%20Goreng.jpg?updatedAt=1750112894899",
        sellingPrice: 35000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Beef Barbeque",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Beef%20Barbeque.jpg?updatedAt=1750112895014",
        sellingPrice: 28000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Beef BlackPepper",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Beef%20BlackPepper.jpg?updatedAt=1750112895083",
        sellingPrice: 38000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Beef Teriyaki",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Beef%20Teriyaki.jpg?updatedAt=1750112895110",
        sellingPrice: 38000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Black Sunrise",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Black%20Sunrise.jpg?updatedAt=1750112894421",
        sellingPrice: 16000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Black Tea",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Black%20Tea.jpg?updatedAt=1750112894516",
        sellingPrice: 8000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Cappucino",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Cappucino.jpg?updatedAt=1750112898444",
        sellingPrice: 17000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Chicken Katsu",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Chicken%20Katsu.jpg?updatedAt=1750112898467",
        sellingPrice: 22000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Chicken Popcorn Barbeque",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Chicken%20Popcorn%20Barbeque.jpg?updatedAt=1750112898884",
        sellingPrice: 25000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Chicken Popcorn BlackPepper",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Chicken%20Popcorn%20BlackPepper.jpg?updatedAt=1750112898981",
        sellingPrice: 25000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Chicken Popcorn Honey Lemon",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Chicken%20Popcorn%20Honey%20Lemon.jpg?updatedAt=1750112899542",
        sellingPrice: 28000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Chicken Popcorn Teriyaki",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Chicken%20Popcorn%20Teriyaki.jpg?updatedAt=1750112899621",
        sellingPrice: 25000,
        category: "Makanan",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Chicken Wings",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Chicken%20Wings.jpg?updatedAt=1750112899650",
        sellingPrice: 22000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Choco Banana",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Choco%20Banana.jpg?updatedAt=1750112899611",
        sellingPrice: 15000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Chocolate",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Chocolate.jpg?updatedAt=1750112900018",
        sellingPrice: 16000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Dimsum Lumpia",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Dimsum%20Lumpia.jpg?updatedAt=1750112900088",
        sellingPrice: 16000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Dimsum Mentai",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Dimsum%20Mentai.jpg?updatedAt=1750112903043",
        sellingPrice: 23000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Espresso Single/Double",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Espresso%20SingleDouble.jpg?updatedAt=1750112903050",
        sellingPrice: 12000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Ice Shaken Espresso",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Ice%20Shaken%20Espresso.jpg?updatedAt=1750112902571",
        sellingPrice: 20000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Kentang Goreng",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Kentang%20Goreng.jpg?updatedAt=1750112903225",
        sellingPrice: 18000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Kopi Susu Aren",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Kopi%20Susu%20Aren.jpg?updatedAt=1750112904151",
        sellingPrice: 18000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Kopi Susu Banana",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Kopi%20Susu%20Banana.jpg?updatedAt=1750112903868",
        sellingPrice: 18000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Kopi Susu ButterScotch",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Kopi%20Susu%20ButterScotch.jpg?updatedAt=1750112904231",
        sellingPrice: 18000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Kopi Susu Hazelnut Choco",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Kopi%20Susu%20Hazelnut%20Choco.jpg?updatedAt=1750112903842",
        sellingPrice: 18000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Kopi Susu Pistachio",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Kopi%20Susu%20Pistachio.jpg?updatedAt=1750112904595",
        sellingPrice: 18000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Kopi Susu Rhum",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Kopi%20Susu%20Rhum.jpg?updatedAt=1750112904727",
        sellingPrice: 18000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Kopi Susu Rose",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Kopi%20Susu%20Rose.jpg?updatedAt=1750112907433",
        sellingPrice: 18000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "La La Lost Pink",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/La%20La%20Lost%20Pink.jpg?updatedAt=1750112907877",
        sellingPrice: 20000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Latte",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Latte.jpg?updatedAt=1750112907904",
        sellingPrice: 18000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Lemon Tea",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Lemon%20Tea.jpg?updatedAt=1750112908523",
        sellingPrice: 14000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Long Black",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Long%20Black.jpg?updatedAt=1750112908321",
        sellingPrice: 15000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Lyche Tea",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Lyche%20Tea.jpg?updatedAt=1750112908558",
        sellingPrice: 14000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Lychee Mojito",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Lychee%20Mojito.jpg?updatedAt=1750112908799",
        sellingPrice: 16000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Magic Latte",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Magic%20Latte.jpg?updatedAt=1750112908959",
        sellingPrice: 20000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Matcha",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Matcha.jpg?updatedAt=1750112909055",
        sellingPrice: 16000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Mix Platter",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Mix%20Platter.jpg?updatedAt=1750112911481",
        sellingPrice: 24000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Moccacino",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Moccacino.jpg?updatedAt=1750112912002",
        sellingPrice: 16000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Money Bag",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Money%20Bag.jpg?updatedAt=1750112912060",
        sellingPrice: 16000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "OatMilk",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/OatMilk.jpg?updatedAt=1750112912122",
        sellingPrice: 21000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Peach Freeze",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Peach%20Freeze.jpg?updatedAt=1750112912576",
        sellingPrice: 16000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Peach Tea",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Peach%20Tea.jpg?updatedAt=1750112912472",
        sellingPrice: 14000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Piccolo Latte",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Piccolo%20Latte.jpg?updatedAt=1750112912706",
        sellingPrice: 15000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Pisang Goreng",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Pisang%20Goreng.jpg?updatedAt=1750112913116",
        sellingPrice: 14000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Red Velvet",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Red%20Velvet.jpg?updatedAt=1750112913134",
        sellingPrice: 16000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Roti Bakar",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Roti%20Bakar.jpg?updatedAt=1750112913070",
        sellingPrice: 22000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Siomay",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Siomay.jpg?updatedAt=1750112915546",
        sellingPrice: 16000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Split Latte",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Split%20Latte.jpg?updatedAt=1750112916469",
        sellingPrice: 20000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Tahu Bakso Goreng",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Tahu%20Bakso%20Goreng.jpg?updatedAt=1750112916606",
        sellingPrice: 17000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Taro",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Taro.jpg?updatedAt=1750112917215",
        sellingPrice: 16000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Thai Tea",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Thai%20Tea.jpg?updatedAt=1750112916575",
        sellingPrice: 14000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "ThinkerBell",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/ThinkerBell.jpg?updatedAt=1750112916742",
        sellingPrice: 20000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Tubruk",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Kopi%20Tubruk.jpg?updatedAt=1750112907696",
        sellingPrice: 8000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Vietnam Drip",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Vietnam%20Drip.jpg?updatedAt=1750112917278",
        sellingPrice: 10000,
        category: "Minuman",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Waffle",
        productUrl:
          "https://ik.imagekit.io/RifqiAfandi/Product/Waffle.jpg?updatedAt=1750112917509",
        sellingPrice: 23000,
        category: "Snack",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
