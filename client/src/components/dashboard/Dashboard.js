import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//components

import InputTodo from "./todolist/InputTodo";
import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();

      setAllTodos(parseData);

      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <div>
      <div className="d-flex flex-row mt-5">
        <h2>{name}</h2>
      </div>
      <div className="d-grid gap- d-md-flex justify-content-md-end">
      <button onClick={e => logout(e)} className="btn btn-primary me-md-2">
          Logout
      </button>
      </div>
      <InputTodo setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
  );
};

export default Dashboard;