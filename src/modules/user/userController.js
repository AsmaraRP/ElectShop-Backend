const bcrypt = require("bcrypt");
const helperWrapper = require("../../helpers/wrapper");
const userModel = require("./userModel");
const cloudinary = require("../../config/cloudinary");
const redis = require("../../config/redis");

module.exports = {
  getUserByUserId: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await userModel.getUserByUserId(id);

      if (result.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by Id = ${id} not found`,
          null
        );
      }
      delete result[0].password;
      return helperWrapper.response(response, 200, "succes get data !", result);
    } catch (error) {
      return helperWrapper.response(response, 404, "Bad request", null);
    }
  },
  updateProfile: async (request, response) => {
    try {
      const { id } = request.params;
      let { fullName, address, noTelp, birthDay, gender, password } =
        request.body;
      const resultUserId = await userModel.getUserByUserId(id);

      if (resultUserId.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by Id= ${id} not found`,
          null
        );
      }
      if (resultUserId[0].image && request.file) {
        cloudinary.uploader.destroy(
          `${resultUserId[0].image.split(".")[0]}`,
          (error) => {
            if (error) {
              return helperWrapper.response(response, 404, error.message, null);
            }
          }
        );
      }
      if (password) {
        const resultPassword = await bcrypt.compare(
          password,
          resultUserId[0].password
        );
        if (resultPassword) {
          return helperWrapper.response(
            response,
            404,
            `password must be different`,
            null
          );
        }
        const saltRounds = 12;
        password = await bcrypt.hash(password, saltRounds);
      }

      const newData = {
        fullName,
        address,
        noTelp,
        birthDay,
        gender,
        image: request.file
          ? `${request.file.filename}.${request.file.mimetype.split("/")[1]}`
          : "",
        password,
        updated_at: new Date(Date.now()),
      };
      // eslint-disable-next-line no-restricted-syntax
      for (const data in newData) {
        if (!newData[data]) {
          delete newData[data];
        }
      }

      const result = await userModel.updateProfile(id, newData);

      delete result.password;
      return helperWrapper.response(
        response,
        200,
        "succes update data !",
        result
      );
    } catch (error) {
      return helperWrapper.response(response, 404, "Bad request", null);
    }
  },
};
