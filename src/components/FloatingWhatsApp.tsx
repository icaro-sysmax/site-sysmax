import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const targetNumber = '556140428042';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      quickMsg.trim() || 'Olá! Gostaria de falar com um especialista sobre a telefonia Sysmax.'
    );
    window.open(`https://wa.me/${targetNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setQuickMsg('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup Modal */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-2xl bg-[#0B132B] border border-emerald-500/30 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm">
                  SM
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-700" />
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">Sysmax Telecom & TI</div>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Consultor online agora</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg transition-colors focus:outline-none"
              aria-label="Fechar janela do WhatsApp"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-950/70 text-xs text-slate-300 space-y-3">
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-slate-200 leading-relaxed shadow-sm">
              👋 Olá! Como posso ajudar você hoje com o PABX Virtual, Telefonia VoIP ou Suporte de TI da sua empresa?
            </div>
            <div className="text-[10px] text-slate-400 text-right">Central Sysmax · (61) 4042-8042</div>
          </div>

          {/* Quick Input / Send */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md transition-colors"
              aria-label="Enviar mensagem no WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all duration-200 transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
        aria-label="Abrir conversa no WhatsApp oficial da Sysmax"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-300 border-2 border-[#0B132B]"></span>
        </span>
        <MessageSquare className="w-7 h-7" />

        {/* Hover Tooltip */}
        {!isOpen && (
          <span className="absolute right-16 top-1/2 -translate-y-1/2 hidden sm:block whitespace-nowrap bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Fale conosco no WhatsApp
          </span>
        )}
      </button>
    </div>
  );
}
