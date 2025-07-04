const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");
const { uploader } = require("../middlewares/uploader");

router.post(
  "/users",
  authenticateToken,
  isAdmin,
  uploader.single("image"),
  AuthController.createUser
);
router.post("/login", AuthController.login);
router.get("/users", authenticateToken, isAdmin, AuthController.getAllUser);
router.get(
  "/users/:id",
  authenticateToken,
  isAdmin,
  AuthController.getUserById
);
router.put(
  "/users/:id",
  authenticateToken,
  isAdmin,
  uploader.single("image"),
  AuthController.updateUser
);
router.delete(
  "/users/:id",
  authenticateToken,
  isAdmin,
  AuthController.deleteUser
);

module.exports = router;
