import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const STATIC_RESPONSE = "Grazie di cuore per avermi scritto. 🌿 Essendo spesso impegnata nei trattamenti non riesco a rispondere in tempo reale. Copia questo messaggio e inviamelo su WhatsApp (320 198 26 29) o via email (yuliolistico@gmail.com). Ti dedicherò tutta la mia attenzione appena possibile! 💌";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Ciao! ✨ Sono impegnata in un trattamento e non posso rispondere subito. Usa questa finestra per annotare i tuoi pensieri, poi scrivimi direttamente su WhatsApp o via email e ti risponderò con cura entro 24h.", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
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

    // --- FUTURE AI INTEGRATION FLAG ---
    // Change to 'true' when the Yuli Olistico Virtual Twin / Backend AI is ready
    const USE_AI_BACKEND = false; 

    if (USE_AI_BACKEND) {
        // [FUTURE] Placeholder for AI API Call
        /*
        try {
            const response = await fetch('/api/chat-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputText })
            });
            const data = await response.json();
            const botMsg: Message = { id: Date.now() + 1, text: data.reply, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("AI Chat Error:", error);
            // Fallback to static message on error
            setMessages(prev => [...prev, { id: Date.now() + 1, text: STATIC_RESPONSE, sender: 'bot' }]);
        }
        */
    } else {
        // [CURRENT] Instant honest response (Offline Mode)
        setTimeout(() => {
          const botMsg: Message = { id: Date.now() + 1, text: STATIC_RESPONSE, sender: 'bot' };
          setMessages(prev => [...prev, botMsg]);
        }, 400);
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
                <span className="font-serif tracking-wide">Yuli Olistico</span>
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
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-[#e7e5e4] flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Scrivi un messaggio..."
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