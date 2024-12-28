const asyncHandler = require("express-async-handler");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//*user registration
const usersController = {
  //!register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    //validate
    if (!username || !email || !password) {
      throw new Error("please all field are required");
    }
    //
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exists");
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // create user and save into DB
    const userCreated = await User.create({
      email,
      username,
      password: hashPassword,
    });
    // send the response

    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //! login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and Password are required");
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("Invalid login credentials");
    }
    // check if password exist in db

    if (!existingUser.password) {
      throw new Error("User Password is missing ");
    }
    //---
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    // generate token
    const token = jwt.sign({ id: existingUser._id }, "chamithkey", {
      expiresIn: "30d",
    });
    res.json({
      message: "login success",
      token,
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    });
  }),
  //!profile

  profile: asyncHandler(async (req, res) => {
    console.log(req.user);
    // const userId = req.existingUser._id;
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("user not found");
    }
    //send response
    res.json({
      username: user.username,
      email: user.email,
    });
  }),

  //! update password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    //find the  user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("user not found");
    }
    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    //resave
    await user.save();

    res.json({ message: "password Change successfully" });
  }),
  //! update profile

  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    res.json({ message: "user profile updated succesfully", updatedUser });
  }),
};

module.exports = usersController;
