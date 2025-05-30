const router = require("express").Router();
const { addUserRole, findAllUserRoles, deleteUserRole, findUserRoleById, updateUserRole, removeUserRole } = require("../controllers/user.role.controller");

router.post("/", addUserRole);
router.get("/", findAllUserRoles);
router.post("/remove", removeUserRole);
router.delete("/delete", deleteUserRole);
router.get("/:id", findUserRoleById);
router.put("/:id", updateUserRole);

module.exports = router;