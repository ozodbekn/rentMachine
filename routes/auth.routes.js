const {
  login,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/login", logout);
router.post("/refresh", refreshToken);

module.exports = router;
