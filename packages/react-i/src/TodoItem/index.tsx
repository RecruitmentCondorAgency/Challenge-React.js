import "./TodoItem.scss";
import { SvgIcon } from "../SvgIcon";

function TodoItem(props) {
  return (
    <div className="todo-item">
      <div
        onClick={props.onComplete}
        className={props.completed ? "item-icon success" : "item-icon"}
      >
        {props.completed && <SvgIcon icon="done" color="#ffffff"></SvgIcon>}
      </div>
      <p className={props.completed ? "todo-title success" : "todo-title"}>
        {props.text}
      </p>
      <button className="btn-delete" onClick={props.onDelete}>
        <SvgIcon
          icon="delete"
          color="#46539e"
          width="30px"
          height="30px"
        ></SvgIcon>
      </button>
    </div>
  );
}

export { TodoItem };
