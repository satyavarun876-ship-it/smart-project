import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data';
import ProductCard from '../components/ProductCard';
import '../styles/home.css';

const categories = [
  ['Smartphones','https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80'],
  ['Laptops','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80'],
  ['Smart Watches','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80'],
  ['Gaming','https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=80'],
  ['Cameras','https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80'],
];

export default function Home() {
  const featured = products.slice(0, 8);
  return (
    <>
      <section className="hero">
        <div>
          <span className="kicker">GADGETZONE / 2026 COLLECTION</span>
          <h1>Smarter tech. Better every day.</h1>
          <p>Discover thoughtfully selected gadgets for work, play and everything between. Clean design, useful technology and prices worth a second look.</p>
          <div className="hero-actions"><Link className="primary-button" to="/products">Shop gadgets <ArrowRight size={16} /></Link><Link className="secondary-button" to="/products?category=Smartphones">Explore collection</Link></div>
          <div style={{display:'flex', gap:'24px', marginTop:'30px', color:'var(--muted)', fontSize:'12px', fontWeight:700}}>
            <span><ShieldCheck size={15} style={{display:'inline',verticalAlign:'middle'}} /> Secure checkout</span>
            <span><Truck size={15} style={{display:'inline',verticalAlign:'middle'}} /> Fast dispatch</span>
          </div>
        </div>
        <div className="hero-visual"><img src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1200&q=85" alt="Modern gadgets" /><span className="hero-tag"><Sparkles size={14} style={{display:'inline',verticalAlign:'middle'}} /> CURATED TECH</span></div>
      </section>

      <section className="home-section">
        <div className="section-head"><div><span className="kicker">SHOP BY TYPE</span><h2>Find your next device</h2></div><Link to="/products">View all →</Link></div>
        <div className="category-grid">{categories.map(([name, image]) => <Link className="category-card" key={name} to={`/products?category=${encodeURIComponent(name)}`}><img src={image} alt={name} /><div>{name}</div></Link>)}</div>
      </section>

      <section className="home-section">
        <div className="section-head"><div><span className="kicker">STAFF PICKS</span><h2>Popular right now</h2></div><Link to="/products">See collection →</Link></div>
        <div className="feature-grid">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="home-section">
        <div className="story">
          <div><span className="kicker" style={{color:'#b8d72f'}}>WHY GADGETZONE</span><h2>Less noise. Better gadgets.</h2><p>We designed GadgetZone around the way people actually shop: quick discovery, useful filters, honest product information and a checkout flow that stays out of the way.</p><Link className="primary-button" to="/products">Start exploring</Link></div>
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85" alt="Technology components" />
        </div>
      </section>
    </>
  );
}
