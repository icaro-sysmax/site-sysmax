import { useState } from 'react';
import {
  Laptop,
  Monitor,
  Server,
  ShieldCheck,
  Zap,
  Clock,
  TrendingDown,
  Coins,
  CheckCircle2,
  XCircle,
  Headphones,
  RefreshCw,
  FileCheck2,
  HardDrive,
  Cpu,
  Layers,
  ArrowRight,
  Phone,
  Sparkles,
  Sliders,
  DollarSign,
  ChevronDown,
  HelpCircle,
  Building2,
  Award,
  Truck,
  RotateCcw,
} from 'lucide-react';
import {
  calculateEquipmentRentalQuote,
  EquipmentRentalQuoteResult,
  formatPhoneBR,
  validateLeadForm,
  generateWhatsAppQuoteLink,
  generateProtocolNumber,
  LeadFormData,
} from '../utils/calculator';
import heroRentalImg from '../assets/images/sysmax_locacao_equipamentos_hero_1792888538930.jpg';

interface EquipmentRentalViewProps {
  onSwitchToTelefonia?: () => void;
  onSwitchToTI?: () => void;
  onSwitchToCloud?: () => void;
  onSwitchToImpressao?: () => void;
}

export function EquipmentRentalView({
  onSwitchToTelefonia,
  onSwitchToTI,
  onSwitchToCloud,
  onSwitchToImpressao,
}: EquipmentRentalViewProps) {
  // Simulator State
  const [notebooks, setNotebooks] = useState<number>(10);
  const [desktops, setDesktops] = useState<number>(5);
  const [servers, setServers] = useState<number>(1);
  const [contractMonths, setContractMonths] = useState<12 | 24 | 36>(36);
  const [slaTier, setSlaTier] = useState<'standard' | 'critical'>('critical');
  const [taxRegime, setTaxRegime] = useState<'lucro_real' | 'outros'>('lucro_real');

  // Active Catalog Tab
  const [activeCatalogTab, setActiveCatalogTab] = useState<'notebooks' | 'desktops' | 'servers' | 'redes' | 'telefonia'>('notebooks');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quote Result Calculation
  const quoteResult: EquipmentRentalQuoteResult = calculateEquipmentRentalQuote({
    notebooks,
    desktops,
    servers,
    contractMonths,
    slaTier,
    taxRegime,
  });

  // Contact Form State
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: 'Locação de Equipamentos de TI (HaaS)',
    extensions: quoteResult.totalDevices,
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);

  const handleFormChange = (field: keyof LeadFormData, value: any) => {
    let finalVal = value;
    if (field === 'phone') {
      finalVal = formatPhoneBR(value);
    }
    setFormData((prev) => ({ ...prev, [field]: finalVal }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleApplyQuoteToForm = () => {
    const summaryMsg = `Interesse em locação: ${notebooks} notebooks, ${desktops} desktops, ${servers} servidor(es)/firewall, contrato de ${contractMonths} meses, SLA ${slaTier === 'critical' ? '4h Crítico' : '24h Padrão'}, regime fiscal: ${taxRegime === 'lucro_real' ? 'Lucro Real' : 'Outros'}.`;
    setFormData((prev) => ({
      ...prev,
      service: `Locação HaaS (${quoteResult.planName})`,
      extensions: quoteResult.totalDevices,
      message: summaryMsg,
    }));

    const formEl = document.getElementById('contato-locacao');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const protocol = generateProtocolNumber();
      setSubmittedProtocol(protocol);
      setIsSubmitting(false);
    }, 450);
  };

  const handleResetForm = () => {
    setSubmittedProtocol(null);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      service: 'Locação de Equipamentos de TI (HaaS)',
      extensions: 15,
      message: '',
    });
    setFormErrors({});
  };

  const whatsappDirectUrl = generateWhatsAppQuoteLink({
    name: formData.name || 'Cliente Sysmax',
    company: formData.company || 'Empresa',
    service: formData.service || 'Locação de Equipamentos de TI (HaaS)',
    extensions: quoteResult.totalDevices,
    phone: formData.phone,
    email: formData.email,
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const catalogItems = {
    notebooks: [
      {
        title: 'Notebook Corporativo Essential',
        model: 'Dell Latitude 3440 / Lenovo ThinkPad L14',
        processor: 'Intel Core i5 (13ª Geração) ou AMD Ryzen 5 Pro',
        ram: '16GB DDR4/DDR5 3200MHz',
        storage: 'SSD 512GB NVMe M.2 ultrarrápido',
        screen: '14" ou 15.6" Full HD WVA antirreflexo',
        os: 'Windows 11 Pro 64 bits original licenciado',
        highlights: ['Teclado ergonômico ABNT2', 'Webcam HD com obturador de privacidade', 'Bateria com autonomia até 8 horas'],
        idealFor: 'Analistas, setores administrativos, suporte e vendas externas',
        badge: 'Mais Locado',
      },
      {
        title: 'Ultrabook Executivo Premium',
        model: 'Dell Latitude 5440 / Lenovo ThinkPad T14s',
        processor: 'Intel Core i7 (13ª Geração com vPro)',
        ram: '16GB a 32GB DDR5 4800MHz',
        storage: 'SSD 1TB NVMe PCIe 4.0',
        screen: '14" Full HD+ (1920x1200) IPS 400 nits',
        os: 'Windows 11 Pro corporativo pré-configurado',
        highlights: ['Chassi em liga de magnésio ultraleve (1.3 kg)', 'Leitor biométrico e câmera infravermelha Windows Hello', 'Portas Thunderbolt 4 / USB-C'],
        idealFor: 'Diretores, gestores, consultores e executivos C-Level',
        badge: 'Executive Line',
      },
      {
        title: 'Mobile Workstation Alta Potência',
        model: 'Dell Precision 3581 / Lenovo ThinkPad P16v',
        processor: 'Intel Core i9 ou i7 Série H de alto desempenho',
        ram: '32GB a 64GB DDR5 Dual Channel',
        storage: 'SSD 1TB a 2TB NVMe PCIe 4.0 RAID',
        screen: '15.6" ou 16" QHD/4K 100% sRGB calibrado',
        os: 'Windows 11 Pro for Workstations',
        highlights: ['Placa de vídeo dedicada NVIDIA RTX A1000 / A2000 (6GB/8GB)', 'Certificação ISV (AutoCAD, Revit, SolidWorks)', 'Refrigeração de duplo fluxo contínuo'],
        idealFor: 'Engenharia, arquitetura, modelagem 3D e edição de vídeo 4K',
        badge: 'Alta Performance',
      },
    ],
    desktops: [
      {
        title: 'Desktop Compacto Tiny / SFF',
        model: 'Dell OptiPlex Small Form Factor / Lenovo ThinkCentre Neo',
        processor: 'Intel Core i5 (12ª / 13ª Geração)',
        ram: '16GB DDR4 3200MHz',
        storage: 'SSD 512GB NVMe M.2',
        screen: 'Monitor corporativo 23.8" Full HD IPS Dell/Lenovo incluso',
        os: 'Windows 11 Pro licenciado',
        highlights: ['Gabinete ultra compacto para mesas limpas', 'Teclado e mouse óptico ergonômicos inclusos', 'Baixíssimo consumo de energia e ruído zero'],
        idealFor: 'Escritórios, recepções, atendimento ao cliente e backoffice',
        badge: 'Custo-Benefício',
      },
      {
        title: 'Workstation Desktop de Criação',
        model: 'Dell Precision 3660 Tower / Lenovo ThinkStation P3',
        processor: 'Intel Core i7 / i9 Série K desbloqueado',
        ram: '32GB a 64GB DDR5 ECC expansível até 128GB',
        storage: 'SSD 1TB NVMe + HDD 2TB para arquivos brutos',
        screen: 'Monitor 27" 4K UHD com regulagem de altura e pivô',
        os: 'Windows 11 Pro for Workstations',
        highlights: ['GPU NVIDIA RTX 4000 / RTX A4000 dedicada', 'Fonte 80 Plus Platinum redundante', 'Excelente capacidade de expansão interna'],
        idealFor: 'Renderização gráfica, animação, cálculos complexos e IA local',
        badge: 'Potência Bruta',
      },
    ],
    servers: [
      {
        title: 'Servidor Torre / Rack para Escritório',
        model: 'Dell PowerEdge T150 / R250',
        processor: 'Intel Xeon E-2300 Multi-Core',
        ram: '32GB a 64GB DDR4 ECC Registered',
        storage: '2x SSD 960GB Enterprise em RAID 1 espelhado',
        screen: 'Gerenciamento remoto via iDRAC9 dedicado',
        os: 'Windows Server 2022 Standard ou Linux Ubuntu LTS',
        highlights: ['Controladora RAID por hardware PERC', 'Fontes redundantes hot-plug', 'Suporte a Active Directory e Banco de Dados'],
        idealFor: 'Pequenas e médias empresas para ERP local e arquivos seguros',
        badge: 'Enterprise Core',
      },
      {
        title: 'Servidor Rack de Alta Densidade 1U/2U',
        model: 'Dell PowerEdge R650 / HPE ProLiant DL360 Gen10',
        processor: 'Dual Intel Xeon Silver / Gold (até 32 núcleos)',
        ram: '64GB a 256GB DDR4 ECC',
        storage: '4x SSD SAS 1.92TB Enterprise em RAID 5/10',
        screen: 'Acesso KVM over IP e console inteligente',
        os: 'VMware ESXi, Proxmox VE ou Windows Server Datacenter',
        highlights: ['Fontes redundantes duplas 800W Titanium', 'Placas de rede quad-port 10GbE SFP+', 'Ideal para virtualização de múltiplos servidores'],
        idealFor: 'Ambientes corporativos críticos, data center local e nuvem híbrida',
        badge: 'Missão Crítica',
      },
    ],
    redes: [
      {
        title: 'Firewall UTM Gerenciado de Borda',
        model: 'Fortinet FortiGate 60F / 70F ou Mikrotik CCR',
        processor: 'ASIC dedicado com aceleração de hardware',
        ram: 'Memória protegida contra ataques DDoS',
        storage: 'Logs em tempo real na nuvem Sysmax',
        screen: 'Painel de relatórios executivos de tráfego',
        os: 'FortiOS atualizado com assinaturas IPS/Antivírus',
        highlights: ['SD-WAN seguro com balanceamento de até 3 operadoras', 'Inspeção profunda de pacotes SSL sem perda de velocidade', 'VPN IPsec / SSL criptografada para home office'],
        idealFor: 'Segurança perimetral completa e bloqueio de sites impróprios',
        badge: 'Segurança Máxima',
      },
      {
        title: 'Switch Corporativo Gigabit PoE+ Gerenciável',
        model: 'Aruba Instant On 1930 / Ubiquiti EdgeSwitch / Cisco Catalyst',
        processor: 'Switching fabric de 56 Gbps sem bloqueio',
        ram: 'Buffer de pacote otimizado para VoIP e vídeo',
        storage: 'Configuração salva em nuvem e backup automático',
        screen: 'Gerenciamento Web GUI e CLI SSH',
        os: 'Firmware corporativo com VLANs e QoS prioritário',
        highlights: ['24 ou 48 portas Gigabit com PoE+ (alimenta telefones IP e APs)', '4 portas uplink SFP/SFP+ 10GbE para fibra óptica', 'Isolamento de tráfego de voz, dados e convidados'],
        idealFor: 'Distribuição estável de rede sem gargalos para computadores e telefones',
        badge: 'Alta Estabilidade',
      },
    ],
    telefonia: [
      {
        title: 'Telefones IP Corporativos HD',
        model: 'Yealink T31P / T34W ou Grandstream GRP2600',
        processor: 'Chipset de áudio acústico HD Opus',
        ram: 'Agenda corporativa sincronizada',
        storage: 'Histórico de chamadas e teclas de discagem rápida',
        screen: 'Display gráfico iluminado com identificador de chamadas',
        os: 'Firmware otimizado para Sysmax Cloud PABX',
        highlights: ['Alimentação PoE (sem necessidade de fonte de tomada)', 'Viva-voz full-duplex com cancelamento de eco', 'Porta Ethernet gigabit integrada pass-through para o PC'],
        idealFor: 'Recepcionistas, executivos e estações de trabalho de escritórios',
        badge: 'Plug & Play',
      },
      {
        title: 'Headsets Profissionais com Cancelador de Ruído',
        model: 'Jabra Evolve / Poly Blackwire / Plantronics',
        processor: 'Processamento Digital de Sinal (DSP) avançado',
        ram: 'Microfone boom bidirecional de precisão',
        storage: 'Bolsa de transporte e almofadas acolchoadas em couro sintético',
        screen: 'LED indicador de ocupado (BusyLight) integrado',
        os: 'Compatível com Windows, macOS, Softphone Sysmax e Teams',
        highlights: ['Conexão USB-A/USB-C e Bluetooth para celular simultâneo', 'Eliminação ativa de ruído de fundo para ligações cristalinas', 'Conforto anatômico para jornadas de 8 horas de trabalho'],
        idealFor: 'Centrais de televendas, atendimento ao cliente, suporte e reuniões',
        badge: 'Voz Cristalina',
      },
    ],
  };

  const faqList = [
    {
      q: 'Por que alugar equipamentos de TI (HaaS) é mais vantajoso do que comprar?',
      a: 'A compra exige desembolso pesado de capital de giro (CAPEX), gera depreciação média de 25% a 30% ao ano, custos imprevisíveis com manutenções e o risco de obsolescência rápida. Com a locação Sysmax (HaaS - Hardware as a Service), o custo se torna uma despesa operacional mensal previsível (OPEX), 100% dedutível no IRPJ e CSLL para empresas do Lucro Real, com suporte total, manutenção e substituição rápida (Swap) inclusos.',
    },
    {
      q: 'Como funciona o benefício fiscal da locação de TI no Lucro Real?',
      a: 'Empresas tributadas pelo Lucro Real podem lançar o valor integral das faturas mensais de locação de equipamentos como Despesa Operacional Dedutível. Isso gera uma redução direta na base de cálculo do IRPJ (15% + 10% adicional) e da CSLL (9%), representando uma economia tributária efetiva de até 34%. Além disso, empresas no regime não-cumulativo podem apurar créditos de PIS (1,65%) e COFINS (7,6%).',
    },
    {
      q: 'O que acontece se um equipamento quebrar ou apresentar defeito físico?',
      a: 'Você não precisa abrir chamado na assistência técnica da fabricante nem esperar semanas. A Sysmax possui política contratual de Swap Express: nossa equipe substitui o equipamento avariado por uma máquina equivalente ou superior em até 4 horas (SLA Crítico) ou até 24 horas úteis (SLA Padrão). Nossas máquinas já contam com imagem corporativa pronta para minimizar qualquer tempo de parada.',
    },
    {
      q: 'Os computadores já vêm prontos para uso (com Windows e programas)?',
      a: 'Sim! Todos os nossos equipamentos corporativos acompanham licença original do Windows 11 Pro e passam pelo processo de Image Staging: instalamos os navegadores, suíte de escritório (Office/Google Workspace), antivírus corporativo gerenciado, VPN e programas específicos do seu segmento antes da entrega física.',
    },
    {
      q: 'Qual é o prazo dos contratos de locação de equipamentos?',
      a: 'Trabalhamos com contratos flexíveis de 12, 24 e 36 meses. Contratos de 36 meses oferecem a melhor condição financeira mensal e incluem o ciclo completo de renovação tecnológica ao término da vigência, garantindo que sua equipe trabalhe sempre com equipamentos de última geração.',
    },
    {
      q: 'Como a Sysmax garante a segurança dos dados e conformidade com a LGPD no término do contrato?',
      a: 'Ao final do contrato ou na devolução de qualquer máquina, executamos um processo certificado de Data Sanitization (higienização criptográfica e sobrescrita de dados baseada nas normas DoD 5220.22-M e NIST SP 800-88). Emitimos um Laudo Técnico de Eliminação Segura de Dados para auditoria e conformidade total com a LGPD.',
    },
    {
      q: 'A Sysmax atende empresas fora de Brasília?',
      a: 'Sim! Embora nossa matriz esteja em Brasília - DF, realizamos o envio, configuração e atendimento de frotas corporativas de notebooks e equipamentos de TI para empresas em todo o território nacional através de logística expressa monitorada e suporte técnico remoto centralizado.',
    },
  ];

  return (
    <div className="bg-[#0B132B] text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb / Category Tag & Submenu Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full">
                Locação de Equipamentos · HaaS
              </span>
              <span className="text-xs text-slate-400">/</span>
              <span className="text-xs text-slate-300 font-medium">Equipamentos de TI</span>
            </div>

            {onSwitchToImpressao && (
              <button
                type="button"
                onClick={onSwitchToImpressao}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-teal-500/40 text-teal-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <span>Procurando por <strong>Outsourcing de Impressão</strong>?</span>
                <span className="text-cyan-400">Ver Solução →</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: UVP & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                Locação de Equipamentos de TI:{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  Máxima Produtividade com Zero Desembolso de CAPEX
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Modernize o parque tecnológico da sua empresa com <strong className="text-white">notebooks corporativos, estações de trabalho, servidores e ativos de rede</strong> das melhores marcas mundiais (Dell, Lenovo, HP). Tenha manutenção preventiva, substituição rápida (<strong className="text-cyan-400">Swap em até 4h</strong>) e <strong className="text-emerald-400">100% de dedução fiscal no Lucro Real</strong>.
              </p>

              {/* Trust Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Swap Rápido em até 4h</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl">
                  <Coins className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">100% Abatível no IRPJ</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Windows 11 Pro Original</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl">
                  <RefreshCw className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Renovação a cada 24/36m</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl">
                  <Headphones className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Suporte N1/N2/N3 Incluso</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800/80 px-3 py-2 rounded-xl">
                  <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-200">Entrega Pronta p/ Uso</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('simulador-locacao')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Simular Custo da Minha Frota</span>
                </button>

                <button
                  onClick={() => scrollToSection('contato-locacao')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all cursor-pointer"
                >
                  <span>Falar com Consultor HaaS</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual Graphic */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-cyan-950/40 group">
                <img
                  src={heroRentalImg}
                  alt="Frota de computadores e equipamentos de TI corporativos para locação Sysmax"
                  className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-transparent to-transparent opacity-80" />

                {/* Floating Metric Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3.5 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      Disponibilidade Imediata
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Dell · Lenovo · HP · Fortinet · Yealink
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 block">
                      SLA Garantido
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400">
                      Swap em 4h no Contrato
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM VS SOLUTION: BUYING VS RENTING (CAPEX VS OPEX) */}
      <section className="py-20 border-b border-slate-800 bg-[#070D1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/40">
              Análise Financeira & Estratégica
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
              Por que Comprar Equipamentos de TI Tornou-se um Mau Negócio?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Descubra por que mais de 78% das empresas de médio e grande porte no Brasil migraram para o modelo de Locação de Hardware (HaaS).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* The Trap of Buying (CAPEX) */}
            <div className="bg-rose-950/20 border border-rose-900/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Comprar Hardware Próprio (CAPEX)</h3>
                  <span className="text-xs text-rose-300 font-medium">Descapitalização, obsolescência e custos invisíveis</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span><strong className="text-white">Imobilização pesada de capital:</strong> Drena as reservas financeiras e o capital de giro da empresa que poderiam ser aplicados no core business.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span><strong className="text-white">Depreciação agressiva:</strong> O computador perde entre 25% e 30% do valor de mercado já no primeiro ano de uso.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span><strong className="text-white">Downtime e lentidão na garantia:</strong> Assistências técnicas oficiais demoram de 15 a 45 dias para consertar ou enviar peças sobressalentes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span><strong className="text-white">Custos ocultos de manutenção:</strong> Compras pontuais de baterias, telas quebradas, fontes e upgrades inflacionam as despesas sem planejamento.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span><strong className="text-white">Descarte complexo e riscos de LGPD:</strong> Descartar máquinas velhas exige logística especializada para evitar multas ambientais e vazamento de dados de discos rígidos.</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-rose-900/40 text-xs text-rose-300 font-semibold flex items-center justify-between">
                <span>Resultado Operacional:</span>
                <span className="bg-rose-950 px-2.5 py-1 rounded border border-rose-800">Parque defasado e equipe improdutiva</span>
              </div>
            </div>

            {/* The Smart Choice: Sysmax HaaS (OPEX) */}
            <div className="bg-cyan-950/20 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl shadow-cyan-950/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Locação de TI Sysmax (OPEX / HaaS)</h3>
                  <span className="text-xs text-cyan-300 font-medium">Liquidez, produtividade contínua e economia tributária</span>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <span><strong className="text-white">Preservação integral do fluxo de caixa:</strong> Mensalidade fixa e previsível sem entrada nem endividamento bancário.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <span><strong className="text-white">100% de dedução fiscal (Lucro Real):</strong> Todo o aluguel é lançado como despesa operacional, abatendo até 34% no IRPJ e CSLL.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <span><strong className="text-white">Garantia com Swap Express (4h a 24h):</strong> Quebrou? Nós trocamos o equipamento imediatamente por outro idêntico sem custo de peças ou mão de obra.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <span><strong className="text-white">Upgrade e renovação programada:</strong> Ao final do ciclo (24 ou 36 meses), sua empresa recebe máquinas novas e modernas sem novos investimentos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold shrink-0">✓</span>
                  <span><strong className="text-white">Sanitização de dados e descarte verde:</strong> Emissão de Laudo Técnico de Eliminação Segura de Dados (NIST 800-88) e conformidade LGPD.</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-cyan-500/30 text-xs text-cyan-300 font-semibold flex items-center justify-between">
                <span>Resultado Operacional:</span>
                <span className="bg-cyan-950 px-2.5 py-1 rounded border border-cyan-700 text-cyan-300">Parque 100% atualizado e foco no negócio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HARDWARE FLEET CATALOG WITH TABS */}
      <section id="catalogo-equipamentos" className="py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/40">
              Frota de Equipamentos Corporativos
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
              Equipamentos de Linha Profissional Prontos para Entrega
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Trabalhamos exclusivamente com linhas empresariais concebidas para uso contínuo, com segurança em nível de hardware, portas de comunicação reforçadas e alta durabilidade.
            </p>
          </div>

          {/* Catalog Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            <button
              onClick={() => setActiveCatalogTab('notebooks')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCatalogTab === 'notebooks'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>Notebooks Corporativos</span>
            </button>

            <button
              onClick={() => setActiveCatalogTab('desktops')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCatalogTab === 'desktops'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Desktops & Workstations</span>
            </button>

            <button
              onClick={() => setActiveCatalogTab('servers')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCatalogTab === 'servers'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Servidores Torre & Rack</span>
            </button>

            <button
              onClick={() => setActiveCatalogTab('redes')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCatalogTab === 'redes'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Firewalls UTM & Redes</span>
            </button>

            <button
              onClick={() => setActiveCatalogTab('telefonia')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCatalogTab === 'telefonia'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Telefonia IP & Headsets</span>
            </button>
          </div>

          {/* Catalog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogItems[activeCatalogTab].map((item, index) => (
              <div
                key={index}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 border border-cyan-800/40 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Linha Corporativa</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-4">
                    {item.model}
                  </p>

                  <div className="space-y-2.5 text-xs text-slate-300 border-t border-b border-slate-800/80 py-4 my-4">
                    <div className="flex items-start gap-2">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Processador:</strong> {item.processor}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Memória:</strong> {item.ram}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <HardDrive className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Armazenamento:</strong> {item.storage}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Monitor className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong>Display:</strong> {item.screen}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Sistema:</strong> {item.os}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Diferenciais inclusos:
                    </span>
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-3">
                    <span className="font-semibold text-slate-300">Ideal para:</span> {item.idealFor}
                  </div>
                  <button
                    onClick={() => {
                      scrollToSection('simulador-locacao');
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <span>Configurar no Simulador</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FLEET & TAX SIMULATOR */}
      <section id="simulador-locacao" className="py-20 border-b border-slate-800 bg-[#070D1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/40">
              Simulador HaaS & Dedução Fiscal
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
              Simule a Locação da sua Frota e Compare com a Compra
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Ajuste as quantidades de equipamentos, o tempo de contrato e veja em tempo real o capital preservado e a economia tributária permitida por lei.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Simulator Controls (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <span>1. Defina a Composição da sua Frota</span>
              </h3>

              {/* Slider 1: Notebooks */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label htmlFor="range-notebooks" className="font-semibold text-slate-200 flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-cyan-400" />
                    <span>Notebooks Corporativos (Core i5/i7, 16GB, SSD 512GB)</span>
                  </label>
                  <span className="font-mono font-bold text-cyan-400 text-base">{notebooks} un</span>
                </div>
                <input
                  id="range-notebooks"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={notebooks}
                  onChange={(e) => setNotebooks(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0 un</span>
                  <span>25 un</span>
                  <span>50 un</span>
                  <span>100 un</span>
                </div>
              </div>

              {/* Slider 2: Desktops */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label htmlFor="range-desktops" className="font-semibold text-slate-200 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-cyan-400" />
                    <span>Desktops Corporativos + Monitores 24" FHD IPS</span>
                  </label>
                  <span className="font-mono font-bold text-cyan-400 text-base">{desktops} un</span>
                </div>
                <input
                  id="range-desktops"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={desktops}
                  onChange={(e) => setDesktops(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0 un</span>
                  <span>25 un</span>
                  <span>50 un</span>
                  <span>100 un</span>
                </div>
              </div>

              {/* Slider 3: Servers / Firewalls */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <label htmlFor="range-servers" className="font-semibold text-slate-200 flex items-center gap-2">
                    <Server className="w-4 h-4 text-cyan-400" />
                    <span>Servidores Torre/Rack ou Firewalls UTM Dedicados</span>
                  </label>
                  <span className="font-mono font-bold text-cyan-400 text-base">{servers} un</span>
                </div>
                <input
                  id="range-servers"
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={servers}
                  onChange={(e) => setServers(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0 un</span>
                  <span>5 un</span>
                  <span>10 un</span>
                  <span>20 un</span>
                </div>
              </div>

              {/* Setting 4: Contract Term */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Tempo de Contrato & Ciclo de Renovação Tecnológica:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: 36, label: '36 Meses', sub: 'Melhor Custo / Renovação' },
                    { val: 24, label: '24 Meses', sub: 'Equilíbrio' },
                    { val: 12, label: '12 Meses', sub: 'Curto Prazo' },
                  ].map((t) => (
                    <button
                      key={t.val}
                      onClick={() => setContractMonths(t.val as 12 | 24 | 36)}
                      className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                        contractMonths === t.val
                          ? 'bg-cyan-500/15 border-cyan-400 text-white font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm">{t.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Setting 5: SLA Swap Tier */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Nível de SLA para Substituição de Máquinas (Swap):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setSlaTier('critical')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      slaTier === 'critical'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                      <span>Missão Crítica (Swap em 4h)</span>
                      <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">Recomendado</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Atendimento preferencial emergencial com máquina backup local reservada.
                    </div>
                  </button>

                  <button
                    onClick={() => setSlaTier('standard')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      slaTier === 'standard'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">Swap Padrão (24h úteis)</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Substituição expressa no próximo dia útil sem cobrança adicional.
                    </div>
                  </button>
                </div>
              </div>

              {/* Setting 6: Tax Regime (Lucro Real vs Others) */}
              <div className="pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Regime Tributário da sua Empresa (Dedução Fiscal):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setTaxRegime('lucro_real')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      taxRegime === 'lucro_real'
                        ? 'bg-emerald-500/15 border-emerald-400 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                      <span className="text-emerald-400">Lucro Real</span>
                      <span className="text-[10px] text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">-34% IRPJ/CSLL</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      100% do aluguel abatido na base de cálculo do IRPJ e CSLL como OPEX.
                    </div>
                  </button>

                  <button
                    onClick={() => setTaxRegime('outros')}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      taxRegime === 'outros'
                        ? 'bg-cyan-500/15 border-cyan-400 text-white font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold">Lucro Presumido / Simples</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Preservação do capital de giro, manutenção integral e zero depreciação.
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Simulation Results Card (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-[#0B132B] border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                  Resumo da Simulação
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {quoteResult.totalDevices} equipamentos
                </span>
              </div>

              <h4 className="text-xl font-extrabold text-white mb-1">
                {quoteResult.planName}
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                Contrato de {quoteResult.contractMonths} meses · {quoteResult.slaText}
              </p>

              {/* Monthly Quote Display */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 mb-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Mensalidade da Frota (OPEX):</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      R$ {quoteResult.monthlyRental.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-slate-400">/mês</span>
                  </div>
                  {quoteResult.taxRegime === 'lucro_real' && (
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block">
                        Custo Efetivo Após Abatimento:
                      </span>
                      <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
                        R$ {quoteResult.effectiveMonthlyCost.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[10px] text-slate-400 block">economiza R$ {quoteResult.estimatedTaxCreditMonthly.toLocaleString('pt-BR')}/mês</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison Metrics */}
              <div className="space-y-3 mb-6 text-xs">
                <div className="flex items-center justify-between bg-slate-800/40 px-3 py-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300">Capital Preservado (CAPEX não gasto):</span>
                  <span className="font-mono font-bold text-cyan-400 text-sm">
                    R$ {quoteResult.capitalPreservedImmediately.toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-800/40 px-3 py-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-300">Economia Anual c/ Manutenção e Peças:</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">
                    R$ {quoteResult.estimatedMaintenanceSavedPerYear.toLocaleString('pt-BR')}/ano
                  </span>
                </div>

                {quoteResult.taxRegime === 'lucro_real' && (
                  <div className="flex items-center justify-between bg-emerald-950/30 px-3 py-2.5 rounded-lg border border-emerald-800/40">
                    <span className="text-emerald-300 font-medium">Economia Fiscal Total (IRPJ/CSLL):</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">
                      R$ {quoteResult.estimatedTaxCreditTotal.toLocaleString('pt-BR')}
                    </span>
                  </div>
                )}
              </div>

              {/* Included Checklist */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Benefícios Contratuais Inclusos:
                </span>
                {quoteResult.includedBenefits.slice(0, 5).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA to Apply Simulation to Form */}
              <button
                onClick={handleApplyQuoteToForm}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <span>Solicitar Proposta para Esta Frota</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STEP-BY-STEP LIFECYCLE MANAGEMENT (360° PROCESS) */}
      <section className="py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/40">
              Ciclo de Vida 360°
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
              Como Funciona a Jornada de Locação com a Sysmax
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
              Do diagnóstico à entrega personalizada e descarte ecológico seguro, cuidamos de toda a complexidade para sua equipe produzir sem interrupções.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Diagnóstico & Sizing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mapeamos os perfis de usuários (administrativo, executivo, engenharia, etc.) e dimensionamos a configuração exata de hardware necessária.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">Imagem & Customização</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Criamos a Golden Image da sua empresa: Windows 11 Pro, antivírus, softwares corporativos, VPN e inventário patrimonial pré-instalados.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Entrega & Suporte Contínuo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Logística expressa segura. Suporte técnico N1, N2 e N3 com monitoramento preventivo e política de Swap garantida em contrato.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">Upgrade & Laudo LGPD</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Renovação programada do parque por máquinas novas a cada 24/36 meses, com higienização de dados certificada e descarte verde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON MATRIX: COMPRA VS LOCAÇÃO */}
      <section className="py-20 border-b border-slate-800 bg-[#070D1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/40">
              Quadro Comparativo
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
              Comparativo Direto: Compra Tradicional vs. Locação Sysmax
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6 font-bold text-white">Critério Estratégico</th>
                  <th className="py-4 px-6 font-bold text-rose-400">Compra de Equipamentos (CAPEX)</th>
                  <th className="py-4 px-6 font-bold text-cyan-400 bg-cyan-950/30">Locação de TI Sysmax (HaaS / OPEX)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/40">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Investimento Inicial</td>
                  <td className="py-4 px-6 text-slate-400">Alto desembolso imediato à vista ou financiamento bancário com juros.</td>
                  <td className="py-4 px-6 text-slate-200 font-semibold bg-cyan-950/20">Zero investimento inicial. Apenas a mensalidade regular da fatura.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Benefício Fiscal IRPJ / CSLL</td>
                  <td className="py-4 px-6 text-slate-400">Depreciação contábil lenta e limitada (cerca de 20% ao ano ao longo de 5 anos).</td>
                  <td className="py-4 px-6 text-slate-200 font-semibold bg-cyan-950/20">100% abatível no Lucro Real como despesa operacional mensal (OPEX).</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Manutenção & Troca de Peças</td>
                  <td className="py-4 px-6 text-slate-400">Custo extra de peças, baterias, telas e visitas técnicas sem previsibilidade.</td>
                  <td className="py-4 px-6 text-slate-200 font-semibold bg-cyan-950/20">Inclusa sem nenhum custo adicional durante todo o período do contrato.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Equipamento com Defeito (Downtime)</td>
                  <td className="py-4 px-6 text-slate-400">Colaborador parado por 15 a 40 dias aguardando laudo de fabricante.</td>
                  <td className="py-4 px-6 text-slate-200 font-semibold bg-cyan-950/20">Swap garantido em até 4h ou 24h úteis por equipamento backup configurado.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Obsolescência Tecnológica</td>
                  <td className="py-4 px-6 text-slate-400">Após 24 meses as máquinas ficam lentas e travando, gerando perdas na produção.</td>
                  <td className="py-4 px-6 text-slate-200 font-semibold bg-cyan-950/20">Renovação programada a cada 24 ou 36 meses com equipamentos de última geração.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Preparação de Software e Imagem</td>
                  <td className="py-4 px-6 text-slate-400">A equipe interna de TI precisa formatar e instalar cada computador manualmente.</td>
                  <td className="py-4 px-6 text-slate-200 font-semibold bg-cyan-950/20">Entregues 100% prontos com imagem corporativa, antivírus e softwares pré-instalados.</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">Descarte Seguro & LGPD</td>
                  <td className="py-4 px-6 text-slate-400">Risco de vazamento de dados confidenciais e custos de reciclagem ambiental.</td>
                  <td className="py-4 px-6 text-slate-200 font-semibold bg-cyan-950/20">Sanitização certificada de discos com Laudo Técnico de Eliminação Segura.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/40">
              Dúvidas Comuns
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Perguntas Frequentes sobre Locação de Equipamentos
            </h2>
          </div>

          <div className="space-y-4">
            {faqList.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 transition-transform duration-200 shrink-0 ml-4 ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONVERSION & PROPOSAL FORM */}
      <section id="contato-locacao" className="py-20 bg-[#070D1E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/40">
              Atendimento Especializado
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
              Solicite uma Proposta Sob Medida para sua Frota
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Nossos especialistas em HaaS calcularão o dimensionamento exato e a proposta comercial com as melhores condições do mercado.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {submittedProtocol ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Solicitação Enviada com Sucesso!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                  Recebemos seu pedido de cotação para locação de equipamentos da empresa <strong className="text-white">{formData.company}</strong>.
                </p>
                <div className="inline-block bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 mb-8 font-mono text-xs text-slate-300">
                  Número de Protocolo: <span className="text-cyan-400 font-bold">{submittedProtocol}</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Falar Agora no WhatsApp</span>
                  </a>
                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Nova Cotação</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Nome do Responsável *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Roberto Oliveira"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      className={`w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        formErrors.name ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                    {formErrors.name && <p className="text-[11px] text-rose-400 mt-1">{formErrors.name}</p>}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Nome da Empresa / CNPJ *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Nexus Engenharia Ltda"
                      value={formData.company}
                      onChange={(e) => handleFormChange('company', e.target.value)}
                      className={`w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        formErrors.company ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                    {formErrors.company && <p className="text-[11px] text-rose-400 mt-1">{formErrors.company}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Telefone / WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(61) 98765-4321"
                      value={formData.phone}
                      onChange={(e) => handleFormChange('phone', e.target.value)}
                      className={`w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        formErrors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[11px] text-rose-400 mt-1">{formErrors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      E-mail Corporativo *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ti@empresa.com.br"
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      className={`w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        formErrors.email ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                    {formErrors.email && <p className="text-[11px] text-rose-400 mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service interest */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Serviço Selecionado
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={formData.service}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950/80 border border-slate-800 rounded-xl text-cyan-400 font-semibold focus:outline-none"
                    />
                  </div>

                  {/* Estimated machines */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Total de Máquinas Estimadas
                    </label>
                    <select
                      value={formData.extensions}
                      onChange={(e) => handleFormChange('extensions', parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="5">1 a 5 equipamentos</option>
                      <option value="15">6 a 15 equipamentos</option>
                      <option value="30">16 a 30 equipamentos</option>
                      <option value="50">31 a 50 equipamentos</option>
                      <option value="100">Mais de 50 equipamentos (Grande Porte)</option>
                    </select>
                  </div>
                </div>

                {/* Additional message / fleet details */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Detalhes da sua Necessidade (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Especifique se precisa de programas pré-instalados, monitores adicionais, prazos ou detalhes da operação..."
                    value={formData.message}
                    onChange={(e) => handleFormChange('message', e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Registrando proposta...</span>
                  ) : (
                    <>
                      <span>Receber Cotação Formalizada por E-mail & WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
