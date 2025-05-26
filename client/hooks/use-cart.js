'use client';

import { useState, useEffect } from 'react';

export function useCart() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('posCart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posCart', JSON.stringify(items));
  }, [items]);
  
  const addItem = (product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
      
        return currentItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
     
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };
  

  const updateQuantity = (id, newQuantity) => {
    setItems(currentItems => {
      if (newQuantity <= 0) {
       
        return currentItems.filter(item => item.id !== id);
      } else {
     
        return currentItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };

  const removeItem = (id) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };
  

  const clearCart = () => {
    setItems([]);
  };
  

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    calculateTotal
  };
}