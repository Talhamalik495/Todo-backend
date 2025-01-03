import { useEffect, useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { AppRoutes } from "./constant/constant";
import SinginForm from "./components/SinginForm";
import SingupForm from "./components/SingupForm";

function App() {
  let [input, setInput] = useState("");
  let [todo, setTodo] = useState([]);
  let [editTodo, setEditTodo] = useState("");
  let [editText, setEditText] = useState("");
  let update = (id, update) => {
    console.log("id", id);
    console.log("update", update);

    axios
      .patch(`${AppRoutes.editesTodo}/${id}`, { todo: update })
      .then((data) => {
        getTodo();
      })
      .catch((err) => {
        console.log("err=>", err);
      });
  };
  let saveTodo = (id) => {
    if (editText.trim() === "") return;
    console.log("editText", editText);

    update(id, editText);
    setEditTodo(null);
    setEditText("");
  };
  let AddCourse = () => {
    let obj = {
      todo: input,
      completed: true,
    };
    axios
      .post(AppRoutes.addTodo, obj)
      .then((data) => {
        getTodo();
      })
      .catch((err) => {
        console.log("err=>", err);
      }).finally;
  };

  let getTodo = () => {
    axios
      .get(AppRoutes.getTodo)
      .then((data) => {
        console.log("get todo=>", data);
        setTodo([...data.data.todo]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let deleteTodo = (id) => {
    console.log("id=>", `${AppRoutes.deleteTodo}/${id}`);
    axios
      .delete(`${AppRoutes?.deleteTodo}/${id}`)
      .then((data) => {
        getTodo();
      })
      .catch((err) => {
        console.log("err=>", err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg">
        <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-5 rounded-t-lg">
          <h1 className="text-3xl font-bold tracking-wide">My To-Do List</h1>
        </header>
        <div className="p-6">
          {/* Add Task Form */}
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Add a new task"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => AddCourse()}
            >
              Add
            </button>
          </div>

          {/* Task List */}
          <ul className="mt-6 space-y-3">
            {/* Task Item */}
            {todo.map((data) => {
              return (
                <li
                  key={data._id}
                  className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    {/* <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500 focus:ring-blue-400"
                    /> */}
                    {editTodo === data._id ? (
                      <input
                        type="text"
                        placeholder="Add a new task"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={editText}
                        onChange={(e) => {
                          setEditText(e.target.value);
                        }}
                      />
                    ) : (
                      <span className="text-gray-700">{data.todo}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {editTodo === data._id ? (
                      <button
                        className="bg-green-500 text-white px-2 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        onClick={() => saveTodo(data._id)}
                      >
                        <FaCheck />
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-2 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        onClick={() => {
                          setEditTodo(data._id);
                          setEditText(data.todo);
                        }}
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      className="bg-red-500 text-white px-2 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => deleteTodo(data._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
