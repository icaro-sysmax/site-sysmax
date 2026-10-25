import { useState } from 'react';
import { calculateTelephonySavings } from '../utils/calculator';
import { Calculator, ArrowRight, Check, Zap, DollarSign } from 'lucide-react';

interface EconomyCalculatorProps {
  onApplyPlan: (extensions: number, tierLabel: string) => void;
}

export function EconomyCalculator({ onApplyPlan }: EconomyCalculatorProps) {
  const [extensions, setExtensions] = useState<number>(8);
  const [customSpend, setCustomSpend] = useState<string>('');

  const spendNum = customSpend ? parseFloat(customSpend) : undefined;
  const calc = calculateTelephonySavings(extensions, spendNum);

  const presets = [3, 5, 8, 15, 25, 50];

  return (
    <section id="simulador" className="py-20 bg-[#0B132B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            Simulador Interativo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Calcule quanto sua empresa pode economizar
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Selecione a quantidade de colaboradores que precisam de ramal telefônico e veja a estimativa de redução de custos com o PABX Virtual Sysmax.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Control Strip */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <label htmlFor="ext-slider" className="text-sm font-semibold text-slate-200">
                    Número de Ramais Necessários:
                  </label>
                  <span className="text-2xl font-extrabold text-cyan-400 font-mono tabular-nums">
                    {extensions} {extensions === 1 ? 'ramal' : 'ramais'}
                  </span>
                </div>

                <input
                  id="ext-slider"
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={extensions}
                  onChange={(e) => setExtensions(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                />

                {/* Preset quick buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className="text-xs text-slate-400 mr-2">Sugestões rápidas:</span>
                  {presets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setExtensions(preset)}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                        extensions === preset
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {preset} ramais
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Custom Spend Input */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label htmlFor="custom-spend" className="text-xs text-slate-400">
                  Gasto mensal aproximado atual com telefonia (opcional):
                </label>
                <div className="relative sm:w-48">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                    R$
                  </span>
                  <input
                    id="custom-spend"
                    type="number"
                    min="0"
                    placeholder="Ex: 1200"
                    value={customSpend}
                    onChange={(e) => setCustomSpend(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 tabular-nums"
                  />
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Custo Médio Tradicional
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-slate-300 mt-1 tabular-nums">
                    R$ {calc.traditionalEstimatedCost.toLocaleString('pt-BR')}<span className="text-xs text-slate-500">/mês</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Linhas convencionais + manutenção de central física
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                    Investimento Sysmax Cloud
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-white mt-1 tabular-nums">
                    R$ {calc.sysmaxEstimatedCost.toLocaleString('pt-BR')}<span className="text-xs text-slate-400">/mês</span>
                  </div>
                </div>
                <div className="text-[11px] text-cyan-300/80 mt-2">
                  {calc.tierLabel} (R$ {calc.extensions <= 5 ? '44,90' : calc.extensions <= 20 ? '39,90' : '34,90'}/ramal)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-emerald-400 uppercase tracking-wider font-semibold">
                    Economia Estimada
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1 tabular-nums">
                    R$ {calc.annualSavings.toLocaleString('pt-BR')}<span className="text-xs text-emerald-400/80">/ano</span>
                  </div>
                </div>
                <div className="text-[11px] text-emerald-300 mt-2 font-medium">
                  Redução de até ~{calc.savingsPercentage}% nos seus custos
                </div>
              </div>
            </div>

            {/* Included in this configuration */}
            <div className="mt-8 p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                Recursos recomendados inclusos para {extensions} ramais:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {calc.recommendedFeatures.map((feat, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to Apply */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                * Estimativa comercial sem compromisso. Planos personalizados para sua operação.
              </div>
              <button
                onClick={() => onApplyPlan(extensions, calc.tierLabel)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-950/40 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Solicitar Proposta para {extensions} Ramais</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
