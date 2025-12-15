
export type Language = 'zh' | 'en';

export interface PortfolioItem {
  id: number;
  titleZh: string;
  titleEn: string;
  category: 'wedding' | 'portrait' | 'commercial' | 'landscape';
  imageUrl: string;
  width: 'normal' | 'wide' | 'tall';
}

export interface ServicePackage {
  id: string;
  titleZh: string;
  titleEn: string;
  subTitleZh?: string;
  subTitleEn?: string;
  price: string;
  descriptionZh: string;
  descriptionEn: string;
  featuresZh: string[];
  featuresEn: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  roleZh?: string;
  roleEn?: string;
  contentZh: string;
  contentEn: string;
  avatarUrl?: string;
}

export interface SiteContent {
  heroTitleZh: string;
  heroTitleEn: string;
  heroSubtitleZh: string;
  heroSubtitleEn: string;
  heroImage: string; // New field for Hero Image
  aboutTitleZh: string;
  aboutTitleEn: string;
  aboutTextZh: string;
  aboutTextEn: string;
  aboutImage: string;
  contactAddressZh: string;
  contactAddressEn: string;
  contactPhone: string;
  contactEmail: string;
  // New fields for Service Notes
  serviceNotesZh: string;
  serviceNotesEn: string;
  // Social Media Links
  socialInstagram: string;
  socialFacebook: string; // Added
  socialTwitter: string;  // Added
  socialYoutube: string;
  socialXiaohongshu: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
