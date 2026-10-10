import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';
import '../styles/productDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const product = useSelector((s) => s.products.items.find((p) => p.id === Number(id)));
  const saved = useSelector((s) => s.wishlist.some((p) => p.id === Number(id)));
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) return <div className="empty-state page"><h2>That gadget wandered off.</h2><Link to="/products" className="primary-button">Back to products</Link></div>;

  const add = () => { for (let i = 0; i < quantity; i++) dispatch(addToCart(product)); };

  return (
    <div className="page detail-page">
      <Link to="/products" className="back-link"><ArrowLeft size={16} /> Back to collection</Link>
      <div className="detail-layout">
        <div className="detail-image"><img src={product.image} alt={product.name} /><span>-{product.discount}% today</span></div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category}</span><h1>{product.name}</h1>
          <div className="detail-rating"><Star size={17} fill="currentColor" /> {product.rating} <span>Highly rated by the GadgetZone community</span></div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price"><strong>₹{product.price.toLocaleString('en-IN')}</strong><del>₹{product.originalPrice.toLocaleString('en-IN')}</del><small>Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}</small></div>
          <div className="stock">● In stock <span>{product.stock} units ready to ship</span></div>
          <div className="detail-actions">
            <div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><b>{quantity}</b><button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}><Plus size={15} /></button></div>
            <button className="primary-button" onClick={add}><ShoppingCart size={17} /> Add to cart</button>
            <button className={saved ? 'wish-button active' : 'wish-button'} onClick={() => dispatch(saved ? removeFromWishlist(product.id) : addToWishlist(product))}><Heart size={19} fill={saved ? 'currentColor' : 'none'} /></button>
          </div>
          <button className="buy-now" onClick={() => { add(); navigate('/cart'); }}>Buy now</button>
        </div>
      </div>
    </div>
  );
}
