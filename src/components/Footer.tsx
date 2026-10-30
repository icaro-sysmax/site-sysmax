import { Phone, MessageSquare, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import { SysmaxLogo } from './SysmaxLogo';
import { getServiceHtmlFile } from '../App';

interface FooterProps {
  onNavigate?: (view: 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao' | 'criacao-sites') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (
    e: React.MouseEvent,
    view: 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao' | 'criacao-sites'
  ) => {
    if (typeof window !== 'undefined' && window.location.pathname.endsWith('.html')) {
      const targetFile = getServiceHtmlFile(view);
      const currentFile = window.location.pathname.split('/').pop() || 'index.html';
      if (currentFile !== targetFile) {
        window.location.href = targetFile;
        return;
      }
    }
    e.preventDefault();
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
            <a
              href="index.html"
              onClick={(e) => handleNav(e, 'telefonia')}
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg text-left"
              aria-label="Sysmax - Página Inicial"
            >
              <SysmaxLogo />
            </a>

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
                <a href={getServiceHtmlFile('whatsapp-calling')} onClick={(e) => handleNav(e, 'whatsapp-calling')} className="hover:text-emerald-300 transition-colors text-left text-emerald-400 font-bold flex items-center gap-1.5">
                  <span>→ WhatsApp Calling</span>
                  <span className="text-[9px] bg-emerald-950 px-1 py-0.2 rounded border border-emerald-800">Novo</span>
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('telefonia')} onClick={(e) => handleNav(e, 'telefonia')} className="hover:text-cyan-400 transition-colors text-left block">
                  PABX Virtual em Nuvem
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('telefonia')} onClick={(e) => handleNav(e, 'telefonia')} className="hover:text-cyan-400 transition-colors text-left block">
                  Telefonia VoIP Corporativa
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('telefonia')} onClick={(e) => handleNav(e, 'telefonia')} className="hover:text-cyan-400 transition-colors text-left block">
                  Portabilidade Numérica
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('telefonia')} onClick={(e) => handleNav(e, 'telefonia')} className="hover:text-cyan-400 transition-colors text-left block">
                  Números DID e 0800 Nacional
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('telefonia')} onClick={(e) => handleNav(e, 'telefonia')} className="hover:text-cyan-400 transition-colors text-left block">
                  Simulador de Custos VoIP
                </a>
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
                <a href={getServiceHtmlFile('criacao-sites')} onClick={(e) => handleNav(e, 'criacao-sites')} className="hover:text-emerald-300 transition-colors text-left text-emerald-400 font-bold flex items-center gap-1.5">
                  <span>→ Criação de Sites (Web Design)</span>
                  <span className="text-[9px] bg-emerald-950 px-1 py-0.2 rounded border border-emerald-800">Novo</span>
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('locacao')} onClick={(e) => handleNav(e, 'locacao')} className="hover:text-emerald-300 transition-colors text-left text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span>→ Locação de TI (Notebooks)</span>
                  <span className="text-[9px] bg-emerald-950 px-1 py-0.2 rounded border border-emerald-800">HaaS</span>
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('impressao')} onClick={(e) => handleNav(e, 'impressao')} className="hover:text-cyan-300 transition-colors text-left text-teal-300 font-semibold flex items-center gap-1.5">
                  <span>→ Outsourcing de Impressão</span>
                  <span className="text-[9px] bg-teal-950 px-1 py-0.2 rounded border border-teal-800">DF</span>
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('cloud')} onClick={(e) => handleNav(e, 'cloud')} className="hover:text-cyan-300 transition-colors text-left text-cyan-400 font-semibold flex items-center gap-1.5">
                  <span>→ Cloud File Server</span>
                  <span className="text-[9px] bg-cyan-950 px-1 py-0.2 rounded border border-cyan-800">Nuvem</span>
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('suporte-ti')} onClick={(e) => handleNav(e, 'suporte-ti')} className="hover:text-cyan-400 transition-colors text-left text-cyan-300 font-semibold block">
                  → Suporte de TI & Help Desk
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('ti')} onClick={(e) => handleNav(e, 'ti')} className="hover:text-cyan-400 transition-colors text-left text-slate-300 block">
                  Visão Geral TI Gerenciada (MSP)
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('suporte-ti')} onClick={(e) => handleNav(e, 'suporte-ti')} className="hover:text-cyan-400 transition-colors text-left block">
                  Modalidades & Pacotes de Horas
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('ti')} onClick={(e) => handleNav(e, 'ti')} className="hover:text-cyan-400 transition-colors text-left block">
                  Firewall & Segurança Ativa
                </a>
              </li>
              <li>
                <a href={getServiceHtmlFile('ti')} onClick={(e) => handleNav(e, 'ti')} className="hover:text-cyan-400 transition-colors text-left block">
                  Backup 3-2-1 & DRP
                </a>
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
