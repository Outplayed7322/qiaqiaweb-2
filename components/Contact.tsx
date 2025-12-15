import React from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, Twitter, Lock, Aperture } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

// Custom Xiaohongshu Icon using text
// The viewBox is wider to accommodate the 3 Chinese characters
const XiaohongshuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 340 120" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <text 
      x="50%" 
      y="55%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontFamily="'Noto Sans SC', sans-serif" 
      fontWeight="900" 
      fontSize="110"
      letterSpacing="-5"
      className="select-none"
    >
      小红书
    </text>
  </svg>
);

const Contact: React.FC = () => {
  const { siteContent, language } = useData();

  const footerLinks = [
    { nameZh: '作品展示', nameEn: 'Portfolio', href: '#portfolio' },
    { nameZh: '服务报价', nameEn: 'Pricing & Packages', href: '#services' },
    { nameZh: '关于我们', nameEn: 'About Us', href: '#about' },
  ];

  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <footer id="contact" className="bg-slate-950 pt-16 md:pt-24 pb-10 border-t border-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
             <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <Aperture className="w-8 h-8 text-brand-500" strokeWidth={1.5} />
                    <span className="text-xs font-bold text-white absolute font-serif pt-[1px]">Q</span>
                </div>
                <span className="text-xl font-serif font-bold tracking-widest text-white">QIAQIA</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">
              {language === 'zh' 
                ? '专注于光影艺术的探索，为您定格每一个不可复制的瞬间。' 
                : 'Capturing the eternal moments in light and shadow, framing your unique stories.'}
            </p>
            <div className="flex space-x-5 items-center flex-wrap">
              {/* Instagram */}
              {siteContent.socialInstagram && (
                <a 
                  href={siteContent.socialInstagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-brand-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              
               {/* Facebook (Restored) */}
              {siteContent.socialFacebook && (
                <a 
                  href={siteContent.socialFacebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-brand-500 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}

               {/* Twitter/X (Restored) */}
              {siteContent.socialTwitter && (
                <a 
                  href={siteContent.socialTwitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-brand-500 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}

              {/* YouTube (Added) */}
              {siteContent.socialYoutube && (
                 <a 
                  href={siteContent.socialYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-brand-500 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              )}

               {/* Xiaohongshu (Added with Custom Text Icon) */}
              {siteContent.socialXiaohongshu && (
                <a 
                  href={siteContent.socialXiaohongshu} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-brand-500 transition-colors"
                  aria-label="Little Red Book"
                >
                  {/* Aspect ratio approx 3:1 for text */}
                  <XiaohongshuIcon className="h-5 w-14" />
                </a>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 md:mb-8 font-serif tracking-widest text-sm uppercase">{language === 'zh' ? '联系方式' : 'Contact'}</h4>
            <ul className="space-y-6">
              <li className="flex items-start text-slate-400 text-sm font-light">
                <MapPin className="h-4 w-4 text-brand-500 mr-4 flex-shrink-0 mt-1" />
                <span>{language === 'zh' ? siteContent.contactAddressZh : siteContent.contactAddressEn}</span>
              </li>
              <li className="flex items-center text-slate-400 text-sm font-light">
                <Phone className="h-4 w-4 text-brand-500 mr-4 flex-shrink-0" />
                <span>{siteContent.contactPhone}</span>
              </li>
              <li className="flex items-center text-slate-400 text-sm font-light">
                <Mail className="h-4 w-4 text-brand-500 mr-4 flex-shrink-0" />
                <span>{siteContent.contactEmail}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 md:mb-8 font-serif tracking-widest text-sm uppercase">{language === 'zh' ? '快速链接' : 'Quick Links'}</h4>
            <ul className="space-y-4">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-slate-400 hover:text-brand-500 text-sm transition-colors font-light block py-1"
                  >
                    {language === 'zh' ? link.nameZh : link.nameEn}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Simple Form */}
          <div>
             <h4 className="text-white font-bold mb-6 md:mb-8 font-serif tracking-widest text-sm uppercase">{language === 'zh' ? '留言预约' : 'Inquiries'}</h4>
             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-2 gap-4">
                 <input
                   type="text"
                   placeholder={language === 'zh' ? "姓名" : "Name"}
                   className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-sm px-4 py-3 text-base md:text-xs text-white focus:outline-none transition-colors"
                 />
                  <input
                   type="email"
                   placeholder={language === 'zh' ? "邮箱" : "Email"}
                   className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-sm px-4 py-3 text-base md:text-xs text-white focus:outline-none transition-colors"
                 />
               </div>
               
               <textarea
                 rows={3}
                 placeholder={language === 'zh' ? "请简述您的拍摄需求..." : "Tell us about your shoot..."}
                 className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-sm px-4 py-3 text-base md:text-xs text-white focus:outline-none resize-none transition-colors"
               ></textarea>
               <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-sm text-xs tracking-widest uppercase transition-colors">
                 {language === 'zh' ? '发送信息' : 'Send Message'}
               </button>
             </form>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex justify-between items-center flex-col md:flex-row gap-4">
          <p className="text-slate-600 text-[10px] text-center md:text-left tracking-wide">
            © 2024 QIAQIA Photography. All rights reserved.
          </p>
          <Link to="/admin" className="flex items-center gap-1 text-slate-800 hover:text-slate-600 transition-colors text-xs">
            <Lock className="h-3 w-3" />
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Contact;