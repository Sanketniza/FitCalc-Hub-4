import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/input', label: 'Input Data' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/results', label: 'Results' },
    { path: '/team', label: 'Team' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-800 dark:bg-slate-900 text-slate-100 shadow-md">

      <div className="container  mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold tracking-tight text-green-400">FitCalc Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 hover:text-green-400 ${
                  location.pathname === link.path ? 'text-green-400' : 'text-white dark:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-slate-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-4 rounded-md transition-colors duration-200 hover:bg-slate-700 ${
                  location.pathname === link.path ? 'bg-slate-700 text-green-400' : 'text-white'
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="py-2 px-4">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
