const Contract = require("../models/contract.model");
const sendErrorResponse = require("../helpers/send_error_response");
const addContract = async (req, res) => {
    try {
        const { total_price, date, start_time, end_time, total_time } = req.body;
        const contract = await Contract.create({
            total_price,
            date,
            start_time,
            end_time,
            total_time,
        });
        res.status(201).send({ message: "Contract added", contract });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract.findAll();
        res.status(200).send({ message: "Contracts", contracts });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const getContractById = async (req, res) => {
    try {
        const { id } = req.params;
        const contract = await Contract.findByPk(id);
        res.status(200).send({ message: "Contract", contract });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const updateContract = async (req, res) => {
    try {
        const { id } = req.params;
        const contract = await Contract.findByPk(id);
        if (!contract) {
            return res.status(404).send({ message: "Contract not found" });
        }
        const { total_price, date, start_time, end_time, total_time } = req.body;
        contract.total_price = total_price;
        contract.date = date;
        contract.start_time = start_time;
        contract.end_time = end_time;
        contract.total_time = total_time;
        await contract.save();
        res.status(200).send({ message: "Contract updated", contract });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const deleteContract = async (req, res) => {
    try {
        const { id } = req.params;
        const contract = await Contract.findByPk(id);
        if (!contract) {
            return res.status(404).send({ message: "Contract not found" });
        }
        await contract.destroy();
        res.status(200).send({ message: "Contract deleted" });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

module.exports = {
    addContract,
    getAllContracts,
    getContractById,
    updateContract,
    deleteContract
};
