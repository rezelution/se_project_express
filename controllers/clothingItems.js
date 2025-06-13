const ClothingItems = require("../models/clothingItems");
const { handleError } = require("../utils/errors");
const { SOME_ERROR_CODE } = require("../utils/errors");
const { SOME_ERROR_MSGS } = require("../utils/errors");

module.exports.getItems = (req, res) => {
  ClothingItems.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => handleError(err, res));
};

module.exports.postItems = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => handleError(err, res));
};

module.exports.deleteItem = (req, res) => {
  ClothingItems.findById(req.params.id)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        const error = new Error(SOME_ERROR_MSGS.forbidden);
        error.code = SOME_ERROR_CODE.FORBIDDEN;
        throw error;
      }
      return ClothingItems.findByIdAndDelete(req.params.id).orFail();
    })
    .then((deletedItem) => res.send({ data: deletedItem }))
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
