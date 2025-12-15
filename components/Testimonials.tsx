import React from 'react';
import { useData } from '../context/DataContext';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { testimonials, language } = useData();

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -left-20 top-20 w-64 h-64 bg-brand-900/10 rounded-full blur-[80px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-500 font-medium tracking-[0.2em] mb-4 text-xs uppercase">
              {language === 'zh' ? '客户心声' : 'Testimonials'}
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
             {language === 'zh' ? '爱的反馈' : 'Client Love'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-slate-900/50 p-8 rounded-sm border border-slate-800/50 relative group hover:bg-slate-900 transition-colors duration-500">
                <Quote className="text-brand-800/30 w-10 h-10 mb-6 group-hover:text-brand-600/30 transition-colors" />
                <p className="text-slate-300 font-serif italic leading-relaxed text-sm mb-8 min-h-[80px]">
                    "{language === 'zh' ? item.contentZh : item.contentEn}"
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-slate-400 font-serif font-bold text-sm">
                        {item.name.charAt(0)}
                    </div>
                    <div>
                        <h4 className="text-white text-sm font-bold tracking-wide">{item.name}</h4>
                        <span className="text-brand-500 text-[10px] uppercase tracking-widest">
                            {language === 'zh' ? item.roleZh : item.roleEn}
                        </span>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;