const { User, Transaction } = require('../models');

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transaction.findAll({
            include: [{ 
                model: User,
                attributes: ['id', 'name']
            }], 
        });

        if (transactions.length === 0) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No transactions found',
                isSuccess: false,
                data: null,
            });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Transactions retrieved successfully',
            isSuccess: true, 
            data: transactions,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Failed',
            message: 'Failed to fetch transactions',
            isSuccess: false,
            data: null,
        });
    }
}

async function createTransaction(req, res) {
    try {
        const { userId, amount, description } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const transaction = await Transaction.create({
            userId,
            amount,
            description,
        });

        res.status(201).json({
            success: true,
            data: transaction,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create transaction',
        });
    }
}

module.exports = {
    getAllTransactions,
    createTransaction,
};

