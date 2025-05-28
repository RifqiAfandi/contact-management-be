const jwt = require("jsonwebtoken");
const { Users } = require("../models");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Access token not found",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await Users.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "error",
      message: "Access denied. Admin only.",
    });
  }
  next();
};

const isKasir = (req, res, next) => {
  if (req.user.role !== "kasir") {
    return res.status(403).json({
      status: "error",
      message: "Access denied. Kasir only.",
    });
  }
  next();
};

const isGudang = (req, res, next) => {
  if (req.user.role !== "gudang") {
    return res.status(403).json({
      status: "error",
      message: "Access denied. Gudang only.",
    });
  }
  next();
};

module.exports = {
  authenticateToken,
  isAdmin,
  isKasir,
  isGudang,
};
