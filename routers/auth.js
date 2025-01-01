import express from "express";
import Singup from "../moduls/singup.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import "dotenv/config";
let router = express.Router();
let singupSchema = Joi.object({
  name: Joi.string().max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
let loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
router.post("/singup", async (req, res) => {
  const { error, value } = singupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: true,
      message: "input field is required",
      data: null,
    });
  }
  let checkUser = await Singup.findOne({ email: value.email });
  if (checkUser) {
    return res.status(400).json({
      error: false,
      message: "User Already Exists!",
      data: null,
    });
  }
  const saltRounds = 12;
  let hashPassword = await bcrypt.hash(value.password, saltRounds);
  console.log(hashPassword);
  value.password = hashPassword;
  let user = new Singup({ ...value });
  user = await user.save();
  res.status(201).json({
    error: false,
    message: "User registered successfully",
    data: user,
  });
});

router.post("/login", async (req, res) => {
  let { error, value } = loginSchema.validate(req.body);
  console.log("errorrrrrrrrrrr=>", error);
  if (error) {
    return res.status(400).json({
      error: true,
      message: "input field is valid",
      data: null,
    });
  }
  let user = await Singup.findOne({ email: value.email }).lean();
  if (!user) {
    return res.status(400).json({
      error: true,
      meassage: "User Not Found",
      data: null,
    });
  }
  let isPasswordValid = await bcrypt.compare(value.password, user.password);
  console.log("isPasswordValid=>", isPasswordValid);

  if (!isPasswordValid) {
    return res.status(400).json({
      error: true,
      meassage: "invalid credantials",
      date: null,
    });
  }
  let token = jwt.sign(user, process.env.AUTH_SECRET);
  res.status(200).json({
    error: false,
    meassage: "user singin succesfully",
    data: user,
    token,
  });
});
// router.get("/singup", async (req, res) => {
//   let data = await Singup.find();
//   console.log("DATA", data);

//   res.status(200).json({
//     error: false,
//     message: "User get successfully",
//     data: data,
//   });
// });
export default router;
