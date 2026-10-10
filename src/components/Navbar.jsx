import React from 'react';
import { Heart, LogIn, LogOut, Menu, ShoppingCart, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useSelector((s) => s.auth);
  const cart = useSelector((s) => s.cart);
  const wishlist = useSelector((s) => s.wishlist);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const signOut = () => {
    dispatch(logout());
    setOpen(false);
    navigate('/login');
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        <button className="icon-link mobile-menu" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
        <Link className="logo" to="/" onClick={() => setOpen(false)}>GadgetZone<span /></Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/products?category=Smartphones">Categories</Link>
        </div>
        <div className="nav-actions">
          <Link className="icon-link" to="/wishlist" aria-label="Wishlist"><Heart size={18} />
          <span className="badge">{wishlist.length}</span></Link>
          <Link className="icon-link" to="/cart" aria-label="Cart"><ShoppingCart size={18} /><span className="badge">{cartCount}</span></Link>
          {isLoggedIn ? (
            <div className="user-menu">
              <UserRound size={17} />
              <span className="user-name">{currentUser?.name}</span>
              <button className="logout" onClick={signOut}><LogOut size={16} /></button>
            </div>
          ) : (
            <Link className="icon-link" to="/login" aria-label="Login"><LogIn size={18} /></Link>
          )}
        </div>
      </nav>
      {open && (
        <div style={{padding:'15px 24px 20px', borderTop:'1px solid var(--line)', display:'grid', gap:'12px'}}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>Cart</Link>
        </div>
      )}
    </header>
  );
}
