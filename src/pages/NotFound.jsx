import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <div className="empty-state">
        
        <span className="kicker">404</span>

        <h2>Page not found</h2>

        <p>
          The gadget you're looking for took a wrong turn.
        </p>

        <Link className="primary-button" to="/">
          Back home
        </Link>

      </div>
    </div>
  );
}