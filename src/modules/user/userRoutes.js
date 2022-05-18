const express = require("express");

const Router = express.Router();

const userController = require("./userController");
const middlewareProfile = require("../../middleware/uploadProfile");
const middlewareAuth = require("../../middleware/auth");

Router.get(
  "/:id",
  middlewareAuth.authentication,
  userController.getUserByUserId
);
Router.patch(
  "/profile/:id",
  middlewareAuth.authentication,
  middlewareProfile,
  userController.updateProfile
);

Router.patch(
  "/password/:id",
  middlewareAuth.authentication,
  userController.updatePassword
);

module.exports = Router;
