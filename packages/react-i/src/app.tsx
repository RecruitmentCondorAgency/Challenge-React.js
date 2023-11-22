import { ThemeContext } from "./contexts/theme-context";
import { useEffect, useState } from "react";

import Layout from "./layout";
import axios from "axios";
import List from "./List";
import "./styles.sass";

export const App = () => {
  const isBrowserDefaulDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaulDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme());
  const [lists, setLists] = useState([]);
  useEffect(() => {
    const fetchLists = async () => {
      try {
        // Specify the base URL for your JSON server
        const baseURL = "http://localhost:3000";
        const response = await axios.get("/lists", { baseURL });
        const lists = response.data;
        setLists(lists);
      } catch (error) {
        console.error("Error fetching lists:", error.message);
        // Handle errors here, e.g., set an error state.
      }
    };

    fetchLists();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <Layout>
          <div className='content-wrapper'>
            <List item={{}} />
          </div>
        </Layout>
      </div>
    </ThemeContext.Provider>
  );
};
