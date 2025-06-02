const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { SOME_ERROR_CODE } = require("./utils/errors");

// listen to port 3001
const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: "68376f25c02de3236bd98b80",
  };
  next();
});

app.use("/", require("./routes/users"));
app.use("/", require("./routes/clothingItems"));

app.use((req, res) => {
  res.status(SOME_ERROR_CODE.NOT_FOUND).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
