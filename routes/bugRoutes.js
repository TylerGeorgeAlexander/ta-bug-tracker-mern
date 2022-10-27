const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const bugController = require("../controllers/bug");
const { verifyUser } = require("../middleware/authenticate");

//Bug Routes - simplified for now
// router.get("/:id",  bugController.getBug);

// TODO verifyUser on production
// router.get("/getFeed", verifyUser, bugController.getFeed);
router.get("/getFeed", bugController.getFeed);

router.get("/getBug/:bugId", verifyUser, bugController.getBug);

router.post("/createBug", upload.single("file"), bugController.createBug);

router.put("/likeBug/:id", bugController.likeBug);

router.put("/resolveBug/:id", bugController.resolveBug);

router.put("/assignBug/:bugId", bugController.assignBug);

// const UPLOAD_ENDPOINT = `http://localhost:8081/bug/editPriority/${id}`;
router.put("/editPriority/:bugId", bugController.editPriorityBug);

router.put("/editDescription/:bugId", bugController.editDescriptionBug);

router.delete("/deleteBug/:id", bugController.deleteBug);

module.exports = router;
