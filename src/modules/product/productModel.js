const connection = require("../../config/mysql");

module.exports = {
  getCountProduct: (searchName, searchType) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT (*) AS total FROM product WHERE  ${
          searchName ? `name = "${searchName}" AND` : ""
        } type LIKE '%${searchType}%'`,
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
  getAllProduct: (searchName, searchType, sort, limit, offset) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM product WHERE ${
          searchName ? `name = "${searchName}" AND` : ""
        } type LIKE '%${searchType}%' 
        ORDER BY ${sort} LIMIT ${limit} OFFSET ${offset};`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error.sqlMessage));
          }
        }
      );
    }),
  getProductById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM product WHERE id = ?",
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
  createProduct: (data) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        "INSERT INTO product SET ?",
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
  updateProduct: (id, data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE product SET ? WHERE id = ?",
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
  deleteProduct: (id) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM product WHERE id = ?", id, (error) => {
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
