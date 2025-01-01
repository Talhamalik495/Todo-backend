import mongoose from "mongoose";

const { Schema } = mongoose;

let todoSchema = new Schema({
  todo: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
},{timestamps:true});

let Todo = mongoose.model("todo",todoSchema);
export default Todo;
