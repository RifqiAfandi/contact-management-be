const { User, Transaction, Products } = require("../models");

async function getAllTransactions(req, res) {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });

    if (transactions.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No transactions found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Transactions retrieved successfully",
      isSuccess: true,
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to fetch transactions",
      isSuccess: false,
      data: null,
    });
  }
}

async function createTransaction(req, res) {
  try {
    const { userId, items, paymentMethod, customerName } = req.body;

    // Validate required fields
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        status: "Failed",
        message: "userId and items are required",
        isSuccess: false,
        data: null,
      });
    }

    // Validate user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
        isSuccess: false,
        data: null,
      });
    }

    // Calculate totals and validate products
    let total = 0;
    const transactionItems = [];

    // Validate each product and calculate total
    for (const item of items) {
      const product = await Products.findByPk(item.id);
      if (!product) {
        return res.status(404).json({
          status: "Failed",
          message: `Product ${item.productName} not found`,
          isSuccess: false,
          data: null,
        });
      }

      // Check stock availability
      if (product.stock < item.quantity) {
        return res.status(400).json({
          status: "Failed",
          message: `Insufficient stock for ${item.productName}. Available: ${product.stock}`,
          isSuccess: false,
          data: null,
        });
      }

      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      transactionItems.push({
        productId: item.id,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        total: itemTotal,
      });
    }

    // Create transaction
    const transaction = await Transaction.create({
      userId,
      date: new Date(),
      total,
      subTotal: total, // Same as total since no tax
      paymentMethod: paymentMethod || "cash",
      customerName: customerName || "Guest",
      description: `Transaction with ${items.length} items`,
      items: JSON.stringify(transactionItems), // Store items as JSON string
    });

    // Optional: Update product stock
    for (const item of items) {
      await Products.decrement("stock", {
        by: item.quantity,
        where: { id: item.id },
      });
    }

    res.status(201).json({
      status: "Success",
      message: "Transaction created successfully",
      isSuccess: true,
      data: {
        transaction,
        items: transactionItems,
        user: {
          id: user.id,
          username: user.username,
        },
      },
    });
  } catch (error) {
    console.error("Transaction creation error:", error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to create transaction",
      isSuccess: false,
      data: null,
    });
  }
}

module.exports = {
  getAllTransactions,
  createTransaction,
};
