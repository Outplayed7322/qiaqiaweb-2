import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { Camera, LogOut, Plus, Trash2, Edit2, Check, X, RotateCcw, Save, LayoutTemplate, Image as ImageIcon, Instagram, Youtube, Hash, Facebook, Twitter, Mail, Settings } from 'lucide-react';
import { PortfolioItem, ServicePackage, SiteContent } from '../types';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'inbox' | 'content' | 'portfolio' | 'services'>('inbox');
  const { messages } = useData();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('密码错误');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800 w-full max-w-md">
          <div className="text-center mb-8">
            <Camera className="h-12 w-12 text-brand-500 mx-auto mb-4" />
            <h1 className="text-2xl font-serif text-white">QIAQIA Admin</h1>
            <p className="text-slate-400 text-sm mt-2">后台管理系统</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="请输入管理员密码 (默认: admin)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-lg transition-colors"
            >
              登录
            </button>
            <div className="text-center mt-4">
                <Link to="/" className="text-slate-500 hover:text-white text-sm">返回首页</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
                <Camera className="h-6 w-6 text-brand-500" />
                <span className="text-xl font-serif font-bold text-white">QIAQIA<span className="text-brand-500">.</span> Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">已登录</span>
             <button onClick={() => setIsAuthenticated(false)} className="text-slate-400 hover:text-white transition-colors">
                <LogOut className="h-5 w-5" />
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-slate-900 p-1 rounded-xl mb-8 w-fit overflow-x-auto">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'inbox' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <div className="relative">
                <Mail className="h-4 w-4" />
                {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>}
            </div>
             收件箱 (Inbox)
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'content' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <LayoutTemplate className="h-4 w-4" /> 网站内容
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'portfolio' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="h-4 w-4" /> 作品集
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === 'services' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Check className="h-4 w-4" /> 服务报价
          </button>
        </div>

        {activeTab === 'inbox' && <InboxManager />}
        {activeTab === 'content' && <SiteContentManager />}
        {activeTab === 'portfolio' && <PortfolioManager />}
        {activeTab === 'services' && <ServicesManager />}
      </main>
    </div>
  );
};

// --- Sub Components ---

const InboxManager: React.FC = () => {
    const { messages, deleteMessage, markMessageRead } = useData();

    if (messages.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-900 rounded-xl border border-slate-800">
                <Mail className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-white font-bold">暂时没有留言</h3>
                <p className="text-slate-500 text-sm mt-2">当有客户通过网站提交表单时，消息会显示在这里。</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fade-in-up">
             <div className="bg-blue-900/20 border border-blue-800 p-4 rounded-lg flex gap-3 items-start">
                <div className="mt-1"><Mail className="h-5 w-5 text-blue-400" /></div>
                <div>
                    <h4 className="text-blue-100 font-bold text-sm">注意事项</h4>
                    <p className="text-blue-200/70 text-xs mt-1">
                        这些消息保存在您的浏览器本地缓存中。如果客户在另一台电脑访问，您可能无法在此看到。
                        <br/>为了确保不漏掉任何信息，我们已在前端设置了“邮件直达”功能：客户提交时会自动唤起邮件客户端给您发邮件。
                    </p>
                </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-4">收件箱 ({messages.length})</h2>
            <div className="grid gap-4">
                {messages.map(msg => (
                    <div 
                        key={msg.id} 
                        className={`p-6 rounded-xl border transition-all ${
                            msg.read ? 'bg-slate-900 border-slate-800 opacity-80' : 'bg-slate-800 border-brand-500/30 shadow-lg'
                        }`}
                        onClick={() => markMessageRead(msg.id)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                    {msg.name}
                                    {!msg.read && <span className="bg-brand-500 text-white text-[10px] px-2 py-0.5 rounded-full">NEW</span>}
                                </h3>
                                <a href={`mailto:${msg.email}`} className="text-brand-400 hover:text-brand-300 text-sm flex items-center gap-1 mt-1">
                                    <Mail className="h-3 w-3" /> {msg.email}
                                </a>
                            </div>
                            <span className="text-slate-500 text-xs">
                                {new Date(msg.date).toLocaleString()}
                            </span>
                        </div>
                        <div className="bg-slate-950 p-4 rounded border border-slate-800 text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                            {msg.message}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button 
                                onClick={(e) => { e.stopPropagation(); if(confirm('确定删除此留言?')) deleteMessage(msg.id); }}
                                className="text-slate-500 hover:text-red-500 text-xs flex items-center gap-1 transition-colors px-3 py-1 rounded hover:bg-slate-900"
                            >
                                <Trash2 className="h-3 w-3" /> 删除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SiteContentManager: React.FC = () => {
    const { siteContent, updateSiteContent } = useData();
    const [formData, setFormData] = useState<SiteContent>(siteContent);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setIsSaved(false);
    };

    const handleSave = () => {
        updateSiteContent(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 space-y-8 animate-fade-in-up">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white">网站基础内容管理 (双语)</h2>
                <button onClick={handleSave} className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${isSaved ? 'bg-green-600 text-white' : 'bg-brand-600 hover:bg-brand-500 text-white'}`}>
                    {isSaved ? <><Check className="h-4 w-4" /> 已保存</> : <><Save className="h-4 w-4" /> 保存修改</>}
                </button>
            </div>

             {/* EmailJS Configuration Section */}
             <div className="space-y-4 pt-4 border-t border-slate-800/50 bg-slate-800/20 p-4 rounded-lg">
                 <div className="flex items-center gap-2 mb-2">
                     <Settings className="h-4 w-4 text-brand-500" />
                     <h3 className="text-brand-500 font-bold uppercase tracking-wider text-sm">邮件发送配置 (EmailJS)</h3>
                 </div>
                 <p className="text-xs text-slate-400 mb-4">
                    配置此项后，客户提交表单将直接发送邮件到您的邮箱，并可自动回复客户。
                    请前往 <a href="https://www.emailjs.com" target="_blank" className="text-blue-400 underline">EmailJS.com</a> 注册免费账号获取以下信息。
                 </p>
                 <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">Service ID</label>
                        <input name="emailjsServiceId" value={formData.emailjsServiceId} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm font-mono" placeholder="service_xxxx" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">Template ID</label>
                        <input name="emailjsTemplateId" value={formData.emailjsTemplateId} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm font-mono" placeholder="template_xxxx" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">Public Key</label>
                        <input name="emailjsPublicKey" value={formData.emailjsPublicKey} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm font-mono" placeholder="xxxx-xxxx-xxxx" />
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="space-y-4">
                <h3 className="text-brand-500 font-bold uppercase tracking-wider text-sm border-l-4 border-brand-500 pl-3">首页 (Hero Section)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">主标题 (中文)</label>
                        <textarea name="heroTitleZh" value={formData.heroTitleZh} onChange={handleChange} rows={2} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                     <div>
                        <label className="block text-slate-400 text-xs mb-1">Hero Title (English)</label>
                        <textarea name="heroTitleEn" value={formData.heroTitleEn} onChange={handleChange} rows={2} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">副标题 (中文)</label>
                        <input name="heroSubtitleZh" value={formData.heroSubtitleZh} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">Subtitle (English)</label>
                        <input name="heroSubtitleEn" value={formData.heroSubtitleEn} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-slate-400 text-xs mb-1">首图链接 (Hero Background Image URL)</label>
                        <input name="heroImage" value={formData.heroImage} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                </div>
            </div>

            {/* Service Notes Section */}
            <div className="space-y-4 pt-4 border-t border-slate-800/50">
                 <h3 className="text-brand-500 font-bold uppercase tracking-wider text-sm border-l-4 border-brand-500 pl-3">服务备注 (Service Notes)</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-slate-400 text-xs mb-1">备注说明 (中文 - 支持换行)</label>
                        <textarea name="serviceNotesZh" value={formData.serviceNotesZh} onChange={handleChange} rows={6} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">Service Notes (English - Multiline)</label>
                        <textarea name="serviceNotesEn" value={formData.serviceNotesEn} onChange={handleChange} rows={6} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="space-y-4 pt-4 border-t border-slate-800/50">
                 <h3 className="text-brand-500 font-bold uppercase tracking-wider text-sm border-l-4 border-brand-500 pl-3">关于我们 (About Us)</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">标题 (中文)</label>
                        <input name="aboutTitleZh" value={formData.aboutTitleZh} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">Title (English)</label>
                        <input name="aboutTitleEn" value={formData.aboutTitleEn} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                     <div>
                        <label className="block text-slate-400 text-xs mb-1">内容描述 (中文)</label>
                        <textarea name="aboutTextZh" value={formData.aboutTextZh} onChange={handleChange} rows={6} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">Description (English)</label>
                        <textarea name="aboutTextEn" value={formData.aboutTextEn} onChange={handleChange} rows={6} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                     <div className="md:col-span-2">
                        <label className="block text-slate-400 text-xs mb-1">图片链接 (Image URL)</label>
                        <input name="aboutImage" value={formData.aboutImage} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                </div>
            </div>

             {/* Contact Section */}
             <div className="space-y-4 pt-4 border-t border-slate-800/50">
                 <h3 className="text-brand-500 font-bold uppercase tracking-wider text-sm border-l-4 border-brand-500 pl-3">联系方式 (Contact)</h3>
                 <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">地址 (中文)</label>
                        <input name="contactAddressZh" value={formData.contactAddressZh} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">Address (English)</label>
                        <input name="contactAddressEn" value={formData.contactAddressEn} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">电话/微信</label>
                        <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1">邮箱</label>
                        <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" />
                    </div>
                </div>
            </div>

             {/* Social Media Section */}
             <div className="space-y-4 pt-4 border-t border-slate-800/50">
                 <h3 className="text-brand-500 font-bold uppercase tracking-wider text-sm border-l-4 border-brand-500 pl-3">社交媒体链接 (Social Media)</h3>
                 <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-slate-400 text-xs mb-1 flex items-center gap-1"><Instagram className="w-3 h-3"/> Instagram URL</label>
                        <input name="socialInstagram" value={formData.socialInstagram} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" placeholder="https://instagram.com/..." />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1 flex items-center gap-1"><Facebook className="w-3 h-3"/> Facebook URL</label>
                        <input name="socialFacebook" value={formData.socialFacebook} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" placeholder="https://facebook.com/..." />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1 flex items-center gap-1"><Twitter className="w-3 h-3"/> Twitter/X URL</label>
                        <input name="socialTwitter" value={formData.socialTwitter} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" placeholder="https://twitter.com/..." />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs mb-1 flex items-center gap-1"><Youtube className="w-3 h-3"/> YouTube URL</label>
                        <input name="socialYoutube" value={formData.socialYoutube} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" placeholder="https://youtube.com/..." />
                    </div>
                     <div>
                        <label className="block text-slate-400 text-xs mb-1 flex items-center gap-1"><Hash className="w-3 h-3"/> 小红书 (Xiaohongshu) URL</label>
                        <input name="socialXiaohongshu" value={formData.socialXiaohongshu} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-white text-sm" placeholder="https://xiaohongshu.com/..." />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PortfolioManager: React.FC = () => {
  const { portfolio, addPortfolioItem, updatePortfolioItem, deletePortfolioItem, resetData } = useData();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const initialFormState: Omit<PortfolioItem, 'id'> = {
    titleZh: '',
    titleEn: '',
    category: 'wedding',
    imageUrl: '',
    width: 'normal',
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleEditClick = (item: PortfolioItem) => {
    setEditingId(item.id);
    setFormData(item);
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!formData.titleZh || !formData.imageUrl) return alert('请填写完整信息');

    if (isAdding) {
      addPortfolioItem(formData);
      setIsAdding(false);
    } else if (editingId !== null) {
      updatePortfolioItem({ ...formData, id: editingId });
      setEditingId(null);
    }
    setFormData(initialFormState);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData(initialFormState);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">作品列表 ({portfolio.length})</h2>
        <div className="flex gap-2">
            <button onClick={resetData} className="px-4 py-2 text-xs border border-slate-700 rounded-lg hover:bg-slate-800 text-slate-400 flex items-center gap-2">
               <RotateCcw className="h-3 w-3" /> 重置
            </button>
            <button onClick={handleAddClick} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg flex items-center gap-2 text-sm font-bold">
            <Plus className="h-4 w-4" /> 新增
            </button>
        </div>
      </div>

      {(isAdding || editingId !== null) && (
        <div className="bg-slate-900 border border-brand-500/30 p-6 rounded-xl animate-fade-in-up">
            <h3 className="text-brand-500 font-bold mb-4">{isAdding ? '新增作品' : '编辑作品'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    placeholder="标题 (中文)"
                    value={formData.titleZh}
                    onChange={e => setFormData({...formData, titleZh: e.target.value})}
                    className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm"
                />
                <input
                    type="text"
                    placeholder="Title (English)"
                    value={formData.titleEn}
                    onChange={e => setFormData({...formData, titleEn: e.target.value})}
                    className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm"
                />
                <select
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as any})}
                    className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm"
                >
                    <option value="wedding">Wedding (婚礼)</option>
                    <option value="portrait">Portrait (人像)</option>
                    <option value="commercial">Commercial (商业)</option>
                    <option value="landscape">Landscape (风光)</option>
                </select>
                <select
                    value={formData.width}
                    onChange={e => setFormData({...formData, width: e.target.value as any})}
                    className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm"
                >
                    <option value="normal">标准尺寸 (1x1)</option>
                    <option value="wide">宽幅 (2x1)</option>
                    <option value="tall">竖幅 (1x2)</option>
                </select>
                 <input
                    type="text"
                    placeholder="图片链接 (URL)"
                    value={formData.imageUrl}
                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                    className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm md:col-span-2"
                />
            </div>
             <div className="flex justify-end gap-2">
                <button onClick={handleCancel} className="px-4 py-2 rounded text-slate-400 hover:bg-slate-800 text-sm">取消</button>
                <button onClick={handleSave} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded text-sm font-bold flex items-center gap-1">
                    <Save className="h-4 w-4" /> 保存
                </button>
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {portfolio.map((item) => (
          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group">
            <div className="relative aspect-square">
              <img src={item.imageUrl} alt={item.titleZh} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded capitalize">
                  {item.category}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-white mb-1 truncate">{item.titleZh}</h4>
              <p className="text-slate-500 text-xs mb-2 truncate">{item.titleEn}</p>
              <div className="flex justify-between items-center mt-4">
                 <button onClick={() => handleEditClick(item)} className="text-slate-400 hover:text-brand-500 transition-colors flex items-center gap-1 text-xs">
                    <Edit2 className="h-3 w-3" /> 编辑
                 </button>
                 <button onClick={() => { if(confirm('确定删除?')) deletePortfolioItem(item.id) }} className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-xs">
                    <Trash2 className="h-3 w-3" /> 删除
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ServicesManager: React.FC = () => {
    const { services, updateServicePackage } = useData();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<ServicePackage | null>(null);

    const handleEdit = (service: ServicePackage) => {
        setEditingId(service.id);
        setFormData({...service});
    };

    const handleSave = () => {
        if(formData) {
            updateServicePackage(formData);
            setEditingId(null);
            setFormData(null);
        }
    };

    const handleCancel = () => {
         setEditingId(null);
         setFormData(null);
    };

    const handleFeatureChangeZh = (index: number, value: string) => {
        if(formData) {
            const newFeatures = [...formData.featuresZh];
            newFeatures[index] = value;
            setFormData({...formData, featuresZh: newFeatures});
        }
    };
    const handleFeatureChangeEn = (index: number, value: string) => {
        if(formData) {
            const newFeatures = [...formData.featuresEn];
            newFeatures[index] = value;
            setFormData({...formData, featuresEn: newFeatures});
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">服务套餐 ({services.length})</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {services.map(service => {
                    const isEditing = editingId === service.id;
                    return (
                        <div key={service.id} className={`bg-slate-900 border rounded-xl p-6 transition-colors ${isEditing ? 'border-brand-500/50' : 'border-slate-800'}`}>
                            {isEditing && formData ? (
                                <div className="space-y-4">
                                     <div className="flex justify-between items-start mb-2">
                                         <h3 className="text-brand-500 text-sm font-bold uppercase tracking-wider">正在编辑: {service.id}</h3>
                                     </div>
                                     <div className="grid grid-cols-2 gap-4">
                                         <input
                                            value={formData.titleZh}
                                            onChange={e => setFormData({...formData, titleZh: e.target.value})}
                                            className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm w-full"
                                            placeholder="套餐名称 (中)"
                                         />
                                          <input
                                            value={formData.titleEn}
                                            onChange={e => setFormData({...formData, titleEn: e.target.value})}
                                            className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm w-full"
                                            placeholder="Title (En)"
                                         />
                                     </div>
                                      <input
                                            value={formData.price}
                                            onChange={e => setFormData({...formData, price: e.target.value})}
                                            className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm w-full font-bold text-brand-400"
                                            placeholder="价格"
                                         />
                                     <div className="grid grid-cols-2 gap-4">
                                        <input
                                            value={formData.subTitleZh || ''}
                                            onChange={e => setFormData({...formData, subTitleZh: e.target.value})}
                                            className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm w-full"
                                            placeholder="副标题 (中)"
                                         />
                                         <input
                                            value={formData.subTitleEn || ''}
                                            onChange={e => setFormData({...formData, subTitleEn: e.target.value})}
                                            className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm w-full"
                                            placeholder="Subtitle (En)"
                                         />
                                     </div>
                                     <textarea
                                         value={formData.descriptionZh}
                                         onChange={e => setFormData({...formData, descriptionZh: e.target.value})}
                                         className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm w-full h-16 resize-none"
                                         placeholder="描述 (中)"
                                     />
                                     <textarea
                                         value={formData.descriptionEn}
                                         onChange={e => setFormData({...formData, descriptionEn: e.target.value})}
                                         className="bg-slate-950 border border-slate-700 rounded p-2 text-white text-sm w-full h-16 resize-none"
                                         placeholder="Description (En)"
                                     />
                                     <div className="space-y-2">
                                         <label className="text-xs text-slate-500">特性 (中文):</label>
                                         {formData.featuresZh.map((feature, idx) => (
                                             <input
                                                key={idx}
                                                value={feature}
                                                onChange={e => handleFeatureChangeZh(idx, e.target.value)}
                                                className="bg-slate-950 border border-slate-800 rounded p-2 text-slate-300 text-xs w-full block"
                                             />
                                         ))}
                                     </div>
                                     <div className="space-y-2">
                                         <label className="text-xs text-slate-500">Features (English):</label>
                                         {formData.featuresEn.map((feature, idx) => (
                                             <input
                                                key={idx}
                                                value={feature}
                                                onChange={e => handleFeatureChangeEn(idx, e.target.value)}
                                                className="bg-slate-950 border border-slate-800 rounded p-2 text-slate-300 text-xs w-full block"
                                             />
                                         ))}
                                     </div>
                                     <div className="flex justify-end gap-2 pt-2">
                                        <button onClick={handleCancel} className="p-2 rounded-full hover:bg-slate-800 text-slate-400"><X className="h-5 w-5"/></button>
                                        <button onClick={handleSave} className="p-2 rounded-full bg-brand-600 hover:bg-brand-500 text-white"><Check className="h-5 w-5"/></button>
                                     </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{service.titleZh}</h3>
                                            <p className="text-xs text-slate-500">{service.titleEn}</p>
                                            {service.subTitleZh && <span className="text-xs text-brand-400 bg-brand-900/20 px-1 rounded mt-1 inline-block">{service.subTitleZh}</span>}
                                            <p className="text-brand-400 font-bold mt-2 text-xl">{service.price}</p>
                                        </div>
                                        <button onClick={() => handleEdit(service)} className="text-slate-400 hover:text-white p-1">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p className="text-slate-400 text-xs mb-1">{service.descriptionZh}</p>
                                    <p className="text-slate-500 text-[10px] mb-4 italic">{service.descriptionEn}</p>
                                    <ul className="space-y-1">
                                        {service.featuresZh.map((f, i) => (
                                            <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
                                                <span className="w-1 h-1 bg-brand-500 rounded-full"></span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Admin;