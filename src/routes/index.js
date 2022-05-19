const express = require("express");

const Router = express.Router();

const authRoutes = require("../modules/auth/authRoutes");
const userRoutes = require("../modules/user/userRoutes");
const productRoutes = require("../modules/product/productRoutes");
const checkoutRoutes = require("../modules/checkout/checkoutRoutes");

Router.use("/auth", authRoutes);
Router.use("/user", userRoutes);
Router.use("/product", productRoutes);
Router.use("/checkout", productRoutes);

module.exports = Router;
