import axios from "axios";
import { ListItem } from "../types/items";

const getListItems = async () => {
  return axios.get<ListItem[]>("http://localhost:3000/list-items");
};

const createListItem = async (params: ListItem) => {
  return axios.post<ListItem>("http://localhost:3000/list-items", params);
};

const deleteListItem = async (params: string) => {
  return axios.delete(`http://localhost:3000/list-items/${params}`);
};

export { getListItems, createListItem, deleteListItem };
