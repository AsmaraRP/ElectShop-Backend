const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const bodyParser = require("body-parser");
const routerNavigation = require("./routes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3001;
// const port = process.env.PORT;
// midleware
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(xss());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

//----
app.use("/", routerNavigation);
app.use("/*", (request, response) => {
  response.status(404).send("Path not found !");
});

app.listen(port, () => {
  console.log(`Express app is listen on port ${port} !`);
});
