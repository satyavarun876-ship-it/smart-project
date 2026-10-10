import { useDispatch, useSelector } from 'react-redux';
import { resetFilters, setCategory, setMaxPrice, setMinRating, setSearch, setSort } from '../redux/productSlice';

const categories = ['All','Smartphones','Laptops','Tablets','Smart Watches','Headphones','Earbuds','Gaming','Cameras','Smart Home','Accessories'];

export default function ProductFilter() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.products);

  return (
    <aside className="filter-box">
      <div className="row"><h3>Filters</h3><button className="clear-button" onClick={() => dispatch(resetFilters())}>Reset</button></div>
      <div className="filter-group">
        <label>Search</label>
        <input type="text" placeholder="Search gadgets..." value={filters.search} onChange={(e) => dispatch(setSearch(e.target.value))} />
      </div>
      <div className="filter-group">
        <label>Category</label>
        <div className="category-options">
          {categories.map((cat) => <button key={cat} className={filters.category === cat ? 'active' : ''} onClick={() => dispatch(setCategory(cat))}>{cat}</button>)}
        </div>
      </div>
      <div className="filter-group">
        <label>Maximum price: ₹{filters.maxPrice.toLocaleString('en-IN')}</label>
        <input type="range" min="5000" max="180000" step="5000" value={filters.maxPrice} onChange={(e) => dispatch(setMaxPrice(e.target.value))} />
      </div>
      <div className="filter-group">
        <label>Minimum rating</label>
        <select value={filters.minRating} onChange={(e) => dispatch(setMinRating(e.target.value))}>
          <option value="0">All ratings</option><option value="4">4+ stars</option><option value="4.5">4.5+ stars</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Sort by</label>
        <select value={filters.sort} onChange={(e) => dispatch(setSort(e.target.value))}>
          <option value="featured">Featured</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Rating</option><option value="name">Name</option><option value="discount">Discount</option>
        </select>
      </div>
    </aside>
  );
}
