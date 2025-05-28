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
    const { item, total, subTotal, paymentMethod, name, description } =
      req.body;

    // Create transaction
    const transaction = await Transaction.create({
      item,
      total,
      subTotal,
      paymentMethod,
      name,
      description,
    });

    res.status(201).json({
      status: "Success",
      message: "Transaction created successfully",
      isSuccess: true,
      data: {
        transaction,
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
