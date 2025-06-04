const { Products } = require("../models");

async function getAllProducts(req, res) {
  try {
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

    // Query with filters, sorting, and pagination
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

async function createProduct(req, res) {
  try {
    if (req.file) {
      const file = req.file;
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];
      const { productName, sellingPrice, category, userId } = req.body;

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
      } else if (uploadImg) {
        const newProduct = await Products.create({
          productName,
          sellingPrice,
          category,
          userId,
          productUrl: uploadImg.url,
        });

        res.status(201).json({
          status: "Success",
          message: "Product created successfully",
          isSuccess: true,
          data: newProduct,
        });
      }
    }
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

      updateData.imageUrl = uploadImg.url;
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
  createProduct,
  updateProduct,
  deleteProduct,
};
