const ClothingItems = require("../models/clothingItems");
const ForbiddenError = require("../errors/forbiddenError");

module.exports.getItems = (req, res, next) => {
  ClothingItems.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => next(err));
};

module.exports.postItems = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItems.create({ name, weather, imageUrl, owner })
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => next(err));
};

module.exports.deleteItem = (req, res, next) => {
  ClothingItems.findById(req.params.id)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(
          "You can't delete this item because you are not the owner."
        );
      }
      return ClothingItems.findByIdAndDelete(req.params.id).orFail();
    })
    .then((deletedItem) => res.send({ data: deletedItem }))
    .catch((err) => next(err));
};

module.exports.likeItems = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => next(err));
};

module.exports.dislikeItems = (req, res, next) => {
  ClothingItems.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => next(err));
};
