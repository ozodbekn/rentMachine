const { response } = require("express");
const { sendErrorResponse } = require("../helpers/send_error_response");
const UserAdress = require("../models/user.adress.model");
const User = require("../models/user.model");

const addAdress = async (req, res) => {
  try {
    const { name, adress, UserId } = req.body;

    const user = await User.findByPk(UserId);

    if (!user) {
      return res.status(400).send({ message: error.message });
    }

    const newUserAdrress = await UserAdress.create({
      name,
      adress,
      UserId,
    });

    res.status(200).send({
      message: "Foydalanuvchiga yangi manzil qo'shildi",
      newUserAdrress,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAllUserAddresses = async (req, res) => {
  try {
    const userAddress = await UserAdress.findAll(
      // { include: User }
      {
        include: [
          {
            model: User,
            attributes: ["full_name", "phone"],
          },
        ],
        attributes: ["name", "address"],
      }
    );
    res.status(200).send({
      message: "Foydalanuvchiga yangi manzil  qo'shildi",
      userAddress,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addAdress,
  findAllUserAddresses,
};
