const express = require("express");

const Router = express.Router();

const checkoutController = require("./checkoutController");
const middlewareAuth = require("../../middleware/auth");
const middlewareRedis = require("../../middleware/redis");

Router.get(
  "/",
  middlewareRedis.getCheckoutRedis,
  checkoutController.getAllCheckout
);
Router.get(
  "/:id",
  // middlewareRedis.getCheckoutByIdRedis,
  checkoutController.getCheckoutById
);
Router.post("/", checkoutController.createCheckout);
Router.patch(
  "/:id",
  middlewareRedis.clearCheckoutRedis,
  checkoutController.updateCheckout
);
Router.delete(
  "/:id",
  middlewareRedis.clearCheckoutRedis,
  //  middlewareAuth.isAdmin,
  checkoutController.deleteCheckout
);

module.exports = Router;
