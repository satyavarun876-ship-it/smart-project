import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { clearCart } from '../redux/cartSlice';
import '../styles/cart.css';

export default function Cart() {
  const items = useSelector((s) => s.cart);
  const { isLoggedIn } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 499;
  const total = subtotal + shipping;

  if (!items.length) return <div className="page"><div className="page-intro"><span className="kicker">YOUR BAG</span><h1>Your cart is empty</h1></div><div className="empty-state"><h2>Nothing here yet.</h2><p>Find something useful and bring it home.</p><Link to="/products" className="primary-button">Start shopping</Link></div></div>;

  return (
    <div className="page">
      <div className="page-intro row"><div><span className="kicker">YOUR BAG</span><h1>Your cart</h1></div><button className="clear-button" onClick={() => dispatch(clearCart())}>Clear cart</button></div>
      <div className="cart-layout">
        <div className="cart-list">{items.map((item) => <CartItem key={item.id} item={item} />)}</div>
        <aside className="summary"><h2>Summary</h2><div className="summary-line"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div><div className="summary-line"><span>Shipping</span><span>{shipping ? `₹${shipping}` : 'Free'}</span></div><div className="summary-total"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div><Link className="primary-button" to={isLoggedIn ? '/checkout' : '/login'}>{isLoggedIn ? 'Proceed to checkout' : 'Sign in to checkout'}</Link><Link className="secondary-button" style={{width:'100%',marginTop:'9px',borderColor:'#555',color:'white'}} to="/products">Continue shopping</Link></aside>
      </div>
    </div>
  );
}
