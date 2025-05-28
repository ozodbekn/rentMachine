const { sendErrorResponse } = require("../helpers/send_error_response");
const Region = require("../models/region.model");

const addRegion = async (req, res) => {
    try {
        const { name } = req.body;
        const newRegion = await Region.create({ name });
        res.status(201).send({ message: "Yangi region qo'shildi", newRegion });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const getAllRegion = async (req, res) => {
    try {
        const region = await Region.findAll();
        res.status(200).send({ region });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const getRegionById = async (req, res) => {
    try {
        const { id } = req.params;
        const region = await Region.findByPk();
        res.status(200).send({ region });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const updateRegionById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const region = await Region.findByPk(id);
        region.name = name;
        await region.save();
        res.status(200).send({ region });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const deleteRegionById = async (req, res) => {
    try {
        const { id } = req.params;
        const region = await Region.findByPk(id);
        await region.destroy();
        res.status(200).send({ message: "Region o'chirildi" });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}   

module.exports = {
    addRegion,
    getAllRegion,
    getRegionById,
    updateRegionById,
    deleteRegionById
}
