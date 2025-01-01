import mongoose from "mongoose";
const { Schema } = mongoose;

const singupSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const Singup = mongoose.model("users", singupSchema);
export default Singup;
