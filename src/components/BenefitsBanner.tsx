import { ShieldCheck, Clock, TrendingDown, Headphones, PhoneForwarded, Sparkles } from 'lucide-react';

export function BenefitsBanner() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Zero Fidelidade Abusiva',
      description: 'Acreditamos na qualidade do nosso serviço. Você tem liberdade para evoluir sem contratos engessados.',
    },
    {
      icon: Clock,
      title: 'Ativação Rápida em até 24h',
      description: 'Implantação ágil sem burocracia para sua empresa não perder nenhum dia de negócios.',
    },
    {
      icon: TrendingDown,
      title: 'Economia Real de até 70%',
      description: 'Corte custos de manutenção de centrais físicas, taxas abusivas de linhas fixas e chamadas interurbanas.',
    },
    {
      icon: Headphones,
      title: 'Suporte Humanizado Direto',
      description: 'Atendimento ágil por especialistas reais via WhatsApp e telefone, sem robôs intermináveis.',
    },
    {
      icon: PhoneForwarded,
      title: 'Portabilidade Transparente',
      description: 'Traga seu número atual de qualquer operadora sem perder chamadas durante a transição.',
    },
    {
      icon: Sparkles,
      title: 'Alta Disponibilidade (SLA 99.9%)',
      description: 'Servidores redundantes em data centers de primeira linha com qualidade de voz em Alta Definição (HD Voice).',
    },
  ];

  return (
    <section id="diferenciais" className="py-16 bg-[#080E21] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            Diferenciais Competitivos
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Por que empresas em todo o Brasil escolhem a Sysmax?
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminamos os vícios das operadoras tradicionais com uma abordagem transparente, tecnologia estável e foco total no crescimento do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-cyan-500/20 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
