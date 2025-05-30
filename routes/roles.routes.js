const {
  addARole,
  findAllRoles,
  findRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/roles.controller");

const router = require("express").Router();

router.post("/", addARole);
router.get("/", findAllRoles);
router.get("/:id", findRoleById);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
