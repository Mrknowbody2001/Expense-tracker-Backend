const asyncHandler = require("express-async-handler");
const category = require("../model/Category");
const Transaction = require("../model/Transaction");

const transactionController = {
  // add
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!amount || !type || !date) {
      throw new Error("Type , amount and Date are required");
    }
    //! create
    const createdTransaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      description,
    });
    res.status(201).json(createdTransaction);
  }),
  //! list
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filter = { user: req.user };
    const transaction = await Transaction.find(filter);
    if (startDate) {
      filter.date = { ...filter.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filter.date = { ...filter.date, $lte: new Date(endDate) };
    }
    if (type) {
      filter.type = type;
    }
    if (category) {
      if (category === "All") {
      } else if (category === "uncategorized") {
        filter.category = "uncategorized";
      } else {
        filter.category = category;
      }
    }
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  }),

  //! update
  update: asyncHandler(async (req, res) => {
    //find the transaction
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description = req.body.description || transaction.description;
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    }
  }),

  //!delete
  delete: asyncHandler(async (req, res) => {
    //find the transaction
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction removed" });
    }
  }),
};
module.exports = transactionController;
