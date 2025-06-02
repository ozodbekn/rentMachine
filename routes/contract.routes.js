const express = require("express");
const router = express.Router();

const { addContract, getAllContracts, getContractById, updateContract, deleteContract, getRentMachineListByFullNameAndTimeInterval, getCancelledContractsByDateInterval } = require("../controllers/contract.controller");

router.post("/", addContract);
router.get("/", getAllContracts);
router.post("/squery", getRentMachineListByFullNameAndTimeInterval);
router.get("/:id", getContractById);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);
router.post("/cancelled", getCancelledContractsByDateInterval);

module.exports = router;