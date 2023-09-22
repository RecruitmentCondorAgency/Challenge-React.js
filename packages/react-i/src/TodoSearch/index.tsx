import "./TodoSearch.scss";
import { useContext } from "react";
import { TodoContext } from "../providers/TodoContext";

function TodoSearch() {
  const { searchValue, setSearchValue } = useContext(TodoContext);
  return (
    <input
      placeholder="Escribe aquí"
      className="todo-search"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
      }}
    />
  );
}

export { TodoSearch };
