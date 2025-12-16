import React from 'react';
import { useData } from '../context/DataContext';
import { Check, Star } from 'lucide-react';

const Services: React.FC = () => {
  const { services, siteContent, language } = useData();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-brand-500 font-medium tracking-[0.2em] mb-4 text-xs uppercase">
              {language === 'zh' ? '服务套餐' : 'Packages & Pricing'}
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              {language === 'zh' ? '定制拍摄方案' : 'Curated Collections'}
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto font-light tracking-wide text-xs md:text-sm px-4">
             {language === 'zh' 
                ? '所有套系适用于上门/外景，为您记录不可复制的温情时刻' 
                : 'All packages suitable for on-location/outdoor sessions, capturing unique moments of warmth'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
             const title = language === 'zh' ? service.titleZh : service.titleEn;
             const subTitle = language === 'zh' ? service.subTitleZh : service.subTitleEn;
             const description = language === 'zh' ? service.descriptionZh : service.descriptionEn;
             const features = language === 'zh' ? service.featuresZh : service.featuresEn;

             return (
                <div
                key={service.id}
                className={`relative p-6 md:p-8 rounded-sm transition-all duration-500 flex flex-col group ${
                    service.isPopular
                    ? 'bg-slate-800 border-t-4 border-brand-500 shadow-2xl shadow-black/50 transform md:-translate-y-4'
                    : 'bg-slate-900 border border-slate-800 hover:border-brand-500/30 hover:bg-slate-800'
                }`}
                >
                {service.isPopular && (
                    <div className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Popular
                    </div>
                )}
                
                <div className="mb-6">
                    <h4 className="text-lg font-bold text-white font-serif tracking-wide">{title}</h4>
                    {subTitle && (
                        <span className="inline-block mt-2 text-brand-400 text-xs font-medium tracking-wider uppercase opacity-80">
                            {subTitle}
                        </span>
                    )}
                </div>

                <div className="flex items-baseline mb-8 border-b border-slate-700/50 pb-8">
                    <span className="text-3xl md:text-4xl font-serif text-white group-hover:text-brand-500 transition-colors">{service.price}</span>
                </div>

                <div className="flex-grow">
                    <p className="text-slate-400 mb-8 text-xs leading-relaxed italic border-l border-brand-500/30 pl-4">
                        {description}
                    </p>
                    <ul className="space-y-4 mb-10">
                        {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-slate-300 text-xs font-light">
                            <Check className="h-3 w-3 text-brand-500 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feature}</span>
                        </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={scrollToContact}
                    className={`block w-full text-center py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-all mt-auto border ${
                    service.isPopular
                        ? 'bg-brand-600 border-brand-600 text-white hover:bg-brand-500 hover:border-brand-500'
                        : 'bg-transparent border-slate-600 text-slate-300 hover:border-brand-500 hover:text-brand-500'
                    }`}
                >
                    {language === 'zh' ? '咨询档期' : 'Inquire Now'}
                </button>
                </div>
             );
          })}
        </div>
        
        {/* Additional Notes - Dynamic Content */}
        <div className="mt-12 md:mt-16 border-t border-slate-800 pt-8 text-center">
            <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-6">
                {language === 'zh' ? '备注说明' : 'Important Notes'}
            </h4>
            <div className="text-[10px] md:text-xs text-slate-500 max-w-3xl mx-auto font-light leading-7 whitespace-pre-wrap text-left md:text-center">
                {language === 'zh' ? siteContent.serviceNotesZh : siteContent.serviceNotesEn}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;