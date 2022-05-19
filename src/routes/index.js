const express = require("express");

const Router = express.Router();

const authRoutes = require("../modules/auth/authRoutes");
const userRoutes = require("../modules/user/userRoutes");

Router.use("/auth", authRoutes);
Router.use("/user", userRoutes);

module.exports = Router;
