const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./routes/bootcamps");

dotenv.config({ path: "./config/.env" });

const app = express();

app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
