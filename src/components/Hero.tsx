import { useState } from 'react';
import { ArrowRight, MessageSquare, PhoneCall, CheckCircle2, Shield, Zap, Headphones, BarChart3, Radio } from 'lucide-react';
import platformImage from '../assets/images/sysmax_voip_platform_1792695100942.jpg';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreServices: () => void;
}

export function Hero({ onOpenQuote, onExploreServices }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'softphone' | 'recording'>('dashboard');

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#070D1E] via-[#0B132B] to-[#0D1B3E]">
      {/* Subtle tech background radial grids */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.15),transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Value proposition kicker */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-4">
              <span>PABX em Nuvem</span>
              <span aria-hidden="true">·</span>
              <span>Telefonia VoIP</span>
              <span aria-hidden="true">·</span>
              <span>Gestão de TI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.12] mb-6 text-balance">
              Telefonia Empresarial Inteligente e <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Soluções de TI</span> para sua Empresa
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
              Modernize seu atendimento com PABX Virtual em nuvem, Telefonia VoIP de alta estabilidade e gestão completa de TI. Reduza em até <strong className="text-white font-semibold">70% os custos de telefonia</strong> mantendo seu número atual sem nenhuma pausa.
            </p>

            {/* Quick trust checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full mb-8 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Portabilidade 100% transparente</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Ramais no celular, PC e telefone IP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero fidelidade contratual abusiva</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Suporte técnico humanizado e ágil</span>
              </div>
            </div>

            {/* Dual CTAs: Falar com especialista + Solicitar orçamento */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="https://wa.me/556140428042"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-xl shadow-emerald-950/40 hover:shadow-emerald-500/30 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 whitespace-nowrap"
                aria-label="Falar com especialista pelo WhatsApp oficial"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Falar com especialista</span>
              </a>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-950/40 hover:shadow-cyan-400/30 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 whitespace-nowrap"
              >
                <span>Solicitar orçamento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Secondary direct consultation phone notice */}
            <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Atendimento em todo o Brasil · Central telefônica: (61) 4042-8042</span>
            </div>
          </div>

          {/* Right Column: Platform Mockup & Interactive Teaser */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/25 via-blue-500/25 to-indigo-500/25 rounded-2xl blur-xl opacity-75"></div>

              {/* Main Laptop / Platform Shell */}
              <div className="relative rounded-2xl bg-slate-900/90 border border-slate-700/60 shadow-2xl overflow-hidden backdrop-blur-xl">
                {/* Platform Window Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-medium text-slate-400">
                      Sysmax Cloud PABX · Painel de Gestão
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 text-[11px] text-cyan-400 font-mono">
                    <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
                    <span>SLA 99.98%</span>
                  </div>
                </div>

                {/* Platform Image Showcase */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={platformImage}
                    alt="Interface do PABX Virtual e Plataforma de Telefonia Sysmax"
                    className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Live Call Indicator Card */}
                  <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 shadow-xl">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                          <PhoneCall className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Central Comercial (URA)</div>
                          <div className="text-[11px] text-slate-400">Ramal 204 · HD Voice Opus</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        Ativa 02:45
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lower Quick Capabilities Strip */}
                <div className="grid grid-cols-3 divide-x divide-slate-800 bg-slate-950/90 text-center py-3 px-2 border-t border-slate-800/80">
                  <div className="px-2">
                    <div className="text-xs font-bold text-white">Softphone Multiplataforma</div>
                    <div className="text-[11px] text-slate-400">Windows, Mac, iOS e Android</div>
                  </div>
                  <div className="px-2">
                    <div className="text-xs font-bold text-cyan-400">Gravação em Nuvem</div>
                    <div className="text-[11px] text-slate-400">100% segura e auditável</div>
                  </div>
                  <div className="px-2">
                    <div className="text-xs font-bold text-white">Fila Inteligente</div>
                    <div className="text-[11px] text-slate-400">Distribuição automática</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stats & Trust Strip below Hero (inspired by the reference) */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex flex-col items-center sm:items-start p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                +10 Anos
              </span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">
                De experiência em Telecom e TI
              </span>
            </div>

            <div className="flex flex-col items-center sm:items-start p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-tight tabular-nums">
                Até 70%
              </span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">
                De economia na conta telefônica
              </span>
            </div>

            <div className="flex flex-col items-center sm:items-start p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
                99,9%
              </span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">
                Disponibilidade e estabilidade SLA
              </span>
            </div>

            <div className="flex flex-col items-center sm:items-start p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight tabular-nums">
                24h
              </span>
              <span className="text-xs sm:text-sm text-slate-400 mt-1">
                Prazo médio para ativação dos ramais
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
