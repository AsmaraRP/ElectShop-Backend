const connection = require("../../config/mysql");

module.exports = {
  getCountCheckout: (searchProductId, searchUserId, rating, statusCart) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT (*) AS total FROM product INNER JOIN checkout ON checkout.productId = product.id WHERE ${
          searchProductId === ""
            ? `product.id LIKE '%%'`
            : `product.id = '${searchProductId}'`
        }
         ${
           searchUserId === null
             ? "AND"
             : `AND checkout.userId LIKE '%${searchUserId}%' AND`
         }
         ${rating !== null ? "" : `checkout.rating LIKE '%${rating}%' AND`}    
        checkout.statusCart LIKE '${statusCart}';`,
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
  getAllCheckout: (
    searchProductId,
    searchUserId,
    rating,
    statusCart,
    limit,
    offset
  ) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product INNER JOIN checkout ON checkout.productId = product.id WHERE ${
          searchProductId === ""
            ? `product.id LIKE '%%'`
            : `product.id = '${searchProductId}'`
        }
         ${
           searchUserId === null
             ? "AND"
             : `AND checkout.userId LIKE '%${searchUserId}%' AND`
         }
         ${rating !== null ? "" : `checkout.rating LIKE '%${rating}%' AND`}  
        checkout.statusCart LIKE '${statusCart}' LIMIT ${limit} OFFSET ${offset};`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
  getCheckoutById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product INNER JOIN checkout ON checkout.productId = product.id WHERE checkout.id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
  getCheckoutByProductIdAndUserId: (productId, userId) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM checkout WHERE productId = ? AND userId=? AND statusCart ='active'",
        [productId, userId],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
  createCheckout: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO checkout SET ?",
        data,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
      // eslint-disable-next-line no-console
      console.log(query.sql);
    }),
  updateCheckout: (id, data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE checkout SET ? WHERE id = ?",
        [data, id],
        (error) => {
          if (!error) {
            const newResult = {
              id,
              ...data,
            };
            resolve(newResult);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
  deleteCheckout: (id) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM checkout WHERE id = ?", id, (error) => {
        if (!error) {
          const newResult = {
            id,
          };
          resolve(newResult);
        } else {
          reject(new Error(error.sqlMessage));
        }
      });
    }),
};
