const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, transactionController.getAllTransactions);
router.post("/", authenticateToken, transactionController.createTransaction);

module.exports = router;
