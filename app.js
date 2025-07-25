require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const { errors } = require("celebrate");
const router = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

// listen to port 3001
const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// Add connection event listeners
mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB successfully!");
});

mongoose.connection.on("error", (err) => {
  console.log("❌ MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Disconnected from MongoDB");
});

app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
