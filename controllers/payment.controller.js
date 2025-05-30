const Payment = require("../models/payment.model");
const sendErrorResponse = require("../helpers/send_error_response");


const addPayment = async (req, res) => {
    try {
        const { payment_date, payment_status, amount, status } = req.body;
        const payment = await Payment.create({
            payment_date,
            payment_status,
            amount,
            status,
        });
        res.status(201).send({ message: "Payment added", payment });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.status(200).send({ message: "Payments", payments });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        res.status(200).send({ message: "Payment", payment });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).send({ message: "Payment not found" });
        }
        const { payment_date, payment_status, amount, status } = req.body;
        payment.payment_date = payment_date;
        payment.payment_status = payment_status;
        payment.amount = amount;
        payment.status = status;
        await payment.save();
        res.status(200).send({ message: "Payment updated", payment });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).send({ message: "Payment not found" });
        }
        await payment.destroy();
        res.status(200).send({ message: "Payment deleted" });
    } catch (error) {
        sendErrorResponse(error, res, 500);
    }
};

module.exports = {
    addPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
};
