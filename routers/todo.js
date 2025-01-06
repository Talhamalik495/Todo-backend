import express from "express";
import Todo from "../moduls/todo.js";

let router = express.Router();
router.post("/", async (req, res) => {
  let obj = req.body;
  let todo = new Todo(obj);
  todo = await todo.save();
  res.status(201).json({
    error: false,
    meassege: "todo add succesesfully",
    todo: todo,
  });
});
router.get("/", async (req, res) => {
  let todo = await Todo.find();
  res.status(201).json({
    error: false,
    meassege: "todo get successfully",
    todo,
  });
});
router.patch("/:id", async (req, res) => {
  let param = req.params.id;
  let dataCheck = await Todo.findById(param);
  console.log("dataCheck=>", dataCheck);
  if (!dataCheck) {
    return res.status(404).json({
      error: true,
      meassege: "data not found db",
      todo: null,
    });
  }
  // app.use(cors());
  // app.use(cors("*"));
  if (!req.body.todo === undefined || req.body.todo === null) {
    return res.status(404).json({
      error: true,
      meassege: "body not found",
      todo: null,
    });
  }
  if (!req.body.isCompleted === undefined || req.body.isCompleted === null) {
    return res.status(404).json({
      error: true,
      meassege: "body not found",
      todo: null,
    });
  }
  let todo = await Todo.findByIdAndUpdate(
    param,
    { todo: req.body.todo, isCompleted: req.body.isCompleted },
    { new: true }
  );
  res.status(201).json({
    error: false,
    meassege: "todo update",
    todo: todo,
  });
});
router.delete("/:id", async (req, res) => {
  try {
    let param = req.params.id;
    console.log("param=>", param);

    let dataCheck = await Todo.findById(param);
    if (!dataCheck) {
      return res.status(404).json({
        error: true,
        meassege: "todo not found",
        todo: null,
      });
    }
    let todo = await Todo.findByIdAndDelete(param);
    res.status(200).json({
      error: false,
      meassege: "todo delete",
      todo: todo,
    });
  } catch (error) {
    console.log(error);
  }
});
export default router;
