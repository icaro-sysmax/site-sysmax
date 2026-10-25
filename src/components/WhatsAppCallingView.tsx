import { useState } from 'react';
import {
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Headphones,
  Sliders,
  ChevronDown,
  Lock,
  Layers,
  Database,
  Check,
  Activity,
  Award,
  Zap,
} from 'lucide-react';
import callingImg from '../assets/images/sysmax_whatsapp_calling_pabx_1792702968333.jpg';
import { calculateWhatsAppCallingMetrics } from '../utils/calculator';
import { ContactForm } from './ContactForm';

interface WhatsAppCallingViewProps {
  onSwitchToTelefonia: () => void;
  onSwitchToTI: () => void;
}

export function WhatsAppCallingView({ onSwitchToTelefonia, onSwitchToTI }: WhatsAppCallingViewProps) {
  const [agentsCount, setAgentsCount] = useState<number>(8);
  const [dailyCalls, setDailyCalls] = useState<number>(120);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'recebidas' | 'ativas' | 'ura'>('recebidas');

  const metrics = calculateWhatsAppCallingMetrics(agentsCount, dailyCalls);

  const painPoints = [
    {
      problem: 'Aparelho celular disputado',
      detail: 'Apenas uma pessoa consegue atender o WhatsApp da empresa por vez no celular, deixando clientes esperando.',
      solution: 'Múltiplos ramais no mesmo número oficial: toda a equipe atende chamadas simultâneas no computador ou celular.',
    },
    {
      problem: 'Chamadas perdidas sem fila',
      detail: 'Quando o atendente está ocupado, o cliente ouve tom de ocupado ou a ligação cai no vácuo, gerando frustração.',
      solution: 'Fila de espera inteligente com música, mensagem institucional e transbordo automático para outro operador.',
    },
    {
      problem: 'Sem gravação nem auditoria',
      detail: 'Ligações feitas no WhatsApp pessoal do funcionário não ficam gravadas, impossibilitando monitoria e compliance LGPD.',
      solution: '100% das chamadas de áudio gravadas na nuvem da Sysmax, disponíveis para download, auditoria e treinamento.',
    },
    {
      problem: 'Ligações não atendidas (Spam)',
      detail: 'Chamadas de telefonia convencional feitas para clientes são bloqueadas como spam por operadoras móveis.',
      solution: 'ConectSIP Ativo: o atendente liga diretamente pela linha verificada do WhatsApp com taxa de resposta até 3x maior.',
    },
  ];

  const features = [
    {
      icon: Users,
      title: 'Múltiplos Atendentes em 1 Número',
      desc: 'Centralize todo o volume de chamadas de voz no número oficial da sua empresa. Atenda simultaneamente sem linha ocupada.',
    },
    {
      icon: Layers,
      title: 'URA e Menu Eletrônico de Voz',
      desc: 'O cliente liga pelo WhatsApp e ouve a saudação profissional: "Digite 1 para Vendas, 2 para Suporte", direcionando ao setor certo.',
    },
    {
      icon: ShieldCheck,
      title: 'Gravação em Nuvem 100% Segura',
      desc: 'Todas as conversas de áudio armazenadas com criptografia e em total conformidade com a LGPD e o Código de Defesa do Consumidor.',
    },
    {
      icon: Zap,
      title: 'Tronco SIP & API Oficial Meta',
      desc: 'Integração 100% homologada pelo WhatsApp Business API. Segurança institucional sem risco de banimento de número.',
    },
    {
      icon: Headphones,
      title: 'Atenda no Softphone, PC ou Fone IP',
      desc: 'Seus colaboradores atendem usando headset no computador, aparelho telefônico IP de mesa ou app no smartphone corporativo.',
    },
    {
      icon: Activity,
      title: 'Relatórios & Métricas em Tempo Real',
      desc: 'Acompanhe TMA (Tempo Médio de Atendimento), TME (Espera), ligações atendidas e abandonadas em um dashboard unificado.',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Cliente inicia a chamada',
      desc: 'O cliente clica para ligar de dentro do WhatsApp, site ou QR Code institucional. A chamada é gratuita para ele via internet.',
    },
    {
      step: '02',
      title: 'Atendimento pela URA',
      desc: 'A central PABX Sysmax recebe o áudio do WhatsApp e reproduz a URA com opções de departamentos e horários de funcionamento.',
    },
    {
      step: '03',
      title: 'Distribuição para o ramal livre',
      desc: 'A ligação entra na fila do setor escolhido e toca no ramal do atendente disponível (softphone no computador ou telefone IP).',
    },
    {
      step: '04',
      title: 'Gravação e histórico centralizado',
      desc: 'Ao finalizar, o áudio completo da ligação fica salvo no histórico da central com métricas detalhadas da chamada.',
    },
  ];

  const faqs = [
    {
      q: 'O que é o WhatsApp Calling integrado ao PABX?',
      a: 'É a tecnologia que conecta o canal de chamadas de voz do WhatsApp Business diretamente à central telefônica PABX Virtual da Sysmax via Tronco SIP e API oficial. Em vez de tocar em um smartphone isolado, a ligação é atendida como uma chamada telefônica corporativa: passa por URA, entra em fila de espera e toca nos ramais dos seus atendentes no computador ou telefone IP.',
    },
    {
      q: 'Existe risco de bloqueio ou banimento do número da minha empresa?',
      a: 'Nenhum risco. A Sysmax opera exclusivamente através da API Oficial Cloud do WhatsApp Business (Meta) e troncos SIP homologados. Diferente de emuladores ou chips conectados a gateways clandestinos, nossa solução é 100% legal, estável e compatível com o selo de verificação corporativa da Meta.',
    },
    {
      q: 'O cliente paga para ligar para a minha empresa pelo WhatsApp?',
      a: 'Não! Para o cliente que liga, a chamada é totalmente gratuita, pois utiliza a conexão de internet (Wi-Fi, 4G ou 5G) através do aplicativo do WhatsApp. Isso elimina barreiras para clientes em outros DDDs ou no exterior que hesitariam em fazer uma ligação interurbana convencional.',
    },
    {
      q: 'Minha equipe precisa de celulares físicos para atender?',
      a: 'Não. Os atendentes podem atender as ligações do WhatsApp através do Softphone Webphone no navegador do computador com headset, telefones IP físicos de mesa homologados ou através do aplicativo móvel corporativo Sysmax instalado no smartphone.',
    },
    {
      q: 'Podemos fazer ligações ativas pelo WhatsApp para clientes que não atendem?',
      a: 'Sim! Com o recurso ConectSIP, quando um operador liga para o celular de um lead e a chamada cai na caixa postal ou não é atendida por bloqueadores de spam, ele pode discar novamente pelo mesmo ramal utilizando o WhatsApp como origem de voz. As taxas de atendimento costumam saltar de 20% para mais de 70%.',
    },
    {
      q: 'O WhatsApp Calling substitui a telefonia fixa tradicional ou funciona junto?',
      a: 'Funciona totalmente junto e integrado no mesmo painel! No PABX Sysmax, sua empresa unifica os números fixos (DID), 0800, portabilidade telefônica e a linha de WhatsApp Calling em uma única central com relatórios compartilhados.',
    },
    {
      q: 'Qual o prazo de implantação da integração do WhatsApp no PABX?',
      a: 'A ativação do tronco SIP e homologação do número corporativo do WhatsApp é realizada em até 48 horas úteis pela nossa equipe de engenharia em telecomunicações, sem interrupção do atendimento da sua empresa.',
    },
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contato-whatsapp-calling');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={onSwitchToTelefonia}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Telefonia Corporativa
          </button>
          <span>/</span>
          <span className="text-emerald-400 font-medium">WhatsApp Calling no PABX</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-16 md:pb-24">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>EXCLUSIVIDADE SYSMAX · VOZ HOMOLOGADA VIA META API</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Ligações de WhatsApp no seu{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                  PABX em Nuvem
                </span>
                , distribuídas nos ramais
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Receba chamadas de voz do WhatsApp oficial da sua empresa com <strong>URA profissional</strong>,{' '}
                <strong>fila de espera</strong>, <strong>gravação 100% em nuvem</strong> e múltiplos atendentes no mesmo número.
                Seus operadores atendem no computador ou ramal IP sem depender de celular físico.
              </p>

              {/* Trust Indicators Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                  <div className="text-emerald-400 font-extrabold text-xl">1 Número</div>
                  <div className="text-[11px] text-slate-400 font-medium">Múltiplos ramais</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                  <div className="text-cyan-400 font-extrabold text-xl">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Gravação em nuvem</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                  <div className="text-emerald-400 font-extrabold text-xl">+218%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Taxa de atendimento</div>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                  <div className="text-cyan-400 font-extrabold text-xl">Zero</div>
                  <div className="text-[11px] text-slate-400 font-medium">Custo de DDD p/ cliente</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a
                  href="https://wa.me/556140428042?text=Ol%C3%A1%20Sysmax!%20Gostaria%20de%20saber%20mais%20sobre%20a%20integra%C3%A7%C3%A3o%20do%20WhatsApp%20Calling%20no%20PABX."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5 fill-slate-950" />
                  <span>Falar com Especialista WhatsApp</span>
                </a>

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-base transition-all duration-200 cursor-pointer"
                >
                  <span>Solicitar Cotação</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> API Oficial Meta Homologada
                </span>
                <span>•</span>
                <span>Sem risco de banimento</span>
                <span>•</span>
                <span>Ativação em até 48h</span>
              </div>
            </div>

            {/* Right Graphic Column: High-Fidelity Softphone Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 group">
                <img
                  src={callingImg}
                  alt="Interface Sysmax de Chamada de Áudio WhatsApp no PABX com URA e Gravação"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-102"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-60" />

                {/* Floating Live Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 backdrop-blur-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-white">Chamada de Áudio WhatsApp Ativa</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 border border-slate-800 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Tronco SIP WhatsApp Calling</span>
                    <span className="text-emerald-400 font-semibold">12 Ramais Conectados</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="text-cyan-400">URA:</span> "Opção 1 - Suporte Comercial" ➔ Ramal 104
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Contrast: Soluções Sysmax vs Dores do WhatsApp Isolado */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Transformação Operacional
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Por que tratar a voz do WhatsApp fora da central prejudica sua empresa?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Sem integração, chamadas de voz no WhatsApp ficam presas ao celular pessoal de um atendente, sem gravação, sem fila e com perda constante de negócios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0B132B] border border-slate-800/80 hover:border-emerald-500/40 transition-all duration-300 space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Como é hoje (Sem PABX)</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{item.problem}</h3>
                    <p className="text-xs text-slate-400 mt-1">{item.detail}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Com Sysmax WhatsApp Calling</span>
                    <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed font-medium">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works: Step by Step Workflow */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Fluxo Inteligente
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Como funciona o WhatsApp Calling na prática
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Da discagem do cliente até o ramal do atendente e o relatório de supervisão.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-3">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tabs: Inbound vs Outbound (ConectSIP) vs URA */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveTab('recebidas')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'recebidas'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Ligações Recebidas (Inbound WhatsApp)
            </button>
            <button
              onClick={() => setActiveTab('ativas')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'ativas'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Ligações Ativas / ConectSIP (Outbound)
            </button>
            <button
              onClick={() => setActiveTab('ura')}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'ura'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              URA & Fila de Atendimento
            </button>
          </div>

          <div className="bg-[#0B132B] rounded-2xl p-6 sm:p-8 border border-slate-800/90">
            {activeTab === 'recebidas' && (
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-block px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    Recepção de Chamadas
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Seu cliente clica no WhatsApp e fala com sua equipe instantaneamente
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Hoje, o WhatsApp é o canal mais acessível do Brasil. Ao permitir que clientes liguem pelo aplicativo direto para o seu PABX, sua empresa elimina a fricção da telefonia tradicional, oferece atendimento humanizado rápido e centraliza o contato comercial sem perder o controle de gestão.
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Sem linha ocupada: múltiplos clientes falando ao mesmo tempo no mesmo número.
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Música de espera personalizada e informe institucional enquanto aguarda.
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      Encaminhamento inteligente para o ramal com menor tempo de ociosidade.
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 bg-slate-900/90 rounded-xl p-5 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Vantagens para o Cliente</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-800/60">
                      <span className="text-slate-300">Custo da chamada para o cliente</span>
                      <span className="text-emerald-400 font-bold">R$ 0,00 (Grátis via Wi-Fi/Dados)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-800/60">
                      <span className="text-slate-300">Qualidade de áudio</span>
                      <span className="text-cyan-400 font-bold">HD Voice (Codec Opus)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-800/60">
                      <span className="text-slate-300">Necessidade de discar DDD</span>
                      <span className="text-white font-medium">Não, discagem de 1 toque</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ativas' && (
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-block px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                    ConectSIP · Discagem Ativa por WhatsApp
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Aumente em até 3x a taxa de resposta dos seus contatos comerciais
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Você já percebeu como as pessoas rejeitam chamadas de números desconhecidos no celular? Com o ConectSIP, quando uma ligação convencional não é atendida, o operador pode acionar a discagem via linha WhatsApp direto do ramal. O cliente visualiza a identificação da sua empresa com logo e nome verificado, aumentando expressivamente o atendimento.
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      Origem de voz alternativa sem trocar de ramal ou sistema.
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      Escape dos filtros agressivos de anti-spam das operadoras móveis.
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      Economia direta em tarifas de telefonia celular móvel (GSM).
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 bg-slate-900/90 rounded-xl p-5 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Benchmark ConectSIP</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Telefonia Tradicional Desconhecida</span>
                        <span className="text-rose-400 font-bold">22% atendidas</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full w-[22%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Chamada via WhatsApp Homologado</span>
                        <span className="text-emerald-400 font-bold">71% atendidas (+218%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[71%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ura' && (
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-block px-3 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
                    Automação & Governança de Voz
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    URA Eletrônica com Menus, Filas e Horários de Expediente
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Personalize saudações com a voz da sua empresa. Crie menus interativos como "Para falar com Vendas digite 1, Suporte digite 2, Financeiro digite 3". Configure regras automáticas para fora do horário comercial, transbordo entre filiais e mensagens de plantão.
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      Triagem automática antes do atendimento humano.
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      Filas segmentadas por departamento ou habilidade (skill-based routing).
                    </li>
                    <li className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      Transferência direta de ligação entre ramais sem desconectar o cliente.
                    </li>
                  </ul>
                </div>
                <div className="md:col-span-5 bg-slate-900/90 rounded-xl p-5 border border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Exemplo de Estrutura URA</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-slate-800/60 border-l-2 border-emerald-400">
                      <span className="font-bold text-white">Saudação Inicial:</span> "Bem-vindo à Sysmax..."
                    </div>
                    <div className="p-2.5 rounded bg-slate-800/60 border-l-2 border-cyan-400">
                      <span className="font-bold text-white">Opção 1:</span> Vendas ➔ Fila Comercial (Ramais 101 a 105)
                    </div>
                    <div className="p-2.5 rounded bg-slate-800/60 border-l-2 border-blue-400">
                      <span className="font-bold text-white">Opção 2:</span> Suporte Técnico ➔ Helpdesk (Ramais 106 a 110)
                    </div>
                    <div className="p-2.5 rounded bg-slate-800/60 border-l-2 border-purple-400">
                      <span className="font-bold text-white">Opção 3:</span> Financeiro ➔ Ramal 111
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Features Bento Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Recursos Corporativos
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Toda a robustez da telefonia corporativa com a facilidade do WhatsApp
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Construído para empresas que precisam de estabilidade, qualidade de áudio e supervisão rigorosa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Simulator: Capacity & ROI Calculator */}
      <section id="simulador-whatsapp" className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Simulador Interativo
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Calcule a capacidade e a economia com WhatsApp Calling
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Ajuste o número de operadores e o volume diário de chamadas para visualizar canais simultâneos e projeção de economia.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Sliders Control Card */}
            <div className="lg:col-span-6 bg-[#0B132B] p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              {/* Slider 1: Agents */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="agents-slider" className="text-sm font-semibold text-slate-200">
                    Número de Atendentes / Ramais:
                  </label>
                  <span className="text-lg font-black text-emerald-400">{agentsCount} ramais</span>
                </div>
                <input
                  id="agents-slider"
                  type="range"
                  min="2"
                  max="60"
                  step="1"
                  value={agentsCount}
                  onChange={(e) => setAgentsCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>2 ramais</span>
                  <span>30 ramais</span>
                  <span>60 ramais</span>
                </div>
              </div>

              {/* Slider 2: Daily Calls */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="calls-slider" className="text-sm font-semibold text-slate-200">
                    Volume Médio de Ligações / Dia:
                  </label>
                  <span className="text-lg font-black text-cyan-400">{dailyCalls} chamadas</span>
                </div>
                <input
                  id="calls-slider"
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={dailyCalls}
                  onChange={(e) => setDailyCalls(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>20 ligações</span>
                  <span>250 ligações</span>
                  <span>500+ ligações</span>
                </div>
              </div>

              {/* Technical Spec Box */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Recomendação de Perfil:</span>
                  <span className="text-emerald-400 font-bold">{metrics.recommendedPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Canais de Voz Simultâneos:</span>
                  <span className="text-white font-semibold">{metrics.recommendedChannels}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Custo por Minuto de Voz no WhatsApp:</span>
                  <span className="text-emerald-400 font-bold">R$ 0,00 (Ilimitado via Dados)</span>
                </div>
              </div>
            </div>

            {/* Results Output Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#0B132B] to-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 shadow-2xl space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Ganhos Operacionais & Financeiros
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Contatos Recuperados</div>
                  <div className="text-2xl font-black text-white mt-1">
                    ~{metrics.estimatedRecoveredContactsPerMonth}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">+218% taxa de resposta</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Canais Simultâneos</div>
                  <div className="text-2xl font-black text-cyan-400 mt-1">
                    {metrics.simultaneousVoiceChannels} linhas
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Sem sinal de ocupado</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Economia Estimada em Tarifas Móveis:</span>
                  <span className="text-xs text-emerald-400 font-bold">Até 75% OFF</span>
                </div>
                <div className="text-3xl font-black text-emerald-400 mt-2">
                  R$ {metrics.monthlyCarrierSavings.toLocaleString('pt-BR')}{' '}
                  <span className="text-sm font-normal text-slate-400">/mês economizados</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Projeção anual de economia: R$ {metrics.annualSavings.toLocaleString('pt-BR')}/ano
                </div>
              </div>

              <button
                onClick={scrollToContact}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-center transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                Solicitar Proposta para {agentsCount} Ramais WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Tire Suas Dúvidas</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Perguntas Frequentes sobre WhatsApp Calling no PABX
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Tudo o que você precisa saber sobre a integração técnica, legal e operacional.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dedicated Conversion & Quote Form */}
      <section id="contato-whatsapp-calling" className="pt-8">
        <ContactForm
          initialService="PABX Integrado com WhatsApp Calling"
          initialExtensions={agentsCount}
        />
      </section>
    </div>
  );
}
