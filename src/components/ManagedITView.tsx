import { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Lock,
  Headphones,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Activity,
  AlertTriangle,
  RefreshCw,
  Cpu,
  FileCheck,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import socDashboardImg from '../assets/images/sysmax_managed_it_soc_1792699600728.jpg';
import { calculateITAssessment } from '../utils/calculator';
import { ContactForm } from './ContactForm';

interface ManagedITViewProps {
  onSwitchToTelefonia: () => void;
}

export function ManagedITView({ onSwitchToTelefonia }: ManagedITViewProps) {
  const [selectedUrgency, setSelectedUrgency] = useState<number>(0);
  const [workstations, setWorkstations] = useState<number>(15);
  const [servers, setServers] = useState<number>(2);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([
    'sem-backup-testado',
    'suporte-lento',
  ]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleRisk = (riskId: string) => {
    setSelectedRisks((prev) =>
      prev.includes(riskId) ? prev.filter((r) => r !== riskId) : [...prev, riskId]
    );
  };

  const assessment = calculateITAssessment(workstations, servers, selectedRisks);

  const urgencyChallenges = [
    {
      id: 0,
      title: 'Servidor caiu de novo?',
      sub: 'Equipe parada, atendimento atrasado e faturamento congelado',
      impact: 'Cada hora de sistema inoperante custa caro para a reputação e o caixa da empresa. Sem monitoramento preventivo, problemas de disco, memória e energia só são descobertos depois que a operação já travou.',
      sysmaxSolution: 'Monitoramento contínuo 24/7/365 que identifica falhas antes de virarem paradas, além de redundância e espelhamento em nuvem.',
    },
    {
      id: 1,
      title: 'E se um hacker atacar?',
      sub: 'Seus dados e arquivos comerciais sobreviveriam a um Ransomware?',
      impact: 'Ataques cibernéticos não miram apenas grandes bancos; PMEs são os alvos favoritos por terem senhas fracas e backups desprotegidos na mesma rede.',
      sysmaxSolution: 'Firewall gerenciado de borda, antivírus corporativo EDR com inteligência contra ameaças e backup isolado imutável (Regra 3-2-1).',
    },
    {
      id: 2,
      title: 'Suporte que nunca vem?',
      sub: 'Equipe esperando, chamado sem dono e desculpas técnicas',
      impact: 'O técnico autônomo sumiu ou o prestador atual demora 2 dias para responder um chamado de impressora ou sistema que parou a recepção.',
      sysmaxSolution: 'Help Desk estruturado N1, N2 e N3 com SLA em contrato, fila organizada, registro histórico e atendimento remoto em minutos ou presencial.',
    },
    {
      id: 3,
      title: 'TI cara sem resultado visível?',
      sub: 'Cada real investido sem retorno claro é prejuízo invisível',
      impact: 'Gastos esporádicos com peças, formatações emergenciais e consultorias avulsas que nunca resolvem a causa raiz dos problemas.',
      sysmaxSolution: 'Contrato mensal previsível, governança contínua, inventário de ativos e reuniões estratégicas para manter o parque tecnológico atualizado.',
    },
  ];

  const pillars = [
    {
      icon: Headphones,
      title: '01. Suporte Técnico & Help Desk MSP',
      tag: 'Atendimento Rápido',
      description: 'Atendimento ilimitado remoto e presencial para computadores, notebooks e periféricos da sua equipe.',
      bullets: [
        'Abertura de chamados por WhatsApp, e-mail e portal dedicado',
        'SLA de atendimento garantido em contrato',
        'Inventário de máquinas, softwares e licenças atualizado',
        'Onboarding e configuração de máquinas para novos colaboradores',
      ],
    },
    {
      icon: Lock,
      title: '02. Segurança da Informação & Firewall',
      tag: 'Proteção Ativa',
      description: 'Camadas de blindagem digital para proteger dados sigilosos e cumprir requisitos da LGPD.',
      bullets: [
        'Firewall corporativo gerenciado com controle de navegação',
        'Antivírus corporativo EDR contra malwares e ransomwares',
        'VPN segura criptografada para equipe em trabalho remoto ou home office',
        'Bloqueio automático de tentativas de intrusão e phishing',
      ],
    },
    {
      icon: RefreshCw,
      title: '03. Backup Gerenciado & Disaster Recovery (DRP)',
      tag: 'Garantia de Continuidade',
      description: 'Seus arquivos e bancos de dados protegidos com a consagrada estratégia de cópia 3-2-1.',
      bullets: [
        'Backups diários automatizados e criptografados local e em nuvem',
        'Testes periódicos reais de restauração (o backup que realmente funciona)',
        'Retenção de histórico e proteção contra exclusão acidental ou maliciosa',
        'Plano de recuperação rápida em caso de desastre ou queima de hardware',
      ],
    },
    {
      icon: Server,
      title: '04. Servidores, Nuvem & Microsoft 365',
      tag: 'Produtividade & Escala',
      description: 'Ambientes corporativos estáveis em Windows Server, Linux, nuvem híbrida e pacote Microsoft.',
      bullets: [
        'Gerenciamento de servidores de arquivos, ERPs e Active Directory (AD)',
        'Implementação e administração de contas Microsoft 365 / Exchange',
        'Migração segura de servidores físicos para nuvem com zero perda de dados',
        'Políticas de permissões e controle de acesso a pastas confidenciais',
      ],
    },
  ];

  const itFaqs = [
    {
      q: 'Como funciona o atendimento presencial e remoto da Sysmax?',
      a: 'Mais de 85% dos incidentes de TI são resolvidos de forma imediata através de ferramentas seguras de suporte remoto, garantindo agilidade. Quando há necessidade física (troca de peças, cabeamento, servidor travado ou instalação de novos equipamentos), nossos técnicos realizam atendimento presencial rápido no Distrito Federal e entorno, com cobertura nacional planejada.',
    },
    {
      q: 'O que diferencia a TI Gerenciada (MSP) de um técnico de informática tradicional?',
      a: 'O modelo tradicional trabalha na "TI reativa" (espera quebrar para consertar, cobrando por hora ou por visita). A TI Gerenciada da Sysmax trabalha na "TI preventiva": monitoramos seus computadores e servidores 24 horas por dia para corrigir falhas antes que elas parem a equipe, com custos mensais fixos e alinhamento total com os objetivos do seu negócio.',
    },
    {
      q: 'Como vocês garantem que nosso backup realmente vai funcionar em caso de perda?',
      a: 'Ao contrário de empresas que apenas configuram o backup e esquecem, a Sysmax executa testes periódicos de integridade e restauração real dos arquivos em ambiente isolado. Além disso, utilizamos a estratégia 3-2-1 com armazenamento imutável em nuvem que não é afetado por vírus locais.',
    },
    {
      q: 'Minha empresa já possui um profissional de TI interno. A Sysmax pode ajudar?',
      a: 'Sim! Atuamos com frequência no modelo de "Co-managed IT" (TI Compartilhada). Assumimos o monitoramento de segurança, antivírus, backup e rotinas de help desk para liberar o seu profissional interno para focar nos softwares estratégicos e processos centrais da empresa.',
    },
    {
      q: 'Qual o tempo médio de resposta para um chamado urgente?',
      a: 'Nosso SLA para chamados críticos (servidor inoperante, parada total de faturamento ou suspeita de ataque) é de até 1 hora com acionamento imediato de plantão. Para chamados rotineiros, o primeiro atendimento ocorre em média em menos de 15 minutos.',
    },
  ];

  return (
    <div className="bg-[#0B132B] text-slate-100">
      {/* Hero Section - TI Gerenciada */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#070D1E] via-[#0B132B] to-[#0D1B3E]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.15),transparent_60%)] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-4">
                <span>TI Gerenciada (MSP)</span>
                <span aria-hidden="true">·</span>
                <span>Segurança & Backup</span>
                <span aria-hidden="true">·</span>
                <span>Suporte Proativo</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.14] mb-6 text-balance">
                TI gerenciada para empresas que não podem parar — <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">um responsável pela sua operação</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                Suporte contínuo, backup seguro, cloud, segurança e telefonia coordenados pela mesma equipe. Elimine chamados sem dono, servidores instáveis e a insegurança de não saber se seus dados estão realmente protegidos.
              </p>

              {/* Trust checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>SLA garantido de até 1h para incidentes críticos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Monitoramento proativo 24/7/365</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Backup 3-2-1 com teste real de restauração</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Equipe própria e atendimento presencial no DF</span>
                </div>
              </div>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#diagnostico-ti"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-950/40 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span>Solicitar Diagnóstico Gratuito de TI</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/556140428042?text=Ol%C3%A1%20Sysmax!%20Gostaria%20de%20um%20diagn%C3%B3stico%20e%20proposta%20para%20TI%20Gerenciada%20da%20minha%20empresa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-xl shadow-emerald-950/40 transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Falar com Especialista no WhatsApp</span>
                </a>
              </div>

              {/* Sub-menu Switch Callout */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
                <span>Precisa de telefonia corporativa?</span>
                <button
                  onClick={onSwitchToTelefonia}
                  className="text-cyan-400 hover:underline font-semibold focus:outline-none"
                >
                  Ver nossa solução de PABX Virtual & Telefonia Fixa →
                </button>
              </div>
            </div>

            {/* Right Visual: SOC Platform Display */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-900 border border-slate-700/70 shadow-2xl overflow-hidden backdrop-blur-xl">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-medium text-slate-300">
                      Sysmax SOC · Central de Operações de TI
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    PROTEGIDO 24/7
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={socDashboardImg}
                    alt="Centro de Operações de TI e Monitoramento Sysmax"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                        <div>
                          <div className="font-semibold text-white">Monitoramento de Ativos</div>
                          <div className="text-[11px] text-slate-400">99.9% dos serviços operando sem alertas</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400 font-bold">
                        100% OK
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-slate-800 bg-slate-950/90 text-center py-2.5 px-2 border-t border-slate-800/80 text-[11px]">
                  <div>
                    <div className="font-bold text-white">Backup 3-2-1</div>
                    <div className="text-emerald-400">Testado & Seguro</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">Firewall EDR</div>
                    <div className="text-cyan-400">Ameaças Bloqueadas</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">SLA N1/N2</div>
                    <div className="text-white">Méd. 12 min</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Inspirada na MDF: "Escolha o Desafio Mais Urgente" */}
      <section id="desafios-ti" className="py-20 bg-[#080E21] border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Não começamos pelo produto. Começamos pelo problema.
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Qual é o desafio mais urgente da sua TI hoje?
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Clique no cenário que mais se aproxima da dor atual da sua empresa para entender como resolvemos.
            </p>
          </div>

          {/* 4 Urgency Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {urgencyChallenges.map((item, index) => {
              const isSelected = selectedUrgency === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedUrgency(index)}
                  className={`text-left p-5 rounded-2xl transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-cyan-400 font-mono">
                        CENÁRIO 0{index + 1}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.sub}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-semibold text-cyan-400 flex items-center gap-1">
                    <span>{isSelected ? 'Cenário Selecionado' : 'Ver como resolvemos'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Challenge Detail Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 p-5 rounded-xl bg-rose-950/20 border border-rose-900/30">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>O Risco Oculto para sua Empresa</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {urgencyChallenges[selectedUrgency].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {urgencyChallenges[selectedUrgency].impact}
                </p>
              </div>

              <div className="lg:col-span-6 p-5 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>A Resposta Estruturada da Sysmax</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Governança Preventiva & Atendimento com SLA
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                  {urgencyChallenges[selectedUrgency].sysmaxSolution}
                </p>
                <a
                  href="#diagnostico-ti"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 underline"
                >
                  <span>Solicitar proposta para sanar este risco agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Os 4 Pilares da TI Gerenciada */}
      <section id="pilares-ti" className="py-20 bg-[#0B132B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Escopo Completo MSP
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              As 4 Frentes Fundamentais da TI Gerenciada
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Combinamos suporte, segurança, backup e servidores em um único contrato para que a diretoria tenha tranquilidade total.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center border border-slate-700/80 group-hover:scale-105 group-hover:bg-cyan-500/10 transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-800/40">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {pillar.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-800">
                      {pillar.bullets.map((bullet, bIndex) => (
                        <div key={bIndex} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <a
                      href="#diagnostico-ti"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                    >
                      <span>Incluir no meu diagnóstico de TI</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculadora Interativa de Risco & Diagnóstico de TI */}
      <section id="diagnostico-ti" className="py-20 bg-[#080E21] border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Diagnóstico Rápido Interativo
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Avalie o Nível de Risco da sua TI
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Informe a quantidade de computadores e marque as vulnerabilidades que sua empresa enfrenta hoje para ver a análise de risco.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-2">
                    <label htmlFor="workstations-input">Estações de Trabalho (PCs / Notebooks):</label>
                    <span className="text-xl font-bold text-cyan-400 font-mono">
                      {workstations}
                    </span>
                  </div>
                  <input
                    id="workstations-input"
                    type="range"
                    min="2"
                    max="80"
                    value={workstations}
                    onChange={(e) => setWorkstations(parseInt(e.target.value, 10))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-200 mb-2">
                    <label htmlFor="servers-input">Servidores (Físicos ou Nuvem):</label>
                    <span className="text-xl font-bold text-cyan-400 font-mono">
                      {servers}
                    </span>
                  </div>
                  <input
                    id="servers-input"
                    type="range"
                    min="0"
                    max="10"
                    value={servers}
                    onChange={(e) => setServers(parseInt(e.target.value, 10))}
                    className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>

              {/* Vulnerabilities checklist */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Identifique os gargalos atuais da sua empresa:
                </span>

                {[
                  { id: 'sem-backup-testado', label: 'Não fazemos teste de restauração de backup' },
                  { id: 'suporte-lento', label: 'Suporte atual demora horas ou dias para atender' },
                  { id: 'sem-antivirus-central', label: 'Não temos antivírus corporativo gerenciado' },
                  { id: 'sem-firewall', label: 'Não temos firewall ou controle de acesso à internet' },
                ].map((item) => {
                  const isChecked = selectedRisks.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-rose-950/30 border-rose-800/50 text-rose-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRisk(item.id)}
                        className="rounded border-slate-700 text-rose-500 focus:ring-0"
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Assessment Score Bar */}
            <div className="pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Nível de Risco da Operação</span>
                <div
                  className={`text-2xl font-extrabold mt-1 ${
                    assessment.riskLevel === 'Crítico'
                      ? 'text-rose-400'
                      : assessment.riskLevel === 'Elevado'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {assessment.riskLevel} ({assessment.riskScore}/100)
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{assessment.riskDescription}</p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40">
                <span className="text-xs text-cyan-400 uppercase font-semibold">Plano Recomendado</span>
                <div className="text-xl font-bold text-white mt-1">{assessment.recommendedPlan}</div>
                <p className="text-[11px] text-slate-300 mt-1">SLA de Atendimento: {assessment.slaTime}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Estimativa Mensal de Suporte</span>
                <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                  R$ {assessment.monthlyEstimate.toLocaleString('pt-BR')}
                  <span className="text-xs text-slate-400">/mês</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Para {assessment.totalEndpoints} dispositivos cobertos</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="#form-ti"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl transition-all"
              >
                <span>Solicitar Proposta Formal de TI para {assessment.totalEndpoints} Equipamentos</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metodologia de Implantação e Transição */}
      <section className="py-20 bg-[#0B132B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Transição Sem Interrupção
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Como assumimos e organizamos a TI da sua empresa
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              Metodologia clara e planejada para que sua equipe continue trabalhando normalmente durante a transição.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Inventário & Auditoria',
                desc: 'Mapeamento de todos os computadores, servidores, roteadores, licenças e vulnerabilidades sem custo.',
              },
              {
                step: '02',
                title: 'Saneamento do Ambiente',
                desc: 'Remoção de softwares piratas, instalação de antivírus corporativo EDR e fechamento de portas vulneráveis.',
              },
              {
                step: '03',
                title: 'Padronização & Backup',
                desc: 'Implantação da rotina de backup 3-2-1 com teste prático de restauração e documentação de senhas.',
              },
              {
                step: '04',
                title: 'Operação com SLA',
                desc: 'Help desk ativo para todos os colaboradores, monitoramento 24/7 e relatórios mensais para a diretoria.',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold text-cyan-400 font-mono">
                    {st.step}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2 mb-2">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{st.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs text-cyan-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% acompanhado</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ de TI Gerenciada */}
      <section id="faq-ti" className="py-20 bg-[#080E21] border-t border-slate-800/80 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Tire Suas Dúvidas
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Perguntas Frequentes sobre TI Gerenciada
            </h2>
          </div>

          <div className="space-y-3">
            {itFaqs.map((faq, index) => {
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

      {/* Formulário de Contato e Diagnóstico de TI */}
      <div id="form-ti">
        <ContactForm initialService="Help Desk de TI Especializado" initialExtensions={workstations} />
      </div>
    </div>
  );
}
