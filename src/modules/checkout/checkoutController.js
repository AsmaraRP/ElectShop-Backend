const helperWrapper = require("../../helpers/wrapper");
const redis = require("../../config/redis");
// --
const checkoutModel = require("./checkoutModel");
// --
module.exports = {
  getAllCheckout: async (request, response) => {
    try {
      let { searchProductId, searchUserId, rating, statusCart, limit, page } =
        request.query;
      // default value
      page = isNaN(page) || page == "" ? (page = 1) : (page = Number(page));
      limit =
        isNaN(limit) || limit == "" ? (limit = 10) : (limit = Number(limit));

      searchProductId =
        isNaN(searchProductId) || searchProductId === ""
          ? (searchProductId = "")
          : (searchProductId = Number(searchProductId));
      searchUserId !== "" && typeof searchUserId === "string"
        ? (searchUserId = searchUserId)
        : (searchUserId = null);
      rating =
        isNaN(rating) || rating === 0
          ? (rating = "")
          : (rating = Number(rating));
      typeof statusCart === "string"
        ? (statusCart = statusCart)
        : (statusCart = "active");

      const offset = page * limit - limit;
      const totalData = await checkoutModel.getCountCheckout(
        searchProductId,
        searchUserId,
        rating,
        statusCart
      );
      const totalPage = Math.ceil(totalData / limit);

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await checkoutModel.getAllCheckout(
        searchProductId,
        searchUserId,
        rating,
        statusCart,
        limit,
        offset
      );
      console.log(searchProductId);

      // redis.setEx(
      //   `getCheckout:${JSON.stringify(request.query)}`,
      //   3600,
      //   JSON.stringify({ result, pageInfo })
      // );

      if (result.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `${
            searchProductId
              ? `Search checkout by product id ${searchProductId} is not found`
              : "Search checkout is not found"
          }`,
          null
        );
      }

      return helperWrapper.response(
        response,
        200,
        "Success get data !",
        result,
        pageInfo
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(response, 400, "Bad Request", null);
    }
  },
  getCheckoutById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await checkoutModel.getCheckoutById(id);

      if (result.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by id ${id} not found`,
          null
        );
      }
      redis.setEx(
        `getCheckout:${JSON.stringify(id)}`,
        3600,
        JSON.stringify({ result })
      );

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
  createCheckout: async (request, response) => {
    try {
      let {
        productId,
        addressDelivery,
        checkoutNote,
        productTotal,
        review,
        rating,
        statusCart,
      } = request.body;
      console.log(request.body);

      const user = request.decodeToken;
      const userId = user.id;
      productTotal = productTotal || 1;

      const setData = {
        productId,
        userId,
        addressDelivery,
        checkoutNote,
        productTotal,
        review,
        rating,
        statusCart: "active",
        created_at: new Date(Date.now()),
      };
      const resultCheckout =
        await checkoutModel.getCheckoutByProductIdAndUserId(productId, userId);
      if (resultCheckout.length <= 0) {
        const result = await checkoutModel.createCheckout(setData);
        return helperWrapper.response(
          response,
          200,
          "Success create data !",
          result
        );
      }
      setData.productTotal = Number(setData.productTotal);
      resultCheckout[0].productTotal = Number(resultCheckout[0].productTotal);
      setData.productTotal += resultCheckout[0].productTotal;
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }
      const result = await checkoutModel.updateCheckout(
        resultCheckout[0].id,
        setData
      );
      return helperWrapper.response(
        response,
        200,
        "Success update data !",
        result
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(response, 400, "Bad Request", null);
    }
  },
  updateCheckout: async (request, response) => {
    try {
      const { id } = request.params;
      const {
        addressDelivery,
        checkoutNote,
        productTotal,
        review,
        rating,
        statusCart,
      } = request.body;
      console.log(request.body);
      const setData = {
        addressDelivery,
        checkoutNote,
        productTotal,
        review,
        rating,
        statusCart,
        update_at: new Date(Date.now()),
      };

      // eslint-disable-next-line no-restricted-syntax
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }

      const result = await checkoutModel.updateCheckout(id, setData);

      return helperWrapper.response(
        response,
        200,
        "Success update data !",
        result
      );
    } catch (error) {
      return helperWrapper.response(response, 400, "Bad Request", null);
    }
  },
  deleteCheckout: async (request, response) => {
    try {
      const { id } = request.params;
      const data = await checkoutModel.getCheckoutById(id);

      if (data.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by id ${id} not found`,
          null
        );
      }
      const result = await checkoutModel.deleteCheckout(id);
      return helperWrapper.response(
        response,
        200,
        "Success delete data !",
        result
      );
    } catch (error) {
      return helperWrapper.response(response, 400, "Bad Request", null);
    }
  },
};
