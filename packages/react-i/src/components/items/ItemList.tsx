import { useMemo, useState } from "react";
import { ListItem } from "../../types/items";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

interface ItemsListProps {
  items: ListItem[];
  onDeleteItem: (id: string) => void;
  onUpdateItem: (updatedItem: ListItem) => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  items,
  onDeleteItem,
  onUpdateItem,
}) => {
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ label: string; value: number }>({
    label: "",
    value: 0,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const handleEditClick = (item: ListItem) => {
    setEditItemId(item.id);
    setFormData({ label: item.label, value: item.value });
  };

  const handleUpdate = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    onUpdateItem({ ...formData, id });
    setEditItemId(null);
  };

  const handleCancel = () => {
    setEditItemId(null);
  };

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex justify-center items-table-width">
      <Table size="sm" responsive="sm" striped bordered hover>
        <thead>
          <tr>
            <th
              className="th-center sortable-header"
              onClick={() => requestSort("id")}
            >
              ID
            </th>
            <th
              className="th-center sortable-header"
              onClick={() => requestSort("label")}
            >
              Label
            </th>
            <th className="th-center " onClick={() => requestSort("value")}>
              Value
            </th>
            <th className="th-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item) => (
            <tr key={item.id}>
              {editItemId === item.id ? (
                <>
                  <td>{item.id}</td>
                  <td>
                    <Form.Group controlId="label">
                      <Form.Control
                        type="text"
                        value={formData.label}
                        onChange={(e) =>
                          setFormData({ ...formData, label: e.target.value })
                        }
                      />
                    </Form.Group>
                  </td>
                  <td>
                    <Form.Group controlId="value">
                      <Form.Control
                        type="number"
                        value={formData.value}
                        onChange={(e) => {
                          if (+e.target.value >= 0)
                            setFormData({
                              ...formData,
                              value: Number(e.target.value),
                            });
                        }}
                      />
                    </Form.Group>
                  </td>

                  <td className="action-buttons-table">
                    <Button
                      variant="success"
                      onClick={(e) => handleUpdate(e, item.id)}
                    >
                      <i className="bi bi-floppy"></i>
                    </Button>
                    <Button onClick={handleCancel}>
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.id}</td>
                  <td>{item.label}</td>
                  <td>{item.value}</td>
                  <td className="action-buttons-table">
                    <Button
                      variant="secondary"
                      onClick={() => handleEditClick(item)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onDeleteItem(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemsList;
