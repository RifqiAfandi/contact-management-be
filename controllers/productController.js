const {Product} = require('../models');

async function getAllProducts(req, res) {
  try {
    const products = await Product.findAll({});

    if (products.length === 0) {
      return res.status(404).json({
        status: 'Failed', 
        message: 'No products found',
        isSuccess: false,
        data: null 
      });
    }
    res.status(200).json({
      status: 'Success',
      message: 'Products retrieved successfully',
      isSuccess: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { productName, productUrl, sellingPrice, servingType } = req.body;

    const newProduct = await Product.create({
      productName,
      productUrl,
      sellingPrice,
      servingType
    });

    res.status(201).json({
      status: 'Success',
      message: 'Product created successfully',
      isSuccess: true,
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message,
      isSuccess: false,
      data: null
    });
  }
}

module.exports = {
  getAllProducts,
  createProduct
};