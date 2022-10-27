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
        .populate("user")
        // .exec(function (err, bugs) {
        //   // do stuff with user
        // })
        .sort({ createdAt: "desc" })
        .lean();

      const users = await User.find();

      // const users = await User.find();
      console.log("getFeed");
      res.send({ bugs: bugs, users });
    } catch (err) {
      console.log(err);
    }
  },
  getBug: async (req, res) => {
    try {
      const bug = await Bug.findById(req.params.bugId);
      const users = await User.find();
      const comments = await Comment.find({ bug: req.params.bugId });
      res.send({ bug: bug, users, comments: comments });
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
        resolved: "no",
        //openedDate is defaulted in schema
      });
      console.log("Bug has been added!");
      res.status(200).send("Bug has been added");
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: "This is an error!",
      });
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
  resolveBug: async (req, res) => {
    const bug = await Bug.findById(req.params.id);
    try {
      bug.resolved === "no"
        ? await Bug.findOneAndUpdate({ _id: req.params.id }, [
            { $set: { resolved: "yes" } },
          ])
        : await Bug.findOneAndUpdate({ _id: req.params.id }, [
            { $set: { resolved: "no" } },
          ]);
      console.log("Bug resolved status has been changed!");
      res.status(200).send("Bug resolved status has been changed!");
    } catch (err) {
      console.log(err);
    }
  },
  editPriorityBug: async (req, res) => {
    // const bug = await Bug.findById(req.params.bugId);
    console.log(JSON.stringify(req.body));
    console.log(req.params.bugId);
    try {
      await Bug.findOneAndUpdate({ _id: req.params.bugId }, [
        { $set: { priority: req.body.priority } },
      ]);
      console.log("Bug priority status has been changed!");
      res.status(200).send("Bug priority status has been changed!");
    } catch (err) {
      console.log(err);
    }
  },
  // editBugName
  editBugName: async (req, res) => {
    // const bug = await Bug.findById(req.params.bugId);
    console.log(JSON.stringify(req.body));
    console.log(req.params.bugId);
    try {
      await Bug.findOneAndUpdate({ _id: req.params.bugId }, [
        { $set: { name: req.body.name } },
      ]);
      console.log("Bug name has been changed!");
      res.status(200).send("Bug name has been changed!");
    } catch (err) {
      console.log(err);
    }
  },

  // editDescriptionBug
  editDescriptionBug: async (req, res) => {
    // const bug = await Bug.findById(req.params.bugId);
    console.log(JSON.stringify(req.body));
    console.log(req.params.bugId);
    try {
      await Bug.findOneAndUpdate({ _id: req.params.bugId }, [
        { $set: { description: req.body.description } },
      ]);
      console.log("Bug description has been changed!");
      res.status(200).send("Bug description has been changed!");
    } catch (err) {
      console.log(err);
    }
  },
  assignBug: async (req, res) => {
    console.log("assignBug controller", req.body);
    try {
      await Bug.findOneAndUpdate(
        { _id: req.params.bugId },
        { assignedTo: req.body.assignedTo }
      );
      console.log("Bug has been assigned!");
      res.status(200).send("Bug has been assigned!");
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
