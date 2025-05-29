const ClothingItems = require("../models/clothingItems");
const { handleError } = require("../utils/errors");

module.exports.getItems = (req, res) => {
  ClothingItems.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => handleError(err, res));
};

module.exports.postItems = (req, res) => {
  const { itemName, weatherType, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItems.create({ itemName, weatherType, imageUrl, owner })
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => handleError(err, res));
};

module.exports.deleteItem = (req, res) => {
  ClothingItems.findByIdAndRemove(req.params.itemId)
    .orFail()
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => handleError(err, res));
};

module.exports.likeItems = (req, res) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => handleError(err, res));
};

module.exports.dislikeItems = (req, res) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => handleError(err, res));
};
