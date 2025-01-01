import express from "express";
import Todo from "../moduls/todo.js";

let router = express.Router();
router.post("/", async (req, res) => {
  let obj = req.body;
  let todo = new Todo(obj);
  todo = await todo.save();
  res.status(201).json({
    error: false,
    meassege: "todo added succesesfully",
    todo: todo,
  });
});
export default router;
