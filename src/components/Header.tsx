'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Check if we're on a page that should always have dark text
  const isDarkTextPage = pathname.startsWith('/blog') || pathname.startsWith('/gallery') || pathname.startsWith('/about') || pathname.startsWith('/contact') || pathname.startsWith('/services') || pathname.startsWith('/projects');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isDarkTextPage
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/images/pcm4.png"
                alt="ProComm Media"
                width={220}
                height={50}
                className="h-14 lg:h-18 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md ${
                    isScrolled || isDarkTextPage
                      ? 'text-gray-900 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white shadow-sm border border-gray-200 bg-white/80' 
                      : 'text-white hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Admin Login Button */}
              <Link
                href="/admin/login"
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2 ${
                  isScrolled || isDarkTextPage
                    ? 'text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white shadow-md border border-blue-200 bg-blue-50/80' 
                    : 'text-blue-200 hover:bg-blue-600 hover:text-white backdrop-blur-sm border border-blue-300 hover:border-blue-100 bg-blue-600/20'
                }`}
              >
                <User size={16} />
                Admin
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isScrolled || isDarkTextPage ? 'text-gray-900 hover:bg-gray-100 hover:text-gray-900' : 'text-white hover:bg-white/20'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 border ${
                isScrolled || isDarkTextPage ? 'border-gray-200' : 'border-white/30'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl mt-3 border border-gray-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Admin Login */}
              <Link
                href="/admin/login"
                className="block px-4 py-3 text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl flex items-center gap-2 border-t border-gray-100 mt-3 pt-4 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={16} />
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;