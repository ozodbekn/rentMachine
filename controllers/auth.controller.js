const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtService = require("../service/jwt.service");
const config = require("config");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Email  yoki parol noto'g'ri" }, res);
    }

    const verifiedPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!verifiedPassword) {
      return res
        .status(400)
        .send({ message: "Email  yoki parol noto'g'ri" }, res);
    }

    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
    const tokens = jwtService.generateTokens(payload);

    const hashed_token = await bcrypt.hash(tokens.refreshToken, 7);
    user.hashed_token = hashed_token;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(200).send({ message: "User logged in ", tokens });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const decodedToken = await jwtService.verifyRefreshToken(refreshToken);



    const user = await User.update(
      { hashed_token: null },
      { where: { id: decodedToken }, returning: true }
    );
    if (!author) {
      return res.status(400).send({ message: "token notugri" });
    }
    res.clearCookie("refreshToken");
    res.send({ message: "User logged out" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }
    await jwtService.verifyRefreshToken(refreshToken);

    const user = await User.findOne({ refresh_token: refreshToken });
    if (!author) {
      return res
        .status(401)
        .send({ message: "Bazada refresh token topilmadi" });
    }

    const payload = {
      id: author._id,
      email: author.email,
      is_active: author.is_active,
      is_experts: author.is_export,
    };

    const tokens = jwtService.generateTokens(payload);
    author.refresh_token = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });
    res.status(201).send({
      message: "Tokenlar yangilandi",
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
  
  

module.exports = {
  login,
  logout,
  refreshToken,
};
