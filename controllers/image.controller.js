const { sendErrorResponse } = require("../helpers/send_error_response");
const Image = require("../models/image.model");
const addImage = async (req, res) => {
    try {
        const {machineId, image_url } = req.body;
        const newImage = await Image.create({ machineId, image_url });
        res.status(201).send({ message: "Yangi rasm qo'shildi", newImage });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}       

const getAllImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).send({ images });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const getImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);
        res.status(200).send({ image });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const updateImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const { machineId, image_url } = req.body;
        const image = await Image.findByPk(id);
        image.machineId = machineId;
        image.image_url = image_url;
        await image.save();
        res.status(200).send({ image });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const deleteImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);
        await image.destroy();
        res.status(200).send({ message: "Rasm o'chirildi" });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

module.exports = {
    addImage,
    getAllImages    ,
    getImageById,
    updateImageById,
    deleteImageById
}