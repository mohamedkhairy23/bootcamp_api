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
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const analytics = require("./routes/analytics");
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

///////////////////Code Below For Security///////////

// Prevent NoSQL Injection & Sanitize Data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent cross site scripting attacks (XSS attacks)
app.use(xss());

// Rate Limiting (100 requests per 10 mins)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100, // 100 requests
});
app.use(limiter);

// Prevent HTTP parameter pollution attacks (hpp attacks)
app.use(hpp());

// Enable CORS
app.use(cors());

///////////////////Code Above For Security///////////

app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/analytics", analytics);
app.use("/api/v1/upload", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "development") {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}

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
