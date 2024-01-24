import AddItem from "./AddItems";
import ItemsList from "./ItemList";
import { useItems } from "../../hooks/useItems";

const ItemsManager = () => {
  const { items, addItem, updateItem, deleteItem } = useItems();

  return (
    <div className="formContainer">
      <AddItem onAddItem={addItem} />
      <ItemsList
        items={items}
        onUpdateItem={updateItem}
        onDeleteItem={deleteItem}
      />
    </div>
  );
};

export default ItemsManager;
