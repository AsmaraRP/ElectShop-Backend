const helperWrapper = require("../../helpers/wrapper");
const checkoutModel = require("./checkoutModel");
const redis = require("../../config/redis");

module.exports = {
  createCheckout: async (request, response) => {
    try {
      const id = "1";
      const {
        productId,
        addresDelivery,
        checkoutNote,
        productTotal,
        review,
        rating,
        statusCart,
      } = request.body;
      const setData = {
        productId,
        userId: id,
        addresDelivery,
        checkoutNote,
        productTotal,
        review,
        rating,
        statusCart,
      };
      const result = await checkoutModel.createCheckout(setData);
      return helperWrapper.response(
        response,
        200,
        "Success get data !",
        result
      );
    } catch (error) {
      return helperWrapper.response(response, 400, "Bad Request", null);
    }
  },
};
