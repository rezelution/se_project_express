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

router.use(auth);
router.post("/items", postItems);
router.delete("/items/:id", deleteItem);

router.put("/items/:itemId/likes", likeItems);
router.delete("/items/:itemId/likes", dislikeItems);

module.exports = router;
