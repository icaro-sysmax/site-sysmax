import { AlertTriangle, CheckCircle2, ArrowRight, PhoneOff, Cpu, Users } from 'lucide-react';

interface ProblemSolutionProps {
  onOpenQuote: () => void;
}

export function ProblemSolution({ onOpenQuote }: ProblemSolutionProps) {
  const pillars = [
    {
      icon: PhoneOff,
      title: 'Redução de Dificuldades Operacionais',
      subtitle: 'Diga adeus a centrais físicas obsoletas e manutenções caras',
      problem: [
        'Aparelhos PABX antigos travando e gerando custos constantes de visita técnica',
        'Fiação emaranhada e dificuldade para mudar colaboradores de mesa ou sala',
        'Clientes reclamando de linha ocupada ou ligação caindo ao transferir',
        'Contas de telefone com cobranças surpresa e tarifas abusivas',
      ],
      solution: [
        'PABX 100% em Nuvem: dispense equipamentos pesados e fiação física',
        'Crie ou altere ramais em segundos pelo navegador com total autonomia',
        'Chamadas simultâneas ilimitadas sem sinal de linha ocupada',
        'Fatura fixa e previsível com redução de até 70% nos custos mensais',
      ],
    },
    {
      icon: Users,
      title: 'Melhoria Radical no Atendimento ao Cliente',
      subtitle: 'Comunicação profissional que transmite credibilidade e fecha vendas',
      problem: [
        'Ligações perdidas fora do horário ou quando a recepção está ocupada',
        'Atendentes presos à mesa do escritório, sem mobilidade para trabalho híbrido',
        'Falta de histórico: sem gravações de chamadas para resolver dúvidas com clientes',
        'Atendimento desorganizado que faz o cliente repetir a mesma história 3 vezes',
      ],
      solution: [
        'URA Inteligente que distribui ligações para o setor certo automaticamente',
        'Ramal no smartphone (iOS e Android): atenda de qualquer lugar como se estivesse na empresa',
        'Gravação de 100% das chamadas em nuvem com conformidade à LGPD',
        'Filas de atendimento com métricas de tempo de espera e relatórios de desempenho',
      ],
    },
    {
      icon: Cpu,
      title: 'Infraestrutura Tecnológica Organizada e Estável',
      subtitle: 'Ponto único de contato para telefonia, redes e computadores',
      problem: [
        'Jogo de empurra: a operadora culpa a internet, o técnico de TI culpa a telefonia',
        'Rede Wi-Fi oscilando e computadores lentos prejudicando o faturamento',
        'Vulnerabilidades de segurança e falta de rotina profissional de backup',
        'Tempo precioso da diretoria gasto resolvendo problemas básicos de suporte',
      ],
      solution: [
        'Um único parceiro especializado para cuidar da telefonia e de toda a TI',
        'Cabeamento estruturado e Wi-Fi corporativo de alta densidade sem quedas',
        'Help Desk ágil e preventivo para manter os computadores da equipe sempre operantes',
        'Mais tranquilidade e foco exclusivo no crescimento do seu negócio',
      ],
    },
  ];

  return (
    <section id="solucao" className="py-20 bg-[#080E21] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            Transformação Operacional
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Como a Sysmax transforma a comunicação da sua empresa
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Eliminamos os gargalos diários que atrasam seus colaboradores e frustram seus clientes, substituindo improvisos por soluções de alta confiabilidade.
          </p>
        </div>

        <div className="space-y-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Before: Dificuldades Tradicionais */}
                  <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/30">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Cenário Comum Sem a Sysmax</span>
                    </div>
                    <ul className="space-y-3">
                      {pillar.problem.map((item, pIndex) => (
                        <li key={pIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <span className="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* After: Solução Sysmax */}
                  <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Com a Tecnologia Sysmax</span>
                    </div>
                    <ul className="space-y-3">
                      {pillar.solution.map((item, sIndex) => (
                        <li key={sIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-950/50 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Quero Modernizar Minha Telefonia Agora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
