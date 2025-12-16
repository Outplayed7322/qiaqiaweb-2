import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioItem, ServicePackage, SiteContent, Language, Testimonial, ContactMessage } from '../types';

// Default Data with Bilingual Content
const defaultServices: ServicePackage[] = [
  {
    id: 'pkg1',
    titleZh: '套餐一 浓缩记录',
    titleEn: 'Package 1: Condensed Record',
    price: '$198',
    descriptionZh: '宝宝单人照 / 亲子互动合影 / 含双宝',
    descriptionEn: 'Baby Solo / Parent-child Interaction / Twins Included',
    featuresZh: ['不限服装套数', '后期调色精修 9 张', '整理有效底片 100 张左右底片全送', '1小时左右拍摄时长'],
    featuresEn: ['Unlimited Outfits', '9 Color-graded Retouched Photos', '~100 Original Files Included', 'Approx. 1 Hour Session'],
  },
  {
    id: 'pkg2',
    titleZh: '套餐二 纪念版',
    titleEn: 'Package 2: Memorial Edition',
    subTitleZh: '像写日记一样记录',
    subTitleEn: 'Record Like a Diary',
    price: '$368',
    descriptionZh: '宝宝单人照 / 亲子互动合影 / 故事感画面内容丰富',
    descriptionEn: 'Baby Solo / Family Interaction / Rich Storytelling',
    featuresZh: ['不限服装套数 / 兄弟姐妹长辈免费入镜 / 全家福', '后期调色精修 18 张', '整理有效底片 200 张左右，底片全送', '2小时左右拍摄时长'],
    featuresEn: ['Unlimited Outfits / Extended Family Included', '18 Color-graded Retouched Photos', '~200 Original Files Included', 'Approx. 2 Hours Session'],
    isPopular: true,
  },
  {
    id: 'pkg3',
    titleZh: '套餐三 珍藏版',
    titleEn: 'Package 3: Collection Edition',
    subTitleZh: '深度家庭纪实',
    subTitleEn: 'Deep Family Documentary',
    price: '$498',
    descriptionZh: '单人照 / 亲子互动合影 / 适合多家庭成员',
    descriptionEn: 'Solo / Interaction / Suitable for Large Families',
    featuresZh: ['不限服装套数，不限大人人数', '后期调色精修 30 张', '整理有效底片 300 张左右，底片全送', '3小时左右拍摄时长'],
    featuresEn: ['Unlimited Outfits & Adults', '30 Color-graded Retouched Photos', '~300 Original Files Included', 'Approx. 3 Hours Session'],
  },
  {
    id: 'pkg4',
    titleZh: '套餐四 上门/外景',
    titleEn: 'Package 4: On-Location',
    subTitleZh: '家庭纪实 + 儿童外景亲子',
    subTitleEn: 'Home Documentary + Outdoor Kids',
    price: '$660',
    descriptionZh: '双宝单人照 / 亲子互动合影 / 多家庭成员',
    descriptionEn: 'Twins Solo / Family Interaction / Multi-family',
    featuresZh: ['不限服装套数，不限大人人数', '后期调色精修 45 张', '整理有效底片 400 张左右，底片全送', '家庭半日跟拍 4小时左右'],
    featuresEn: ['Unlimited Outfits & Adults', '45 Color-graded Retouched Photos', '~400 Original Files Included', 'Half-day Session (~4 Hours)'],
  },
];

const defaultPortfolio: PortfolioItem[] = [
  { id: 1, titleZh: '温暖童年', titleEn: 'Warm Childhood', category: 'portrait', imageUrl: 'https://picsum.photos/600/800?random=1', width: 'normal' },
  { id: 2, titleZh: '家庭故事', titleEn: 'Family Story', category: 'portrait', imageUrl: 'https://picsum.photos/800/600?random=2', width: 'wide' },
  { id: 3, titleZh: '户外乐趣', titleEn: 'Outdoor Fun', category: 'landscape', imageUrl: 'https://picsum.photos/600/800?random=3', width: 'normal' },
  { id: 4, titleZh: '秋日氛围', titleEn: 'Autumn Vibe', category: 'landscape', imageUrl: 'https://picsum.photos/600/800?random=4', width: 'tall' },
  { id: 5, titleZh: '纯真笑容', titleEn: 'Pure Smile', category: 'portrait', imageUrl: 'https://picsum.photos/600/600?random=5', width: 'normal' },
  { id: 6, titleZh: '经典影棚', titleEn: 'Studio Classic', category: 'commercial', imageUrl: 'https://picsum.photos/600/800?random=6', width: 'tall' },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Emily Zhang',
    roleZh: '婚礼客户',
    roleEn: 'Wedding Client',
    contentZh: 'QIAQIA 捕捉到了我们婚礼上最真实的感动瞬间，每一张照片都像电影截图一样美。非常有耐心的摄影师！',
    contentEn: 'QIAQIA captured the most authentic and touching moments of our wedding. Every photo looks like a movie still. Very patient photographer!',
  },
  {
    id: 2,
    name: 'Sarah & Mike',
    roleZh: '家庭纪实',
    roleEn: 'Family Session',
    contentZh: '这是我们第三次找工作室拍摄了，每年的全家福都是在这里。他们总能抓住孩子最自然的笑容，不摆拍，很舒服。',
    contentEn: 'This is our third time shooting with the studio. We do our family portraits here every year. They always catch the kids\' most natural smiles. No posing, just comfort.',
  },
  {
    id: 3,
    name: 'Jessica Li',
    roleZh: '个人写真',
    roleEn: 'Portrait',
    contentZh: '摄影师的审美非常在线，光影运用得太棒了。成片完全超出了我的预期，朋友们都说很有质感。',
    contentEn: 'The photographer\'s aesthetic is on point. The use of light and shadow is amazing. The final photos exceeded my expectations; my friends say they look very high-end.',
  },
];

const defaultSiteContent: SiteContent = {
  heroTitleZh: '总有一些瞬间会告诉你\n生活浪漫且温柔',
  heroTitleEn: 'There are moments that tell you\nLife is romantic and gentle',
  heroSubtitleZh: 'QIAQIA PHOTOGRAPHY STUDIO • 专注家庭摄影定制式拍摄',
  heroSubtitleEn: 'QIAQIA PHOTOGRAPHY STUDIO • Specialized in Custom Family Photography',
  heroImage: 'https://picsum.photos/1920/1080?grayscale&blur=2', // Default Hero Image
  aboutTitleZh: '关于 QIAQIA',
  aboutTitleEn: 'About QIAQIA',
  aboutTextZh: '坐标：温哥华。\n\n我们专注家庭摄影定制式拍摄，擅长温暖治愈系风格纪实。\n我们追求自然、清新，致力于记录有故事感、有温度的拍摄效果。\n\n每一次快门，都是对生活的一次深情凝视。',
  aboutTextEn: 'Location: Vancouver.\n\nWe specialize in custom family photography, focusing on warm and healing documentary styles.\nWe pursue natural, fresh visuals, dedicated to recording stories with warmth and emotion.\n\nEvery shutter click is a deep gaze into life.',
  aboutImage: 'https://picsum.photos/800/1000?grayscale',
  contactAddressZh: '温哥华市内上门或外景',
  contactAddressEn: 'Vancouver, BC (On-location or Outdoor)',
  contactPhone: 'LittleQQ2020 (WeChat)',
  contactEmail: 'contact@qiaqia.studio',
  serviceNotesZh: '1. 温哥华市内上门或外景均免路程费，超出距离按公里数加收路程费用，一公里$1。\n2. 服装妆容自备，摄影师根据拍摄环境提供配色建议及适合的拍摄道具。\n3. 预定后支付订金$50预留档期，余款在拍摄完当天支付。\n4. 预定后锁定价格1年有效，不受价格调整影响。',
  serviceNotesEn: '1. No travel fee within Vancouver. Extra distance charged at $1/km.\n2. Makeup and outfits provided by client. Photographer provides styling advice and props.\n3. $50 deposit required to book. Balance due on the day of the shoot.\n4. Price locked for 1 year after booking.',
  socialInstagram: 'https://instagram.com',
  socialFacebook: 'https://facebook.com', // Added default
  socialTwitter: 'https://twitter.com',   // Added default
  socialYoutube: 'https://youtube.com',
  socialXiaohongshu: 'https://www.xiaohongshu.com'
};

interface DataContextType {
  language: Language;
  toggleLanguage: () => void;
  portfolio: PortfolioItem[];
  services: ServicePackage[];
  testimonials: Testimonial[];
  siteContent: SiteContent;
  messages: ContactMessage[]; // Added
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolioItem: (item: PortfolioItem) => void;
  deletePortfolioItem: (id: number) => void;
  updateServicePackage: (item: ServicePackage) => void;
  updateSiteContent: (content: SiteContent) => void;
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void; // Added
  deleteMessage: (id: number) => void; // Added
  markMessageRead: (id: number) => void; // Added
  resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [services, setServices] = useState<ServicePackage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]); 
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [messages, setMessages] = useState<ContactMessage[]>([]); // Added
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedPortfolio = localStorage.getItem('qiaqia_portfolio_v3'); 
    const storedServices = localStorage.getItem('qiaqia_services_v3');
    const storedContent = localStorage.getItem('qiaqia_content_v3'); 
    const storedMessages = localStorage.getItem('qiaqia_messages_v1'); // Load messages

    setPortfolio(storedPortfolio ? JSON.parse(storedPortfolio) : defaultPortfolio);
    setServices(storedServices ? JSON.parse(storedServices) : defaultServices);
    setTestimonials(defaultTestimonials); 
    setMessages(storedMessages ? JSON.parse(storedMessages) : []); // Set messages
    
    // Merge stored content with default to ensure new fields exist if old data is present
    if (storedContent) {
        const parsedContent = JSON.parse(storedContent);
        setSiteContent({ 
            ...defaultSiteContent, 
            ...parsedContent,
            socialInstagram: parsedContent.socialInstagram || defaultSiteContent.socialInstagram,
            socialFacebook: parsedContent.socialFacebook || defaultSiteContent.socialFacebook,
            socialTwitter: parsedContent.socialTwitter || defaultSiteContent.socialTwitter,
            socialYoutube: parsedContent.socialYoutube || defaultSiteContent.socialYoutube,
            socialXiaohongshu: parsedContent.socialXiaohongshu || defaultSiteContent.socialXiaohongshu,
        });
    } else {
        setSiteContent(defaultSiteContent);
    }
    
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('qiaqia_portfolio_v3', JSON.stringify(portfolio));
      localStorage.setItem('qiaqia_services_v3', JSON.stringify(services));
      localStorage.setItem('qiaqia_content_v3', JSON.stringify(siteContent));
      localStorage.setItem('qiaqia_messages_v1', JSON.stringify(messages)); // Save messages
    }
  }, [portfolio, services, siteContent, messages, isLoaded]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newId = Math.max(...portfolio.map(i => i.id), 0) + 1;
    setPortfolio([...portfolio, { ...item, id: newId }]);
  };

  const updatePortfolioItem = (updatedItem: PortfolioItem) => {
    setPortfolio(portfolio.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deletePortfolioItem = (id: number) => {
    setPortfolio(portfolio.filter(item => item.id !== id));
  };

  const updateServicePackage = (updatedItem: ServicePackage) => {
    setServices(services.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const updateSiteContent = (content: SiteContent) => {
    setSiteContent(content);
  };

  // Message Handlers
  const addMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
      const newMessage: ContactMessage = {
          ...msg,
          id: Date.now(),
          date: new Date().toISOString(),
          read: false
      };
      setMessages(prev => [newMessage, ...prev]);
  };

  const deleteMessage = (id: number) => {
      setMessages(prev => prev.filter(m => m.id !== id));
  };

  const markMessageRead = (id: number) => {
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const resetData = () => {
    setPortfolio(defaultPortfolio);
    setServices(defaultServices);
    setSiteContent(defaultSiteContent);
    setTestimonials(defaultTestimonials);
    setMessages([]);
  };

  if (!isLoaded) return null;

  return (
    <DataContext.Provider value={{
      language,
      toggleLanguage,
      portfolio,
      services,
      testimonials,
      siteContent,
      messages,
      addPortfolioItem,
      updatePortfolioItem,
      deletePortfolioItem,
      updateServicePackage,
      updateSiteContent,
      addMessage,
      deleteMessage,
      markMessageRead,
      resetData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};