const express = require("express");
const router = express.Router();

const {
    getTransactions,
    addTransaction
} = require("../controllers/transactionController");

// ✅ GET all transactions
router.get("/", getTransactions);

// ✅ ADD transaction
router.post("/", addTransaction);

module.exports = router;