import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoLoading } from "../TodoLoading/indes";
import { EmptyTodo } from "../EmptyTodo";
import { ErrorTodo } from "../ErrorTodo";
import { TodoContext } from "../providers/TodoContext";
import { Modal } from "../Modal";
import { TodoForm } from "../TodoForm";
import { useContext } from "react";

function AppUI() {
  const {
    loading,
    error,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = useContext(TodoContext);

  return (
    <>
      <main className="container">
        <div className="row g-0">
          <div className="col">
            <TodoCounter />
            <TodoSearch />
            <TodoList>
              {loading && <TodoLoading></TodoLoading>}
              {error && <ErrorTodo></ErrorTodo>}
              {!loading && searchedTodos.length === 0 && (
                <EmptyTodo></EmptyTodo>
              )}
              {searchedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                />
              ))}
            </TodoList>
          </div>
        </div>
        <CreateTodoButton setOpenModal={setOpenModal} />
      </main>
      {openModal && (
        <Modal>
          <TodoForm></TodoForm>
        </Modal>
      )}
    </>
  );
}

export { AppUI };
