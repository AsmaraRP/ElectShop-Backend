const express = require("express");

const Router = express.Router();
const userRoutes = require("../modules/user/userRoutes");

Router.use("/user", userRoutes);

const productRoutes = require("../modules/product/productRoutes");
const checkoutRoutes = require("../modules/checkout/checkoutRoutes");
// const bookingRoutes = require("../modules/booking/bookingRoutes");

Router.use("/product", productRoutes);
Router.use("/checkout", checkoutRoutes);
// Router.use("/booking", bookingRoutes);

// Router.get("/hello", (request, response) => {
//   response.status(200);
//   response.send("Hello World");
// });

module.exports = Router;
