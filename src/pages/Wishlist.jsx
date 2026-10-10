import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { clearWishlist } from '../redux/wishlistSlice';
import '../styles/products.css';

export default function Wishlist() {
  const items = useSelector((s) => s.wishlist);
  const dispatch = useDispatch();
  return <div className="page wishlist-page">
    <div className="page-intro row"><div><span className="kicker">SAVED FOR LATER</span><h1>Your wishlist</h1></div>{items.length > 0 && <button className="clear-button" onClick={() => dispatch(clearWishlist())}>Clear wishlist</button>}</div>
    {items.length ? <div className="product-grid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div> : <div className="empty-state"><Heart size={40} /><h2>Nothing saved yet</h2><p>Keep the good stuff close. Your wishlist lives here.</p><Link to="/products" className="primary-button">Find a favorite</Link></div>}
  </div>;
}
