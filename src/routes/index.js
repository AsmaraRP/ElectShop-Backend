const express = require("express");

const Router = express.Router();

const productRoutes = require("../modules/product/productRoutes");
// const scheduleRoutes = require("../modules/schedule/schedulesRoutes")
// const bookingRoutes = require("../modules/booking/bookingRoutes");

Router.use("/product", productRoutes);
// Router.use("/schedule", scheduleRoutes)
// Router.use("/booking", bookingRoutes);

// Router.get("/hello", (request, response) => {
//   response.status(200);
//   response.send("Hello World");
// });

module.exports = Router;
