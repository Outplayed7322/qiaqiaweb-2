import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero: React.FC = () => {
  const { siteContent, language } = useData();

  return (
    // Changed h-screen to min-h-[100dvh] for better mobile browser support (address bar handling)
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Dynamic from Context */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteContent.heroImage}
          alt="Studio Background"
          className="w-full h-full object-cover opacity-40 scale-105 animate-fade-in transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950"></div>
        {/* Fine Grain Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
        <div className="mb-6 md:mb-8 flex justify-center">
            <span className="h-[1px] w-16 md:w-20 bg-brand-500/50 block"></span>
        </div>
        
        <h2 className="text-brand-500 font-medium tracking-[0.3em] mb-6 md:mb-8 text-[10px] md:text-sm animate-fade-in-up uppercase font-sans">
          {language === 'zh' ? siteContent.heroSubtitleZh : siteContent.heroSubtitleEn}
        </h2>
        
        {/* 
            Typography Logic:
            - Adjusted mobile text sizes (text-3xl) to prevent excessive wrapping on small screens
        */}
        <h1 
          className={`
            mb-8 md:mb-10 leading-tight whitespace-pre-wrap text-shadow transition-all duration-500
            ${language === 'zh' 
              ? 'font-serif font-extralight text-3xl md:text-6xl lg:text-7xl tracking-widest' 
              : 'font-serif italic text-3xl md:text-5xl lg:text-6xl tracking-wide' 
            }
            text-white
          `}
        >
          {language === 'zh' ? siteContent.heroTitleZh : siteContent.heroTitleEn}
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-6 sm:px-0">
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-10 py-3 bg-white text-slate-950 font-serif font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-brand-50 transition-colors duration-300 rounded-sm text-center"
          >
            {language === 'zh' ? '浏览作品' : 'View Portfolio'}
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-10 py-3 border border-brand-500 text-brand-500 font-serif font-bold text-xs md:text-sm tracking-widest uppercase hover:bg-brand-500 hover:text-white transition-all duration-300 rounded-sm text-center"
          >
            {language === 'zh' ? '预约拍摄' : 'Book Session'}
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-600">
        <ArrowDown className="h-5 w-5 opacity-70" />
      </div>
    </section>
  );
};

export default Hero;