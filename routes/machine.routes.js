const express = require("express");

const router = express.Router();

const {
  addMachine,
  getAllMachines,
  getMachineById,
  updateMachineById,
  deleteMachineById,
  findMachineByCategory,
  findMachineByRegionAndDistrict,
  listMachinesHaveMoreThanThreeImages,
} = require("../controllers/machine.controller");

router.post("/", addMachine);
router.get("/", getAllMachines);
router.post("/region-district", findMachineByRegionAndDistrict);
router.get("/imagethree", listMachinesHaveMoreThanThreeImages);
router.get("/:id", getMachineById);
router.put("/:id", updateMachineById);
router.delete("/:id", deleteMachineById);
router.get("/category/:id", findMachineByCategory);

module.exports = router;
