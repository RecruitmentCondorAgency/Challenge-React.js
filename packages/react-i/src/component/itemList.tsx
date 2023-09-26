
import  { useState, useEffect} from 'react';

import { useTheme } from './ThemeProvider';

import { ListItem } from '../types/items';

import ThemeToggleButton from './ThemeToggleButton';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<ListItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'alpha' >('asc');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const { theme } = useTheme();
  const [editedLabel, setEditedLabel] = useState("");
  
 // Cargar la lista desde el Local Storage al cargar la aplicación
 useEffect(() => {
  const savedItems = localStorage.getItem('items');
  if (savedItems) {
    setItems(JSON.parse(savedItems));
  }
}, []);

// Guardar la lista en el Local Storage cada vez que ocurra un cambio
useEffect(() => {
  localStorage.setItem('items', JSON.stringify(items));
}, [items]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addItem = () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newItem: ListItem = {
      id: items.length.toString(),
      label: inputValue,
      value: Math.floor(Math.random() * 100),
    };

    setItems(prevItems => [...prevItems, newItem]);
    setInputValue('');
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const sortItems = (items: ListItem[]): ListItem[] => {
    switch (sortOrder) {
      case 'asc':
        return items.sort((a, b) => a.value - b.value);
      case 'desc':
        return items.sort((a, b) => b.value - a.value);
      case 'alpha':
        return items.sort((a, b) => a.label.localeCompare(b.label));
     
      default:
        return items;
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'asc' | 'desc' | 'alpha');
  };

  const handleEditItem = (itemId: string, label: string) => {
    setEditingItemId(itemId);
    setEditedLabel(label);
};

const handleSaveItem = (itemId: string) => {
  setItems(prevItems =>
      prevItems.map(item => {
          if (item.id === itemId) {
              return { ...item, label: editedLabel };
          }
          return item;
      })
  );
  setEditingItemId(null);
  setEditedLabel("");
};
  const sortedItems = sortItems(items);

  return (
     <div className="shadow bg-white h-16 mx-auto px-5 flex items-center justify-between">
      <div className="flex flex-col items-center justify-center p-8">
        <input
          type="text"
          className="mb-2 p-2 border border-gray-400 rounded"
          placeholder="Ingrese un elemento"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${theme === 'dark' ? 'bg-blue-300' : ''}`}
          onClick={addItem}
        >
          Agregar Elemento
        </button>
        <ThemeToggleButton />
      </div>
      <div className="flex mt-4">
        <div className="mr-4">
          <label htmlFor="sortOrder" className="mr-2">
            Ordenar por:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
            className="p-2 border border-gray-400 rounded"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
            <option value="alpha">Alfabéticamente</option>
          </select>
        </div>
      </div>
      <ul className="mt-4">
        {sortedItems.map(item => (
          <li key={item.id} className="flex items-center justify-between mb-2 p-2 bg-gray-100 rounded">
            {editingItemId === item.id ? (
              <input
                type="text"
                className="mr-2 p-1 border border-gray-400 rounded"
                value={editedLabel}
                onChange={event => setEditedLabel(event.target.value)}
              />
            ) : (
              <span>{item.label}</span>
            )}
            <span>{item.value}</span>
            <div>
              {editingItemId === item.id ? (
                <button
                  className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded ${theme === 'dark' ? 'bg-green-300' : ''}`}
                  onClick={() => handleSaveItem(item.id)}
                >
                  Guardar
                </button>
              ) : (
                <>
                  <button
                    className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded ${theme === 'dark' ? 'bg-yellow-300' : ''}`}
                    onClick={() => handleEditItem(item.id, editedLabel)}
                  >
                    Editar
                  </button>
                  <button
                    className={`bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ${theme === 'dark' ? 'bg-red-300' : ''}`}
                    onClick={() => removeItem(item.id)}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

 
export default ItemList;


