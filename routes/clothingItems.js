const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItems,
  postItems,
  deleteItem,
  likeItems,
  dislikeItems,
} = require("../controllers/clothingItems");

router.get("/items", getItems);
router.post("/items", auth, postItems);
router.delete("/items/:id", auth, deleteItem);

router.put("/items/:itemId/likes", auth, likeItems);
router.delete("/items/:itemId/likes", auth, dislikeItems);

module.exports = router;
