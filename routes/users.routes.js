const {
  addUser,
  findAllUsers,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/", addUser);
router.get("/", findAllUsers);

module.exports = router;
