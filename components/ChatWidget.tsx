import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatResponse } from '../services/geminiService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Namasté! Sono Aura, l'assistente di Yuli. Come posso guidarti nel tuo percorso di benessere oggi?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const responseText = await getChatResponse(inputText);
      const botMsg: Message = { id: Date.now() + 1, text: responseText, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white shadow-2xl rounded-2xl border border-[#e7e5e4] overflow-hidden z-50 flex flex-col max-h-[500px]"
          >
            {/* Header */}
            <div className="bg-[#292524] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <span className="font-serif tracking-wide">Aura Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-[#c07a60]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-[#faf9f6] space-y-4 h-80">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 text-sm rounded-xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#849b87] text-white rounded-br-none'
                        : 'bg-white border border-[#e7e5e4] text-[#57534e] rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#e7e5e4] p-3 rounded-xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-2 h-2 bg-[#a8a29e] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#a8a29e] rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-[#a8a29e] rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-[#e7e5e4] flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Chiedi qualcosa..."
                className="flex-grow bg-[#faf9f6] border border-[#e7e5e4] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#849b87]"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="bg-[#292524] text-white p-2 rounded-full hover:bg-[#c07a60] transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#292524] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-50 hover:bg-[#c07a60]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  );
};

export default ChatWidget;