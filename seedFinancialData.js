const { seedFinancialData } = require("./seeders/financialDataSeeder");
const db = require("./models");

async function runSeeder() {
  try {
    console.log("🌱 Starting financial data seeding...");
    
    // Sync database first
    await db.sequelize.sync();
    console.log("📊 Database synced successfully");
    
    // Run the seeder
    await seedFinancialData();
    
    console.log("✅ Financial data seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

runSeeder();
