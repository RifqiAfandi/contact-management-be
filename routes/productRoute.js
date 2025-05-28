const express = require("express");
const router = express.Router();
const { uploader } = require("../middlewares/uploader");
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.post(
  "/",
  uploader.single("productImg"),
  productController.createProduct
);
router.put(
  "/:id",
  uploader.single("productImg"),
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
