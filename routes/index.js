const express = require("express");
const router = express.Router();
const authRoute = require("./authRoute");
const productRoute = require("./productRoute");
const inventoryRoute = require("./inventoryRoute");

router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/inventory", inventoryRoute);

module.exports = router;
