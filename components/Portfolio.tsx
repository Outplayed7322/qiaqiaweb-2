import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { X, ZoomIn } from 'lucide-react';
import { PortfolioItem } from '../types';

const categories = [
  { id: 'all', nameZh: '全部', nameEn: 'All' },
  { id: 'wedding', nameZh: '婚礼', nameEn: 'Wedding' },
  { id: 'portrait', nameZh: '人像', nameEn: 'Portrait' },
  { id: 'commercial', nameZh: '商业', nameEn: 'Commercial' },
  { id: 'landscape', nameZh: '风光', nameEn: 'Landscape' },
];

const Portfolio: React.FC = () => {
  const { portfolio, language } = useData();
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = filter === 'all'
    ? portfolio
    : portfolio.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-brand-500 font-medium tracking-[0.2em] mb-4 text-xs uppercase">
              {language === 'zh' ? '作品欣赏' : 'Selected Works'}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-white">
             {language === 'zh' ? '精选作品集' : 'Our Portfolio'}
          </h3>
        </div>

        {/* Filter Buttons - Scrollable on mobile */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-start md:justify-center gap-3 md:gap-4 mb-10 md:mb-16 no-scrollbar px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex-shrink-0 px-5 md:px-6 py-2 rounded-full text-xs md:text-sm tracking-widest uppercase transition-all duration-300 border ${
                filter === cat.id
                  ? 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-900/50'
                  : 'bg-transparent border-slate-700 text-slate-400 hover:border-brand-500 hover:text-brand-500'
              }`}
            >
              {language === 'zh' ? cat.nameZh : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Grid - Adjusted auto-rows for mobile to be smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`relative group overflow-hidden bg-slate-900 cursor-pointer ${
                item.width === 'wide' ? 'md:col-span-2' : item.width === 'tall' ? 'row-span-2' : ''
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.titleZh}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-500"></div>
              
              {/* Hover Overlay - Always visible on mobile touch? No, lets keep opacity logic but maybe reduced motion */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 bg-black/20">
                 <div className="absolute top-4 right-4 text-white/80">
                     <ZoomIn className="w-5 h-5 md:w-6 md:h-6" />
                 </div>
                <span className="text-brand-500 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">{item.category}</span>
                <h4 className="text-white text-lg md:text-xl font-serif italic tracking-wide">
                    {language === 'zh' ? item.titleZh : item.titleEn}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedItem(null)}
        >
            <button 
                className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-300 hover:text-white transition-colors p-2 bg-slate-900/50 rounded-full z-[110]"
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(null);
                }}
            >
                <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <div className="max-w-6xl max-h-[90vh] w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                <img 
                    src={selectedItem.imageUrl} 
                    alt={language === 'zh' ? selectedItem.titleZh : selectedItem.titleEn}
                    className="max-h-[75vh] md:max-h-[80vh] w-auto max-w-full object-contain shadow-2xl shadow-black/50 rounded-sm"
                />
                <div className="mt-4 md:mt-6 text-center">
                    <h3 className="text-xl md:text-2xl text-white font-serif italic mb-2">
                        {language === 'zh' ? selectedItem.titleZh : selectedItem.titleEn}
                    </h3>
                    <span className="text-brand-500 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                        {selectedItem.category}
                    </span>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;