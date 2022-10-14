const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
    type: String,
    required: true,
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
    default: "low",
  },
  openedDate: {
    type: Date,
    default: Date.now,
  },
  resolved: {
    type: Boolean,
    required: true,
    default: false,
  },
  assignedTo: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Bug", BugSchema);
