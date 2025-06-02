const {
  addUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/", addUser);
router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
