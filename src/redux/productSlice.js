import { createSlice } from '@reduxjs/toolkit';
import { products } from '../data';

const initialState = {
  items: products,
  search: '',
  category: 'All',
  maxPrice: 180000,
  minRating: 0,
  sort: 'featured'
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch: (state, action) => { state.search = action.payload; },
    setCategory: (state, action) => { state.category = action.payload; },
    setMaxPrice: (state, action) => { state.maxPrice = Number(action.payload); },
    setMinRating: (state, action) => { state.minRating = Number(action.payload); },
    setSort: (state, action) => { state.sort = action.payload; },
    resetFilters: (state) => {
      state.search = '';
      state.category = 'All';
      state.maxPrice = 180000;
      state.minRating = 0;
      state.sort = 'featured';
    }
  }
});

export const { setSearch, setCategory, setMaxPrice, setMinRating, setSort, resetFilters } = productSlice.actions;

export const selectVisibleProducts = (state) => {
  const { items, search, category, maxPrice, minRating, sort } = state.products;
  const query = search.trim().toLowerCase();
  const visible = items.filter((p) =>
    (!query || `${p.name} ${p.category}`.toLowerCase().includes(query)) &&
    (category === 'All' || p.category === category) &&
    p.price <= maxPrice &&
    p.rating >= minRating
  );
  return [...visible].sort((a, b) =>
    sort === 'price-low' ? a.price - b.price :
    sort === 'price-high' ? b.price - a.price :
    sort === 'rating' ? b.rating - a.rating :
    sort === 'name' ? a.name.localeCompare(b.name) :
    b.discount - a.discount
  );
};

export default productSlice.reducer;
