import { Container, Row, Col } from "react-bootstrap";
import ThemeToggle from "./components/themeToggle/ThemeToggle";
import ItemsManager from "./components/items/ItemsManager";
import { ThemeProvider } from "./context/ThemeContext";

const AppContent = () => {
  return (
    <Container fluid>
      <Row>
        <Col
          style={{ display: "flex" }}
          className="flex  justify-content-end p-2"
        >
          <ThemeToggle />
        </Col>
      </Row>
      <Row>
        <h1 className="mainTitleRow">Items Manager App</h1>
      </Row>
      <Row>
        <Col>
          <ItemsManager />
        </Col>
      </Row>
    </Container>
  );
};

export const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};
