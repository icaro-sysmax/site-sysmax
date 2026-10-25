import { useState } from 'react';
import {
  Cloud,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  Lock,
  RotateCcw,
  Users,
  FolderTree,
  Share2,
  Clock,
  Zap,
  ArrowRight,
  Database,
  Sliders,
  ChevronDown,
  Sparkles,
  Server,
  Layers,
  FileText,
  Activity,
  AlertTriangle,
  Laptop,
  Check,
} from 'lucide-react';
import cloudImg from '../assets/images/sysmax_cloud_file_server_1792703704974.jpg';
import { calculateCloudStoragePlan } from '../utils/calculator';
import { ContactForm } from './ContactForm';

interface CloudFileServerViewProps {
  onSwitchToTelefonia: () => void;
  onSwitchToTI: () => void;
  onSwitchToSuporte: () => void;
}

export function CloudFileServerView({
  onSwitchToTelefonia,
  onSwitchToTI,
  onSwitchToSuporte,
}: CloudFileServerViewProps) {
  const [storageTB, setStorageTB] = useState<number>(2);
  const [usersCount, setUsersCount] = useState<number>(15);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPlanTab, setSelectedPlanTab] = useState<'business' | 'starter' | 'enterprise'>('business');

  const planMetrics = calculateCloudStoragePlan(storageTB, usersCount);

  const painPoints = [
    {
      problem: 'Falhas mecânicas de HD e custos com servidor físico',
      detail: 'Servidores locais exigem nobreaks, manutenção periódica, substituição cara de discos e ar-condicionado ligado 24h por dia.',
      solution: 'Nuvem Sysmax com 99,9% de disponibilidade em Datacenter Tier III sem preocupação com peças, energia ou queima de hardware.',
    },
    {
      problem: 'Acesso remoto lento e VPNs instáveis que caem a todo instante',
      detail: 'Equipes em home office ou filiais enfrentam lentidão crônica e conexões VPN complexas que travam a abertura de pastas e planilhas.',
      solution: 'Acesso nativo e ultrarrápido pelo Windows Explorer, macOS Finder, Web Portal ou celular com sincronização inteligente sob demanda.',
    },
    {
      problem: 'Risco catastrófico de sequestro por Ransomware',
      detail: 'Em um servidor local, se um computador for infectado na rede, todos os compartilhamentos são criptografados e a empresa perde tudo.',
      solution: 'Escudo anti-ransomware com versionamento imutável de até 90 dias: reverta pastas inteiras para minutos antes do ataque com 1 clique.',
    },
    {
      problem: 'Desordem de arquivos e vazamento sem conformidade com a LGPD',
      detail: 'Falta de auditoria sobre quem apagou, copiou ou enviou dados sensíveis da empresa para fora, expondo a diretoria a multas da ANPD.',
      solution: 'Matriz granular de permissões por departamento com logs detalhados de auditoria e criptografia AES-256 bits ponta a ponta.',
    },
  ];

  const corePillars = [
    {
      icon: <HardDrive className="w-6 h-6 text-cyan-400" />,
      title: 'Mapeamento como Disco Local (Z:)',
      description: 'Aparece como uma pasta ou drive de rede convencional no Windows e Mac. Seus colaboradores não precisam reaprender nada.',
      highlight: 'Sincronização inteligente sem lotar o SSD',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-emerald-400" />,
      title: 'Versionamento & Anti-Ransomware',
      description: 'Cada modificação ou salvamento gera um histórico de versões. Recupere documentos alterados ou sequestrados instantaneamente.',
      highlight: 'Restauração com histórico de até 90 dias',
    },
    {
      icon: <Lock className="w-6 h-6 text-cyan-400" />,
      title: 'Segurança Militar AES-256',
      description: 'Criptografia em trânsito (SSL/TLS de 256 bits) e no repouso (AES-256). Seus dados ficam protegidos contra qualquer interceptação.',
      highlight: 'Datacenters em solo brasileiro',
    },
    {
      icon: <FolderTree className="w-6 h-6 text-blue-400" />,
      title: 'Controle de Permissões Granular',
      description: 'Defina com precisão quem tem acesso de leitura, escrita, compartilhamento ou exclusão em cada pasta ou projeto corporativo.',
      highlight: 'Isolamento por setores e cargos',
    },
    {
      icon: <Share2 className="w-6 h-6 text-emerald-400" />,
      title: 'Compartilhamento Externo Seguro',
      description: 'Envie links públicos ou protegidos por senha e prazo de validade para clientes e parceiros, eliminando anexos pesados de e-mail.',
      highlight: 'Links com senha e expiração automática',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      title: 'Auditoria Completa & LGPD',
      description: 'Relatórios e registros em tempo real de todas as ações: criação, edição, download, deleção e compartilhamento de arquivos.',
      highlight: 'Trilha de auditoria para compliance',
    },
  ];

  const migrationSteps = [
    {
      step: '01',
      title: 'Diagnóstico & Mapeamento',
      desc: 'Nossa equipe técnica analisa a estrutura de pastas do seu servidor atual, volumes de dados e níveis de permissão existentes.',
    },
    {
      step: '02',
      title: 'Sincronização em Segundo Plano',
      desc: 'Migramos todo o repositório de arquivos de forma contínua e segura, sem interromper um minuto sequer o trabalho da sua equipe.',
    },
    {
      step: '03',
      title: 'Validação de Permissões & Testes',
      desc: 'Configuramos as permissões departamentais, instalamos o agente nos dispositivos e validamos a integridade de 100% dos arquivos.',
    },
    {
      step: '04',
      title: 'Virada de Chave & Desativação do Local',
      desc: 'Sua equipe passa a usar a nuvem no mesmo dia com treinamento rápido. O antigo servidor físico é desativado gerando economia imediata.',
    },
  ];

  const faqItems = [
    {
      q: 'O Cloud File Server ocupa todo o espaço do disco rígido (SSD/HD) do meu computador?',
      a: 'Não! O Sysmax Cloud File Server utiliza a tecnologia de sincronização inteligente sob demanda (Smart Sync). Os arquivos aparecem normalmente no Windows Explorer ou macOS Finder com ícones indicativos, mas os dados reais ficam na nuvem, sendo baixados instantaneamente apenas quando você abre o arquivo. Isso poupa espaço no seu SSD e permite trabalhar com terabytes sem sobrecarregar notebooks.',
    },
    {
      q: 'Como funciona a proteção contra Ransomware no Cloud File Server?',
      a: 'Ao contrário de um servidor local onde o vírus criptografa os arquivos e destrói o compartilhamento, o Sysmax Cloud File Server conta com versionamento imutável. Caso qualquer máquina infectada envie arquivos corrompidos para a nuvem, a nossa plataforma isola a alteração e permite realizar um rollback em lote para a versão exata anterior ao ataque com apenas alguns cliques, sem pagar resgates nem perder dados.',
    },
    {
      q: 'O que acontece se a conexão de internet da empresa oscilar ou cair temporariamente?',
      a: 'Você pode marcar pastas prioritárias ou arquivos em que estiver trabalhando para ficarem "Sempre Disponíveis Offline". Dessa forma, você continua editando seus documentos mesmo em voos ou durante quedas de sinal. Assim que a conexão for restabelecida, as alterações são sincronizadas automaticamente em segundo plano com detecção inteligente de conflitos.',
    },
    {
      q: 'Posso definir permissões diferentes para cada setor da empresa (Financeiro, RH, Vendas)?',
      a: 'Sim, com total granularidade. Você pode criar grupos de usuários (ex: Diretoria, Jurídico, Financeiro, Comercial) e estipular exatamente quem pode visualizar, editar, baixar ou gerenciar cada diretório. Usuários comuns não conseguem alterar permissões nem conceder acessos indevidos.',
    },
    {
      q: 'Os arquivos ficam armazenados no Brasil? Atende integralmente à LGPD?',
      a: 'Sim! Os servidores em nuvem da Sysmax estão hospedados em Datacenters Tier III com certificação ISO 27001 e SOC 2, operando em conformidade com a Lei Geral de Proteção de Dados (LGPD). Todos os acessos e modificações são registrados em logs de auditoria detalhados.',
    },
    {
      q: 'Como é feita a migração do servidor antigo para a nuvem Sysmax?',
      a: 'Nossa equipe de engenharia cuida de toda a migração do seu servidor físico atual ou NAS para o Sysmax Cloud File Server. A transferência é feita em segundo plano com criptografia, sem exigir paralisação do expediente da sua empresa. Agendamos a virada de chave para um momento oportuno e fornecemos suporte direto aos usuários.',
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-[#0B132B]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-20 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-inner">
                <Cloud className="w-4 h-4 text-cyan-400" />
                <span>Cloud File Server Corporativo</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Seu Servidor de Arquivos em Nuvem com{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                  Segurança Militar
                </span>{' '}
                e Zero Custo de Hardware Físico
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                Substitua de vez o servidor local da sua empresa por uma nuvem corporativa de alta velocidade. 
                Acesse seus arquivos no Windows ou Mac como uma unidade local de rede (Letra Z:), de qualquer lugar, 
                com <strong className="text-white font-medium">versionamento imutável anti-ransomware</strong>, 
                criptografia AES-256 e conformidade com a LGPD.
              </p>

              {/* Value Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Mapeado como disco local (Letra Z:)',
                  'Proteção ativa e rollback contra Ransomware',
                  'Acesso ágil sem necessidade de VPN lenta',
                  'Eliminação total de custos com servidor físico',
                  'Controle granular de permissões por pastas',
                  'Datacenter Tier III com SLA de 99,9%',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <a
                  href="#simulador-cloud"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Simular Capacidade & Economia</span>
                </a>

                <a
                  href="#contato-cloud"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-semibold text-sm sm:text-base transition-all text-center"
                >
                  <span>Falar com Especialista Cloud</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </a>
              </div>

              {/* Trust Micro-bar */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Criptografia AES-256</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-emerald-400" />
                  <span>Rollback Imediato</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span>99,9% SLA Garantido</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-cyan-950/40 bg-slate-900 group">
                <img
                  src={cloudImg}
                  alt="Sysmax Cloud File Server - Painel de Gestão e Armazenamento Seguro"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-40 pointer-events-none" />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B132B]/90 backdrop-blur-md border border-cyan-500/30 text-xs shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">Escudo Anti-Ransomware Ativo</div>
                        <div className="text-slate-400 text-[11px]">Versionamento contínuo em tempo real</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-950/80 text-emerald-300 font-semibold text-[10px] border border-emerald-800/50">
                      Conforme LGPD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section: Servidor Físico Tradicional vs Sysmax Cloud */}
      <section className="py-16 lg:py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">
              Modernização de Infraestrutura
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Por que manter um servidor local físico se tornou um risco caro?
            </h3>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Veja o comparativo direto entre manter equipamentos antigos na empresa e migrar para o Sysmax Cloud File Server.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Pain Point */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5 border border-red-500/20">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{item.problem}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>

                  {/* Sysmax Solution */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-start gap-3 bg-cyan-950/20 p-3.5 rounded-xl border border-cyan-800/30">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                        Solução Sysmax Cloud
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Technology Pillars */}
      <section className="py-16 lg:py-24 border-b border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-2">
              Recursos Avançados
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Tudo o que sua empresa precisa para gerenciar arquivos com total controle
            </h3>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Desenvolvido para atender exigências de escritórios, clínicas, financeiras e indústrias que não podem parar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Storage & Cost Calculator */}
      <section id="simulador-cloud" className="py-16 lg:py-24 border-b border-slate-800/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Simulador Interativo
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
              Calcule sua Capacidade e Economia Mensal
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Ajuste o espaço em disco e a quantidade de colaboradores para visualizar a estimativa de custos e comparativo com servidor físico.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Simulator Controls (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-8">
              {/* Slider 1: Storage Capacity (TB) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="storage-slider" className="text-sm font-semibold text-white flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-cyan-400" />
                    <span>Armazenamento Necessário:</span>
                  </label>
                  <span className="text-xl font-extrabold text-cyan-400">
                    {storageTB} TB <span className="text-xs font-normal text-slate-400">({storageTB * 1024} GB)</span>
                  </span>
                </div>
                <input
                  id="storage-slider"
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={storageTB}
                  onChange={(e) => setStorageTB(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                  <span>500 GB (Básico)</span>
                  <span>5 TB (Médio)</span>
                  <span>10 TB</span>
                  <span>20 TB (Alta Densidade)</span>
                </div>
              </div>

              {/* Slider 2: Users Count */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="users-slider" className="text-sm font-semibold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>Colaboradores com Acesso:</span>
                  </label>
                  <span className="text-xl font-extrabold text-cyan-400">
                    {usersCount} usuários
                  </span>
                </div>
                <input
                  id="users-slider"
                  type="range"
                  min="3"
                  max="100"
                  step="1"
                  value={usersCount}
                  onChange={(e) => setUsersCount(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                  <span>3 usuários</span>
                  <span>25 usuários</span>
                  <span>50 usuários</span>
                  <span>100+ usuários</span>
                </div>
              </div>

              {/* Included Benefits in this simulation */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  O que está incluso nesta configuração:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {planMetrics.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulator Results & Pricing Card (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#070D1E] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {planMetrics.recommendedPlan}
                </span>
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Estimativa Mensal Sysmax
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-xs text-slate-400 font-medium">R$</span>
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {planMetrics.monthlyCloudCost.toLocaleString('pt-BR')}
                </span>
                <span className="text-xs text-slate-400 font-normal">/mês</span>
              </div>

              {/* Savings Comparison Breakdown */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Servidor Local Físico Estimado:</span>
                  <span className="font-semibold text-slate-300 line-through">
                    R$ {planMetrics.traditionalOnPremCost.toLocaleString('pt-BR')}/mês
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Economia Mensal Estimada:</span>
                  <span className="font-bold text-emerald-400">
                    R$ {planMetrics.monthlySavings.toLocaleString('pt-BR')}/mês
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700 font-bold">
                  <span className="text-white">Economia Anual Projetada:</span>
                  <span className="text-emerald-400">
                    R$ {planMetrics.annualSavings.toLocaleString('pt-BR')} (~{planMetrics.savingsPercentage}%)
                  </span>
                </div>
              </div>

              {/* Key SLA & Retention Highlights */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-center">
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="text-xs text-slate-400">Retenção de Arquivos</div>
                  <div className="text-lg font-bold text-white mt-0.5">{planMetrics.retentionDays} dias</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="text-xs text-slate-400">Rollback Anti-Ransomware</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">1 Clique</div>
                </div>
              </div>

              {/* CTA for this simulation */}
              <a
                href="#contato-cloud"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
              >
                <span>Solicitar Proposta com {storageTB} TB</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-[11px] text-slate-500 text-center mt-3">
                Valores transparentes sem taxa de cancelamento ou surpresas com tráfego de dados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Comparison Tiers */}
      <section className="py-16 lg:py-24 border-b border-slate-800/80 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Estrutura de Planos
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
              Escolha a modalidade ideal para o porte da sua empresa
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Planos dimensionados para consultórios, escritórios de advocacia, contabilidade e indústrias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1: Starter */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Pequenas Equipes
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Cloud Starter</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Ideal para pequenas empresas com até 15 colaboradores que buscam segurança básica e acesso remoto fácil.
                </p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="text-xs text-slate-400">A partir de</div>
                  <div className="text-3xl font-extrabold text-white">
                    R$ 249 <span className="text-xs text-slate-400 font-normal">/mês</span>
                  </div>
                  <div className="text-xs text-cyan-400 mt-1">Até 1 TB + 10 usuários inclusos</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Mapeamento Windows/Mac como disco Z:</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Retenção de versões de 30 dias</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Criptografia SSL + AES-256</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Links públicos com expiração</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-500">
                    <span className="w-4 h-4 shrink-0 text-center">-</span>
                    <span>Auditoria avançada de logs</span>
                  </li>
                </ul>
              </div>

              <a
                href="#contato-cloud"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
              >
                Contratar Starter
              </a>
            </div>

            {/* Plan 2: Business Pro (Mais Escolhido) */}
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500 shadow-xl shadow-cyan-500/10 flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider shadow">
                Mais Escolhido
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
                  Médias Empresas
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Cloud Business Pro</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Para empresas em crescimento que exigem isolamento por departamentos, auditoria LGPD e versionamento estendido.
                </p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="text-xs text-slate-400">A partir de</div>
                  <div className="text-3xl font-extrabold text-cyan-400">
                    R$ 549 <span className="text-xs text-slate-400 font-normal">/mês</span>
                  </div>
                  <div className="text-xs text-white mt-1">Até 3 TB + 25 usuários inclusos</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Mapeamento Windows/Mac sem consumir SSD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Retenção de versões de 60 dias imutável</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Rollback anti-ransomware com 1 clique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Permissões por grupo e departamento</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Relatórios de auditoria e conformidade LGPD</span>
                  </li>
                </ul>
              </div>

              <a
                href="#contato-cloud"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs text-center transition-all shadow-md shadow-cyan-500/20 block"
              >
                Contratar Business Pro
              </a>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Grandes Ambientes
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Cloud Enterprise</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Para alta demanda de arquivos (projetos pesados, engenharia, agências) com suporte prioritário e SLA de 1 hora.
                </p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="text-xs text-slate-400">Sob Medida</div>
                  <div className="text-3xl font-extrabold text-white">
                    Personalizado
                  </div>
                  <div className="text-xs text-cyan-400 mt-1">A partir de 5 TB até 50+ TB</div>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Armazenamento dedicado de alta performance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Retenção de versões de 90 dias com snapshot</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Integração com Active Directory / Azure AD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Gerente de contas técnico dedicado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>SLA de 1h para incidentes críticos</span>
                  </li>
                </ul>
              </div>

              <a
                href="#contato-cloud"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition-colors block"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Downtime Migration Steps */}
      <section className="py-16 lg:py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Metodologia de Implantação
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
              Migração 100% segura sem parar a sua operação
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Nossa equipe executa a transferência em segundo plano para que sua empresa não perca um único dia de faturamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {migrationSteps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-slate-900/60 border border-slate-800 relative group hover:border-cyan-500/30 transition-all"
              >
                <div className="text-4xl font-extrabold text-slate-700/60 mb-4 group-hover:text-cyan-500/40 transition-colors">
                  {step.step}
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 border-b border-slate-800/80 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Tire suas Dúvidas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
              Perguntas Frequentes sobre Cloud File Server
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              Tudo o que você precisa saber antes de migrar os arquivos da sua empresa para a nuvem Sysmax.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors"
                  aria-expanded={openFaq === idx}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sell Bar to Other Sysmax Services */}
      <section className="py-12 border-b border-slate-800/80 bg-[#070D1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Soluções Integradas Sysmax
              </span>
              <h3 className="text-lg font-bold text-white">
                Precisa também de PABX em Nuvem ou Suporte Técnico Especializado?
              </h3>
              <p className="text-xs text-slate-400">
                Unifique suas faturas de telecomunicação, suporte de TI e nuvem em um único parceiro de tecnologia.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={onSwitchToTelefonia}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Telefonia Fixa & PABX
              </button>
              <button
                onClick={onSwitchToSuporte}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Suporte de TI & Help Desk
              </button>
              <button
                onClick={onSwitchToTI}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                TI Gerenciada (MSP)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Quote Form Section */}
      <section id="contato-cloud" className="py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Orçamento Especializado
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1">
              Migre seus Arquivos para a Nuvem Sysmax
            </h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Preencha os dados abaixo para receber um diagnóstico gratuito e um plano de migração sob medida para a sua infraestrutura.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ContactForm initialService="Cloud File Server / Servidor de Arquivos em Nuvem" />
          </div>
        </div>
      </section>
    </div>
  );
}
