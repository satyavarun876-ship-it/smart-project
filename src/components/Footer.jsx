import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h3>GadgetZone</h3>
          <p>Smart technology, carefully selected. A premium frontend marketplace built for everyday gadgets.</p>
          </div>
        <div>
          <h3>Shop</h3>
          <Link to="/products">All products</Link>
          <Link to="/products?category=Smartphones">Smartphones</Link>
          <Link to="/products?category=Laptops">Laptops</Link>
          <Link to="/products?category=Gaming">Gaming</Link>
          </div>
        <div>
          <h3>Explore</h3>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/login">Account</Link>
          </div>
        <div>
          <h3>About</h3>
          <p>Professional responsive UI, Redux state management and Local Storage persistence — frontend only.</p>
          </div>
      </div>
      <div className="footer-bottom">© 2026 GadgetZone. Frontend marketplace demo.</div>
    </footer>
  );
}
