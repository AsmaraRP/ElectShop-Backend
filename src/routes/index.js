const express = require("express");

const Router = express.Router();

const authRoutes = require("../modules/auth/authRoutes");
const userRoutes = require("../modules/user/userRoutes");
const productRoutes = require("../modules/product/productRoutes");
const transactionRoutes = require("../modules/transaction/transactionRoutes");

Router.use("/auth", authRoutes);
Router.use("/user", userRoutes);
Router.use("/product", productRoutes);
Router.use("/transaction", transactionRoutes);

module.exports = Router;
