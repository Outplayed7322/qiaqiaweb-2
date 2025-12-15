import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: '你好！我是 Lumina Studio 的 AI 创意顾问。你在寻找什么风格的拍摄灵感？无论是复古婚礼、赛博朋克风人像，还是极简主义商业片，我都可以为你提供建议！',
      timestamp: Date.now(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: inputText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text);
      const botMsg: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Failed to get response", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="ai-consultant" className="py-20 bg-slate-950 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full filter blur-3xl translate-x-[-50%] translate-y-[-50%]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl translate-x-[50%] translate-y-[50%]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <Sparkles className="text-gold-500 h-6 w-6 animate-pulse" />
               <h2 className="text-gold-500 font-medium tracking-widest text-sm uppercase">AI Creative Consultant</h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              没有灵感？<br/>让 AI 帮您构思完美大片
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              这是基于 Google Gemini 技术的智能创意助手。告诉它您的想法、喜欢的颜色、或者是想表达的情绪，它会为您推荐合适的拍摄风格、服装搭配甚至场景选择。
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-lg border border-slate-800">
                <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-gold-500">1</div>
                <div>
                  <h4 className="text-white font-bold">描述需求</h4>
                  <p className="text-slate-500 text-sm">例如："我想拍一组森林系的复古婚纱照"</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-lg border border-slate-800">
                <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-gold-500">2</div>
                <div>
                  <h4 className="text-white font-bold">获取方案</h4>
                  <p className="text-slate-500 text-sm">AI 将生成包含光影、构图、服饰的建议。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-400 to-amber-600 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Lumina Assistant</p>
                  <p className="text-slate-500 text-xs">Powered by Gemini 2.5 Flash</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 scroll-smooth">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-tr from-gold-400 to-amber-600'}`}>
                      {msg.role === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-slate-800 text-white rounded-tr-none'
                          : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                   <div className="flex gap-2 bg-white/5 p-3 rounded-2xl rounded-tl-none items-center ml-10">
                     <Loader2 className="h-4 w-4 animate-spin text-gold-500" />
                     <span className="text-slate-400 text-xs">思考中...</span>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-slate-800/30 border-t border-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="例如：我想拍一组赛博朋克风格的夜景人像..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-gold-500 placeholder-slate-600"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-gold-600 hover:bg-gold-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white p-2 rounded-full transition-colors flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;