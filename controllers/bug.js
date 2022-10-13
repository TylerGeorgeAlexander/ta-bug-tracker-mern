const cloudinary = require("../middleware/cloudinary");
const Bug = require("../models/Bug");
const Comment = require("../models/Comment");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const bugs = await Bug.find({ user: req.user.id });
      res.send({ bugs: bugs, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const bugs = await Bug.find()
        .populate("user", "profilePicture")
        // .exec(function (err, bugs) {
        //   // do stuff with user
        // })
        .sort({ createdAt: "desc" })
        .lean();

      // const users = await User.find();
      console.log("getFeed");
      res.send({ bugs: bugs });
    } catch (err) {
      console.log(err);
    }
  },
  getBug: async (req, res) => {
    try {
      const bug = await Bug.findById(req.params.id);
      const comments = await Comment.find({ bug: req.params.id });
      res.send({ bug: bug, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createBug: async (req, res) => {
    try {
      // Upload image to cloudinary
      let result = null;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }

      // console.log(JSON.stringify(req.body));
      // console.log(JSON.stringify(req.file));
      // console.log(JSON.stringify(req.file.path));

      await Bug.create({
        user: req.body.id,
        createdBy: req.body.username,
        name: req.body.name,
        description: req.body.description,
        image: result ? result.secure_url : null,
        cloudinaryId: result ? result.public_id : null,
        priority: req.body.priority,
        //openedDate is defaulted in schema
      });
      console.log("Bug has been added!");
      res.status(200).send("Bug has been added");
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
  deleteBug: async (req, res) => {
    try {
      // Find bug by id
      let bug = await Bug.findById({ _id: req.params.id });
      // Delete image from cloudinary
      if (bug.cloudinaryId) {
        await cloudinary.uploader.destroy(bug.cloudinaryId);
      }
      // Delete bug from db
      await Bug.deleteOne({ _id: req.params.id });
      // console.log("Deleted Bug");
      res.status(200).send("Bug has been hard deleted.");
    } catch (err) {
      console.log(err);
    }
  },
};
