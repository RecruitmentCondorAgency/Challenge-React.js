import "./CreateTodoButton.scss";

function CreateTodoButton({ setOpenModal }) {
  return (
    <button
      className="btn-todo"
      onClick={() => {
        setOpenModal((state) => !state);
      }}
    >
      Agregar nuevo TODO
    </button>
  );
}

export { CreateTodoButton };
