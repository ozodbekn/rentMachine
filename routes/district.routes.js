const {
    addDistrict,
    getAllDistrict,
    getDistrictById,
    updateDistrictById,
    deleteDistrictById,
} = require("../controllers/district.controller");

const router = require("express").Router();

router.post("/", addDistrict);
router.get("/", getAllDistrict);
router.get("/:id", getDistrictById);
router.put("/:id", updateDistrictById);
router.delete("/:id", deleteDistrictById);


module.exports = router;    