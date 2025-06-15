const { Transactions, Inventory } = require("../models");

async function seedFinancialData() {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Create some sample inventory entries for current month
    await Inventory.bulkCreate([
      {
        itemName: "Coffee Beans Premium",
        purchasePrice: 150000,
        entryDate: new Date(currentYear, currentMonth, 5),
        expiredDate: new Date(currentYear, currentMonth + 6, 5),
      },
      {
        itemName: "Milk Fresh",
        purchasePrice: 25000,
        entryDate: new Date(currentYear, currentMonth, 10),
        expiredDate: new Date(currentYear, currentMonth + 1, 10),
      },
      {
        itemName: "Sugar",
        purchasePrice: 15000,
        entryDate: new Date(currentYear, currentMonth, 15),
        expiredDate: new Date(currentYear, currentMonth + 12, 15),
      }
    ]);

    // Create some sample transactions for current month
    await Transactions.bulkCreate([
      {
        total: 45000,
        subTotal: 45000,
        paymentMethod: "cash",
        name: "Customer 1",
        description: "Coffee and snacks",
        userId: 1,
        createdAt: new Date(currentYear, currentMonth, 8),
      },
      {
        total: 32000,
        subTotal: 32000,
        paymentMethod: "qris",
        name: "Customer 2", 
        description: "Lunch order",
        userId: 1,
        createdAt: new Date(currentYear, currentMonth, 12),
      },
      {
        total: 67000,
        subTotal: 67000,
        paymentMethod: "cash",
        name: "Customer 3",
        description: "Group order",
        userId: 1,
        createdAt: new Date(currentYear, currentMonth, 18),
      }
    ]);

    // Create some data for previous month
    const prevMonth = currentMonth - 1;
    const prevYear = prevMonth < 0 ? currentYear - 1 : currentYear;
    const normalizedPrevMonth = prevMonth < 0 ? 11 : prevMonth;

    await Inventory.bulkCreate([
      {
        itemName: "Previous Month Stock",
        purchasePrice: 80000,
        entryDate: new Date(prevYear, normalizedPrevMonth, 15),
        expiredDate: new Date(prevYear, normalizedPrevMonth + 3, 15),
      }
    ]);

    await Transactions.bulkCreate([
      {
        total: 125000,
        subTotal: 125000,
        paymentMethod: "cash",
        name: "Previous Customer",
        description: "Previous month order",
        userId: 1,
        createdAt: new Date(prevYear, normalizedPrevMonth, 20),
      }
    ]);

    console.log("✅ Financial sample data created successfully");
  } catch (error) {
    console.error("❌ Error creating financial sample data:", error);
  }
}

module.exports = { seedFinancialData };
