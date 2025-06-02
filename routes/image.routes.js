
const {
    addImage,
    getAllImages,
    getImageById,
    updateImageById,
    deleteImageById,
} = require("../controllers/image.controller");
const express = require("express");
const router = express.Router();

router.post("/", addImage);
router.get("/", getAllImages);
router.get("/:id", getImageById);
router.put("/:id", updateImageById);
router.delete("/:id", deleteImageById);

module.exports = router;
