import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const saved = useSelector((s) => s.wishlist.some((p) => p.id === product.id));

  return (
    <article className="product-card">
      <div className="product-media">
        <Link to={`/products/${product.id}`}><img src={product.image} alt={product.name} loading="lazy" /></Link>
        <span className="discount">-{product.discount}%</span>
        <button
          className={saved ? 'wishlist-btn active' : 'wishlist-btn'}
          aria-label="Wishlist"
          onClick={() => dispatch(saved ? removeFromWishlist(product.id) : addToWishlist(product))}
        >
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="rating"><Star size={14} fill="currentColor" /> {product.rating} <span>({product.stock})</span></div>
        <div className="price-row"><span className="price">₹{product.price.toLocaleString('en-IN')}</span><span className="original">₹{product.originalPrice.toLocaleString('en-IN')}</span></div>
        <div className="card-actions">
          <button className="primary-button" onClick={() => dispatch(addToCart(product))}><ShoppingCart size={15} /> Add to cart</button>
          <button className="wish-button" onClick={() => dispatch(saved ? removeFromWishlist(product.id) : addToWishlist(product))}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button>
        </div>
        <Link className="view-link" to={`/products/${product.id}`}>View details →</Link>
      </div>
    </article>
  );
}
