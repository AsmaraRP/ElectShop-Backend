const connection = require("../../config/mysql");

module.exports = {
  createTransaction: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO transaction SET ?",
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
    }),
  getTransactionById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM transaction WHERE id=?",
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

  updateStatusTransaction: (id, data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE transaction SET ? WHERE id = ?",
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
  getCountTransactionSuccess: () =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM transaction WHERE statusPayment = 'success'`,
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
  getAllSuccessTransactionSuccess: (limit, offset) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM transaction WHERE statusPayment = 'success' ORDER BY created_at LIMIT ? OFFSET ?`,
        [limit, offset],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
  getAddressByCheckoutId: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT addressDelivery FROM checkout WHERE id=?`,
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
  deleteTransaction: (id) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM transaction WHERE id=?", id, (error) => {
        if (!error) {
          resolve(id);
        } else {
          reject(new Error(error.sqlMessage));
        }
      });
    }),
};
