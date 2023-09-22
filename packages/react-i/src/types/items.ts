import { Dispatch, SetStateAction } from "react";

export interface ITodo {
  text: string;
  completed: boolean;
  id: string;
}

export interface IGlobalState {
  searchedTodos: ITodo[];
  completedTodos: number;
  totalTodos: number;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  completeTodo: (v: string) => void;
  deleteTodo: (v: string) => void;
  loading: boolean;
  error: boolean;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  addTodo: (v: string) => void;
}
