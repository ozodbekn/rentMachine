const Contract = require("../models/contract.model");
const sendErrorResponse = require("../helpers/send_error_response");
const cookieParser = require("cookie-parser");
const { Op } = require("sequelize");
const User = require("../models/user.model");
const Machine = require("../models/machine.model");
const Status = require("../models/status.model");
const addContract = async (req, res) => {
  try {
    const {
      total_price,
      date,
      start_time,
      end_time,
      total_time,
      userId,
      machineId,
      statusId,
    } = req.body;
    const contract = await Contract.create({
      total_price,
      date,
      start_time,
      end_time,
      total_time,
      userId,
      machineId,
      statusId,
    });
    res.status(201).send({ message: "Contract added", contract });
  } catch (error) {
    res.status(400).send({ error: error.message });
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

const getRentMachineListByFullNameAndTimeInterval =async (req, res) => {
    try {
        const { full_name, start_date, end_date } = req.body;
        const contracts = await Contract.findAll({
            where: {
                userId: {
                    [Op.eq]: full_name,
                },
                date: {
                    [Op.between]: [start_date, end_date],
                },
            },
            include: [
                {
                    model: Machine,
                    attributes: ["name", "price_per_hour", "is_available"],
                },
                {
                    model: Status,
                    attributes:["id","name"]
                },
            ],
        });
        res.status(200).send({ contracts });
    } catch (error) {
        console.error("Xatolik:", error);
        res.status(400).json({ error: error.message });
    }
}

const getCancelledContractsByDateInterval = async (req, res) => {
    try {
        const { start_date, end_date } = req.body;
        const contracts = await Contract.findAll({
            where: {
                date: {
                    [Op.between]: [start_date, end_date],
                },
            },
            include: [
                {
                    model: Machine,
                    attributes: ["name", "price_per_hour", "is_available"],
                },
                {
                    model: Status,
                    attributes:["id","name"]
                },
            ],
        });
        if(contracts.status.name === "cancelled"){
            res.status(200).send({ message: "Contracts", contracts });
        }else{
            res.status(200).send({ message: "No contracts found" });
        }
    } catch (error) {
        console.error("Xatolik:", error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
  addContract,
  getAllContracts,
  getContractById,
  updateContract,
  deleteContract,
  getRentMachineListByFullNameAndTimeInterval,
  getCancelledContractsByDateInterval,
};
