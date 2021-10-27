const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

//defining swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PastBook API",
      version: "1.0.0",
      description: "NodeJS/ExpressJS server for a photo gallery",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: ["./src/route/*.js", "./src/model/*.js"],
};

const openApiSpecification = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openApiSpecification));

app.use(cors());
app.use(express.json());

//Import routes
const authRoute = require("../route/auth");
const userRoute = require("../route/user");
const galleryRoute = require("../route/gallery");

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/gallery", galleryRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
