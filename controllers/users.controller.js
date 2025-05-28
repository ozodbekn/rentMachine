const { response } = require("express");
const { sendErrorResponse } = require("../helpers/send_error_response");
const User = require("../models/user.model");
const UserAdress = require("../models/user.adress.model");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse({ message: "Bunday foydalanuvchi mavjud" }, res);
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
    res.status(201).send({ message: "Yangi kategoriya qo'shildi", newUser });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: UserAdress,
          attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        },
      ],
    });
    res.status(200).send({ users });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addUser,
  findAllUsers,
};
