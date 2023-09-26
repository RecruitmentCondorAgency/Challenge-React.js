import "./TodoLoading.scss";

function TodoLoading() {
  const numbers = [1, 2, 3, 4, 5, 7, 8];

  return numbers.map((number) => (
    <div key={number} className="todo-loading"></div>
  ));
}

export { TodoLoading };
