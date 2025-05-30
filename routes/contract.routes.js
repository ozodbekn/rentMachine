const express = require("express");
const router = express.Router();

const { addContract, getAllContracts, getContractById, updateContract, deleteContract } = require("../controllers/contract.controller");

router.post("/add", addContract);
router.get("/all", getAllContracts);
router.get("/:id", getContractById);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);

module.exports = router;