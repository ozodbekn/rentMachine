const {
  addAdress,
  findAllUserAddresses,
} = require("../controllers/user.address.controller");

const router = require("express").Router();

router.post("/", addAdress);
router.get("/", findAllUserAddresses);

module.exports = router;
