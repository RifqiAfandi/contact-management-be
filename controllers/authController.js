const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

async function createUser(req, res) {
  try {
    const { name, username, password, role } = req.body;

    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Username already exists",
        isSuccess: false,
        data: null,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      name,
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      isSuccess: true,
      data: { newUser },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid username or password",
        isSuccess: false,
        data: null,
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: "error",
        message: "Invalid username or password",
        isSuccess: false,
        data: null,
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      status: "success",
      message: "Login successful",
      isSuccess: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function getAllUser(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const sortField = req.query.sortField || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "DESC" : "ASC";
    const { role, name } = req.query;

    const where = {};
    if (role) {
      where.role = role;
    }
    if (name) {
      where.name = { [require("sequelize").Op.like]: `%${name}%` };
    }

    const { count, rows: users } = await Users.findAndCountAll({
      where,
      order: [[sortField, sortOrder]],
      limit,
      offset,
    });

    if (users.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No users found",
        isSuccess: false,
        data: null,
      });
    }

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      isSuccess: true,
      data: users,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      isSuccess: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, username, password, role } = req.body;

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        isSuccess: false,
        data: null,
      });
    }

    const updateData = {
      name,
      username,
      role,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    await user.update(updateData);

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      isSuccess: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        isSuccess: false,
        data: null,
      });
    }

    await user.destroy();

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
}

module.exports = {
  createUser,
  login,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
