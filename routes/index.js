const express = require("express");
const router = express.Router();
const authRoute = require("./authRoute");
const productRoute = require("./productRoute");
const inventoryRoute = require("./inventoryRoute");
const transactionRoute = require("./transactionRoute");
const system = require("../controllers/systemController");

router.use("/api/auth", authRoute);
router.use("/api/products", productRoute);
router.use("/api/inventory", inventoryRoute);
router.use("/api/transactions", transactionRoute);

router.use("/healthcheck", system.healthcheck);
router.use(system.onLost);
router.use(system.onError);

module.exports = router;
