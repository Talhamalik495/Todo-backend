import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { AppRoutes } from "./constant/constant";

function App() {
  let [input, setInput] = useState("");
  let AddCourse = () => {
    let obj = {
      todo: input,
      completed: true,
    };
    console.log("input", input);
    axios
      .post(AppRoutes.todo, obj)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  axios
    .post(AppRoutes.getTodo)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="w-screen h-screen flex justify-center items-center  flex-col gap-5">
      <h1 className="font-bold">Todo</h1>
      <input
        type="text"
        className="w-96 h-10 border-2 border-black"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={AddCourse}>Add</button>
    </div>
  );
}

export default App;
