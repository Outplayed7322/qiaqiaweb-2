import React, { useState, useEffect } from 'react';
import { Menu, X, Aperture, Globe } from 'lucide-react';
import { useData } from '../context/DataContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    home: language === 'zh' ? '首页' : 'Home',
    about: language === 'zh' ? '关于我们' : 'About',
    portfolio: language === 'zh' ? '作品展示' : 'Portfolio',
    services: language === 'zh' ? '服务报价' : 'Services',
    contact: language === 'zh' ? '联系我们' : 'Contact',
    book: language === 'zh' ? '立即预约' : 'Book Now',
  };

  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.about, href: '#about' },
    { name: t.portfolio, href: '#portfolio' },
    { name: t.services, href: '#services' },
    { name: t.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#home" className="flex items-center gap-3 group">
              {/* Logo Re-creation: Orange Aperture + Q */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                 <Aperture className="w-10 h-10 text-brand-500 absolute transition-transform duration-700 group-hover:rotate-90" strokeWidth={1.5} />
                 <span className="text-sm font-bold text-white relative z-10 font-serif translate-y-[1px]">Q</span>
              </div>
              <div className="flex flex-col justify-center">
                  <span className="text-2xl font-serif font-bold tracking-wider text-white leading-none group-hover:text-brand-100 transition-colors">QIAQIA</span>
                  <span className="text-[10px] tracking-[0.35em] text-brand-500 uppercase font-medium mt-1 pl-[1px]">Photography</span>
              </div>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs lg:text-sm font-medium text-slate-300 hover:text-brand-500 transition-colors tracking-widest uppercase font-sans"
              >
                {link.name}
              </a>
            ))}
            
            {/* Language Switcher */}
            <button 
                onClick={toggleLanguage}
                className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs border border-slate-700 px-3 py-1.5 rounded-full transition-all hover:border-brand-500 hover:bg-slate-900 group"
            >
                <Globe className="h-3 w-3 group-hover:text-brand-500 transition-colors" />
                <span className="font-serif tracking-wide">{language === 'zh' ? 'EN' : '中文'}</span>
            </button>

            <a href="#contact" className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold tracking-widest uppercase rounded-sm transition-all shadow-lg shadow-brand-900/50 hover:shadow-brand-500/30 hover:-translate-y-0.5">
              {t.book}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button 
                onClick={toggleLanguage}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-xs border border-slate-700 px-2 py-1 rounded-full"
            >
                {language === 'zh' ? 'EN' : '中'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-brand-500 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-7 w-7" strokeWidth={1.5} /> : <Menu className="h-7 w-7" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 absolute w-full shadow-2xl">
          <div className="px-6 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-4 text-lg font-serif font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg border-b border-slate-800/50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;