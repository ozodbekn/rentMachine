
const {
    addImage,
    getAllImages,
} = require("../controllers/image.controller");
const express = require("express");
const router = express.Router();

router.post("/", addImage);
router.get("/", getAllImages);

module.exports = router;
