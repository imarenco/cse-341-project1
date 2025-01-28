const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Twitter Api",
    description: "Twitter Api",
  },
  host: "https://cse-341-project1-t292.onrender.com",
  schemes: ['https']
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
