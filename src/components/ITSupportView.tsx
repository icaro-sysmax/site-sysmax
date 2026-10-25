import { useState } from 'react';
import {
  Headphones,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  Activity,
  Layers,
  ChevronDown,
  Monitor,
  Server,
  FileCheck,
  Check,
} from 'lucide-react';
import helpdeskImg from '../assets/images/sysmax_it_support_helpdesk_1792700252819.jpg';
import { calculateITSupportPlan, calculateHourlyPackage } from '../utils/calculator';
import { ContactForm } from './ContactForm';

interface ITSupportViewProps {
  onSwitchToTelefonia: () => void;
  onSwitchToTIGeneric: () => void;
}

export function ITSupportView({ onSwitchToTelefonia, onSwitchToTIGeneric }: ITSupportViewProps) {
  const [contractMode, setContractMode] = useState<'mensal' | 'horas' | 'equipamento'>('mensal');
  const [selectedHourlyHours, setSelectedHourlyHours] = useState<10 | 20 | 40>(20);
  const [workstationCount, setWorkstationCount] = useState<number>(12);
  const [selectedPlanId, setSelectedPlanId] = useState<'basico' | 'profissional' | 'enterprise'>('profissional');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const hourlyDetails = calculateHourlyPackage(selectedHourlyHours);
  const currentPlan = calculateITSupportPlan(selectedPlanId, workstationCount);

  const painPoints = [
    {
      title: 'TI sempre em emergência',
      desc: 'Problemas sem solução definitiva, máquinas lentas travando a operação e chamados acumulados sem prioridade.',
    },
    {
      title: 'Ninguém assume responsabilidade',
      desc: 'Prazos não cumpridos, técnicos que somem e falta de clareza sobre quem resolve o problema do usuário.',
    },
    {
      title: 'Gastos imprevisíveis',
      desc: 'Custos disparando com formatações emergenciais, peças sem diagnóstico prévio e retrabalho contínuo.',
    },
    {
      title: 'Falta de governança e métricas',
      desc: 'Sem relatórios de desempenho, sem controle de chamados e operando 100% no improviso quando há falhas.',
    },
  ];

  const mspDifferentials = [
    {
      icon: Activity,
      title: 'Atendimento Proativo + Reativo',
      desc: 'Monitoramento 24x7 contínuo para prever e corrigir gargalos antes que afetem seus colaboradores.',
    },
    {
      icon: ShieldCheck,
      title: 'Segurança Embutida',
      desc: 'Antivírus corporativo EDR gerenciado incluso nos contratos para proteção contra vírus e ransomwares.',
    },
    {
      icon: Headphones,
      title: 'Suporte Multi-Nível (N1, N2 e N3)',
      desc: 'Equipe especializada dividida em camadas para atendimento ágil de usuários, redes e servidores.',
    },
    {
      icon: FileCheck,
      title: 'Transparência Total & SLA Rígido',
      desc: 'Prazos de atendimento e solução definidos em contrato, com relatórios mensais e painel em tempo real.',
    },
    {
      icon: Layers,
      title: 'Escalabilidade Flexível',
      desc: 'Aumente ou reduza computadores sob gestão conforme a necessidade da sua empresa, sem burocracias.',
    },
    {
      icon: Clock,
      title: 'Atendimento Imediato no DF & Brasil',
      desc: 'Suporte remoto instantâneo em minutos e equipe presencial ágil para o Distrito Federal e entorno.',
    },
  ];

  const supportFaqs = [
    {
      q: 'Qual a diferença entre pacotes por hora e contrato mensal fixo?',
      a: 'O pacote por hora é ideal para empresas com demandas esporádicas ou projetos pontuais (comprando 10h, 20h ou 40h de atendimento). Já o contrato mensal fixo (MSP) oferece suporte ilimitado com SLA garantido em contrato, monitoramento 24x7 e antivírus corporativo gerenciado, garantindo previsibilidade de custos sem cobranças extras.',
    },
    {
      q: 'Qual o prazo de ativação e início do suporte?',
      a: 'Após a aprovação da proposta, iniciamos o inventário inicial e a instalação dos agentes de monitoramento em até 24 a 48 horas úteis. A partir desse momento, sua equipe já conta com abertura direta de chamados via WhatsApp, telefone e portal.',
    },
    {
      q: 'O suporte contempla atendimento presencial?',
      a: 'Sim! Mais de 85% dos chamados são resolvidos remotamente em minutos. Para os casos que exigem presença física (troca de peças, formatação física, falhas de cabeamento, servidores travados ou novas instalações), nossos técnicos realizam atendimento presencial ágil no Distrito Federal e entorno.',
    },
    {
      q: 'Quais dispositivos e sistemas são atendidos pela Sysmax?',
      a: 'Atendemos desktops e notebooks com Windows e macOS, servidores Windows Server e Linux, estações de trabalho, impressoras em rede, roteadores, switches, firewalls corporativos e periféricos de escritório.',
    },
    {
      q: 'Vocês cuidam da migração e padronização da nossa infraestrutura existente?',
      a: 'Com certeza. Durante a etapa de implantação, realizamos o saneamento completo: documentação de senhas, inventário de hardware, remoção de softwares piratas, instalação de antivírus corporativo e padronização dos backups.',
    },
  ];

  return (
    <div className="bg-[#0B132B] text-slate-100">
      {/* Hero Section: Suporte de TI */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#070D1E] via-[#0B132B] to-[#0D1B3E]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.15),transparent_60%)] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 text-left">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-4">
                <span>TI Gerenciada</span>
                <span aria-hidden="true">·</span>
                <span>Suporte de TI & Help Desk</span>
                <span aria-hidden="true">·</span>
                <span>Outsourcing Especializado</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 text-balance">
                Transforme o TI da sua empresa em uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">vantagem competitiva</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                Suporte de TI, outsourcing e helpdesk completo, com contratos flexíveis, segurança robusta e atendimento de alta performance. Garanta que seus colaboradores produzam sem interrupções e com custos previsíveis.
              </p>

              {/* Highlights pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Pacotes por hora ou contrato mensal fixo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>SLA rigoroso com penalidades garantidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Antivírus corporativo EDR gerenciado incluso</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Equipe especializada N1, N2 e N3</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#planos-suporte"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-950/40 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>Ver Planos e Modalidades</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/556140428042?text=Ol%C3%A1%20Sysmax!%20Gostaria%20de%20uma%20proposta%20de%20Suporte%20de%20TI%20e%20Help%20Desk%20para%20minha%20empresa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-xl transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Falar com Especialista de Suporte</span>
                </a>
              </div>

              {/* Cross Navigation Links */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span>Navegar para:</span>
                <button
                  onClick={onSwitchToTIGeneric}
                  className="text-cyan-400 hover:underline font-semibold focus:outline-none"
                >
                  Visão Geral de TI Gerenciada (MSP) →
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={onSwitchToTelefonia}
                  className="text-cyan-400 hover:underline font-semibold focus:outline-none"
                >
                  Telefonia Fixa & PABX Virtual →
                </button>
              </div>
            </div>

            {/* Right Column: Helpdesk Operations Workspace Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-xl">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-medium text-slate-300">
                      Sysmax Help Desk · Fila de Atendimento
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-800/40">
                    SLA ATIVO
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={helpdeskImg}
                    alt="Equipe de Suporte Técnico e Help Desk Sysmax"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-cyan-400" />
                        <div>
                          <div className="font-semibold text-white">Central de Atendimento ao Usuário</div>
                          <div className="text-[11px] text-slate-400">Tempo médio de 1º contato: 12 minutos</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        N1 / N2 / N3
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-slate-800 bg-slate-950/90 text-center py-2.5 px-2 border-t border-slate-800/80 text-[11px]">
                  <div>
                    <div className="font-bold text-white">Remoto + Presencial</div>
                    <div className="text-slate-400">DF e Brasil</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">Antivírus EDR</div>
                    <div className="text-emerald-400">Incluso no Plano</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">SLA em Contrato</div>
                    <div className="text-cyan-400">Com Penalidades</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dores & Problemas (Inspirado na MDF) */}
      <section className="py-20 bg-[#080E21] border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-semibold tracking-wider text-rose-400 uppercase mb-2">
              Você não quer só "consertar" — quer garantir operação contínua
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Sua empresa depende de sistemas, mas o TI vive em emergência?
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              O modelo tradicional de "chamar quando quebra" gera custos ocultos gigantescos com colaboradores parados e frustração da diretoria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4 font-mono font-bold text-sm">
                  0{index + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais MSP com Foco em Resultado */}
      <section className="py-20 bg-[#0B132B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Excelência Operacional
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Suporte MSP de TI com foco em resultado
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Atuamos como a equipe de tecnologia interna da sua empresa, garantindo alta disponibilidade, governança e alinhamento com as metas do negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mspDifferentials.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center border border-slate-700/80 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{diff.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{diff.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modalidades de Contratação & Pacotes (Interativo) */}
      <section id="planos-suporte" className="py-20 bg-[#080E21] border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Flexibilidade Contratual
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Modalidades de Contrato & Pacotes de Suporte
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Escolha a modalidade que melhor se adapta ao momento e tamanho da sua operação.
            </p>

            {/* Mode Switch Tabs */}
            <div className="mt-8 inline-flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => setContractMode('mensal')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  contractMode === 'mensal'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Contrato Mensal Fixo (MSP)
              </button>
              <button
                onClick={() => setContractMode('horas')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  contractMode === 'horas'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Pacotes por Hora (Pontual)
              </button>
            </div>
          </div>

          {contractMode === 'mensal' ? (
            /* Interactive Monthly MSP Plans */
            <div>
              {/* Workstation slider */}
              <div className="max-w-xl mx-auto mb-10 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                  <label htmlFor="devices-slider">Quantidade de Máquinas / Usuários:</label>
                  <span className="text-xl font-bold text-cyan-400 font-mono tabular-nums">
                    {workstationCount} dispositivos
                  </span>
                </div>
                <input
                  id="devices-slider"
                  type="range"
                  min="3"
                  max="60"
                  value={workstationCount}
                  onChange={(e) => setWorkstationCount(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* 3 Tier Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(['basico', 'profissional', 'enterprise'] as const).map((planId) => {
                  const plan = calculateITSupportPlan(planId, workstationCount);
                  const isSelected = selectedPlanId === planId;
                  const isPro = planId === 'profissional';

                  return (
                    <div
                      key={planId}
                      className={`relative p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                        isPro
                          ? 'bg-slate-900 border-2 border-cyan-400 shadow-2xl shadow-cyan-950/50'
                          : 'bg-slate-900/60 border border-slate-800'
                      }`}
                    >
                      {isPro && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                          Mais Escolhido
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                        </div>

                        <div className="mb-4">
                          <span className="text-3xl font-extrabold text-white tabular-nums">
                            R$ {plan.totalMonthly.toLocaleString('pt-BR')}
                          </span>
                          <span className="text-xs text-slate-400">/mês</span>
                          <div className="text-[11px] text-cyan-400 mt-0.5">
                            (R$ {plan.pricePerDevice}/dispositivo sob gestão)
                          </div>
                        </div>

                        <div className="space-y-2 mb-6 pt-4 border-t border-slate-800 text-xs">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
                            <span className="text-slate-400">SLA de Resposta:</span>
                            <span className="font-semibold text-white">{plan.slaResponse}</span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-300">
                            <span className="text-slate-400">Horário:</span>
                            <span className="font-semibold text-white text-right">{plan.supportHours}</span>
                          </div>
                        </div>

                        <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800">
                          {plan.features.map((feat, fIndex) => (
                            <div key={fIndex} className="flex items-start gap-2.5 text-xs text-slate-300">
                              <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800">
                        <a
                          href="#contato-suporte"
                          onClick={() => setSelectedPlanId(planId)}
                          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                            isPro
                              ? 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-md'
                              : 'bg-slate-800 text-white hover:bg-slate-700'
                          }`}
                        >
                          <span>Contratar {plan.name}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Hourly Packages Grid */
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {([10, 20, 40] as const).map((h) => {
                  const pkg = calculateHourlyPackage(h);
                  const isSelected = selectedHourlyHours === h;
                  return (
                    <button
                      key={h}
                      onClick={() => setSelectedHourlyHours(h)}
                      className={`p-6 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 ring-1 ring-cyan-400 shadow-xl'
                          : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold text-white">Pacote {h} Horas</span>
                          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                            -{pkg.savingsPercentage}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">
                          Para demandas pontuais, formatações e manutenções preventivas programadas.
                        </p>
                        <div className="text-2xl font-extrabold text-white tabular-nums mb-1">
                          R$ {pkg.totalPrice.toLocaleString('pt-BR')}
                        </div>
                        <div className="text-xs text-cyan-400">
                          (R$ {pkg.hourlyRate}/hora no pacote)
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
                        Validade de 90 dias com controle de horas consumidas
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Pacote Selecionado: {hourlyDetails.hours} Horas de Suporte Especializado
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Total: R$ {hourlyDetails.totalPrice.toLocaleString('pt-BR')} · Sem vínculo mensal obrigatório
                  </p>
                </div>
                <a
                  href="#contato-suporte"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md"
                >
                  <span>Adquirir Pacote de Horas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Etapas, SLA e Fluxos de Atendimento */}
      <section className="py-20 bg-[#0B132B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Governança & Fluxo
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Etapas, SLA e Fluxos de Atendimento
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Processo estruturado para que sua empresa tenha transparência total em cada chamado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01. Diagnóstico Inicial',
                desc: 'Auditoria rápida de estações de trabalho, rede e servidores para identificar vulnerabilidades e inventariar equipamentos.',
              },
              {
                step: '02. Proposta & SLA Rígido',
                desc: 'Definição do modelo ideal (mensal ou por hora) com tempo de resposta garantido em contrato sob penalidades.',
              },
              {
                step: '03. Implantação & Agentes',
                desc: 'Instalação silenciosa de agentes de monitoramento e antivírus corporativo EDR sem interromper a equipe.',
              },
              {
                step: '04. Atendimento Multicanal',
                desc: 'Colaboradores abrem chamados via WhatsApp corporativo, e-mail ou portal direto com fila priorizada.',
              },
              {
                step: '05. Operação N1, N2 e N3',
                desc: 'Resolução rápida remota para problemas cotidianos e acionamento de especialistas para infraestrutura e servidores.',
              },
              {
                step: '06. Governança Mensal',
                desc: 'Entrega de relatórios executivos com volume de chamados, tempo médio de atendimento e saúde do parque tecnológico.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{item.step}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs text-cyan-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Procedimento auditável</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Específico de Suporte de TI */}
      <section className="py-20 bg-[#080E21] border-t border-slate-800/80 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Perguntas Frequentes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Dúvidas sobre o Suporte de TI Sysmax
            </h2>
          </div>

          <div className="space-y-3">
            {supportFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formulário de Contato e Proposta de Suporte */}
      <div id="contato-suporte">
        <ContactForm
          initialService="Help Desk de TI Especializado"
          initialExtensions={workstationCount}
        />
      </div>
    </div>
  );
}
