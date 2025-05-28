const {
    addRegion,
    getAllRegion,
    getRegionById,
    updateRegionById,
    deleteRegionById,
} = require("../controllers/region.controller");

const router = require("express").Router();

router.post("/", addRegion);
router.get("/", getAllRegion);
router.get("/:id", getRegionById);
router.put("/:id", updateRegionById);
router.delete("/:id", deleteRegionById);


module.exports = router;