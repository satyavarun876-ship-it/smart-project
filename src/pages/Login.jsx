import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import '../styles/auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email.toLowerCase() === form.email.toLowerCase() && u.password === form.password);
    if (!user) return setError('Email or password is incorrect.');
    dispatch(login({ name: user.name, email: user.email }));
    navigate('/');
  };

  return <div className="auth-page"><div className="auth-panel"><span className="kicker">WELCOME BACK</span><h1>Good to see you.</h1><p>Sign in to keep your cart, wishlist and checkout ready.</p><form onSubmit={submit}>{error && <div className="form-error">{error}</div>}<label>Email<input type="email" required value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} placeholder="you@example.com" /></label><label>Password<input type="password" required value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} placeholder="Your password" /></label><button className="primary-button full">Sign in</button></form><p className="auth-switch">New to GadgetZone? <Link to="/register">Create an account</Link></p></div><div className="auth-aside"><span>01</span><h2>Good design belongs in everyday life.</h2><p>Explore smart devices selected for useful features, clean design and everyday performance.</p></div></div>;
}
