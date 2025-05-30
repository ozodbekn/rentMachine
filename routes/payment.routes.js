const express = require("express");  
const router = express.Router();

const { addPayment, getAllPayments, getPaymentById, updatePayment, deletePayment } = require("../controllers/payment.controller");

router.post("/add", addPayment);
router.get("/all", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
