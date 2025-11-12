import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-extrabold text-accent [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">404</h1>
      <h2 className="text-3xl font-bold text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)] mt-4">Page Not Found</h2>
      <p className="text-gray-200 mt-2 mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link to="/dashboard">
        <Button size="lg">Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
