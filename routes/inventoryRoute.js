const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { uploader } = require("../middlewares/uploader");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, inventoryController.getAllInventory);
router.post(
  "/",
  authenticateToken,
  uploader.single("image"),
  inventoryController.createInventory
);
router.put(
  "/:id",
  authenticateToken,
  uploader.single("image"),
  inventoryController.updateInventory
);
router.delete("/:id", authenticateToken, inventoryController.deleteInventory);

module.exports = router;
