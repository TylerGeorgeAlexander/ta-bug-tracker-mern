const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    required: true,
  },
  openedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bug", BugSchema);
