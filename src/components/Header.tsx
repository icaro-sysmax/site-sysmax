import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageSquare,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  ShieldCheck,
  Server,
  Headphones,
  Cloud,
  Laptop,
  Printer,
} from 'lucide-react';

interface HeaderProps {
  currentView: 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao';
  onNavigate: (view: 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao') => void;
  onOpenQuote: (service?: string) => void;
}

export function Header({ currentView, onNavigate, onOpenQuote }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const telephonyNavLinks = [
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Por que a Sysmax', href: '#solucao' },
    { label: 'Simulador', href: '#simulador' },
    { label: 'Implantação', href: '#etapas' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  const whatsappNavLinks = [
    { label: 'Dores vs Solução', href: '#main-content' },
    { label: 'Como Funciona', href: '#main-content' },
    { label: 'Simulador', href: '#simulador-whatsapp' },
    { label: 'Orçamento', href: '#contato-whatsapp-calling' },
  ];

  const itNavLinks = [
    { label: 'Desafios de TI', href: '#desafios-ti' },
    { label: 'Pilares MSP', href: '#pilares-ti' },
    { label: 'Diagnóstico', href: '#diagnostico-ti' },
    { label: 'FAQ TI', href: '#faq-ti' },
    { label: 'Contato', href: '#form-ti' },
  ];

  const supportNavLinks = [
    { label: 'Dores', href: '#planos-suporte' },
    { label: 'Diferenciais', href: '#planos-suporte' },
    { label: 'Planos & Horas', href: '#planos-suporte' },
    { label: 'FAQ Suporte', href: '#contato-suporte' },
    { label: 'Orçamento', href: '#contato-suporte' },
  ];

  const cloudNavLinks = [
    { label: 'Dores vs Nuvem', href: '#main-content' },
    { label: 'Recursos', href: '#main-content' },
    { label: 'Simulador', href: '#simulador-cloud' },
    { label: 'Planos', href: '#simulador-cloud' },
    { label: 'FAQ', href: '#contato-cloud' },
    { label: 'Orçamento', href: '#contato-cloud' },
  ];

  const locacaoNavLinks = [
    { label: 'Compra vs Locação', href: '#main-content' },
    { label: 'Catálogo de Frota', href: '#catalogo-equipamentos' },
    { label: 'Simulador HaaS', href: '#simulador-locacao' },
    { label: 'Ciclo 360°', href: '#main-content' },
    { label: 'FAQ', href: '#contato-locacao' },
    { label: 'Orçamento', href: '#contato-locacao' },
  ];

  const impressaoNavLinks = [
    { label: 'Dores vs Outsourcing', href: '#main-content' },
    { label: 'Multifuncionais', href: '#main-content' },
    { label: 'Pilares & Gestão', href: '#main-content' },
    { label: 'Simulador', href: '#simulador-impressao' },
    { label: 'FAQ', href: '#contato-impressao' },
    { label: 'Cotação', href: '#contato-impressao' },
  ];

  let currentNavLinks = telephonyNavLinks;
  if (currentView === 'whatsapp-calling') currentNavLinks = whatsappNavLinks;
  if (currentView === 'ti') currentNavLinks = itNavLinks;
  if (currentView === 'suporte-ti') currentNavLinks = supportNavLinks;
  if (currentView === 'cloud') currentNavLinks = cloudNavLinks;
  if (currentView === 'locacao') currentNavLinks = locacaoNavLinks;
  if (currentView === 'impressao') currentNavLinks = impressaoNavLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-[#0B132B]/75 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Logo Zone */}
          <button
            onClick={() => onNavigate('telefonia')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg shrink-0 text-left cursor-pointer"
            aria-label="Sysmax Telefonia e TI - Página Inicial"
          >
            {!imgError ? (
              <img
                src="https://sysmax.com.br/wp-content/uploads/2026/10/Blue-2.png"
                alt="Sysmax Logo"
                className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-cyan-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-white leading-none">
                    SYS<span className="text-cyan-400">MAX</span>
                  </span>
                  <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">
                    Telefonia & TI
                  </span>
                </div>
              </div>
            )}
          </button>

          {/* Navigation Links Zone with Interactive Services Sub-Menu */}
          <nav
            aria-label="Navegação Principal"
            className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-300"
          >
            {/* Interactive Services Dropdown Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  servicesDropdownOpen
                    ? 'text-cyan-400 bg-slate-800/80'
                    : 'hover:text-cyan-400 text-white font-semibold'
                }`}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Serviços</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Modern Interactive Sub-Menu Dropdown */}
              {servicesDropdownOpen && (
                <div
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-[420px] max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0B132B]/98 border border-slate-700/80 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="divide-y divide-slate-800">
                    {/* Section 1: Telefonia Fixa & WhatsApp Calling */}
                    <div className="p-3">
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                        <span>Telefonia Corporativa</span>
                        <span className="text-[9px] text-slate-500">PABX & Voz</span>
                      </div>
                      <div className="mt-1 space-y-1">
                        {/* Sub-item: Telefonia Fixa */}
                        <button
                          onClick={() => {
                            onNavigate('telefonia');
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left group ${
                            currentView === 'telefonia'
                              ? 'bg-cyan-500/10 border border-cyan-500/30'
                              : 'hover:bg-slate-800/70 border border-transparent'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              currentView === 'telefonia'
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20'
                            }`}
                          >
                            <PhoneCall className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                                Telefonia Fixa & PABX
                              </span>
                              {currentView === 'telefonia' && (
                                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                                  Ativo
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                              PABX Virtual em Nuvem, Telefonia VoIP e redução de até 70% nos custos.
                            </p>
                          </div>
                        </button>

                        {/* Sub-item: WhatsApp Calling (Novo) */}
                        <button
                          onClick={() => {
                            onNavigate('whatsapp-calling');
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left group ${
                            currentView === 'whatsapp-calling'
                              ? 'bg-emerald-500/10 border border-emerald-500/30'
                              : 'hover:bg-slate-800/70 border border-transparent'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              currentView === 'whatsapp-calling'
                                ? 'bg-emerald-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-emerald-400 group-hover:bg-emerald-500/20'
                            }`}
                          >
                            <MessageSquare className="w-4 h-4 fill-emerald-400/20" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white group-hover:text-emerald-300">
                                WhatsApp Calling
                              </span>
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-800/50">
                                Novo
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                              Ligações do WhatsApp no PABX e distribuídas em ramais com URA e gravação.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Section 2: TI Gerenciada com Suporte de TI */}
                    <div className="p-3">
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center justify-between">
                        <span>TI Gerenciada</span>
                        <span className="text-[9px] text-slate-400 font-normal">Soluções Corporativas</span>
                      </div>

                      <div className="mt-1 space-y-1">
                        {/* Sub-item: Suporte de TI (Destaque) */}
                        <button
                          onClick={() => {
                            onNavigate('suporte-ti');
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left group ${
                            currentView === 'suporte-ti'
                              ? 'bg-cyan-500/10 border border-cyan-500/30'
                              : 'hover:bg-slate-800/70 border border-transparent'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              currentView === 'suporte-ti'
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20'
                            }`}
                          >
                            <Headphones className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                                Suporte de TI
                              </span>
                              {currentView === 'suporte-ti' ? (
                                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                                  Ativo
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/30">
                                  Help Desk & N1/N2/N3
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                              Helpdesk proativo, pacotes por hora ou mensal fixo com SLA rigoroso.
                            </p>
                          </div>
                        </button>

                        {/* Sub-item: Visão Geral TI Gerenciada */}
                        <button
                          onClick={() => {
                            onNavigate('ti');
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left group ${
                            currentView === 'ti'
                              ? 'bg-cyan-500/10 border border-cyan-500/30'
                              : 'hover:bg-slate-800/70 border border-transparent'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              currentView === 'ti'
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20'
                            }`}
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                                Visão Geral TI Gerenciada (MSP)
                              </span>
                              {currentView === 'ti' && (
                                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                                  Ativo
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                              Operação 360°, Firewall de borda, Backup 3-2-1 e servidores em nuvem.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Section 3: Cloud & Armazenamento */}
                    <div className="p-3">
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center justify-between">
                        <span>Cloud</span>
                        <span className="text-[9px] text-slate-400 font-normal">Armazenamento & Nuvem</span>
                      </div>

                      <div className="mt-1 space-y-1">
                        {/* Sub-item: Cloud File Server */}
                        <button
                          onClick={() => {
                            onNavigate('cloud');
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left group ${
                            currentView === 'cloud'
                              ? 'bg-cyan-500/10 border border-cyan-500/30'
                              : 'hover:bg-slate-800/70 border border-transparent'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              currentView === 'cloud'
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20'
                            }`}
                          >
                            <Cloud className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                                Cloud File Server
                              </span>
                              {currentView === 'cloud' ? (
                                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                                  Ativo
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-800/50">
                                  Nuvem
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                              Servidor de arquivos em nuvem corporativo com disco Z:, anti-ransomware e LGPD.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Section 4: Locação de Equipamentos (HaaS) & Outsourcing de Impressão */}
                    <div className="p-3">
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center justify-between">
                        <span>Locação de Equipamentos</span>
                        <span className="text-[9px] text-slate-400 font-normal">HaaS & Outsourcing</span>
                      </div>

                      <div className="mt-1 space-y-1">
                        {/* Sub-item: Locação de TI (Notebooks, Desktops, Servidores) */}
                        <button
                          onClick={() => {
                            onNavigate('locacao');
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left group ${
                            currentView === 'locacao'
                              ? 'bg-cyan-500/10 border border-cyan-500/30'
                              : 'hover:bg-slate-800/70 border border-transparent'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              currentView === 'locacao'
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/20'
                            }`}
                          >
                            <Laptop className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                                Locação de TI (Notebooks & Servidores)
                              </span>
                              {currentView === 'locacao' ? (
                                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                                  Ativo
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-800/50">
                                  HaaS
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                              Notebooks, desktops e servidores com Swap em até 4h e 100% dedutível no Lucro Real.
                            </p>
                          </div>
                        </button>

                        {/* Sub-item: Outsourcing de Impressão (Multifuncionais, Toners & Bilhetagem) */}
                        <button
                          onClick={() => {
                            onNavigate('impressao');
                            setServicesDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition-all text-left group ${
                            currentView === 'impressao'
                              ? 'bg-cyan-500/10 border border-cyan-500/30'
                              : 'hover:bg-slate-800/70 border border-transparent'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              currentView === 'impressao'
                                ? 'bg-cyan-500 text-slate-950 font-bold'
                                : 'bg-slate-800 text-teal-400 group-hover:bg-teal-500/20'
                            }`}
                          >
                            <Printer className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-white group-hover:text-cyan-300">
                                Outsourcing de Impressão
                              </span>
                              {currentView === 'impressao' ? (
                                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                                  Ativo
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-800/50">
                                  Brasília & DF
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                              Locação de multifuncionais laser mono/color, toners 100% inclusos, bilhetagem e swap.
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/90 py-2.5 px-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                    <span>Atendimento com SLA Contratual</span>
                    <span className="text-cyan-400 font-medium">Desde 2014</span>
                  </div>
                </div>
              )}
            </div>

            {/* In-page Anchor Links */}
            {currentNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap transition-colors duration-150 hover:text-cyan-400 focus:outline-none focus-visible:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Zone: Phone + WhatsApp + Direct Quote */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href="tel:6140428042"
              className="hidden xl:flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              title="Ligue para nossa central"
            >
              <div className="w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="tabular-nums">(61) 4042-8042</span>
            </a>

            <a
              href="https://wa.me/556140428042"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-950/40 transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Falar com consultor via WhatsApp oficial"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Fale no WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 cursor-pointer"
            >
              <span>Orçamento</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href="https://wa.me/556140428042"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
              aria-label="WhatsApp Sysmax"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B132B]/98 border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {/* Mobile Services Accordion */}
            <div className="border border-slate-800 rounded-xl p-2.5 bg-slate-900/60">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between text-sm font-bold text-white px-2 py-1"
              >
                <span>Serviços & Soluções</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileServicesOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="mt-2 space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 px-2 uppercase">Telefonia Corporativa</div>
                  <button
                    onClick={() => {
                      onNavigate('telefonia');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left text-xs ${
                      currentView === 'telefonia'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-semibold">Telefonia Fixa & PABX</div>
                      <div className={`text-[10px] ${currentView === 'telefonia' ? 'text-slate-900' : 'text-slate-400'}`}>
                        VoIP, URA e redução de custos
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('whatsapp-calling');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left text-xs ${
                      currentView === 'whatsapp-calling'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">WhatsApp Calling</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          Novo
                        </span>
                      </div>
                      <div className={`text-[10px] ${currentView === 'whatsapp-calling' ? 'text-slate-900' : 'text-slate-400'}`}>
                        Ligações no PABX e ramais
                      </div>
                    </div>
                  </button>

                  <div className="text-[10px] font-bold text-cyan-400 px-2 pt-2 uppercase">TI Gerenciada</div>

                  {/* Sub-item: Suporte de TI */}
                  <button
                    onClick={() => {
                      onNavigate('suporte-ti');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left text-xs ${
                      currentView === 'suporte-ti'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Headphones className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-semibold">Suporte de TI</div>
                      <div className={`text-[10px] ${currentView === 'suporte-ti' ? 'text-slate-900' : 'text-slate-400'}`}>
                        Helpdesk N1/N2/N3, horas ou fixo
                      </div>
                    </div>
                  </button>

                  {/* Sub-item: Visão Geral TI Gerenciada */}
                  <button
                    onClick={() => {
                      onNavigate('ti');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left text-xs ${
                      currentView === 'ti'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-semibold">Visão Geral TI (MSP)</div>
                      <div className={`text-[10px] ${currentView === 'ti' ? 'text-slate-900' : 'text-slate-400'}`}>
                        Backup 3-2-1, Firewall e Cloud
                      </div>
                    </div>
                  </button>

                  <div className="text-[10px] font-bold text-cyan-400 px-2 pt-2 uppercase">Cloud & Nuvem</div>

                  {/* Sub-item: Cloud File Server */}
                  <button
                    onClick={() => {
                      onNavigate('cloud');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left text-xs ${
                      currentView === 'cloud'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Cloud className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Cloud File Server</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                          Nuvem
                        </span>
                      </div>
                      <div className={`text-[10px] ${currentView === 'cloud' ? 'text-slate-900' : 'text-slate-400'}`}>
                        Mapeamento Z:, anti-ransomware e LGPD
                      </div>
                    </div>
                  </button>

                  <div className="text-[10px] font-bold text-cyan-400 px-2 pt-2 uppercase">Locação & Outsourcing</div>

                  {/* Sub-item: Locação de TI */}
                  <button
                    onClick={() => {
                      onNavigate('locacao');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left text-xs ${
                      currentView === 'locacao'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Laptop className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Locação de TI (Notebooks & Servidores)</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          HaaS
                        </span>
                      </div>
                      <div className={`text-[10px] ${currentView === 'locacao' ? 'text-slate-900' : 'text-slate-400'}`}>
                        Notebooks, desktops, servidores e Swap em 4h
                      </div>
                    </div>
                  </button>

                  {/* Sub-item: Outsourcing de Impressão */}
                  <button
                    onClick={() => {
                      onNavigate('impressao');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left text-xs ${
                      currentView === 'impressao'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Printer className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Outsourcing de Impressão</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                          DF
                        </span>
                      </div>
                      <div className={`text-[10px] ${currentView === 'impressao' ? 'text-slate-900' : 'text-slate-400'}`}>
                        Multifuncionais laser, toners inclusos e bilhetagem
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* In-page Anchor Links for current page */}
            {currentNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
              <a
                href="tel:6140428042"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 bg-slate-800/80"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Central: (61) 4042-8042</span>
              </a>
              <a
                href="https://wa.me/556140428042"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
              >
                <span>Solicitar Orçamento Gratuito</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
