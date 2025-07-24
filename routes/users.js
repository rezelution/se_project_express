const router = require("express").Router();
const auth = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");

const { getCurrentUser, updateProfile } = require("../controllers/users");

router.use(auth);
router.get("/users/me", getCurrentUser);
router.patch("/users/me", validateUserUpdate, updateProfile);

module.exports = router;
