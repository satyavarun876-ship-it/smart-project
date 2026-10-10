import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import '../styles/checkout.css';

export default function Checkout() {
  const { currentUser } = useSelector((s) => s.auth);
  const items = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('UPI');
  const [form, setForm] = useState({ name: currentUser?.name || '', email: currentUser?.email || '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [error, setError] = useState('');

  if (!currentUser) return <div className="page"><div className="empty-state"><h2>Please sign in first.</h2><p>Checkout is available after you sign in.</p><button className="primary-button" onClick={() => navigate('/login')}>Go to login</button></div></div>;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50000 ? 0 : 499;
  const total = subtotal + shipping;

  const submit = (e) => {
    e.preventDefault();
    if (!items.length) return navigate('/cart');
    const order = `GZ-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    localStorage.setItem('lastOrder', JSON.stringify({ order, customer: form, payment, total, items, createdAt: new Date().toISOString() }));
    dispatch(clearCart());
    navigate(`/order-success?order=${order}`);
  };

  return <div className="page"><div className="page-intro"><span className="kicker">CHECKOUT</span><h1>Complete your order.</h1><p>A quick final step and your gadgets are on their way.</p></div>
    <form onSubmit={submit} className="checkout-layout">
      <div>
        <div className="checkout-card"><h2>Customer information</h2><div className="checkout-form">
          {Object.entries(form).map(([key, value]) => <label key={key} className={key === 'address' ? 'wide' : ''}>{key[0].toUpperCase()+key.slice(1)}<input required type={key==='email'?'email':'text'} value={value} onChange={(e)=>setForm({...form,[key]:e.target.value})} /></label>)}
        </div></div>
        <div className="checkout-card"><h2>Payment method</h2><div className="payment-options">{['UPI','Card','Cash on Delivery'].map((option)=><label className="payment-option" key={option}><input type="radio" name="payment" value={option} checked={payment===option} onChange={(e)=>setPayment(e.target.value)} />{option}</label>)}</div></div>
        {error && <div className="form-error">{error}</div>}
      </div>
      <aside className="summary"><h2>Order summary</h2>{items.map((item)=><div className="summary-line" key={item.id}><span>{item.name} × {item.quantity}</span><span>₹{(item.price*item.quantity).toLocaleString('en-IN')}</span></div>)}<div className="summary-line"><span>Shipping</span><span>{shipping?'₹499':'Free'}</span></div><div className="summary-total"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div><button className="primary-button" type="submit">Place order</button></aside>
    </form>
  </div>;
}
