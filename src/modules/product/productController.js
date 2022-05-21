/* eslint-disable no-self-assign */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
const redis = require("../../config/redis");
const helperWrapper = require("../../helpers/wrapper");
const cloudinary = require("../../config/cloudinary");
// --
const productModel = require("./productModel");
// --
module.exports = {
  getAllProduct: async (request, response) => {
    try {
      let { page, limit, searchType, searchName, sort } = request.query;
      // default value
      page = isNaN(page) || page === "" ? (page = 1) : (page = Number(page));
      limit =
        isNaN(limit) || limit === "" ? (limit = 12) : (limit = Number(limit));

      typeof searchType === "string"
        ? (searchType = searchType)
        : (searchType = "");
      typeof sort !== "string" || sort === ""
        ? (sort = "id ASC")
        : (sort = sort); // harus sesuai dengan objek, kalo tidak ada bakal error

      const totalData = await productModel.getCountProduct(
        searchName,
        searchType
      );
      const offset = page * limit - limit;
      const totalPage = Math.ceil(totalData / limit);

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await productModel.getAllProduct(
        searchName,
        searchType,
        sort,
        limit,
        offset
      );

      if (result.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Search '${searchType}' Type in '${searchName}'product is not found`,
          null
        );
      }
      redis.setEx(
        `getProduct:${JSON.stringify(request.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      );

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
  getProductById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await productModel.getProductById(id);

      if (result.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by id ${id} not found`,
          null
        );
      }

      redis.setEx(`getProduct: ${id}`, 3600, JSON.stringify(result));

      return helperWrapper.response(
        response,
        200,
        "Success get data !",
        result
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(response, 400, "Bad Request", null);
    }
  },
  createProduct: async (request, response) => {
    try {
      const { name, type, description, price, stock } = request.body;
      console.log(request.files);
      let image;

      // console.log(request.file.nametype);
      // const extImage2 = request.file.mimetype.split("/")[1];
      // const nameImage2 = request.file.filename;
      // const setImage2 = `${nameImage2}.${extImage2}`;
      console.log(request.files.nametype);
      if (request.files) {
        if (request.files.size > 10000000) {
          await request.files.map((item) =>
            cloudinary.uploader.destroy(`${item.filename}`, (delresult) => {
              console.log(delresult);
            })
          );
          return helperWrapper.response(
            response,
            400,
            "total size image cannot be more than 10mb",
            null
          );
        }
        const Allimage = request.files.map((item) => item.filename);
        image = Allimage.join(",");
      } else {
        image = "";
      }

      const setData = {
        name,
        type,
        description,
        price,
        stock,
        image,
        created_at: new Date(Date.now()),
      };
      const result = await productModel.createProduct(setData);
      return helperWrapper.response(
        response,
        200,
        "Success create data !",
        result
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(response, 400, "Bad Request", null);
    }
  },

  updateProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const { name, type, description, price, stock } = request.body;
      let image;
      console.log(request.files);

      if (request.files) {
        const arrayTypeImage = request.files.map(
          (item) => item.mimetype.split("/")[1]
        );
        if (request.files.size > 10000000) {
          await request.files.map((item) =>
            cloudinary.uploader.destroy(`${item.filename}`, (delresult) => {
              console.log(delresult);
            })
          );
          return helperWrapper.response(
            response,
            400,
            "All image size cannot be more than 10mb",
            null
          );
        }
        const imageDelete = await productModel.getProductById(id);
        if (imageDelete[0].image.length > 0) {
          let imageAll = imageDelete[0].image.split(",");
          await imageAll.map((item) =>
            cloudinary.uploader.destroy(`${item}`, (delresult) => {
              console.log(delresult);
            })
          );
        }
        const Allimage = request.files.map((item) => item.filename);
        image = Allimage.join(",");
      }
      const setData = {
        name,
        type,
        description,
        price,
        stock,
        image,
        update_at: new Date(Date.now()),
      };

      // eslint-disable-next-line no-restricted-syntax
      for (const data in setData) {
        if (!setData[data]) {
          delete setData[data];
        }
      }

      const result = await productModel.updateProduct(id, setData);

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
  deleteProduct: async (request, response) => {
    try {
      const { id } = request.params;
      const data = await productModel.getProductById(id);

      if (data.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by id ${id} not found`,
          null
        );
      }
      if (data[0].image.length > 0) {
        await data[0].image.split(",").map((item) =>
          cloudinary.uploader.destroy(`${item}`, (delresult) => {
            console.log(delresult);
          })
        );
      }

      const result = await productModel.deleteProduct(id);

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
