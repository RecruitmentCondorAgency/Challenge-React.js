import { SvgIcon } from "../SvgIcon";
import "./EmptyTodo.scss";

function EmptyTodo() {
  return (
    <div className="empty-todo">
      <SvgIcon
        icon="document"
        color="#c6c6c6"
        width="165px"
        height="165px"
      ></SvgIcon>

      <h2 className="empty-title">¡No tieneses TODOS!</h2>
    </div>
  );
}

export { EmptyTodo };
