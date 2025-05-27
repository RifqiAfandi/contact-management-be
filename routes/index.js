const express = require("express");
const router = express.Router();
const authRoute = require("./authRoute");
const productRoute = require("./productRoute");
const inventoryRoute = require("./inventoryRoute");
const transactionRoute = require("./transactionRoute");

router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/inventory", inventoryRoute);
router.use("/transactions", transactionRoute);

module.exports = router;
