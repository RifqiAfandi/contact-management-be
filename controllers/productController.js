const { Products } = require("../models");
const imagekit = require("../lib/imagekit");

async function getAllProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortField = req.query.sortField || "id";
    const sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC";
    const { productName, category, minPrice, maxPrice } = req.query;

    const { Op } = require("sequelize");
    const where = {};
    if (productName) {
      where.productName = { [Op.like]: `%${productName}%` };
    }
    if (category) {
      where.category = category;
    }
    if (minPrice || maxPrice) {
      where.sellingPrice = {};
      if (minPrice) where.sellingPrice[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.sellingPrice[Op.lte] = parseFloat(maxPrice);
    }

    const { count, rows: products } = await Products.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortField, sortOrder]],
    });

    const totalPages = Math.ceil(count / limit);

    if (products.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No products found",
        isSuccess: false,
        data: null,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: count,
          itemsPerPage: limit,
        },
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Products retrieved successfully",
      isSuccess: true,
      data: products,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalItems: count,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllProductsNoPagination(req, res) {
  try {
    const sortField = req.query.sortField || "id";
    const sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC";
    const { productName, category, minPrice, maxPrice } = req.query;

    const { Op } = require("sequelize");
    const where = {};
    if (productName) {
      where.productName = { [Op.like]: `%${productName}%` };
    }
    if (category) {
      where.category = category;
    }
    if (minPrice || maxPrice) {
      where.sellingPrice = {};
      if (minPrice) where.sellingPrice[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.sellingPrice[Op.lte] = parseFloat(maxPrice);
    }

    const products = await Products.findAll({
      where,
      order: [[sortField, sortOrder]],
    });

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
      message: "All products retrieved successfully",
      isSuccess: true,
      data: products,
      totalItems: products.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { productName, sellingPrice, category, userId } = req.body;

    if (!productName || !sellingPrice || !category || !userId) {
      return res.status(400).json({
        status: "Failed",
        message:
          "Product name, selling price, category, and user ID are required",
        isSuccess: false,
        data: null,
      });
    }

    let productUrl = null;

    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];

      const uploadImg = await imagekit.upload({
        file: file.buffer,
        fileName: `${split[0]}-${Date.now()}.${ext}`,
      });

      if (!uploadImg) {
        return res.status(500).json({
          status: "Failed",
          message: "Image upload failed",
          isSuccess: false,
          data: null,
        });
      }

      productUrl = uploadImg.url;
    }

    const newProduct = await Products.create({
      productName,
      sellingPrice: parseInt(sellingPrice),
      category,
      userId: parseInt(userId),
      productUrl,
    });

    res.status(201).json({
      status: "Success",
      message: "Product created successfully",
      isSuccess: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { productName, sellingPrice, category, userId } = req.body;

    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
        isSuccess: false,
        data: null,
      });
    }

    let updateData = {
      productName,
      sellingPrice,
      category,
      userId,
    };

    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];

      const uploadImg = await imagekit.upload({
        file: file.buffer,
        fileName: `${split[0]}-${Date.now()}.${ext}`,
      });

      if (!uploadImg) {
        return res.status(500).json({
          status: "Failed",
          message: "Image upload failed",
          isSuccess: false,
          data: null,
        });
      }

      updateData.productUrl = uploadImg.url;
    }

    await product.update(updateData);

    const updatedItem = await Products.findByPk(id);

    res.status(200).json({
      status: "Success",
      message: "Product updated successfully",
      isSuccess: true,
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
        isSuccess: false,
        data: null,
      });
    }

    await product.destroy();

    res.status(200).json({
      status: "Success",
      message: "Product deleted successfully",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

module.exports = {
  getAllProducts,
  getAllProductsNoPagination,
  createProduct,
  updateProduct,
  deleteProduct,
};
