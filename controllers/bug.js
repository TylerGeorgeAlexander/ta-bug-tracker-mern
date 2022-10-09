const cloudinary = require("../middleware/cloudinary");
const Bug = require("../models/Bug");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const bugs = await Bug.find({ user: req.user.id });
      res.render("profile.ejs", { bugs: bugs, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const bugs = await Bug.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { bugs: bugs, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getBug: async (req, res) => {
    try {
      const bug = await Bug.findById(req.params.id);
      const comments = await Comment.find({ bug: req.params.id });
      res.render("bug.ejs", { bug: bug, user: req.user, comments: comments });
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

      await Bug.create({
        user: req.user.id,
        name: req.body.name,
        description: req.body.description,
        image: result ? result.secure_url : "/imgs/favicon.ico",
        cloudinaryId: result ? result.public_id : "/imgs/favicon.ico",
        priority: req.body.priority,
        //openedDate is defaulted in schema
      });
      console.log("Bug has been added!");
      res.redirect("/profile");
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
      await cloudinary.uploader.destroy(bug.cloudinaryId);
      // Delete bug from db
      await Bug.remove({ _id: req.params.id });
      console.log("Deleted Bug");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
