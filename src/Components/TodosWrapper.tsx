import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { Todo as TodoType } from "./Todos.types";
import swal from "sweetalert";

function TodosWrapper() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (title: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        title,
        completed: false
      }
    ]);
    return true;
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    return true;
  };

  const deleteTodo = (id: string) => {
    swal({
      title: "are you sure?",
      icon: "warning",
      buttons: ["No", "YES"]
    }).then((result) => {
      if (result) {
        setTodos(todos.filter((todo) => todo.id !== id));

        swal({
          title: "todo has been deleted successfully!",
          icon: "success"
        });
      }
    });

    return true;
  };

  return (
    <div className="TodoWrapper">
      <h1>Todo List ❤️ </h1>
      {/* Add New Todo Form */}

      <TodoForm addTodo={addTodo} />

      {/* display todos */}
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          todo={todo}
        />
      ))}
    </div>
  );
}

export default TodosWrapper;
