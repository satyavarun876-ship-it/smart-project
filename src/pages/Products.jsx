import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import { selectVisibleProducts, setCategory } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
import '../styles/products.css';

export default function Products() {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const visible = useSelector(selectVisibleProducts);
  const category = useSelector((s) => s.products.category);

  useEffect(() => {
    const value = params.get('category');
    if (value) dispatch(setCategory(value.toLowerCase() === 'all' ? 'All' : value));
  }, [params, dispatch]);

  return (
    <div className="page products-page">
      <div className="page-intro"><span className="kicker">THE COLLECTION</span><h1>{category === 'All' ? 'All gadgets' : category}</h1><p>Technology with good taste and a job to do.</p></div>
      <div className="products-layout">
        <ProductFilter />
        <div className="products-results">
          <div className="results-bar"><span><b>{visible.length}</b> products</span><span className="mobile-filter">Filters above</span></div>
          {visible.length ? <div className="product-grid">{visible.map((p) => <ProductCard key={p.id} product={p} />)}</div> : <div className="empty-state"><h2>No gadgets found</h2><p>Try widening your filters or searching for something else.</p></div>}
        </div>
      </div>
    </div>
  );
}
