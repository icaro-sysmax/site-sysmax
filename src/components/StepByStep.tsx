import { CheckCircle2, ArrowRight } from 'lucide-react';

interface StepByStepProps {
  onOpenQuote: () => void;
}

export function StepByStep({ onOpenQuote }: StepByStepProps) {
  const steps = [
    {
      step: '01',
      title: 'Diagnóstico e Consultoria Gratuita',
      description: 'Nossa equipe de engenharia analisa sua conta atual, rotinas de atendimento, quantidade de ramais e infraestrutura de internet sem qualquer custo ou compromisso.',
      timeframe: 'Atendimento imediato',
    },
    {
      step: '02',
      title: 'Proposta Comercial Personalizada',
      description: 'Formatamos uma solução sob medida para sua empresa com valores previsíveis, recursos ideais para o seu fluxo e zero taxas ocultas.',
      timeframe: 'Envio no mesmo dia',
    },
    {
      step: '03',
      title: 'Configuração & Portabilidade Transparente',
      description: 'Parametrizamos sua URA, filas de atendimento, ramais no aplicativo ou IP e realizamos a portabilidade numérica do seu número fixo sem nenhuma interrupção nas chamadas.',
      timeframe: 'Ativação em até 24h',
    },
    {
      step: '04',
      title: 'Treinamento & Suporte Dedicado',
      description: 'Orientamos sua equipe sobre a utilização dos ramais no PC e celular, realizamos os testes finais e deixamos nosso suporte técnico humanizado à sua disposição.',
      timeframe: 'Acompanhamento contínuo',
    },
  ];

  return (
    <section id="etapas" className="py-20 bg-[#080E21] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            Metodologia Ágil
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Como funciona a implantação na Sysmax
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Esqueça os processos demorados e burocráticos das operadoras convencionais. Na Sysmax sua empresa começa a usar telefonia moderna de forma rápida e segura.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-cyan-400 font-mono tracking-tighter">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/60">
                    {item.timeframe}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-cyan-400 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Processo 100% assistido</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-950/40 transition-all duration-200"
          >
            <span>Iniciar Meu Diagnóstico Gratuito</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
