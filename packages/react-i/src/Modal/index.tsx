import { useContext } from "react";
import { createPortal } from "react-dom";
import { TodoContext } from "../providers/TodoContext";
import "./Modal.scss";

function Modal({ children }) {
  const { setOpenModal } = useContext(TodoContext);

  const onCancel = (event) => {
    setOpenModal(false);
  };

  return createPortal(
    <>
      <div onClick={onCancel} className="backdrop"></div>
      <div className="todo-modal">{children}</div>
    </>,
    document.getElementById("modal")
  );
}

export { Modal };
