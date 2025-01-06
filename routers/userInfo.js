import express from "express";
import authenticate from "../middleware/authenticate";
import Singup from "../moduls/singup";

let router = express.Router();

router.get("/", authenticate, (req, res) => {
  let user = Singup.findById(req._id);
  if (user) {
    res.status(200).json({
      error: false,
      message: "user get successfully",
      user,
    });
  } else {
    res.status(400).json({
      error: true,
      message: "user not found",
      user: null,
    });
  }
});
