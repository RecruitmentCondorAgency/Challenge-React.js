import "./TodoCounter.scss";
import { useContext } from "react";
import { TodoContext } from "../providers/TodoContext";

function TodoCounter() {
  const { completedTodos, totalTodos } = useContext(TodoContext);

  return (
    <h1 className="todo-counter text-center">
      Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span>{" "}
      TODOS
    </h1>
  );
}

export { TodoCounter };
