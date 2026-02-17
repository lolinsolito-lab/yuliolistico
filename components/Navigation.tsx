import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Metodo', path: '/services' },
    { name: 'Chi Sono', path: '/about' },
    { name: 'Area Personale', path: '/dashboard' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#faf9f6]/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <Logo 
            className={`w-10 h-10 transition-colors ${isScrolled ? 'text-[#849b87]' : 'text-[#849b87] md:text-[#f3e9d2]'}`} 
            color="currentColor"
          />
          <div className="flex flex-col">
            <span className={`text-xl font-serif tracking-widest font-bold uppercase transition-colors leading-none ${
               isScrolled ? 'text-[#292524]' : 'text-[#292524] md:text-white'
            }`}>
              Yuli Olistico
            </span>
            <span className={`text-[0.6rem] tracking-[0.2em] uppercase mt-1 ${
               isScrolled ? 'text-[#849b87]' : 'text-[#849b87] md:text-[#f3e9d2]'
            }`}>
              Benessere Naturale
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm tracking-widest uppercase hover:text-[#c07a60] transition-colors ${
                isScrolled ? 'text-[#57534e]' : 'text-white/90 hover:text-white'
              } ${location.pathname === link.path ? 'border-b border-[#c07a60]' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking"
            className={`px-6 py-2 border transition-all duration-300 ${
              isScrolled
                ? 'border-[#849b87] text-[#849b87] hover:bg-[#849b87] hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-[#849b87]'
            }`}
          >
            Prenota
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#292524]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu className={!isScrolled ? "text-[#292524] md:text-white" : "text-[#292524]"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#faf9f6] border-t border-stone-200 p-6 md:hidden flex flex-col gap-6 shadow-xl h-screen">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[#57534e] text-lg font-serif"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking"
            className="text-center w-full py-3 bg-[#849b87] text-white uppercase tracking-widest mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Prenota Ora
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;