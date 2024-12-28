const express = require("express");
const isAuthenticated = require("../middleware/isAuth");
const transactionController = require("../controllers/transactionController");

const transactionRouter = express.Router();

//! add
transactionRouter.post(
  "/api/v1/transactions/create",
  isAuthenticated,
  transactionController.create
);

//! list
transactionRouter.get(
  "/api/v1/transactions/lists",
  isAuthenticated,
  transactionController.getFilteredTransactions
);

//! update
transactionRouter.put(
  "/api/v1/transactions/update/:id",
  isAuthenticated,
  transactionController.update
);
//!delete

transactionRouter.delete(
  "/api/v1/transactions/delete/:id",
  isAuthenticated,
  transactionController.delete
);

module.exports = transactionRouter;
