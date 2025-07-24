const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const NotFoundError = require("../errors/notFoundError");
const auth = require("../middlewares/auth");
const {
  validateUserCreation,
  validateUserLogin,
} = require("../middlewares/validation");

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserCreation, createUser);

router.use("/", require("./clothingItems"));

router.use(auth);
router.use("/", require("./users"));

router.use((req, res, next) =>
  next(new NotFoundError("Requested resource not found."))
);

module.exports = router;
