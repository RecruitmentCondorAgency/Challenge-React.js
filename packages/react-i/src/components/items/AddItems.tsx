import { useState } from "react";
import { ListItem } from "../../types/items";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Container, Row } from "react-bootstrap";

interface AddItemProps {
  onAddItem: (newItem: Omit<ListItem, "id">) => void;
}

const AddItem: React.FC<AddItemProps> = ({ onAddItem }) => {
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (label && value) onAddItem({ label, value: Number(value) });
    setLabel("");
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit} className="my-3 p-3 border rounded">
      <h4 className="mb-3">Add New Item</h4>
      <Container>
        <Row>
          <Col md={4}>
            <Form.Group controlId="label">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., iPhone 13 Pro Max"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="value">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="number"
                placeholder="e.g., 1099"
                value={value}
                onChange={(e) => {
                  if (+e.target.value >= 0) setValue(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end pb-2">
            <Button variant={label && value ? "primary" : "secondary"} disabled={!(label && value)} type="submit">
              Add Item <i className="bi bi-plus-circle-fill"></i>
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default AddItem;
