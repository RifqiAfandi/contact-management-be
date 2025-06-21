const { Products } = require("../models");
const imagekit = require("../lib/imagekit");

async function getAllProducts(req, res) {
  try {
    console.log("=== GET ALL PRODUCTS REQUEST ===");
    console.log("Query params:", req.query);
    
    // Query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const sortField = req.query.sortField || "id";
    const sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC";
    const { productName, category, minPrice, maxPrice } = req.query;

    // Build where clause
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

    console.log("Where clause:", where);
    console.log("Pagination:", { page, limit, offset });

    // Query with filters, sorting, and pagination
    const { count, rows: products } = await Products.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortField, sortOrder]],
    });

    console.log(`Found ${count} total products, returning ${products.length} products`);
    console.log("Product IDs:", products.map(p => p.id));

    const totalPages = Math.ceil(count / limit);

    if (products.length === 0) {
      console.log("No products found");
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
    
    console.log("Returning products successfully");
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
    console.error("Get products error:", error);
    res.status(500).json({ message: error.message });
  }
}

// New function to get all products without pagination for cashier
async function getAllProductsNoPagination(req, res) {
  try {
    const sortField = req.query.sortField || "id";
    const sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC";
    const { productName, category, minPrice, maxPrice } = req.query;

    // Build where clause
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

    // Query without pagination - get all products
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

    // Validate required fields
    if (!productName || !sellingPrice || !category || !userId) {
      return res.status(400).json({
        status: "Failed",
        message: "Product name, selling price, category, and user ID are required",
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
    console.error("Create product error:", error);
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

    console.log(`=== DELETE PRODUCT REQUEST ===`);
    console.log(`Raw ID from params: "${id}"`);
    console.log(`User:`, req.user?.id, req.user?.email);

    // Validate ID format
    if (!id || isNaN(parseInt(id))) {
      console.log(`Invalid ID format: ${id}`);
      return res.status(400).json({
        status: "Failed",
        message: "Invalid product ID",
        isSuccess: false,
        data: null,
      });
    }

    const productId = parseInt(id);
    console.log(`Parsed product ID: ${productId}`);

    // Check if product exists before delete
    const product = await Products.findByPk(productId);
    
    if (!product) {
      console.log(`Product with ID ${productId} not found in database`);
      return res.status(404).json({
        status: "Failed",
        message: "Product not found",
        isSuccess: false,
        data: null,
      });
    }

    console.log(`Product found:`, {
      id: product.id,
      name: product.productName,
      userId: product.userId
    });

    // Simple delete without transaction first
    console.log(`Attempting to delete product...`);
    await product.destroy();
    console.log(`Product destroy() method completed`);

    // Verify deletion by checking if product still exists
    const verifyDelete = await Products.findByPk(productId);
    console.log(`Verification - Product still exists:`, verifyDelete ? 'YES' : 'NO');

    if (verifyDelete) {
      console.log(`ERROR: Product still exists after delete operation`);
      return res.status(500).json({
        status: "Failed",
        message: "Failed to delete product - product still exists",
        isSuccess: false,
        data: null,
      });
    }

    console.log(`Product ${productId} successfully deleted`);
    console.log(`=== DELETE PRODUCT SUCCESS ===`);

    res.status(200).json({
      status: "Success",
      message: "Product deleted successfully",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    console.log(`=== DELETE PRODUCT ERROR ===`);
    console.error("Delete product error:", error.message);
    console.error("Error stack:", error.stack);
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
