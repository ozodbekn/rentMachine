const {
  addAdress,
  findAllUserAddresses,
  getAddressById,
  updateAddressById,
  deleteAddressById,
} = require("../controllers/user_address.controller");
const { findUserById } = require("../controllers/users.controller");
const authGuard = require("../middleware/guards/auth.guard");
const authorSelfGuard = require("../middleware/guards/author-self.guard");
const roleGuard = require("../middleware/guards/role.guard");

const router = require("express").Router();

router.post("/", addAdress);
router.get("/", authGuard, roleGuard(["superadmin"]), findAllUserAddresses);
router.get(
  "/:id",
  authGuard,
  authorSelfGuard,
  roleGuard(["superadmin"]),
  getAddressById
);
router.put(
  "/:id",
  authGuard,
  authorSelfGuard,
  roleGuard(["superadmin"]),
  updateAddressById
);
router.delete(
  "/:id",
  authGuard,
  authorSelfGuard,
  roleGuard(["superadmin"]),
  deleteAddressById
);

module.exports = router;
