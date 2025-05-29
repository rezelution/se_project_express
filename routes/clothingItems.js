const router = require("express").Router();

const {
  getItems,
  postItems,
  deleteItem,
  likeItems,
  dislikeItems,
} = require("../controllers/clothingItems");

router.get("/items", getItems);
router.post("/items", postItems);
router.delete("/items/:id", deleteItem);

router.put("/items/:itemId/likes", likeItems);
router.delete("/items/:itemId/likes", dislikeItems);

module.exports = router;
