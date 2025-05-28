const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res
      .status(201)
      .send({ message: "Yangi kategoriya qo'shildi", newCategory });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllCategorys = async (req, res) => {
  try {
    const categorys = await Category.findAll();
    res.status(200).send({ categorys });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    res.status(200).send({ category });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    category.name = name;
    await category.save();
    res.status(200).send({ category });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    await category.destroy();
    res.status(200).send({ message: "Kategoriya o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addCategory,
  getAllCategorys,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
