const express = require("express");
const router = express.Router();

const { addReview, getAllReviews, getReviewById, updateReview, deleteReview } = require("../controllers/review.controller");

router.post("/add", addReview);
router.get("/all", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;    