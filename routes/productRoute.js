const express = require("express");
const router = express.Router();
const { uploader } = require("../middlewares/uploader");
const productController = require("../controllers/productController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, productController.getAllProducts);
router.get("/all", authenticateToken, productController.getAllProductsNoPagination);
router.post(
  "/",
  authenticateToken,
  uploader.single("productImg"),
  productController.createProduct
);
router.put(
  "/:id",
  authenticateToken,
  uploader.single("productImg"),
  productController.updateProduct
);
router.delete("/:id", authenticateToken, productController.deleteProduct);

module.exports = router;
