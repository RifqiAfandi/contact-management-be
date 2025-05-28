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
