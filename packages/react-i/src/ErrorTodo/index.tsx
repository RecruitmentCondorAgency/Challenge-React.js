import { SvgIcon } from "../SvgIcon";
import "./ErrorTodo.scss";

function ErrorTodo() {
  return (
    <div className="error-todo">
      <SvgIcon
        icon="error"
        color="#c6c6c6"
        width="165px"
        height="165px"
      ></SvgIcon>

      <h2 className="error-title">¡Ocurrio un error, Recarga la página!</h2>
    </div>
  );
}

export { ErrorTodo };
