const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const bugController = require("../controllers/bug");
const { verifyUser } = require("../middleware/authenticate");

//Bug Routes - simplified for now
// router.get("/:id",  bugController.getBug);

router.get("/getFeed", verifyUser, bugController.getFeed);

router.post("/createBug", upload.single("file"), bugController.createBug);

router.put("/likeBug/:id", bugController.likeBug);

router.delete("/deleteBug/:id", bugController.deleteBug);

module.exports = router;
