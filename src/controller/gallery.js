const Gallery = require("../model/gallery");
const User = require("../model/user");

exports.getAllImages =   async (req, res) => {
  try {
    const collection = await Gallery.find();
    console.log("gallery/ get router success");
    res.status(200).json(collection);
  } catch (error) {
    console.log("gallery/ get router failed!!!");
    res.json({ message: error });
  }
}

exports.getImageById = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (user == null)
      return res.status(400).json({ message: "Cannot find user" });

    //get the sorted gallery objects with id and url
    const sortImageIDUrlList = await getSortedImages(user.images);

    console.log("gallery/image post router success");

    res.status(200).json({
      userImages: sortImageIDUrlList,
    });
  } catch (error) {
    console.log("gallery/image post router failed!!!");
    res.json({ message: error });
  }
}

exports.updateImageById = async (req, res) => {
  try {
    const updateDoc = await Gallery.updateOne(
      { _id: req.params.id },
      { $set: { url: req.body.url } }
    );
    console.log("gallery/ patch router success");
    res.status(200).json(updateDoc);
  } catch (error) {
    console.log("gallery/ patch router failed!!!");
    res.json({ message: error });
  }
}

const getSortedImages= exports.getSortedImages = async (userImages) => {
  try {
    //get gallery matching ids in the userImages
    const imageIDUrlList = await Gallery.find({ _id: { $in: userImages } });

    //sorting of imageIDUrlList matching to the order of userImages
    const arrayMap = imageIDUrlList.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue._id]: currentValue,
      }),
      {}
    );

    return userImages.map((key) => arrayMap[key]);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
