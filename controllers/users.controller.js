const { response } = require("express");
const { sendErrorResponse } = require("../helpers/send_error_response");
const User = require("../models/user.model");
const UserAdress = require("../models/user.adress.model");
const bcrypt = require("bcrypt");
const Machine = require("../models/machine.model");
const Role = require("../models/roles.model");

const addUser = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return res
        .status(400)
        .send({ message: "Bunday foydalanuvchi mavjud" }, res);
    }
    if (password !== confirm_password) {
      return sendErrorResponse({ message: "Parollar mos emas" }, res);
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await User.create({
      full_name,
      phone,
      email,
      hashed_password,
    });
    res.status(201).send({ message: "Yangi foydalanuvchi qo'shildi", newUser });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "full_name"],
      include: [
        {
          model: UserAdress,
          attributes: ["id", "name", "address"],
        },
        {
          model: Role,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Machine,
          attributes: ["name", "price_per_hour", "is_available"],
        },
      ],
    });
    res.status(200).send({ users });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(200).send({ message: "User", user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const { full_name, phone, email, password, confirm_password } = req.body;
    user.full_name = full_name;
    user.phone = phone;
    user.email = email;
    user.password = password;
    user.confirm_password = confirm_password;
    await user.save();
    res.status(200).send({ message: "User updated", user });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
};
