import express from "express";
import authenticate from "../middleware/authenticate.js";
import Singup from "../moduls/singup.js";

let router = express.Router();

router.get("/", authenticate, async (req, res) => {
  let user = await Singup.findById(req._id);
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

export default router;
