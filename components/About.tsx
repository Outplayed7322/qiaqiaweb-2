import React from 'react';
import { useData } from '../context/DataContext';
import { Quote } from 'lucide-react';

const About: React.FC = () => {
  const { siteContent, language } = useData();

  return (
    <section id="about" className="py-16 md:py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-20 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Image Side */}
          <div className="relative group order-2 md:order-1">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-600/20 to-slate-800/20 rounded-sm opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            {/* Reduced height on mobile (h-[400px]) to ensure text is visible without scrolling too much */}
            <div className="relative h-[400px] md:h-[600px] bg-slate-900 overflow-hidden border-none shadow-2xl">
                <img 
                    src={siteContent.aboutImage} 
                    alt="About Studio" 
                    className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 ease-in-out scale-105 hover:scale-100"
                />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 bg-slate-950/80 backdrop-blur-md p-4 md:p-6 border-l-2 border-brand-500">
                    <p className="text-brand-100 font-serif italic text-sm md:text-lg leading-relaxed">
                        "Photography is the story I fail to put into words."
                    </p>
                </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="pl-0 md:pl-10 order-1 md:order-2">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
                <span className="h-[1px] w-12 bg-brand-500"></span>
                <span className="text-brand-500 text-xs font-bold tracking-[0.3em] uppercase">
                    {language === 'zh' ? '品牌故事' : 'Our Story'}
                </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 md:mb-10 tracking-tight">
              {language === 'zh' ? siteContent.aboutTitleZh : siteContent.aboutTitleEn}
            </h2>

            <div className="relative mb-10 md:mb-12">
                <Quote className="absolute -top-6 -left-4 md:-left-8 text-brand-900/20 w-16 h-16 md:w-20 md:h-20 transform -scale-x-100" />
                <div className="space-y-6 text-slate-300 leading-loose text-base md:text-lg whitespace-pre-wrap relative z-10 font-light font-serif">
                    {language === 'zh' ? siteContent.aboutTextZh : siteContent.aboutTextEn}
                </div>
            </div>

            <div className="flex gap-8 md:gap-12 border-t border-slate-800 pt-8">
                <div>
                    <h3 className="text-3xl md:text-4xl font-serif text-white">5<span className="text-brand-500 text-2xl">+</span></h3>
                    <p className="text-slate-500 text-[10px] tracking-widest uppercase mt-2">Years Experience</p>
                </div>
                <div>
                    <h3 className="text-3xl md:text-4xl font-serif text-white">400<span className="text-brand-500 text-2xl">+</span></h3>
                    <p className="text-slate-500 text-[10px] tracking-widest uppercase mt-2">Happy Families</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;