const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const connectDB = require("./config/db");
// const logger = require("./middleware/logger");
const colors = require("colors");
const morgan = require("morgan");

const bootcamps = require("./routes/bootcamps");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logger);
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

// handle unhandle process rejections
process.on("unhandleRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //close server and exit process
  // server.close(() => process.exit(1));
});
