const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Bug = require("../models/Bug");
const Comment = require("../models/Comment");

module.exports = {
  profilePicture: async (req, res) => {
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
  editProfile: async (req, res) => {
    try {
      console.log(JSON.stringify(req.body));
      console.log(req.params.id);
      //   console.log(JSON.stringify(req.file));
      //   console.log(JSON.stringify(req.file.path));

      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          //   profilePicture: result ? result.secure_url : null,
          //   cloudinaryId: result ? result.public_id : null,
          username: req.body.username ? req.body.username : null,
          firstName: req.body.firstName ? req.body.firstName : null,
          lastName: req.body.lastName ? req.body.lastName : null,
        }
      );
      console.log("Edit Profile has been successful!");
      res.status(200).send("Edit Profile has been successful!");
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
