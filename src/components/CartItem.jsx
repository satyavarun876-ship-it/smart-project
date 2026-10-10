import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div>
        <div className="product-category">{item.category}</div>
        <h3>{item.name}</h3>
        <p>₹{item.price.toLocaleString('en-IN')} each</p>
        <div className="qty-control">
          <button onClick={() => dispatch(decreaseQuantity(item.id))}><Minus size={13} /></button>
          <b>{item.quantity}</b>
          <button onClick={() => dispatch(increaseQuantity(item.id))}><Plus size={13} /></button>
        </div>
      </div>
      <div style={{textAlign:'right'}}>
        <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
        <br />
        <button className="remove" onClick={() => dispatch(removeFromCart(item.id))}><Trash2 size={16} /></button>
      </div>
    </div>
  );
}
