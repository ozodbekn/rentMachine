const { sendErrorResponse } = require("../helpers/send_error_response");
const Status = require("../models/status.model");

const addStatus = async (req, res) => {
    try {
        const { name } = req.body;
        const newStatus = await Status.create({ name });
        res.status(201).send({ message: "Yangi status qo'shildi", newStatus });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const getAllStatus = async (req, res) => {
    try {
        const status = await Status.findAll();
        res.status(200).send({ status });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const getStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await Status.findByPk(id);
        res.status(200).send({ status });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const updateStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const status = await Status.findByPk(id);
        status.name = name;
        await status.save();
        res.status(200).send({ status });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const deleteStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const status = await Status.findByPk(id);
        await status.destroy();
        res.status(200).send({ message: "Status o'chirildi" });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}   

module.exports = {
    addStatus,
    getAllStatus,
    getStatusById,
    updateStatusById,
    deleteStatusById
}
