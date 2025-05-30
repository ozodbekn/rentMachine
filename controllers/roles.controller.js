const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const User = require("../models/user.model");

const addARole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      return res.status(400).send({ message: "Bunday rol allaqachon mavjud!" });
    }

    const newRole = await Role.create({ name, description });

    res.status(201).send({
      message: "Yangi rol qo'shildi",
      newRole,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: {
        model: User,
        attributes: ["full_name", "email"],
      },
    });
    res.status(200).send({ message: "Rollar ro'yxati", roles });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    res.status(200).send({ message: "Role", role });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).send({ message: "Role not found" });
    }
    const { name, description } = req.body;
    role.name = name;
    role.description = description;
    await role.save();
    res.status(200).send({ message: "Role updated", role });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).send({ message: "Role not found" });
    }
    await role.destroy();
    res.status(200).send({ message: "Role deleted" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addARole,
  findAllRoles,
  findRoleById,
  updateRole,
  deleteRole,
};
