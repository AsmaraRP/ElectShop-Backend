const express = require("express");

const Router = express.Router();

const productController = require("./productController");
const middlewareAuth = require("../../middleware/auth");
const middlewareUpload = require("../../middleware/uploadProduct");
const middlewareRedis = require("../../middleware/redis");

Router.get("/", productController.getAllProduct);
Router.get(
  "/:id",
  middlewareRedis.getProductByIdRedis,
  productController.getProductById
);
Router.post(
  "/",
  middlewareAuth.authentication,
  middlewareRedis.clearProductRedis,
  middlewareAuth.isAdmin,
  middlewareUpload,
  productController.createProduct
);
Router.patch(
  "/:id",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareUpload,
  middlewareRedis.clearProductRedis,
  productController.updateProduct
);
Router.delete(
  "/:id",
  middlewareAuth.authentication,
  middlewareRedis.clearProductRedis,
  middlewareAuth.isAdmin,
  productController.deleteProduct
);

// Router.get("/hello", (request, response) => {
//   response.status(200);
//   response.send("Hello World");
// });

module.exports = Router;
