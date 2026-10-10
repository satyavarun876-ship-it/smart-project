import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.some((item) => item.id === action.payload.id)) state.push(action.payload);
    },
    removeFromWishlist: (state, action) => state.filter((item) => item.id !== action.payload),
    clearWishlist: () => []
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
