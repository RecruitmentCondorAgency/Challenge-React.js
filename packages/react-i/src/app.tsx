import { ChangeEvent, MouseEvent, useEffect, useId, useState } from "react";

import { ListItem } from "./types/items";
import {
  createListItem,
  deleteListItem,
  getListItems,
} from "./services/listItems";
import useThemeDetector from "./hooks/useThemeDetector";

export const App = () => {
  const isDarkTheme = useThemeDetector();

  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [theme, setTheme] = useState(isDarkTheme ? "dark" : "light");
  const [itemLabel, setItemLabel] = useState<string>("");

  useEffect(() => {
    getListItems()
      .then((res) => {
        if (res.status === 200) {
          setListItems(res.data);
        }
      })
      .catch((err) => new Error(err));
  }, []);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setListItems(
      sortOrder === "asc"
        ? listItems.sort((a, b) => (a.label > b.label ? -1 : 1))
        : listItems.sort((a, b) => (a.label > b.label ? 1 : -1))
    );
  };

  const handleThemeSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleItemLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItemLabel(e.target.value);
  };

  const handleAddListItem = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const params = {
      id: listItems[listItems.length - 1].id + 1,
      label: itemLabel,
      value: listItems[listItems.length - 1].value + 1,
    };
    createListItem(params)
      .then((res) => {
        if (res.status === 201) {
          setListItems((prevState) => [...prevState, res.data]);
          setItemLabel("");
        }
      })
      .catch((err) => new Error(err));
  };

  const handleDeleteListItem = (id: string) => {
    deleteListItem(id)
      .then((res) => {
        if (res.status === 200) {
          setListItems((prev) => prev.filter((itm) => itm.id !== id));
        }
      })
      .catch((err) => new Error(err));
  };

  return (
    <div className={theme}>
      <div className="container">
        <div className="list-header">
          <button className="btn-sort" onClick={handleSort}>
            Sort{" "}
            {sortOrder === "asc" ? (
              <>&#129105;</>
            ) : sortOrder === "desc" ? (
              <>&#129107;</>
            ) : null}
          </button>
          <div className="theme-switcher">
            <span>Theme</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handleThemeSwitch}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="add-item-form">
          <label>Add Item</label>
          <input
            id="item-label"
            value={itemLabel}
            onChange={handleItemLabelChange}
          />
          <button
            className="btn-add"
            disabled={itemLabel === ""}
            onClick={handleAddListItem}
          >
            Add
          </button>
        </div>

        <ul>
          {listItems.length > 0
            ? listItems.map((item: ListItem) => (
                <li key={item.value}>
                  <label>{item.label}</label>
                  <button
                    className="btn-add"
                    onClick={() => handleDeleteListItem(item.id)}
                  >
                    Delete
                  </button>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};
