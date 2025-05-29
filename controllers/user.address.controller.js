const { sendErrorResponse } = require("../helpers/send_error_response");
const UserAdress = require("../models/user.adress.model");
const User = require("../models/user.model");
const Machine = require("../models/machine.model");

const addAdress = async (req, res) => {
  try {
    const { name, address, userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res
        .status(400)
        .send({ message: "Bunday foydalanuvchi mavjud emas!" });
    }

    const newUserAdrress = await UserAdress.create({
      name,
      address,
      userId,
    });

    res.status(200).send({
      message: "Foydalanuvchiga yangi manzil qo'shildi",
      newUserAdrress,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAllUsersData = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: UserAdress,
          attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        },
        {
          model: Machine,
          attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        },
      ],
    });
    res.status(200).send({ users });
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
