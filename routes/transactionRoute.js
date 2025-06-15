const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, transactionController.getAllTransactions);
router.get("/revenue", authenticateToken, isAdmin, transactionController.getMonthlyRevenue);
router.get("/check-data", authenticateToken, isAdmin, transactionController.checkMonthlyData);
router.get("/:id", authenticateToken, transactionController.getTransactionById);
router.post("/", authenticateToken, transactionController.createTransaction);

module.exports = router;
