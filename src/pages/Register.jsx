import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/authSlice';
import '../styles/auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) return setError('An account with this email already exists.');
    dispatch(register({ name: form.name, email: form.email, password: form.password }));
    navigate('/');
  };

  return <div className="auth-page"><div className="auth-panel"><span className="kicker">JOIN THE CLUB</span><h1>Make room for more.</h1><p>Create an account for a calmer way to shop tech.</p><form onSubmit={submit}>{error && <div className="form-error">{error}</div>}<label>Full name<input required value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} placeholder="Alex Morgan" /></label><label>Email<input type="email" required value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} placeholder="you@example.com" /></label><div className="form-row"><label>Password<input type="password" required value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} placeholder="6+ characters" /></label><label>Confirm<input type="password" required value={form.confirm} onChange={(e) => setForm({...form,confirm:e.target.value})} placeholder="Repeat it" /></label></div><button className="primary-button full">Create account</button></form><p className="auth-switch">Already a member? <Link to="/login">Sign in</Link></p></div><div className="auth-aside"><span>02</span><h2>Your next favorite thing is closer.</h2><p>Join a community that believes good design belongs in everyday life.</p></div></div>;
}
