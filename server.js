const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const connectDB = require("./config/db");
// const logger = require("./middleware/logger");
const colors = require("colors");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
var cookieParser = require("cookie-parser");

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const uploadRoutes = require("./routes/uploadRoutes");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use(logger);
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(errorHandler);

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
