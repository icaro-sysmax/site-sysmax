import React, { useState } from 'react';
import {
  Printer,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Send,
  RefreshCw,
  Phone,
  MessageSquare,
  Lock,
  Layers,
  Sliders,
  DollarSign,
  Cpu,
  BarChart3,
  Building2,
  Clock,
  Zap,
  MapPin,
  Laptop,
} from 'lucide-react';
import {
  calculatePrintOutsourcingQuote,
  PrintOutsourcingQuoteResult,
  formatPhoneBR,
  validateLeadForm,
  generateProtocolNumber,
} from '../utils/calculator';

interface PrintOutsourcingViewProps {
  onSwitchToTelefonia: () => void;
  onSwitchToTI: () => void;
  onSwitchToEquipmentRental: () => void;
}

export function PrintOutsourcingView({
  onSwitchToTelefonia,
  onSwitchToTI,
  onSwitchToEquipmentRental,
}: PrintOutsourcingViewProps) {
  // Simulator State
  const [monoPages, setMonoPages] = useState<number>(6000);
  const [colorPages, setColorPages] = useState<number>(800);
  const [printersCount, setPrintersCount] = useState<number>(2);
  const [printerType, setPrinterType] = useState<
    'mono_compact' | 'mono_departamental' | 'color_multifunction' | 'thermal_barcode'
  >('color_multifunction');
  const [contractMonths, setContractMonths] = useState<12 | 24 | 36>(36);
  const [taxRegime, setTaxRegime] = useState<'lucro_real' | 'outros'>('lucro_real');

  // Calculation Result
  const quoteResult: PrintOutsourcingQuoteResult = calculatePrintOutsourcingQuote({
    monoPagesMonthly: monoPages,
    colorPagesMonthly: colorPages,
    printersCount,
    printerType,
    contractMonths,
    taxRegime,
  });

  // Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    regionDF: 'Brasília (Plano Piloto)',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const dfRegions = [
    'Brasília (Plano Piloto - Asa Sul / Asa Norte)',
    'Taguatinga',
    'Águas Claras',
    'Guará I e II',
    'SIA / SAAN / SOF',
    'Ceilândia',
    'Samambaia',
    'Lago Sul / Lago Norte',
    'Sobradinho',
    'Sudoeste / Octogonal / Cruzeiro',
    'Outra Região do DF / Entorno',
  ];

  const printerCatalog = [
    {
      id: 'mono_compact',
      name: 'Multifuncional Laser Monocromática A4',
      badge: 'Escritórios & PMEs',
      speed: '36 a 42 páginas por minuto',
      dutyCycle: 'Até 15.000 págs/mês',
      features: [
        'Impressão, Cópia e Scanner em Rede Gigabit e Wi-Fi',
        'Frente e verso automático (Duplex) nativo',
        'Resolução nítida de 1200 x 1200 dpi',
        'Bandeja para 250 folhas + alimentação manual',
        'Alimentador automático de documentos (ADF 50 folhas)',
      ],
      idealFor: 'Escritórios de advocacia, consultórios, recepções e setores administrativos.',
    },
    {
      id: 'color_multifunction',
      name: 'Multifuncional Laser Colorida A4/A3 Pro',
      badge: 'Mais Solicitada',
      speed: '30 a 35 páginas/min (Mono e Color)',
      dutyCycle: 'Até 30.000 págs/mês',
      features: [
        'Painel touchscreen colorido de 7" intuitivo',
        'Digitalização direta para pasta de rede, e-mail e nuvem',
        'Leitor de crachá RFID e liberação por PIN de usuário',
        'Duplex completo na impressão e digitalização em 1 passada',
        'Alta fidelidade de cores para propostas e relatórios',
      ],
      idealFor: 'Departamentos de marketing, contabilidade, diretorias e empresas com alta demanda visual.',
    },
    {
      id: 'mono_departamental',
      name: 'Multifuncional Departamental de Alta Produção',
      badge: 'Alto Volume',
      speed: '45 a 55 páginas por minuto',
      dutyCycle: 'Até 60.000 págs/mês',
      features: [
        'Bandejas duplas com capacidade para mais de 1.100 folhas',
        'Acabamento com grampeador automático opcional',
        'Mecanismo reforçado para suportar picos de fechamento',
        'Software de bilhetagem corporativo pré-instalado',
        'Tempo de primeira página inferior a 6 segundos',
      ],
      idealFor: 'Grandes corporações, cartórios, faculdades e birôs de atendimento ao público.',
    },
    {
      id: 'thermal_barcode',
      name: 'Impressora Térmica de Etiquetas & Código de Barras',
      badge: 'Logística & Saúde',
      speed: 'Até 152 mm/segundo',
      dutyCycle: 'Produção contínua industrial',
      features: [
        'Impressão térmica direta e termotransferência por ribbon',
        'Resolução de 203 ou 300 dpi para códigos 1D e QR Codes',
        'Compatibilidade com protocolos ZPL, EPL e DPL',
        'Carcaça resistente a poeira e ambientes industriais',
        'Conexões USB, Serial e Ethernet para ERPs',
      ],
      idealFor: 'Centros de distribuição no SIA/DF, clínicas, farmácias, e-commerce e hospitais.',
    },
  ];

  const printFaqs = [
    {
      q: 'Os toners e suprimentos estão 100% inclusos na mensalidade?',
      a: 'Sim! Nosso contrato de outsourcing de impressão cobre 100% dos toners, cartuchos, cilindros (fotocondutores) e peças de reposição. Através do nosso software de monitoramento remoto inteligente, nossa equipe identifica quando o toner atinge 15% e despacha a reposição antecipadamente no seu endereço em Brasília/DF, sem que você precise abrir chamado ou interromper seus trabalhos.',
    },
    {
      q: 'O que acontece se uma impressora apresentar defeito no DF?',
      a: 'Nossa equipe técnica atende presencialmente em Brasília, Taguatinga, Águas Claras, SIA e em todo o DF com SLA rigoroso contratual. Se o defeito não for sanado no local com troca de peças em poucas horas, ativamos o Swap de equipamento imediato: substituímos a máquina por outra do mesmo padrão do nosso parque reserva para sua empresa não parar.',
    },
    {
      q: 'Como funciona o software de bilhetagem e cotas por usuário?',
      a: 'O software de bilhetagem permite gerenciar e auditar cada página impressa na empresa. Você pode atribuir cotas mensais por departamento ou colaborador, acompanhar centros de custo e habilitar o recurso Follow-Me (Impressão Segura): o colaborador envia o documento do computador e ele só imprime na multifuncional quando o usuário digita sua senha PIN ou aproxima seu crachá RFID, evitando folhas esquecidas na bandeja e garantindo conformidade com a LGPD.',
    },
    {
      q: 'O papel sulfite está incluso no contrato?',
      a: 'No formato padrão de outsourcing corporativo, o papel sulfite é fornecido pela própria contratante para maior flexibilidade de gramatura e marcas. No entanto, a Sysmax também oferece o modelo "All-in-One com Papel Incluso" sob consulta para clientes que preferem centralizar 100% dos insumos em uma única fatura.',
    },
    {
      q: 'Qual é a vantagem fiscal do Outsourcing de Impressão no Lucro Real?',
      a: 'Ao invés de imobilizar capital na compra de impressoras (CAPEX), a locação de equipamentos e o outsourcing são classificados contabilmente como despesa operacional direta (OPEX). Empresas optantes pelo regime de Lucro Real podem abater 100% da mensalidade da base de cálculo do IRPJ e da CSLL (gerando até 34% de redução fiscal líquida), além de creditar PIS e COFINS.',
    },
    {
      q: 'Qual é o prazo mínimo de contrato e posso fazer upgrade da frota?',
      a: 'Trabalhamos com contratos de 12, 24 e 36 meses. Se a sua empresa crescer, abrir novas filiais ou demandar impressoras coloridas adicionais, o contrato é 100% flexível e você pode adicionar novos equipamentos ou realizar upgrades a qualquer momento sem burocracia.',
    },
  ];

  const handleApplyToForm = () => {
    const notes = `Simulação de Impressão: ${monoPages.toLocaleString('pt-BR')} págs mono/mês, ${colorPages.toLocaleString('pt-BR')} págs coloridas/mês, ${printersCount} equipamento(s) do tipo ${quoteResult.recommendedHardware}, contrato de ${contractMonths} meses no regime ${taxRegime === 'lucro_real' ? 'Lucro Real' : 'Simples/Presumido'}. Estimativa: R$ ${quoteResult.monthlyRental}/mês.`;
    setFormData((prev) => ({
      ...prev,
      notes,
    }));
    const el = document.getElementById('contato-impressao');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm({
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      email: formData.email,
      service: `Outsourcing de Impressão (${quoteResult.recommendedHardware})`,
    });

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const proto = generateProtocolNumber();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedProtocol(proto);

      // Construct WhatsApp message
      const text = encodeURIComponent(
        `Olá Sysmax! Me chamo ${formData.name} da empresa ${formData.company} (${formData.regionDF}). ` +
          `Gostaria de uma proposta de Outsourcing de Impressão.\n\n` +
          `Protocolo: ${proto}\n` +
          `Hardware: ${quoteResult.recommendedHardware}\n` +
          `Volume estimado: ${monoPages.toLocaleString('pt-BR')} mono + ${colorPages.toLocaleString('pt-BR')} color/mês\n` +
          `Qtd de impressoras: ${printersCount}\n` +
          `Contrato: ${contractMonths} meses\n` +
          `Telefone: ${formData.phone}\n` +
          `E-mail: ${formData.email}`
      );

      // Open WhatsApp in new tab
      window.open(`https://wa.me/556140428042?text=${text}`, '_blank');
    }, 600);
  };

  return (
    <div className="pt-24 pb-20 overflow-hidden">
      {/* Breadcrumb & Navigation Sub-Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToTelefonia}
              className="hover:text-cyan-400 transition-colors"
            >
              Início
            </button>
            <span>/</span>
            <button
              onClick={onSwitchToEquipmentRental}
              className="hover:text-cyan-400 transition-colors"
            >
              Locação de Equipamentos
            </button>
            <span>/</span>
            <span className="text-cyan-400 font-semibold">
              Outsourcing de Impressão & Multifuncionais
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onSwitchToEquipmentRental}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-400" />
              <span>Locação de Notebooks & Servidores</span>
            </button>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800/40 text-cyan-300 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Brasília & DF</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Outsourcing de Impressão Corporativa em Brasília e DF</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Gestão Inteligente de Impressão:{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Toners Inclusos, Zero Máquina Parada
            </span>{' '}
            e até 40% de Economia
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
            Elimine compras emergenciais de toner e custos imprevistos de manutenção.
            Fornecemos multifuncionais laser de última geração, suprimentos com reposição
            proativa, software de bilhetagem com cotas por crachá e atendimento técnico presencial no DF com máquina de backup (Swap).
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#simulador-impressao"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-950/40 transition-all duration-200"
            >
              <Sliders className="w-4 h-4" />
              <span>Simular Economia Mensal</span>
            </a>

            <a
              href="https://wa.me/556140428042?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20de%20Outsourcing%20de%20Impress%C3%A3o%20em%20Bras%C3%ADlia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Falar no WhatsApp (61) 4042-8042</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 text-left">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Toners e peças inclusos sem surpresas</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">-40%</div>
              <div className="text-xs text-slate-400 mt-1">Redução média do desperdício de papel</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-white">Swap DF</div>
              <div className="text-xs text-slate-400 mt-1">Máquina reserva no local em caso de falha</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-teal-300">OPEX 100%</div>
              <div className="text-xs text-slate-400 mt-1">Dedução no IRPJ/CSLL (Lucro Real)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Compra Própria vs Outsourcing Sysmax */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Por que comprar impressoras é um erro para sua empresa?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Compare o modelo tradicional de compra de ativos com o modelo moderno de Outsourcing de Impressão gerenciado pela Sysmax.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card: Compra Tradicional */}
          <div className="p-6 sm:p-8 rounded-2xl bg-red-950/20 border border-red-900/40 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Compra Tradicional de Impressoras</h3>
                <span className="text-xs text-red-400 font-semibold uppercase">Alto Risco e Custos Ocultos</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Desembolso imediato de caixa (CAPEX):</strong> milhares de reais imobilizados em máquinas que depreciam em 3 anos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Toners caros e compras de emergência:</strong> risco frequente de cartuchos falsificados e funcionários sem imprimir.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Manutenção demorada:</strong> impressora parada aguardando orçamento de assistência e semanas sem solução.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Zero controle de consumo:</strong> desperdício com impressões pessoais e falta de rastreio de custos por departamento.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span><strong>Vulnerabilidade de dados (LGPD):</strong> documentos confidenciais esquecidos nas bandejas de saída abertas.</span>
              </li>
            </ul>
          </div>

          {/* Card: Outsourcing Sysmax */}
          <div className="p-6 sm:p-8 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 relative shadow-xl shadow-cyan-950/30">
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
              Solução Sysmax
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Outsourcing de Impressão Sysmax</h3>
                <span className="text-xs text-cyan-400 font-semibold uppercase">Previsibilidade, Gestão & SLA</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Investimento inicial zero (OPEX):</strong> preserve seu capital de giro para o core business e deduza 100% no IRPJ.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Reposição automatizada de toners:</strong> software monitora níveis em tempo real e entrega suprimentos antes de acabar.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Manutenção total com Swap garantido:</strong> técnicos no DF e máquina reserva se houver necessidade de reparo em bancada.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Software de bilhetagem integrado:</strong> cotas de impressão por usuário e relatórios detalhados por centro de custo.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Impressão segura (PIN / Crachá):</strong> liberação controlada na máquina, garantindo privacidade e conformidade com a LGPD.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Equipment Fleet Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-semibold mb-3">
            <Printer className="w-3.5 h-3.5" />
            <span>Frota Corporativa Homologada</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Impressoras e Multifuncionais de Alta Performance
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Trabalhamos com marcas globais de referência (Brother, HP, Ricoh, Konica Minolta e Zebra) dimensionadas para cada necessidade do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {printerCatalog.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl bg-slate-900/80 border transition-all duration-200 flex flex-col justify-between ${
                printerType === item.id
                  ? 'border-cyan-500 shadow-lg shadow-cyan-950/40 bg-slate-900'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-950 border border-cyan-800/60 text-cyan-300">
                    {item.badge}
                  </span>
                  <Printer className="w-5 h-5 text-cyan-400" />
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.name}
                </h3>

                <div className="space-y-1.5 py-3 border-y border-slate-800 text-xs text-slate-300 mb-4">
                  <div>
                    <span className="text-slate-400">Velocidade:</span> <strong className="text-cyan-300">{item.speed}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Ciclo recomendado:</span> <span>{item.dutyCycle}</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-400 mb-6">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 mb-4 italic">
                  <strong>Ideal para:</strong> {item.idealFor}
                </p>

                <button
                  onClick={() => {
                    setPrinterType(item.id as any);
                    const sim = document.getElementById('simulador-impressao');
                    if (sim) sim.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    printerType === item.id
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span>{printerType === item.id ? 'Selecionado no Simulador' : 'Simular com este Modelo'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars of Management: Bilhetagem, Suprimentos, SLA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B1736] to-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Pilares da Gestão Sysmax
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Mais do que impressoras: governança, segurança e controle total
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Nossa solução combina hardware robusto com software avançado de bilhetagem e logística expressa para Brasília.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Monitoramento Remoto de Suprimentos
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nosso software avisa nossa central quando o nível de toner atinge o ponto de reabastecimento. O novo cartucho chega à sua empresa antes de o atual acabar.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Bilhetagem & Impressão Segura (LGPD)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Controle de cotas mensais por usuário ou centro de custo. Liberação por crachá RFID ou PIN privativo evita documentos confidenciais expostos e reduz impressões desnecessárias em até 40%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Assistência Técnica Presencial & Swap
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Equipe técnica local dedicada com rápido deslocamento em Brasília e no DF. Se um equipamento demandar oficina especializada, ativamos equipamento reserva imediato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section id="simulador-impressao" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold mb-3 border border-cyan-800/40">
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulador Interativo de Custos & Economia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Descubra quanto sua empresa economiza todo mês
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Ajuste seu volume estimado de páginas e quantidade de impressoras para ver a comparação entre compra tradicional e o Outsourcing Sysmax.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white">
                  Volume de Páginas Preto & Branco (Mono) / mês:
                </label>
                <span className="text-base font-bold text-cyan-400 tabular-nums">
                  {monoPages.toLocaleString('pt-BR')} págs
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={monoPages}
                onChange={(e) => setMonoPages(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>500 págs</span>
                <span>25.000 págs</span>
                <span>50.000 págs</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white">
                  Volume de Páginas Coloridas / mês:
                </label>
                <span className="text-base font-bold text-teal-300 tabular-nums">
                  {colorPages.toLocaleString('pt-BR')} págs
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="15000"
                step="100"
                value={colorPages}
                onChange={(e) => setColorPages(Number(e.target.value))}
                className="w-full accent-teal-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0 (Apenas Mono)</span>
                <span>5.000 págs</span>
                <span>15.000 págs</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Quantidade de Equipamentos:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 4, 8].map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setPrintersCount(qty)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                        printersCount === qty
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {qty} {qty === 1 ? 'Máq' : 'Máqs'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Prazo de Contrato:
                </label>
                <div className="flex items-center gap-2">
                  {[12, 24, 36].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setContractMonths(m as any)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                        contractMonths === m
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {m} meses
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tipo de Equipamento Principal:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'mono_compact', label: 'Laser Mono A4 (36 ppm)' },
                  { id: 'color_multifunction', label: 'Laser Colorida A4/A3' },
                  { id: 'mono_departamental', label: 'Departamental (50 ppm)' },
                  { id: 'thermal_barcode', label: 'Térmica Etiquetas (Zebra)' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPrinterType(type.id as any)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium text-left truncate transition-colors ${
                      printerType === type.id
                        ? 'bg-cyan-950 border border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-transparent'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Regime Tributário da Empresa:
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTaxRegime('lucro_real')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                    taxRegime === 'lucro_real'
                      ? 'bg-emerald-950/80 border border-emerald-500/80 text-emerald-300 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Lucro Real (34% Dedução Fiscal)
                </button>
                <button
                  type="button"
                  onClick={() => setTaxRegime('outros')}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                    taxRegime === 'outros'
                      ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Simples Nacional / Presumido
                </button>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-[#081024] border border-cyan-500/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  Estimativa Mensal
                </span>
                <h3 className="text-lg font-bold text-white">Outsourcing Sysmax</h3>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-bold">
                {quoteResult.savingsPercentage}% Economia
              </div>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-slate-300">Mensalidade Total:</span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                    R$ {quoteResult.monthlyRental.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-xs text-slate-400">/mês</span>
                </div>
              </div>

              {taxRegime === 'lucro_real' && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 space-y-1">
                  <div className="flex justify-between text-xs text-emerald-300 font-semibold">
                    <span>Dedução Fiscal Lucro Real (34%):</span>
                    <span>- R$ {quoteResult.taxCreditMonthly.toLocaleString('pt-BR')}/mês</span>
                  </div>
                  <div className="flex justify-between text-xs text-white font-bold pt-1 border-t border-emerald-800/30">
                    <span>Custo Efetivo Líquido:</span>
                    <span>R$ {quoteResult.effectiveMonthlyCost.toLocaleString('pt-BR')}/mês</span>
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Custo se comprasse máquinas e toners:</span>
                  <span className="text-slate-300 line-through">
                    R$ {quoteResult.traditionalCostMonthly.toLocaleString('pt-BR')}/mês
                  </span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Economia Mensal Estimada:</span>
                  <span>R$ {quoteResult.monthlySavings.toLocaleString('pt-BR')}/mês</span>
                </div>
                <div className="flex justify-between text-teal-300 font-bold">
                  <span>Economia Anual Projetada:</span>
                  <span>R$ {quoteResult.annualSavings.toLocaleString('pt-BR')}/ano</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-1.5 pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Aprox. <strong>{quoteResult.tonersEstimatedPerYear} toners/ano</strong> 100% inclusos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Software de bilhetagem com cotas por usuário incluso</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Manutenção preventiva e corretiva presencial em Brasília/DF</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleApplyToForm}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Solicitar Proposta Formal com Esta Simulação</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/556140428042?text=${encodeURIComponent(
                  `Olá Sysmax! Fiz uma simulação de Outsourcing de Impressão:\n` +
                    `- ${quoteResult.recommendedHardware}\n` +
                    `- ${monoPages} págs mono + ${colorPages} págs color/mês\n` +
                    `- ${printersCount} máquinas (${contractMonths} meses)\n` +
                    `Gostaria de formalizar esta proposta!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-750 transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enviar Simulação Direto para o WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Segments in DF Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Soluções Customizadas para cada Segmento no DF
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Entendemos a particularidade de cada operação em Brasília para dimensionar a frota correta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Escritórios de Advocacia & Consultorias
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Impressão de petições volumosas com velocidade extrema, digitalização veloz em lote para processos eletrônicos (PJe) e bilhetagem por número de processo/cliente.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Clínicas Médicas & Hospitais
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Laudos com alta resolução gráfica, impressoras térmicas para pulseiras de identificação e etiquetas de exames laboratoriais com total confiabilidade e higiene.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Logística, Distribuição & E-commerce (SIA/DF)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Emissão veloz de DANFEs, etiquetas de despacho padrão Correios/Mercado Livre e equipamentos resistentes para ambientes de armazém com suprimentos garantidos.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Areas in DF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800/40 text-cyan-300 text-xs font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Atendimento Técnico Presencial no DF</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Técnicos próprios com base em Brasília e pronta resposta
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Atendemos todas as regiões administrativas do Distrito Federal com veículos próprios e estoque local de toners e peças: Asa Sul, Asa Norte, Taguatinga, Águas Claras, Guará, SIA, SAAN, Ceilândia, Samambaia, Sobradinho, Lago Sul e Lago Norte.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:6140428042"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>(61) 4042-8042</span>
            </a>

            <a
              href="https://wa.me/556140428042"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-950/40"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Agendar Visita Técnica</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tire suas dúvidas sobre Outsourcing de Impressão
          </h2>
        </div>

        <div className="space-y-3">
          {printFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white hover:text-cyan-300 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact & Quote Form Section */}
      <section id="contato-impressao" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Cotação Expressa em Brasília
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Receba sua proposta personalizada de Outsourcing
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Nossa equipe técnica analisa a sua demanda e envia a proposta detalhada com equipamentos e valores em até 2 horas comerciais.
            </p>
          </div>

          {submittedProtocol ? (
            <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Solicitação Recebida com Sucesso!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Seu número de protocolo é <strong className="text-cyan-400">{submittedProtocol}</strong>. Nossa equipe técnica entrará em contato pelo telefone/WhatsApp informado.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/556140428042?text=${encodeURIComponent(
                    `Olá Sysmax! Acabei de solicitar uma proposta de Outsourcing de Impressão sob o protocolo ${submittedProtocol}. Poderiam dar andamento?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Acompanhar no WhatsApp Agora</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                  {formErrors.name && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Oliveira Advogados"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                  {formErrors.company && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.company}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telefone / WhatsApp corporativo *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(61) 98765-4321"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: formatPhoneBR(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                  {formErrors.phone && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.phone}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contato@suaempresa.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                  {formErrors.email && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.email}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cidade / Região no DF *
                </label>
                <select
                  value={formData.regionDF}
                  onChange={(e) => setFormData({ ...formData, regionDF: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  {dfRegions.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Observações ou Detalhes da sua Demanda (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Precisamos de 2 multifuncionais para o setor financeiro e 1 para recepção com impressão frente e verso."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Gerando Proposta...' : 'Solicitar Orçamento Gratuito'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Seus dados são protegidos e tratados exclusivamente conforme a LGPD.</span>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
