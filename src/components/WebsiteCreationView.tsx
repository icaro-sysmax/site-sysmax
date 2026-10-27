import React, { useState } from 'react';
import {
  Globe,
  Layout,
  ShoppingCart,
  Search,
  Zap,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Send,
  Phone,
  MessageSquare,
  Lock,
  Sliders,
  DollarSign,
  Cpu,
  BarChart3,
  Building2,
  Clock,
  Laptop,
  Smartphone,
  Layers,
  Code2,
  Rocket,
  Check,
} from 'lucide-react';
import {
  calculateWebsiteQuote,
  WebsiteQuoteResult,
  formatPhoneBR,
  validateLeadForm,
  generateProtocolNumber,
} from '../utils/calculator';

interface WebsiteCreationViewProps {
  onSwitchToTelefonia: () => void;
  onSwitchToTI: () => void;
  onSwitchToLocacao: () => void;
}

export function WebsiteCreationView({
  onSwitchToTelefonia,
  onSwitchToTI,
  onSwitchToLocacao,
}: WebsiteCreationViewProps) {
  // Simulator State
  const [projectType, setProjectType] = useState<
    'landing_page' | 'institutional' | 'ecommerce' | 'portal_custom'
  >('institutional');

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'seo_advanced',
    'whatsapp_crm',
  ]);

  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  // Calculation Result
  const quoteResult: WebsiteQuoteResult = calculateWebsiteQuote({
    projectType,
    features: selectedFeatures,
    urgency,
  });

  // Lead Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectTypeInput: 'Site Institucional Corporativo Pro',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const availableFeatures = [
    {
      id: 'seo_advanced',
      name: 'Otimização Avançada SEO Google',
      desc: 'Pesquisa de palavras-chave, marcação Schema.org e indexação no Google Search Console.',
      price: 'R$ 390',
    },
    {
      id: 'whatsapp_crm',
      name: 'Integração de WhatsApp & CRM de Vendas',
      desc: 'Botão flutuante inteligente com direcionamento por departamento e rastreamento de cliques.',
      price: 'R$ 250',
    },
    {
      id: 'blog',
      name: 'Blog de Conteúdo & Artigos Institucionais',
      desc: 'Módulo de blog estruturado para marketing de conteúdo e atração orgânica de visitantes.',
      price: 'R$ 350',
    },
    {
      id: 'copywriting',
      name: 'Redação Publicitária & Copy Persuasiva',
      desc: 'Criação profissional de textos orientados a vendas e gatilhos mentais para conversão.',
      price: 'R$ 450',
    },
    {
      id: 'corporate_emails',
      name: 'E-mails Corporativos (@suaempresa.com.br)',
      desc: 'Configuração de contas profissionais com proteção anti-spam e sincronização em celulares.',
      price: 'R$ 190',
    },
    {
      id: 'multilingual',
      name: 'Suporte Multi-idioma (Inglês / Espanhol)',
      desc: 'Estrutura técnica com seletor de bandeiras para atender clientes internacionais.',
      price: 'R$ 590',
    },
  ];

  const projectPlans = [
    {
      id: 'landing_page',
      title: 'Landing Page de Alta Conversão',
      badge: 'Campanhas & Leads',
      tagline: 'Uma página única e persuasiva projetada para transformar tráfego pago em oportunidades de negócio.',
      startingPrice: 'A partir de R$ 1.290',
      timeframe: '5 a 7 dias úteis',
      highlights: [
        'Estrutura One-Page com rolagem fluida e seções persuasivas',
        'Foco total em captação de leads via WhatsApp e formulário',
        'Integração com Meta Pixel e Google Ads Conversion Tags',
        'Velocidade ultrarrápida (PageSpeed 95+)',
        'Copywriting e chamadas para ação (CTAs) estratégicas',
      ],
      idealFor: 'Lançamentos, infoprodutos, prestadores de serviço e campanhas de tráfego pago.',
    },
    {
      id: 'institutional',
      title: 'Site Institucional Corporativo',
      badge: 'Mais Escolhido',
      tagline: 'A presença digital completa e profissional para consolidar a autoridade da sua marca no mercado.',
      startingPrice: 'A partir de R$ 1.890',
      timeframe: '10 a 14 dias úteis',
      highlights: [
        'Estrutura multi-páginas (Início, Sobre, Serviços, Diferenciais, Contato)',
        '100% Autogerenciável via painel WordPress intuitivo',
        'Otimização completa para primeiras posições do Google (SEO)',
        'Formulários dinâmicos com envio para e-mail e WhatsApp',
        'Certificado de Segurança SSL e adequação à LGPD',
      ],
      idealFor: 'Empresas B2B, escritórios de advocacia, clínicas, construtoras e indústrias.',
    },
    {
      id: 'ecommerce',
      title: 'Loja Virtual E-commerce',
      badge: 'Vendas 24/7',
      tagline: 'Plataforma de comércio eletrônico segura e robusta para vender seus produtos em todo o Brasil.',
      startingPrice: 'A partir de R$ 3.490',
      timeframe: '20 a 25 dias úteis',
      highlights: [
        'Integração com Pix automático, Cartão de Crédito e Boleto',
        'Cálculo de frete em tempo real (Correios e transportadoras)',
        'Gestão simplificada de estoque, variações e cupons promocionais',
        'Carrinho de compras otimizado para evitar abandonos',
        'Painel financeiro com relatórios de vendas e pedidos',
      ],
      idealFor: 'Lojas físicas em expansão, marcas de moda, distribuidores e varejistas.',
    },
    {
      id: 'portal_custom',
      title: 'Portal ou Catálogo Sob Medida',
      badge: 'Solução Avançada',
      tagline: 'Arquitetura personalizada para projetos de alta complexidade, catálogos digitais e portais corporativos.',
      startingPrice: 'A partir de R$ 4.890',
      timeframe: '25 a 35 dias úteis',
      highlights: [
        'Filtros avançados de busca por atributos e categorias',
        'Área restrita de membros ou painel do cliente opcional',
        'Integração com ERPs, APIs externas e banco de dados avançado',
        'Infraestrutura otimizada para alto volume de acessos diários',
        'Suporte técnico e consultoria de evolução contínua',
      ],
      idealFor: 'Imobiliárias, distribuidoras com catálogo fechado, faculdades e associações.',
    },
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Briefing & Estratégia',
      desc: 'Entendemos o seu público-alvo, personas, concorrentes e diferenciais da empresa para desenhar a arquitetura de conversão.',
    },
    {
      step: '02',
      title: 'Design UI/UX Exclusivo',
      desc: 'Criamos o layout personalizado da sua marca com identidade visual moderna, paleta de cores harmoniosa e navegação intuitiva.',
    },
    {
      step: '03',
      title: 'Desenvolvimento & Performance',
      desc: 'Programamos o site em WordPress e tecnologias modernas (PHP 8.5 / Tailwind), garantindo código semântico e leveza extrema.',
    },
    {
      step: '04',
      title: 'Otimização SEO & Segurança',
      desc: 'Configuramos meta-tags, tags OpenGraph, sitemap, certificado SSL e conformidade LGPD para máxima proteção e ranqueamento no Google.',
    },
    {
      step: '05',
      title: 'Lançamento & Treinamento',
      desc: 'Colocamos o site no ar e gravamos um vídeo tutorial exclusivo ensinando sua equipe a atualizar conteúdos com total autonomia.',
    },
  ];

  const websiteFaqs = [
    {
      q: 'O site desenvolvido será 100% meu ou fico preso a mensalidades?',
      a: 'O site é 100% de propriedade da sua empresa! Diferente de plataformas proprietárias (como Wix ou Shopify com aluguel perpétuo), desenvolvemos em WordPress com código aberto. Não cobramos mensalidades obrigatórias de plataforma: você paga apenas o desenvolvimento e, após a entrega, o site e todos os arquivos pertencem integralmente a você.',
    },
    {
      q: 'Eu mesmo consigo alterar textos, imagens e produtos no futuro?',
      a: 'Sim, com total facilidade! Construímos todos os sites com painéis autogerenciáveis visuais e intuitivos. Você não precisa entender de programação para trocar um telefone, adicionar uma nova foto de produto ou postar um artigo. Ao final do projeto, fornecemos um treinamento prático em vídeo gravado especificamente para o painel do seu site.',
    },
    {
      q: 'Meu site vai aparecer na primeira página do Google?',
      a: 'Todos os nossos sites são construídos com técnicas avançadas de SEO On-Page (código semântico HTML5, tags de cabeçalho H1-H6, URLs amigáveis, sitemap XML, robots.txt, metadados otimizados e velocidade Core Web Vitals). Esse é o alicerce essencial exigido pelo algoritmo do Google para indexar e ranquear seu negócio com relevância em pesquisas orgânicas.',
    },
    {
      q: 'O site funciona perfeitamente em celulares (Mobile)?',
      a: 'Com certeza! Aplicamos o conceito Mobile-First em todos os projetos. Mais de 80% do tráfego web atual vem de smartphones. Nossos layouts adaptam-se de forma inteligente a telas de celulares, tablets, notebooks e monitores ultrawide, com botões de WhatsApp de acesso rápido com 1 toque.',
    },
    {
      q: 'Vocês configuram e-mails corporativos e certificado de segurança SSL?',
      a: 'Sim! Todos os nossos pacotes incluem a configuração completa do Certificado SSL gratuito (cadeado verde HTTPS no navegador, fundamental para a confiança do visitante e ranqueamento no Google) e a criação das contas de e-mail corporativo (exemplo: contato@suaempresa.com.br, comercial@suaempresa.com.br).',
    },
    {
      q: 'Qual é o prazo de entrega de um site profissional?',
      a: 'Landing pages de alta conversão costumam ficar prontas entre 5 a 7 dias úteis. Sites institucionais corporativos levam de 10 a 14 dias úteis, e lojas virtuais e-commerce completas entre 20 a 25 dias úteis, dependendo da agilidade no fornecimento dos conteúdos e aprovações de layout.',
    },
  ];

  const handleApplyToForm = () => {
    const notes = `Simulação de Site: Tipo "${quoteResult.planName}", Prazo estimado de ${quoteResult.estimatedBusinessDays} dias úteis, Investimento de R$ ${quoteResult.totalEstimatedPrice} (${quoteResult.installmentOption}), Recursos: ${selectedFeatures.join(', ')}.`;
    setFormData((prev) => ({
      ...prev,
      projectTypeInput: quoteResult.planName,
      notes,
    }));
    const el = document.getElementById('contato-site');
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
      service: `Marketing Digital - Criação de Sites (${formData.projectTypeInput})`,
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

      // WhatsApp message formulation
      const text = encodeURIComponent(
        `Olá Sysmax! Me chamo ${formData.name} da empresa ${formData.company}.\n` +
          `Gostaria de solicitar uma proposta para Criação de Site no Marketing Digital.\n\n` +
          `Protocolo: ${proto}\n` +
          `Tipo de Projeto: ${formData.projectTypeInput}\n` +
          `Investimento Estimado: R$ ${quoteResult.totalEstimatedPrice.toLocaleString('pt-BR')}\n` +
          `Prazo Estimado: ${quoteResult.estimatedBusinessDays} dias úteis\n` +
          `Telefone: ${formData.phone}\n` +
          `E-mail: ${formData.email}\n` +
          `Observações: ${formData.notes || 'Sem observações adicionais.'}`
      );

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
            <span className="text-slate-300">Marketing Digital</span>
            <span>/</span>
            <span className="text-cyan-400 font-semibold">Criação de Sites Profissionais</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onSwitchToTelefonia}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Telefonia PABX</span>
            </button>
            <button
              onClick={onSwitchToTI}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Suporte TI</span>
            </button>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/40 text-emerald-300 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Alta Performance</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-teal-400/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Marketing Digital Sysmax · Criação de Sites de Alta Conversão</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Sites Profissionais que{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Posicionam sua Marca no Google
            </span>{' '}
            e Convertem Visitantes em Vendas
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
            Desenvolvemos sites institucionais, lojas virtuais e landing pages de altíssima performance.
            Design 100% exclusivo, carregamento ultrarrápido (Core Web Vitals 95+), otimização SEO para buscas orgânicas e painel autogerenciável para sua empresa nunca depender de ninguém.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#simulador-site"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-950/40 transition-all duration-200"
            >
              <Sliders className="w-4 h-4" />
              <span>Simular Orçamento do Site</span>
            </a>

            <a
              href="https://wa.me/556140428042?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20Cria%C3%A7%C3%A3o%20de%20Site"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition-all duration-200"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Falar no WhatsApp (61) 4042-8042</span>
            </a>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">&lt; 2s</div>
              <div className="text-xs text-slate-400 mt-1">Carregamento ultrarrápido em celulares e PCs</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Autogerenciável (você é dono do seu site)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-white">Google 95+</div>
              <div className="text-xs text-slate-400 mt-1">SEO On-page e pontuação no PageSpeed</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xl sm:text-2xl font-extrabold text-teal-300">SSL + LGPD</div>
              <div className="text-xs text-slate-400 mt-1">Segurança de dados e conformidade legal</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Pillars of High Performance Web Design */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Por Que Fazer Seu Site com a Sysmax</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Os 6 Pilares de um Site que Realmente Dá Resultado
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Baseado nas melhores práticas internacionais de web design, engenharia de software e marketing digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">1. Design Mobile-First & Exclusivo</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mais de 80% dos acessos acontecem em telas de celular. Construímos seu layout do zero, adaptado com perfeição a smartphones, tablets e desktops, refletindo a autoridade da sua marca.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">2. Otimização SEO Google Nativa</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Estruturação técnica de títulos, meta-descriptions, sitemap XML, Schema.org e URLs amigáveis para que seu site seja facilmente encontrado nas buscas orgânicas de clientes potenciais.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">3. Velocidade & Core Web Vitals</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sites lentos perdem clientes. Utilizamos compactação WebP, cache inteligente, scripts assíncronos e servidores de alta performance para que sua página abra em menos de 2 segundos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">4. Painel 100% Autogerenciável</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Você não fica refém de programadores para atualizar uma foto, mudar um preço ou postar uma notícia. Com o painel amigável, você mesmo faz alterações em minutos com total autonomia.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">5. Foco em Conversão & WhatsApp</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Botões de chamada direta para o WhatsApp, formulários dinâmicos com proteção anti-spam e integração com ferramentas de tráfego (Meta Pixel e Google Tag Manager / GA4).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">6. Segurança SSL & LGPD</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Criptografia HTTPS de ponta a ponta com Certificado SSL gratuito, firewall de proteção contra ataques e aviso de privacidade e cookies em total conformidade com a LGPD.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Catalog: Landing Page, Institucional, E-commerce, Portais */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-cyan-400 text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Formatos de Sites Sob Medida</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Escolha o Modelo Ideal para a Fase da sua Empresa
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Cada tipo de projeto é planejado estrategicamente para os objetivos comerciais do seu segmento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectPlans.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl bg-slate-900/80 border transition-all duration-200 flex flex-col justify-between ${
                projectType === plan.id
                  ? 'border-cyan-500 shadow-xl shadow-cyan-950/40 bg-slate-900'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-950 border border-cyan-800/60 text-cyan-300">
                    {plan.badge}
                  </span>
                  {plan.id === 'ecommerce' ? (
                    <ShoppingCart className="w-5 h-5 text-cyan-400" />
                  ) : plan.id === 'landing_page' ? (
                    <Rocket className="w-5 h-5 text-emerald-400" />
                  ) : plan.id === 'portal_custom' ? (
                    <Code2 className="w-5 h-5 text-teal-400" />
                  ) : (
                    <Layout className="w-5 h-5 text-cyan-400" />
                  )}
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {plan.title}
                </h3>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {plan.tagline}
                </p>

                <div className="py-2.5 px-3 rounded-xl bg-slate-950/70 border border-slate-800/80 mb-4">
                  <div className="text-xs font-semibold text-cyan-300">{plan.startingPrice}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Prazo médio: {plan.timeframe}</div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  {plan.highlights.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 mb-4 italic">
                  <strong>Recomendado para:</strong> {plan.idealFor}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setProjectType(plan.id as any);
                    const sim = document.getElementById('simulador-site');
                    if (sim) sim.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    projectType === plan.id
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span>{projectType === plan.id ? 'Selecionado no Simulador' : 'Simular este Projeto'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology 5 Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B1736] to-slate-900 border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Metodologia Comprovada
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Como funciona o processo de criação do seu site
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Processo ágil, transparente e colaborativo. Você acompanha e aprova cada etapa antes da publicação.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {methodologySteps.map((item) => (
              <div key={item.step} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 relative">
                <div className="text-3xl font-extrabold text-cyan-500/30 mb-2">
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section id="simulador-site" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-28">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold mb-3 border border-cyan-800/40">
            <Sliders className="w-3.5 h-3.5" />
            <span>Calculadora Interativa de Projetos Web</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Simule o Investimento do seu Novo Site
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Escolha o modelo de site e selecione os recursos adicionais para ver estimativas instantâneas de valores e prazos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            {/* Step 1: Project Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2.5">
                1. Tipo de Projeto:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'landing_page', label: 'Landing Page Express', desc: 'R$ 1.290 (5-7 dias)' },
                  { id: 'institutional', label: 'Site Institucional Pro', desc: 'R$ 1.890 (10-14 dias)' },
                  { id: 'ecommerce', label: 'Loja Virtual E-commerce', desc: 'R$ 3.490 (20-25 dias)' },
                  { id: 'portal_custom', label: 'Portal / Catálogo Especial', desc: 'R$ 4.890 (25-35 dias)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProjectType(item.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      projectType === item.id
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md shadow-cyan-950/30'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-cyan-300 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Add-on Features */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2.5">
                2. Recursos e Otimizações Adicionais:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-3 rounded-xl text-left border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                        isChecked
                          ? 'bg-cyan-950/60 border-cyan-400 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-[10px] font-bold ${
                              isChecked ? 'bg-cyan-500 text-slate-950' : 'border border-slate-600'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-semibold text-white">{feat.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 pl-5.5 leading-snug">{feat.desc}</p>
                      </div>
                      <span className="text-[11px] font-bold text-teal-300 shrink-0">+{feat.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Urgency */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                3. Prazo de Lançamento Desejado:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUrgency('standard')}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    urgency === 'standard'
                      ? 'bg-cyan-950 border-cyan-400 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold text-white">Cronograma Padrão</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Sem taxa de urgência</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('express')}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    urgency === 'express'
                      ? 'bg-emerald-950 border-emerald-400 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold text-emerald-300">Fast Track Express (Prioritário)</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Entrega até 35% mais rápida</div>
                </button>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-[#081024] border border-cyan-500/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  Proposta Estimada
                </span>
                <h3 className="text-lg font-bold text-white">{quoteResult.planName}</h3>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-bold">
                {quoteResult.seoScoreProjected}
              </div>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-slate-300">Investimento Total:</span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                    R$ {quoteResult.totalEstimatedPrice.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-center">
                <span className="text-xs text-cyan-300 font-bold block">
                  Condição Facilitada: {quoteResult.installmentOption}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Ou à vista com 5% de desconto no Pix
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Prazo de Desenvolvimento:</span>
                  <span className="font-bold text-white">{quoteResult.estimatedBusinessDays} dias úteis</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Propriedade dos Arquivos:</span>
                  <span className="font-bold text-emerald-400">100% Seu (Sem Aluguel)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Certificado SSL & LGPD:</span>
                  <span className="font-bold text-teal-300">Incluso Gratuitamente</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Painel WordPress amigável com treinamento em vídeo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Compatível com PHP 8.5 / aaPanel e qualquer hospedagem</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Botão de WhatsApp e formulário de conversão inclusos</span>
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
                  `Olá Sysmax! Fiz uma simulação de Criação de Site:\n` +
                    `- Tipo: ${quoteResult.planName}\n` +
                    `- Investimento: R$ ${quoteResult.totalEstimatedPrice}\n` +
                    `- Prazo: ${quoteResult.estimatedBusinessDays} dias úteis\n` +
                    `- Recursos: ${selectedFeatures.join(', ')}\n` +
                    `Gostaria de formalizar uma proposta com a equipe!`
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

      {/* Segments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Projetos Especializados para Cada Nicho de Mercado
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Estruturamos a mensagem e as chamadas para ação certas para o seu perfil de cliente ideal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Advocacia, Consultorias & B2B
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Design sóbrio e elegante, apresentação detalhada de áreas de atuação e sócios, botão para agendamento direto de reuniões e total conformidade com as regras da OAB.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Clínicas Médicas & Odontologia
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ambiente visual acolhedor e higiênico, lista de especialidades médicas, integração de mapa do Google com endereço e agendamento de consultas via WhatsApp.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Lojas Virtuais & Indústrias
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Catálogo de produtos com fotos em alta definição, cálculo automático de frete, pagamento facilitado no Pix e checkout transparente para máxima taxa de vendas.
            </p>
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
            Tire Suas Dúvidas Sobre a Criação de Sites
          </h2>
        </div>

        <div className="space-y-3">
          {websiteFaqs.map((faq, index) => {
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
      <section id="contato-site" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Orçamento de Criação de Sites
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Vamos Colocar o Site da sua Empresa no Ar?
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Preencha os dados abaixo para receber uma proposta técnica detalhada com escopo e prazos em até 2 horas úteis.
            </p>
          </div>

          {submittedProtocol ? (
            <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Solicitação de Orçamento Recebida!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Seu número de protocolo é <strong className="text-cyan-400">{submittedProtocol}</strong>. Nossa equipe entrará em contato via WhatsApp/telefone para alinhar os detalhes do seu projeto.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/556140428042?text=${encodeURIComponent(
                    `Olá Sysmax! Acabei de enviar uma solicitação para Criação de Site sob o protocolo ${submittedProtocol}. Poderiam dar andamento?`
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
                    placeholder="Ex: Almeida & Associados"
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
                  Tipo de Site Desejado *
                </label>
                <select
                  value={formData.projectTypeInput}
                  onChange={(e) => setFormData({ ...formData, projectTypeInput: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Landing Page de Alta Conversão">Landing Page de Alta Conversão (One Page)</option>
                  <option value="Site Institucional Corporativo Pro">Site Institucional Corporativo Pro</option>
                  <option value="Loja Virtual E-commerce Completa">Loja Virtual E-commerce (Venda Online)</option>
                  <option value="Portal Personalizado & Catálogo Digital">Portal Personalizado ou Catálogo Digital</option>
                  <option value="Redesign / Modernização de Site Existente">Redesign / Modernização de Site Existente</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Conte um pouco sobre o projeto ou envie links de referências (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ex: Queremos modernizar nosso site atual, destacar nossos serviços no DF e integrar com botão de WhatsApp."
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
