import express from "express";
import cors from "cors";
let app = express();
import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";
import authRouter from "./routers/auth.js";
import todoRouter from "./routers/todo.js";
import userInfo from "./routers/userInfo.js";
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));
app.get("/", (req, res) => {
  res.send("share");
});
app.use("/auth", authRouter);
app.use("/todo", todoRouter);
app.use("/userInfo", userInfo);
app.listen(process.env.PORT, () => console.log("server is runing"));
