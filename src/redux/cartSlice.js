import { createSlice } from '@reduxjs/toolkit';

const saved = JSON.parse(localStorage.getItem('cart') || '[]');

const cartSlice = createSlice({
  name: 'cart',
  initialState: saved,
  reducers: {
    addToCart: (state, action) => {
      const found = state.find((item) => item.id === action.payload.id);
      if (found) found.quantity++;
      else state.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => state.filter((item) => item.id !== action.payload),
    increaseQuantity: (state, action) => {
      const item = state.find((entry) => entry.id === action.payload);
      if (item && item.quantity < item.stock) item.quantity++;
    },
    decreaseQuantity: (state, action) => {
      const item = state.find((entry) => entry.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
    },
    clearCart: () => []
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
