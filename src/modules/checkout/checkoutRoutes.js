const express = require("express");
const checkoutController = require("./checkoutController");

const Router = express.Router();

const userController = require("./checkoutController");
// const middlewareProfile = require("../../middleware/uploadProfile");
// const middlewareAuth = require("../../middleware/auth");

Router.post("/", checkoutController.createCheckout);

module.exports = Router;
