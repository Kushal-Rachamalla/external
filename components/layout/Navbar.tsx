import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const headerClasses = isAuthenticated ? "bg-transparent text-white" : "bg-white shadow-sm";
  const iconColor = isAuthenticated ? "text-white" : "text-accent";
  const titleColor = isAuthenticated ? "text-white" : "text-primary";
  const welcomeTextColor = isAuthenticated ? "text-gray-200" : "text-gray-700";
  const hamburgerColor = isAuthenticated ? "text-gray-200 hover:text-white" : "text-gray-500 hover:text-gray-700";


  return (
    <header className={`${headerClasses} sticky top-0 z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {isAuthenticated && (
                <button
                    onClick={onMenuClick}
                    className={`md:hidden mr-4 ${hamburgerColor}`}
                    aria-label="Open sidebar"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            )}
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center space-x-2">
              <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              <span className={`font-bold text-2xl ${titleColor}`}>Note Nest</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className={`hidden sm:inline ${welcomeTextColor}`}>Welcome, {user?.fullName.split(' ')[0]}!</span>
                <Link to="/profile">
                  <img src={user?.profilePicture || `https://picsum.photos/seed/${user?.id}/150/150`} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                </Link>
                <Button size="sm" variant="secondary" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <div className="space-x-2">
                <Button size="sm" variant="secondary" onClick={() => navigate('/login')}>Login</Button>
                <Button size="sm" onClick={() => navigate('/signup')}>Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
