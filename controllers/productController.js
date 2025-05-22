const { Products } = require("../models");

async function getAllProducts(req, res) {
  try {
    const products = await Products.findAll({});

    if (products.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No products found",
        isSuccess: false,
        data: null,
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Products retrieved successfully",
      isSuccess: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllProducts,
};
