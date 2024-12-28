const asyncHandler = require("express-async-handler");
const CategoryModel = require("../model/Category");
const Transaction = require("../model/Transaction");
// const user = require("../model/User");

const categoryController = {
  //! add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and Type are required for creating a category");
    }
    const normalizedName = name.toLowerCase();
    //check if the type is valid
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category Type");
    }
    // check if category is already exist
    const categoryExist = await CategoryModel.findOne({
      name: normalizedName,
      user: req.user,
    });
    if (categoryExist) {
      throw new Error(
        `category ${categoryExist.name} already exist in the database`
      );
    }
    // create the category
    const newCategory = await CategoryModel.create({
      name: normalizedName,
      user: req.user,
      type,
    });
    res.status(201).json(newCategory);
  }),

  //!list
  lists: asyncHandler(async (req, res) => {
    const categories = await CategoryModel.find({ user: req.user });
    res.status(200).json(categories);
  }),

  //! update
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const { type, name } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await CategoryModel.findById(categoryId);
    if (!category && category.user.toString() !== req.user.toString()) {
      throw new Error("category not found or user not authorized");
    }
    const oldName = category.name;
    // update category properties
    category.name = name;
    category.type = type;
    const updatedCategory = await category.save();
    //update affected transaction
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        { $set: { category: updatedCategory.name } }
      );
    }
    res.json(updatedCategory);
  }),

  //! delete
  delete: asyncHandler(async (req, res) => {
    const category = await CategoryModel.findById(req.params.id);
    if (category && category.user.toString() == req.user.toString()) {
      const defaultCategory = "uncategorized";
      await Transaction.updateMany(
        { user: req.user, category: category.name },
        {
          $set: { category: defaultCategory },
        }
      );
      await CategoryModel.findByIdAndDelete(req.params.id);
      res.json({ message: "category removed and transaction upadated" });
    } else {
      res.json({
        message: "category not found or user not authorized",
      });
    }
  }),
};
module.exports = categoryController;
