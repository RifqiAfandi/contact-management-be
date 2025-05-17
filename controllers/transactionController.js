const { User, Transaction, Products } = require('../models');

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
        const { userId, date, total, subTotal,  description, productId } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: 'Failed',
                message: 'User not found',
                isSuccess: false,
                data: null,
            });
        }

        const product = await Products.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Product not found',
                isSuccess: false,
                data: null,
            });
        }

        const transaction = await Transaction.create({
            userId, 
            date, 
            total, 
            subTotal,
            amount,
            description,
        });


        res.status(201).json({
            status: 'Success',
            message: 'Transaction created successfully',
            isSuccess: true,
            data: {
                user,
                transaction,
                product,
            },
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

