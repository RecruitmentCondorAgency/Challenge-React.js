import { useTheme } from "../../context/ThemeContext";
import Form from "react-bootstrap/Form";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const label =
    theme === "light" ? (
      <i className="bi bi-moon-fill"></i>
    ) : (
      <i className="bi bi-brightness-high"></i>
    );

  return (
    <>
      <Form>
        <Form.Check onClick={toggleTheme} type="switch" id="custom-switch" />
      </Form>
      {label}
    </>
  );
};

export default ThemeToggle;
