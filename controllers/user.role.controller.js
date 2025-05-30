const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const UserRole = require("../models/user-role.model");
const User = require("../models/user.model");

const addUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const userRole = await UserRole.create({ userId, roleId });
    if (!userRole) {
      return res.status(400).send({ message: "Role qo'shilmadi" });
    }
    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);
    user.addRole(role);
    res.status(200).send({ message: "Role qo'shildi", userRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAllUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll({
      // attributes: { exclude: ["userId", "roleId"] },
      include: [
        {
          model: User,
          attributes: ["full_name"],
        },

        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).send({ message: "Foydalanuvchilar ro'yxati", userRoles });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findUserRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = await UserRole.findByPk(id);
    res.status(200).send({ message: "Role", userRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = await UserRole.findByPk(id);
    if (!userRole) {
      return res.status(404).send({ message: "Role not found" });
    }
    const { userId, roleId } = req.body;
    userRole.userId = userId;
    userRole.roleId = roleId;
    await userRole.save();
    res.status(200).send({ message: "Role updated", userRole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const userRole = await UserRole.findByPk(id);
    if (!userRole) {
      return res.status(404).send({ message: "Role not found" });
    }
    await userRole.destroy();
    res.status(200).send({ message: "Role deleted" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const removeUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const userRole = await UserRole.findOne({ where: { userId, roleId } });
    if (!userRole) {
      return res.status(400).send({ message: "Bunday role mavjud emas!" });
    }
    await userRole.destroy();
    res.status(200).send({ message: "Role o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
module.exports = {
  addUserRole,
  findAllUserRoles,
  findUserRoleById,
  updateUserRole,
  deleteUserRole,
  removeUserRole,
};
