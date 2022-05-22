const { v4: uuidv4 } = require("uuid");
const helperWrapper = require("../../helpers/wrapper");
const helperMidtrans = require("../../helpers/midtrans");
const transactionModel = require("./transactionModel");

module.exports = {
  createTransaction: async (request, response) => {
    try {
      const data = request.body;
      const dataCreate = {
        // id: uuidv4(),
        ...data,
        statusPayment: "Yet Paid",
      };
      const result = await transactionModel.createTransaction(dataCreate);

      const setDataMidtrans = {
        id: result.id,
        total: result.totalPrice,
      };
      const resultMidtrans = await helperMidtrans.post(setDataMidtrans);

      return helperWrapper.response(response, 200, "Success post data !", {
        id: result.id,
        ...request.body,
        redirectUrl: resultMidtrans.redirect_url,
      });
    } catch (error) {
      console.log(error);
      return helperWrapper.response(response, 404, "Bad request", null);
    }
  },
  updateStatusTansaction: async (request, response) => {
    try {
      const { id } = request.params;
      const { statusDelivery } = request.body;
      const resultBookingId = await transactionModel.getTransactionById(id);

      if (resultBookingId.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by Id = ${id} not found`,
          null
        );
      }
      const newData = {
        statusDelivery,
        update_at: new Date(Date.now()),
      };
      const result = await transactionModel.updateStatusTransaction(
        id,
        newData
      );
      return helperWrapper.response(
        response,
        200,
        "succes update data !",
        result
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(response, 404, "Bad request", null);
    }
  },
  getAllSuccessTransaction: async (request, response) => {
    try {
      let { page, limit } = request.query;
      page = Number(page);
      limit = Number(limit);
      page = page || 1;
      limit = limit || 3;
      const offset = page * limit - limit;
      let totalData = await transactionModel.getCountTransactionSuccess();
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      let result = await transactionModel.getAllSuccessTransactionSuccess(
        limit,
        offset
      );

      const newResult = await Promise.all(
        result.map(async (data, index) => {
          const id = data.checkoutId.split(",")[0];
          let address = await transactionModel.getAddressByCheckoutId(id);
          if (address.length >= 0) {
            address = address[0].addressDelivery;
            let addressLength = address.split(" ").length;
            address = address.split(" ")[addressLength - 1];
          }
          address = "";
          return {
            ...result[index],
            address: address,
            totalProduct: result[index].checkoutId.split(",").length,
          };
        })
      );
      return helperWrapper.response(
        response,
        200,
        "succes get data !",
        newResult,
        pageInfo
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(response, 404, "Bad request", null);
    }
  },
  deleteTransaction: async (request, response) => {
    try {
      const { id } = request.params;
      const resultMovieId = await transactionModel.getTransactionById(id);

      if (resultMovieId.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by Id = ${id} not found`,
          null
        );
      }

      const result = await movieModel.deleteTransaction(id);
      return helperWrapper.response(
        response,
        200,
        "succes delete data !",
        result
      );
    } catch (error) {
      return helperWrapper.response(response, 404, "Bad request", null);
    }
  },
  postMidtransNotification: async (request, response) => {
    try {
      const result = await helperMidtrans.notif(request.body);
      const orderId = result.order_id;
      const transactionStatus = result.transaction_status;
      const fraudStatus = result.fraud_status;
      const paymentType = result.payment_type;
      console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      );

      if (transactionStatus === "capture") {
        if (fraudStatus === "challenge") {
          const setData = {
            paymentMethod: paymentType,
            statusPayment: "PENDING",
            updatedAt: new Date(Date.now()),
          };
          const resultUpdate = await transactionModel.updateStatusTransaction(
            orderId,
            setData
          );
          return helperWrapper.response(
            response,
            200,
            "succes get data !",
            resultUpdate
          );
        }
        if (fraudStatus === "accept") {
          const setData = {
            paymentMethod: paymentType,
            statusPayment: "SUCCESS",
            updatedAt: new Date(Date.now()),
          };
          const resultUpdate = await transactionModel.updateStatusTransaction(
            orderId,
            setData
          );
          return helperWrapper.response(
            response,
            200,
            "succes get data !",
            resultUpdate
          );
        }
      } else if (transactionStatus === "settlement") {
        const setData = {
          paymentMethod: paymentType,
          statusPayment: "SUCCESS",
          updatedAt: new Date(Date.now()),
        };
        const resultUpdate = await transactionModel.updateStatusTransaction(
          orderId,
          setData
        );
        return helperWrapper.response(
          response,
          200,
          "succes get data !",
          resultUpdate
        );
      } else if (transactionStatus === "deny") {
        const setData = {
          paymentMethod: paymentType,
          statusPayment: "FAILED",
          updatedAt: new Date(Date.now()),
        };
        const resultUpdate = await transactionModel.updateStatusTransaction(
          orderId,
          setData
        );
        return helperWrapper.response(
          response,
          200,
          "succes get data !",
          resultUpdate
        );
      } else if (
        transactionStatus === "cancel" ||
        transactionStatus === "expire"
      ) {
        const setData = {
          paymentMethod: paymentType,
          statusPayment: "FAILED",
          updatedAt: new Date(Date.now()),
        };
        const resultUpdate = await transactionModel.updateStatusTransaction(
          orderId,
          setData
        );
        return helperWrapper.response(
          response,
          200,
          "succes get data !",
          resultUpdate
        );
      } else if (transactionStatus === "pending") {
        const setData = {
          paymentMethod: paymentType,
          statusPayment: "PENDING",
          updatedAt: new Date(Date.now()),
        };
        const resultUpdate = await transactionModel.updateStatusTransaction(
          orderId,
          setData
        );
        return helperWrapper.response(
          response,
          200,
          "succes get data !",
          resultUpdate
        );
      }
    } catch (error) {
      return helperWrapper.response(response, 404, "Bad Request", null);
    }
  },
};
