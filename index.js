const express = require("express");
const app = express();
const fs = require("fs");
let port = process.env.PORT || 3000;

// app.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Acland Anaotmy Video",
    version: "1.0.0",
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["index.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * /acland:
 *   get:
 *     description: Get all Videos
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.get("/acland", (req, res) => {
  fs.readFile("json/" + req.body.nameJSON, (err, data) => {
    if (err) throw err;
    let json = JSON.parse(data);
    res.send(json);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
