const Review = require("../models/review.model");
const sendErrorResponse = require("../helpers/send_error_response");

const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.create({
            rating,
            comment,
        });
        res.status(201).send({ message: "Review added", review });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).send({ message: "Reviews", reviews });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        res.status(200).send({ message: "Review", review });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).send({ message: "Review not found" });
        }
        const { rating, comment } = req.body;
        review.rating = rating;
        review.comment = comment;
        await review.save();
        res.status(200).send({ message: "Review updated", review });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).send({ message: "Review not found" });
        }
        await review.destroy();
        res.status(200).send({ message: "Review deleted" });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

module.exports = {
    addReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
};
