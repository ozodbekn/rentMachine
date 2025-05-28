const { sendErrorResponse } = require("../helpers/send_error_response");
const Comission = require("../models/comission.model");

const addComission = async (req, res) => {
    try {
        const { percent } = req.body;
        const newComission = await Comission.create({ percent });
        res.status(201).send({ message: "Yangi comission qo'shildi", newComission });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const getAllComission = async (req, res) => {
    try {
        const comissions = await Comission.findAll();
        res.status(200).send({ comissions });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const getComissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const comission = await Comission.findByPk(id);
        res.status(200).send({ comission });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const updateComissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const { percent } = req.body;
        const comission = await Comission.findByPk(id);
        comission.percent = percent;
        await comission.save();
        res.status(200).send({ comission });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const deleteComissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const comission = await Comission.findByPk(id);
        await comission.destroy();
        res.status(200).send({ message: "Comission o'chirildi" });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}   

module.exports = {
    addComission,
    getAllComission,
    getComissionById,
    updateComissionById,
    deleteComissionById
}