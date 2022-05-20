const express = require("express");

const Router = express.Router();

const userController = require("./userController");
const middlewareProfile = require("../../middleware/uploadProfile");
// const middlewareAuth = require("../../middleware/auth");

Router.get("/:id", userController.getUserByUserId);
Router.patch("/profile/:id", middlewareProfile, userController.updateProfile);
// Router.patch("/password/:id", userController.updatePassword);

module.exports = Router;
