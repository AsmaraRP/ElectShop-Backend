const connection = require("../../config/mysql");

module.exports = {
  getUserByUserId: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT 
        users.id,
        users.fullName,
        users.address, 
        users.noTelp,
        users.birthDay,
        users.gender,
        users.email,
        users.image,
        users.status,
        users.role,
        FROM users WHERE id=?`,
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
  updateProfile: (id, data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE users SET ? WHERE id = ?",
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
};
