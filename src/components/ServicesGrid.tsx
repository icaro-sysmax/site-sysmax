import { useState } from 'react';
import {
  Server,
  PhoneCall,
  PhoneForwarded,
  Bot,
  Mic,
  Globe,
  MessageCircle,
  Headphones,
  Network,
  ArrowRight,
  Check,
} from 'lucide-react';

interface ServicesGridProps {
  onSelectService: (serviceName: string) => void;
}

export function ServicesGrid({ onSelectService }: ServicesGridProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'telephony' | 'service' | 'infrastructure'>('all');

  const services = [
    {
      id: 'pabx-virtual',
      category: 'telephony',
      icon: Server,
      title: 'PABX Virtual em Nuvem',
      shortDesc: 'Elimine centrais físicas com ramais integrados no computador, smartphone ou aparelho IP.',
      features: [
        'Ramais remotos em qualquer lugar do mundo',
        'Transferência inteligente de chamadas',
        'Painel web de gerenciamento em tempo real',
        'Sem custos de manutenção de hardware',
      ],
      tag: 'Mais Procurado',
    },
    {
      id: 'voip-corporativo',
      category: 'telephony',
      icon: PhoneCall,
      title: 'Telefonia VoIP Corporativa',
      shortDesc: 'Linhas digitais com alta definição de áudio e planos de chamadas ilimitadas para todo o Brasil.',
      features: [
        'Voz em alta definição (Codec Opus HD)',
        'Chamadas locais e DDD sem sustos na fatura',
        'Terminação com rotas premium Anatel',
        'Economia de até 70% comparado a linhas analógicas',
      ],
      tag: 'Alta Economia',
    },
    {
      id: 'portabilidade',
      category: 'telephony',
      icon: PhoneForwarded,
      title: 'Portabilidade Numérica',
      shortDesc: 'Traga seu número fixo ou 0800 atual de qualquer operadora sem nenhuma pausa no atendimento.',
      features: [
        'Processo 100% regulamentado e transparente',
        'Sua empresa não fica fora do ar em nenhum momento',
        'Preservação total da identidade comercial',
        'Acompanhamento direto por especialista Sysmax',
      ],
      tag: 'Zero Impacto',
    },
    {
      id: 'ura-inteligente',
      category: 'service',
      icon: Bot,
      title: 'URA e Atendimento Automático',
      shortDesc: 'Menu de voz profissional ("Disque 1 para Comercial, 2 para Suporte") com distribuição ágil.',
      features: [
        'Roteamento por setor, fila ou horário comercial',
        'Mensagens personalizadas com voz profissional',
        'Filas de espera com música de fundo personalizada',
        'Transbordo de ligações para celulares de plantão',
      ],
      tag: 'Profissionalismo',
    },
    {
      id: 'gravacao-chamadas',
      category: 'service',
      icon: Mic,
      title: 'Gravação de Chamadas em Nuvem',
      shortDesc: 'Auditoria e conformidade jurídica com histórico completo e busca fácil de gravações.',
      features: [
        'Armazenamento seguro em nuvem criptografada',
        'Filtro por data, ramal, cliente e duração',
        'Download e reprodução com um clique',
        'Treinamento e controle de qualidade para equipes',
      ],
      tag: 'Segurança & LGPD',
    },
    {
      id: 'did-0800',
      category: 'service',
      icon: Globe,
      title: 'Números Virtuais (DID) e 0800',
      shortDesc: 'Tenha presença local com DDDs de diversas cidades do país e número 0800 nacional sem taxa abusiva.',
      features: [
        'DDDs de todas as capitais e principais cidades',
        '0800 Nacional com tarifação transparente por minuto',
        'Receba chamadas de todo o Brasil no mesmo PABX',
        'Fortaleça a imagem corporativa da sua marca',
      ],
      tag: 'Expansão Nacional',
    },
    {
      id: 'whatsapp-crm',
      category: 'service',
      icon: MessageCircle,
      title: 'Integração com WhatsApp & CRM',
      shortDesc: 'Conecte sua telefonia ao WhatsApp Business e aos principais CRMs e sistemas do mercado.',
      features: [
        'Centralização de canais de voz e mensagens',
        'Identificação de clientes com histórico na tela (Screen Pop-up)',
        'Integração via API com Bitrix24, RD Station, HubSpot e outros',
        'Atendimento multicanal simplificado',
      ],
      tag: 'Produtividade',
    },
    {
      id: 'help-desk',
      category: 'infrastructure',
      icon: Headphones,
      title: 'Help Desk de TI Especializado',
      shortDesc: 'Gestão preventiva e corretiva para computadores, servidores, antivírus e suporte aos colaboradores.',
      features: [
        'Suporte remoto ágil e presencial no DF',
        'Monitoramento contínuo de estações de trabalho',
        'Gestão de backups, antivírus corporativo e segurança',
        'Atendimento de chamados com SLA garantido',
      ],
      tag: 'TI Sem Dor de Cabeça',
    },
    {
      id: 'redes-infra',
      category: 'infrastructure',
      icon: Network,
      title: 'Infraestrutura de Redes e Wi-Fi',
      shortDesc: 'Cabeamento estruturado de alto padrão, switches gerenciáveis e redes Wi-Fi corporativas estáveis.',
      features: [
        'Projetos de cabeamento Cat6 e fibra óptica',
        'Configuração de roteadores, firewalls e VPNs seguras',
        'Wi-Fi de alta densidade sem pontos cegos',
        'Diagnóstico e certificação de rede local',
      ],
      tag: 'Estabilidade',
    },
  ];

  const filteredServices = services.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="servicos" className="py-20 bg-[#0B132B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            Portfólio de Soluções
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Soluções completas de Telefonia Corporativa e TI
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Do ramal virtual na nuvem à estruturação física da sua rede de computadores, a Sysmax entrega tudo o que sua empresa precisa para se comunicar sem falhas.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Todos os Serviços ({services.length})
            </button>
            <button
              onClick={() => setActiveCategory('telephony')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                activeCategory === 'telephony'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              PABX & VoIP
            </button>
            <button
              onClick={() => setActiveCategory('service')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                activeCategory === 'service'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Atendimento & URA
            </button>
            <button
              onClick={() => setActiveCategory('infrastructure')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap ${
                activeCategory === 'infrastructure'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              TI & Redes
            </button>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 group shadow-lg shadow-black/10"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center border border-slate-700/80 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/50">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 border border-slate-700 hover:border-cyan-400 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Solicitar {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
