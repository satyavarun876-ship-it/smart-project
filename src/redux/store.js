import { configureStore } from '@reduxjs/toolkit';
import products from './productSlice';
import cart from './cartSlice';
import wishlist from './wishlistSlice';
import auth from './authSlice';

export const store = configureStore({
  reducer: { products, cart, wishlist, auth }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
  localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
});
