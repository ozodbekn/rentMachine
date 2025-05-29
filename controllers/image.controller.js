const { sendErrorResponse } = require("../helpers/send_error_response");
const Image = require("../models/image.model");
const addImage = async (req, res) => {
    try {
        const { machineId } = req.params;
        const { image } = req.body;
        const newImage = await Image.create({ machineId, image_url: image });
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

module.exports = {
    addImage,
    getAllImages
}