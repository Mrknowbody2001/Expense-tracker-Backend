const express = require("express");
const isAuthenticated = require("../middleware/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const categoryRouter = express.Router();

//! add

categoryRouter.post(
  "/api/v1/categories/create",
  isAuthenticated,
  categoryController.create
);

//! list

categoryRouter.get(
  "/api/v1/categories/lists",
  isAuthenticated,
  categoryController.lists
);

//!update

categoryRouter.put(
  "/api/v1/categories/update/:id",
  isAuthenticated,
  categoryController.update
);
//!delete
categoryRouter.delete(
  "/api/v1/categories/delete/:id",
  isAuthenticated,
  categoryController.delete
);
module.exports = categoryRouter;
