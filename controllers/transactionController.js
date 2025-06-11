const { Users, Transactions, Products } = require("../models");

async function getAllTransactions(req, res) {
  try {
    const userId = req.user?.id;
    
    // Build query options
    const queryOptions = {
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    };

    // If user is not admin, only show their transactions
    if (req.user?.role !== "admin") {
      queryOptions.where = { userId };
    }

    const transactions = await Transactions.findAll(queryOptions);

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
    console.error("Get transactions error:", error);
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
    console.log("Creating transaction with data:", req.body);
    console.log("User:", req.user);

    const { item, total, subTotal, paymentMethod, name, description } = req.body;
    const userId = req.user?.id;

    // Basic validation
    if (!item || !Array.isArray(item) || item.length === 0) {
      console.log("Validation failed: Invalid items");
      return res.status(400).json({
        status: "Failed",
        message: "Items are required and must be an array",
        isSuccess: false,
        data: null,
      });
    }

    if (!total || !subTotal || !paymentMethod) {
      console.log("Validation failed: Missing required fields");
      return res.status(400).json({
        status: "Failed",
        message: "Total, subTotal, and paymentMethod are required",
        isSuccess: false,
        data: null,
      });
    }

    // Simple validation for each item
    for (const cartItem of item) {
      if (!cartItem.productId || !cartItem.quantity || !cartItem.price) {
        console.log("Validation failed: Invalid item structure", cartItem);
        return res.status(400).json({
          status: "Failed",
          message: "Each item must have productId, quantity, and price",
          isSuccess: false,
          data: null,
        });
      }
    }

    console.log("Creating transaction...");

    // Create transaction with simplified data
    const transactionData = {
      item: JSON.stringify(item),
      total: parseFloat(total),
      subTotal: parseFloat(subTotal),
      paymentMethod,
      name: name || req.user?.name || "Guest",
      description: description || `Transaction by ${req.user?.name || "Guest"} with ${item.length} items`,
      userId: userId || null,
    };

    console.log("Transaction data:", transactionData);

    const transaction = await Transactions.create(transactionData);

    console.log("Transaction created:", transaction);

    res.status(201).json({
      status: "Success",
      message: "Transaction created successfully",
      isSuccess: true,
      data: {
        transaction: {
          id: transaction.id,
          item: JSON.parse(transaction.item),
          total: transaction.total,
          subTotal: transaction.subTotal,
          paymentMethod: transaction.paymentMethod,
          name: transaction.name,
          description: transaction.description,
          userId: transaction.userId,
          createdAt: transaction.createdAt,
        },
      },
    });
  } catch (error) {
    console.error("Transaction creation error details:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      status: "Failed",
      message: `Failed to create transaction: ${error.message}`,
      isSuccess: false,
      data: null,
    });
  }
}

async function getTransactionById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const queryOptions = {
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    };

    // If user is not admin, only allow access to their own transactions
    if (req.user?.role !== "admin") {
      queryOptions.where = { userId };
    }

    const transaction = await Transactions.findByPk(id, queryOptions);

    if (!transaction) {
      return res.status(404).json({
        status: "Failed",
        message: "Transaction not found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Transaction retrieved successfully",
      isSuccess: true,
      data: {
        ...transaction.toJSON(),
        item: JSON.parse(transaction.item), // Parse JSON back to array
      },
    });
  } catch (error) {
    console.error("Get transaction error:", error);
    res.status(500).json({
      status: "Failed",
      message: "Failed to fetch transaction",
      isSuccess: false,
      data: null,
    });
  }
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
};
