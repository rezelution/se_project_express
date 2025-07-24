const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateItemId,
  validateItemLikeId,
  validateCardCreation,
} = require("../middlewares/validation");

const {
  getItems,
  postItems,
  deleteItem,
  likeItems,
  dislikeItems,
} = require("../controllers/clothingItems");

router.get("/items", getItems);

router.use(auth);
router.post("/items", validateCardCreation, postItems);
router.delete("/items/:id", validateItemId, deleteItem);

router.put("/items/:itemId/likes", validateItemLikeId, likeItems);
router.delete("/items/:itemId/likes", validateItemLikeId, dislikeItems);

module.exports = router;
