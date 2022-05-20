const express = require("express");

const Router = express.Router();

const checkoutController = require("./checkoutController");
const middlewareAuth = require("../../middleware/auth");
const middlewareRedis = require("../../middleware/redis");

Router.get(
  "/",
  middlewareAuth.authentication,
  middlewareRedis.getCheckoutRedis,
  checkoutController.getAllCheckout
);
Router.get(
  "/:id",
  middlewareAuth.authentication,
  middlewareRedis.getCheckoutByIdRedis,
  checkoutController.getCheckoutById
);
Router.post(
  "/",
  middlewareAuth.authentication,
  checkoutController.createCheckout
);
Router.patch(
  "/:id",
  middlewareAuth.authentication,
  middlewareRedis.clearCheckoutRedis,
  checkoutController.updateCheckout
);
Router.delete(
  "/:id",
  middlewareAuth.authentication,
  middlewareRedis.clearCheckoutRedis,
  checkoutController.deleteCheckout
);

module.exports = Router;
