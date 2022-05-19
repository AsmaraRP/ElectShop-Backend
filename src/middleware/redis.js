const redis = require("../config/redis");
const helperWrapper = require("../helpers/wrapper");

module.exports = {
  getProductByIdRedis: async (request, response, next) => {
    try {
      const { id } = request.params;
      let result = await redis.get(`getProduct:${id}`);
      if (result !== null) {
        // console.log("data ada di dalam redis");
        result = JSON.parse(result);
        return helperWrapper.response(
          response,
          200,
          "Success get data !",
          result
        );
      }
      //   console.log("data tidak ada di dalam redis");
      return next();
    } catch (error) {
      return helperWrapper.response(response, 400, error.message, null);
    }
  },
  getProductRedis: async (request, response, next) => {
    try {
      const data = await redis.get(
        `getProduct:${JSON.stringify(request.query)}`
      );
      if (data !== null) {
        const { result, pageInfo } = JSON.parse(data);
        return helperWrapper.response(
          response,
          200,
          "Success get data !",
          result,
          pageInfo
        );
      }
      return next();
    } catch (error) {
      return helperWrapper.response(response, 400, error.message, null);
    }
  },
  clearProductRedis: async (request, response, next) => {
    try {
      const keys = await redis.keys("getProduct:*");
      if (keys.length > 0) {
        keys.forEach(async (element) => {
          // console.log(element);
          await redis.del(element);
        });
      }
      return next();
    } catch (error) {
      return helperWrapper.response(response, 400, error.message, null);
    }
  },
  getCheckoutByIdRedis: async (request, response, next) => {
    try {
      const { id } = request.params;
      let result = await redis.get(`getCheckout:${id}`);
      if (result !== null) {
        // console.log("data ada di dalam redis");
        result = JSON.parse(result);
        return helperWrapper.response(
          response,
          200,
          "Success get data !",
          result
        );
      }
      //   console.log("data tidak ada di dalam redis");
      return next();
    } catch (error) {
      return helperWrapper.response(response, 400, error.message, null);
    }
  },
  getCheckoutRedis: async (request, response, next) => {
    try {
      const data = await redis.get(
        `getCheckout:${JSON.stringify(request.query)}`
      );
      if (data !== null) {
        const { result, pageInfo } = JSON.parse(data);
        return helperWrapper.response(
          response,
          200,
          "Success get data !",
          result,
          pageInfo
        );
      }
      return next();
    } catch (error) {
      return helperWrapper.response(response, 400, error.message, null);
    }
  },
  clearCheckoutRedis: async (request, response, next) => {
    try {
      const keys = await redis.keys("getCheckout:*");
      if (keys.length > 0) {
        keys.forEach(async (element) => {
          // console.log(element);
          await redis.del(element);
        });
      }
      return next();
    } catch (error) {
      return helperWrapper.response(response, 400, error.message, null);
    }
  },
};
