import { Readme } from "../../../common/readme";
import { ThemeContext } from "./contexts/theme-context";
import { useState } from "react";

import ReadmeB from "../README.mdx";
import Layout from "./layout";

export const App = () => {
  const isBrowserDefaulDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaulDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };
  const [theme, setTheme] = useState(getDefaultTheme());
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <Layout>
          <div className='content-wrapper'>
            <Readme readme={ReadmeB} />
          </div>
        </Layout>
      </div>
    </ThemeContext.Provider>
  );
};
