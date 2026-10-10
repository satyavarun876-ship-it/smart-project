import { Check, Package } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import '../styles/success.css';

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const order = params.get('order') || JSON.parse(localStorage.getItem('lastOrder') || '{}').order || 'GZ-2026-000000';
  return <div className="success-page"><div className="success-icon"><Check /></div><span className="kicker">ORDER CONFIRMED</span><h1>That was a good choice.</h1><p>Your gadgets are getting ready. Your order details are saved in this browser.</p><div className="order-number"><Package size={18} /> {order}</div><br /><Link to="/products" className="primary-button">Keep exploring</Link></div>;
}
