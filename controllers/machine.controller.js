const { sendErrorResponse } = require("../helpers/send_error_response");
const Machine = require("../models/machine.model");

const addMachine = async (req, res) => {
    try {
        const { name, price_per_hour, description, min_hour, min_price, userId } = req.body;
        const newMachine = await Machine.create({ name, price_per_hour, description, min_hour, min_price, userId });
        res.status(201).send({ message: "Yangi mashina qo'shildi", newMachine });
    } catch (error) {
        sendErrorResponse(error, res);  
    }
}

const getAllMachines = async (req, res) => {
    try {
        
        const machines = await Machine.findAll();
        res.status(200).send({ machines });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const getMachineById = async (req, res) => {
    try {
        const { id } = req.params;
        const machine = await Machine.findByPk(id);
        res.status(200).send({ machine });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}

const updateMachineById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price_per_hour, description, min_hour, min_price, userId } = req.body;
        const machine = await Machine.findByPk(id);
        machine.name = name;
        machine.price_per_hour = price_per_hour;
        machine.description = description;
        machine.min_hour = min_hour;
        machine.min_price = min_price;
        machine.userId = userId;
        await machine.save();
        res.status(200).send({ machine });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}   

const deleteMachineById = async (req, res) => {
    try {
        const { id } = req.params;
        const machine = await Machine.findByPk(id);
        await machine.destroy();
        res.status(200).send({ message: "Mashina o'chirildi" });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}
const findMachineByCategory = async (req, res) => {
    try {
        
        const id = req.query.categoryId;
        console.log(id);
        const machine = await Machine.findAll({
            include: [
                {
                    model: Category,
                    attributes: ["name"],
                },
            ],
        }); 
        res.status(200).send({ machine });
    } catch (error) {
        sendErrorResponse(error, res);
    }
}
module.exports = {
    addMachine,
    getAllMachines,
    getMachineById,
    updateMachineById,
    deleteMachineById,
    findMachineByCategory
}

