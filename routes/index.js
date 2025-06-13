const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const { SOME_ERROR_CODE } = require("../utils/errors");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/", require("./clothingItems"));

router.use(auth);
router.use("/", require("./users"));

router.use((req, res) => {
  res.status(SOME_ERROR_CODE.NOT_FOUND).send({
    message: "Requested resource not found",
  });
});

module.exports = router;
