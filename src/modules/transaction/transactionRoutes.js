const express = require("express");

const Router = express.Router();

const transactionController = require("./transactionController");
const middlewareAuth = require("../../middleware/auth");

Router.post(
  "/",
  middlewareAuth.authentication,
  transactionController.createTransaction
);
Router.patch(
  "/delivery/:id",
  middlewareAuth.authentication,
  transactionController.updateStatusTansaction
);
Router.get(
  "/success/",
  middlewareAuth.authentication,
  transactionController.getAllSuccessTransaction
);
Router.post(
  "/midtrans-notification",
  transactionController.postMidtransNotification
);
Router.delete("/delete/:id", transactionController.deleteTransaction);

module.exports = Router;
