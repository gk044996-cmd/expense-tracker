const express = require("express");
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction
} = require("../controllers/transactionController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, addTransaction);
router.get("/", auth, getTransactions);
router.delete("/:id", auth, deleteTransaction);
router.put("/:id", auth, updateTransaction);

module.exports = router;