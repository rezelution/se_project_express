const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const { SOME_ERROR_CODE } = require("./utils/errors");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

// listen to port 3001
const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use(helmet());
app.use(cors());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);
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
