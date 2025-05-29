const { response } = require("express");
const { sendErrorResponse } = require("../helpers/send_error_response");
const User = require("../models/user.model");
const UserAdress = require("../models/user.adress.model");
const bcrypt = require("bcrypt");
const Machine = require("../models/machine.model");

const addUser = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return res.status(400).send({ message: "Bunday foydalanuvchi mavjud" }, res);
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
          attributes:["id", "name", "address"],
        },
        {
          model: Machine,
          attributes: ["name", "price","is_avialeble"],
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
