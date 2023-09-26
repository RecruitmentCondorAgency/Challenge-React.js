import axios from "axios";
import { useLocalStorage } from "./useLocalStorage";
import { IGlobalState, ITodo } from "../../types/items";
import { createContext, useEffect, useState } from "react";

const TodoContext = createContext<IGlobalState>({} as IGlobalState);
const endpoint = "http://127.0.0.1:3000/todo/";

function TodoProvider({ children }) {
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [getData, setGetData] = useState([]);

  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", getData);

  const completedTodos = todos.filter((todo: ITodo) => !!todo.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter((todo: ITodo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const idGenerator = (long: number) => {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";

    for (let i = 0; i < long; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(indice);
    }
    return `ID-${id}`;
  };

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = () => {
    axios.get(`${endpoint}`).then((response) => {
      setGetData(response.data);
    });
  };

  const addTodo = (text: string) => {
    const newTodos = [...todos];
    const newValue = {
      id: idGenerator(5),
      text,
      completed: false,
    };

    newTodos.push(newValue);
    axios.post(`${endpoint}`, newValue);
    saveTodos(newTodos);
  };

  const completeTodo = (id: string) => {
    const newTodos = [...todos];
    const selectedTodo = newTodos.find((todo: ITodo) => todo.id === id);
    const todoIndex = newTodos.findIndex((todo: ITodo) => todo.id === id);

    newTodos[todoIndex].completed = true;
    axios.patch(`${endpoint}${selectedTodo.id}`, {
      completed: true,
    });
    saveTodos(newTodos);
  };

  const deleteTodo = (id: string) => {
    const newTodos = [...todos];
    const selectedTodo = newTodos.find((todo: ITodo) => todo.id === id);
    const todoIndex = newTodos.findIndex((todo: ITodo) => todo.id === id);

    console.log();
    newTodos.splice(todoIndex, 1);
    axios.delete(`${endpoint}${selectedTodo.id}`);
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        addTodo,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
