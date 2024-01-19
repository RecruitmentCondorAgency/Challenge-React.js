import { useState, useEffect } from 'react';
import axios from 'axios';
import { ListItem } from '../types/items';
import { ITEMSBASEURL } from '../api/apiurl';


export const useItems = () => {
    const [items, setItems] = useState<ListItem[]>([]);
    const fetchItems = async () => {
        try {
            const response = await axios.get<ListItem[]>(`${ITEMSBASEURL}`);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    useEffect(() => {


        fetchItems();
    }, []);

    const addItem = async (newItem: Omit<ListItem, 'id'>) => {
        try {
            const response = await axios.post<ListItem>(`${ITEMSBASEURL}`, newItem);
            setItems([...items, response.data]);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const updateItem = async (updatedItem: ListItem) => {

        if (updatedItem.label && updatedItem.value > 0) {

            try {
                await axios.put(`${ITEMSBASEURL}/${updatedItem.id}`, updatedItem);
                setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
            } catch (error) {
                console.error('Error updating item:', error);
            }
        }

    };

    const deleteItem = async (id: string) => {
        try {
            await axios.delete(`${ITEMSBASEURL}/${id}`);
            setItems(items.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return {
        items,
        addItem,
        updateItem,
        deleteItem,
    };
};
