const { sendErrorResponse } = require("../helpers/send_error_response");
const District = require("../models/district.model");
const Region = require("../models/region.model");

const addDistrict = async (req, res) => {
  try {
    const { name, regionId } = req.body;

    const region = await Region.findByPk(regionId);

    if (region) {
      return res.status(400).send({ message: "Bunday foydalanuvchi mavjud" });
    }
    const newDistrict = await District.create({ name });
    res.status(201).send({ message: "Yangi district qo'shildi", newDistrict });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDistrict = async (req, res) => {
  try {
    const district = await District.findAll();
    res.status(200).send({ district });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id);
    res.status(200).send({ district });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const district = await District.findByPk(id);
    district.name = name;
    await district.save();
    res.status(200).send({ district });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteDistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByPk(id);
    await district.destroy();
    res.status(200).send({ message: "District o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDistrict,
  getAllDistrict,
  getDistrictById,
  updateDistrictById,
  deleteDistrictById,
};
