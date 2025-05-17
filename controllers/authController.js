const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

async function createUser(req, res) {
    try {
        const { name, username, password, role } = req.body;

        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Username already exists',
                isSuccess: false,
                data: null
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Users.create({
            name,
            username,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            isSuccess: true,
            data: { newUser }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password',
                isSuccess: false,
                data: null
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid username or password',
                isSuccess: false,
                data: null
            });
        }

        const token = jwt.sign(
            { 
                id: user.id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            isSuccess: true,
            data: {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    role: user.role
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            isSuccess: false,
            data: null
        });
    }
}

module.exports = {
    createUser,
    login
};