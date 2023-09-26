import React, { useState } from "react";
import { useGetTodosQuery } from "../api/apiSlice";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    // addTodo({ userId: 1, title: newTodo, completed: false })
    // setNewTodo('')
  };

  const newItem = (
    <div>
      <h2>TodoList</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo-item">soka</label>
        <div className="new-todo-item">
          <input
            type="text"
            id="new-todo-item"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          ></input>
          <button className="submit">Add</button>
        </div>
      </form>
    </div>
  );

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  else if (isError) content = <p>{error}</p>;
  else if (isSuccess) content = JSON.stringify(todos);

  return (
    <div>
      {newItem}
      {content}
    </div>
  );
};

export default TodoList;
