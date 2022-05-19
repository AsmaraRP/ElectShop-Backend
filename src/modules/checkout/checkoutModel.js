const connection = require("../../config/mysql");

module.exports = {
  createCheckout: (data) =>
    new Promise((resolve, reject) => {
      console.log(data);
      //   connection.query("INSERT INTO checkout SET ?", data, (error, result) => {
      //     if (!error) {
      //       const newResult = {
      //         id: result.insertId,
      //         ...data,
      //       };
      //       resolve(newResult);
      //     } else {
      //       reject(new Error(error.sqlMessage));
      //     }
      //   });
    }),
};
