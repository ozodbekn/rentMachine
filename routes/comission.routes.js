const {
    addComission,
    getAllComission,
    getComissionById,
    updateComissionById,
    deleteComissionById,
} = require("../controllers/comission.controller");

const router = require("express").Router();

router.post("/", addComission);
router.get("/", getAllComission);
router.get("/:id", getComissionById);
router.put("/:id", updateComissionById);
router.delete("/:id", deleteComissionById);


module.exports = router;    