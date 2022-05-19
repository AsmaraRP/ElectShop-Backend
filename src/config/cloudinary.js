const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "elecshop",
  api_key: "129212246345648",
  api_secret: "Zj6qmcULe1En6o8aqo_8sz4YgiY",
});

module.exports = cloudinary;
