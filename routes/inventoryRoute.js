const express = require("express");
const router = express.Router();
const multer = require("multer");
const inventoryController = require("../controllers/inventoryController");
const { uploader } = require("../middlewares/uploader");

router.get("/", inventoryController.getAllInventory);
router.post(
  "/",
  uploader.single("inventoryImg"),
  inventoryController.createInventory
);
router.put(
  "/:id",
  uploader.single("inventoryImg"),
  inventoryController.updateInventory
);
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;
