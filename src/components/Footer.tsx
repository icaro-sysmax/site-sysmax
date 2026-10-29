import { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao' | 'criacao-sites') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [imgError, setImgError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (view: 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao' | 'criacao-sites') => {
    if (onNavigate) {
      onNavigate(view);
    }
    scrollToTop();
  };

  return (
    <footer className="bg-[#070D1E] border-t border-slate-800 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Summary (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('telefonia')}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg text-left"
              aria-label="Sysmax - Página Inicial"
            >
              {!imgError ? (
                <picture className="inline-block shrink-0">
                  <source
                    media="(prefers-color-scheme: light)"
                    srcSet="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue%20(2).png"
                  />
                  <source
                    media="(prefers-color-scheme: dark)"
                    srcSet="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png"
                  />
                  <img
                    src="https://apidata.sysmax.com.br/id-visual-chatwoot/Blue.png"
                    alt="Sysmax Telefonia & TI"
                    className="h-9 w-auto object-contain"
                    onError={() => setImgError(true)}
                  />
                </picture>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xl font-extrabold text-white">
                    SYS<span className="text-cyan-400">MAX</span>
                  </span>
                </div>
              )}
            </button>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Especialistas em telefonia empresarial em nuvem, PABX virtual, telecomunicações corporativas e gestão integrada de TI. Levando eficiência, economia e alta tecnologia para empresas em todo o Brasil.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:6140428042"
                className="flex items-center gap-2.5 text-slate-200 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="tabular-nums font-semibold">(61) 4042-8042</span>
              </a>

              <a
                href="https://wa.me/556140428042"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>WhatsApp: (61) 4042-8042</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Brasília - DF · Atendimento em âmbito nacional</span>
              </div>
            </div>
          </div>

          {/* Solutions Column: Telefonia */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Telefonia Fixa
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handleNav('whatsapp-calling')} className="hover:text-emerald-300 transition-colors text-left text-emerald-400 font-bold flex items-center gap-1.5">
                  <span>→ WhatsApp Calling</span>
                  <span className="text-[9px] bg-emerald-950 px-1 py-0.2 rounded border border-emerald-800">Novo</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('telefonia')} className="hover:text-cyan-400 transition-colors text-left">
                  PABX Virtual em Nuvem
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('telefonia')} className="hover:text-cyan-400 transition-colors text-left">
                  Telefonia VoIP Corporativa
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('telefonia')} className="hover:text-cyan-400 transition-colors text-left">
                  Portabilidade Numérica
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('telefonia')} className="hover:text-cyan-400 transition-colors text-left">
                  Números DID e 0800 Nacional
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('telefonia')} className="hover:text-cyan-400 transition-colors text-left">
                  Simulador de Custos VoIP
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions Column: TI Gerenciada */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              TI Gerenciada
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handleNav('criacao-sites')} className="hover:text-emerald-300 transition-colors text-left text-emerald-400 font-bold flex items-center gap-1.5">
                  <span>→ Criação de Sites (Web Design)</span>
                  <span className="text-[9px] bg-emerald-950 px-1 py-0.2 rounded border border-emerald-800">Novo</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('locacao')} className="hover:text-emerald-300 transition-colors text-left text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span>→ Locação de TI (Notebooks)</span>
                  <span className="text-[9px] bg-emerald-950 px-1 py-0.2 rounded border border-emerald-800">HaaS</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('impressao')} className="hover:text-cyan-300 transition-colors text-left text-teal-300 font-semibold flex items-center gap-1.5">
                  <span>→ Outsourcing de Impressão</span>
                  <span className="text-[9px] bg-teal-950 px-1 py-0.2 rounded border border-teal-800">DF</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cloud')} className="hover:text-cyan-300 transition-colors text-left text-cyan-400 font-semibold flex items-center gap-1.5">
                  <span>→ Cloud File Server</span>
                  <span className="text-[9px] bg-cyan-950 px-1 py-0.2 rounded border border-cyan-800">Nuvem</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('suporte-ti')} className="hover:text-cyan-400 transition-colors text-left text-cyan-300 font-semibold">
                  → Suporte de TI & Help Desk
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ti')} className="hover:text-cyan-400 transition-colors text-left text-slate-300">
                  Visão Geral TI Gerenciada (MSP)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('suporte-ti')} className="hover:text-cyan-400 transition-colors text-left">
                  Modalidades & Pacotes de Horas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ti')} className="hover:text-cyan-400 transition-colors text-left">
                  Firewall & Segurança Ativa
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ti')} className="hover:text-cyan-400 transition-colors text-left">
                  Backup 3-2-1 & DRP
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional & Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#diferenciais" className="hover:text-cyan-400 transition-colors">
                  Por que escolher a Sysmax
                </a>
              </li>
              <li>
                <a href="#etapas" className="hover:text-cyan-400 transition-colors">
                  Etapas de Implantação
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-cyan-400 transition-colors">
                  Solicitar Proposta
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Em conformidade com a Anatel & LGPD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Legal Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Sysmax Soluções em Tecnologia e Telecomunicações. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors p-1"
              aria-label="Voltar ao topo da página"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
