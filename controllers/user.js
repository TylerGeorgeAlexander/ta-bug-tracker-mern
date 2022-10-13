const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Bug = require("../models/Bug");
const Comment = require("../models/Comment");

module.exports = {
  addProfilePicture: async (req, res) => {
    try {
      // Upload image to cloudinary
      let result = null;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }

      //   console.log(JSON.stringify(req.body));
      //   console.log(JSON.stringify(req.file));
      //   console.log(JSON.stringify(req.file.path));

      await User.findOneAndUpdate(
        { _id: req.body.id },
        {
          profilePicture: result ? result.secure_url : null,
          cloudinaryId: result ? result.public_id : null,
        }
      );
      console.log("Profile Picture has been added!");
      res.status(200).send("Profile Picture has been added");
    } catch (err) {
      console.log(err);
    }
  },
  likeBug: async (req, res) => {
    try {
      await Bug.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/bug/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
};
