const express = require("express")  

const router = express.Router()

const {
    addMachine,
    getAllMachines,
    getMachineById,
    updateMachineById,  
    deleteMachineById,
    findMachineByCategory
} = require("../controllers/machine.controller");

router.post("/", addMachine);
router.get("/", getAllMachines);
router.get("/:id", getMachineById);
router.put("/:id", updateMachineById);
router.delete("/:id", deleteMachineById);
router.get("/category", findMachineByCategory);

module.exports = router;
