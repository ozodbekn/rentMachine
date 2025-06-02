const { Op } = require("sequelize");
const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");
const District = require("../models/district.model");
const Machine = require("../models/machine.model");
const Region = require("../models/region.model");
const User = require("../models/user.model");
const sequelize = require("../config/db");
const addMachine = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      min_hour,
      min_price,
      categoryId,
      regionId,
      districtId,
      userId,
    } = req.body;
    const newMachine = await Machine.create({
      name,
      price_per_hour,
      description,
      min_hour,
      categoryId,
      min_price,
      regionId,
      districtId,
      userId,
    });
    res.status(201).send({ message: "Yangi mashina qo'shildi", newMachine });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.findAll();
    res.status(200).send({ machines });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getMachineById = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machine.findByPk(id);
    res.status(200).send({ machine });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateMachineById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price_per_hour,
      description,
      min_hour,
      categoryId,
      min_price,
      regionId,
      districtId,
      userId,
    } = req.body;
    const machine = await Machine.findByPk(id);
    machine.name = name;
    machine.price_per_hour = price_per_hour;
    machine.description = description;
    machine.min_hour = min_hour;
    machine.min_price = min_price;
    machine.categoryId = categoryId;
    machine.regionId = regionId;
    machine.districtId = districtId;
    machine.userId = userId;
    await machine.save();
    res.status(200).send({ machine });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteMachineById = async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await Machine.findByPk(id);
    await machine.destroy();
    res.status(200).send({ message: "Mashina o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const findMachineByCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const machine = await Machine.findAll({
      where: { categoryId: id },
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
        {
          model: Region,
          attributes: ["name"],
        },
        {
          model: District,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["full_name", "phone"],
        },
      ],
    });
    res.status(200).send({ machine });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const findMachineByRegionAndDistrict = async (req, res) => {
  try {
    const { region, district } = req.body;
    const reg = await Region.findAll({ where: { name: region } });
    const dist = await District.findAll({ where: { name: district } });
    if (!reg || !dist) {
      return res
        .status(404)
        .send({ message: "Region yoki district topilmadi" });
    }
    const machine = await Machine.findAll({
      where: {
        [Op.or]: [{ regionId: reg[0].id }, { districtId: dist[0].id }],
      },
      include: [
        { model: Category, attributes: ["name"] },
        { model: Region, attributes: ["name"] },
        { model: District, attributes: ["name"] },
        { model: User, attributes: ["full_name", "phone"] },
      ],
    });
    res.status(200).send({ machine });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const listMachinesHaveMoreThanThreeImages = async (req, res) => {
  try {
    const [machines] = await sequelize.query(`
            SELECT m.*, COUNT(i.id) AS image_count
            FROM machines m
            JOIN images i ON i."machineId" = m.id
            GROUP BY m.id
            HAVING COUNT(i.id) > 3
          `);

    if (machines.length === 0) {
      return res
        .status(404)
        .send({ message: "3 tadan ko'p rasmli mashina topilmadi" });
    }

    res.status(200).send({ machines });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addMachine,
  getAllMachines,
  getMachineById,
  updateMachineById,
  deleteMachineById,
  findMachineByCategory,
  findMachineByRegionAndDistrict,
  listMachinesHaveMoreThanThreeImages,
};
