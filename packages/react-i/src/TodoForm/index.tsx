import { useContext, useState } from "react";
import "./TodoForm.scss";
import { TodoContext } from "../providers/TodoContext";

function TodoForm() {
  const { addTodo, setOpenModal } = useContext(TodoContext);
  const [newTodoValue, setNewTodoValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue);
    setOpenModal(false);
  };

  const onCancel = (event) => {
    setOpenModal(false);
  };

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  const isTextValid = newTodoValue.length >= 3 ? true : false;

  return (
    <>
      <h2 className="text-center">Escribe tu nuevo TODO</h2>

      <form className="todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="TODO"
          value={newTodoValue}
          onChange={onChange}
        />

        <div className="btn-container">
          <button onClick={onCancel} className="btn-form cancel" type="button">
            Cancelar
          </button>
          <button
            className={`btn-form ${isTextValid ? "" : "disabled"}`}
            type="submit"
            disabled={!isTextValid}
          >
            Añadir
          </button>
        </div>
      </form>
    </>
  );
}

export { TodoForm };
