import { ShieldCheck, Award, Lock, Server, Quote, Star } from 'lucide-react';

export function TrustAndCases() {
  const trustIndicators = [
    {
      icon: ShieldCheck,
      title: 'Em Conformidade Regulatória',
      desc: 'Rotas de terminação de alta fidelidade homologadas e em total conformidade com a Anatel.',
    },
    {
      icon: Lock,
      title: 'Privacidade & LGPD',
      desc: 'Armazenamento seguro de gravações com criptografia ponta a ponta e controle estrito de acessos.',
    },
    {
      icon: Server,
      title: 'Data Centers de Alta Confiabilidade',
      desc: 'Infraestrutura redundante em nuvem com alta disponibilidade de 99,9% SLA e baixa latência.',
    },
    {
      icon: Award,
      title: 'Suporte Técnico Humanizado',
      desc: 'Equipe própria no Distrito Federal com atendimento imediato via WhatsApp e central telefônica.',
    },
  ];

  const caseStudies = [
    {
      segment: 'Escritório de Advocacia & Consultoria Jurídica',
      challenge: 'Advogados trabalhavam em regime híbrido mas dependiam do telefone fixo da recepção. Ligações importantes de clientes eram perdidas durante audiências.',
      outcome: 'Implantação do PABX Virtual com ramal criptografado no smartphone de cada advogado e gravação de chamadas para comprovação de atendimentos.',
      impact: 'Zero chamadas perdidas e mobilidade total para a equipe jurídica atender de qualquer tribunal ou escritório.',
      author: 'Dr. Leonardo Vasconcelos',
      role: 'Sócio Gestor · Brasília / DF',
    },
    {
      segment: 'Clínica Médica & Diagnóstico',
      challenge: 'Linhas analógicas convencionais ficavam constantemente ocupadas nas manhãs de agendamento de consultas, gerando insatisfação dos pacientes.',
      outcome: 'Ativação de URA Inteligente com menu por especialidade médica, fila com música relaxante e portabilidade do número principal sem parar o atendimento.',
      impact: 'Redução de 65% no tempo de espera do paciente e capacidade para atender 10 ligações simultâneas no mesmo número.',
      author: 'Dra. Camila Guimarães',
      role: 'Diretora Médica e Administrativa',
    },
    {
      segment: 'Distribuidora & Logística Comercial',
      challenge: 'Gastos elevados com telefonia tradicional física e necessidade de integrar matriz com galpões de distribuição em cidades diferentes.',
      outcome: 'Unificação de todos os ramais da matriz e filiais no mesmo PABX Cloud Sysmax com ligação gratuita entre ramais e gestão centralizada.',
      impact: 'Economia comprovada de 62% nas despesas mensais de telecomunicação e controle total das gravações comerciais.',
      author: 'Ricardo Mendes',
      role: 'Gerente de Operações e TI',
    },
  ];

  return (
    <section className="py-20 bg-[#0B132B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {trustIndicators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Cases & Testimonials */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            Resultados Comprovados
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Casos de sucesso na prática corporativa
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Veja como empresas de diferentes setores modernizaram sua rotina e reduziram custos operacionais com a Sysmax.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl relative"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <span className="text-xs font-semibold text-cyan-400 block mb-2">
                  {item.segment}
                </span>

                <div className="text-xs text-slate-400 mb-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                  <strong className="text-slate-300">Desafio:</strong> {item.challenge}
                </div>

                <p className="text-sm text-slate-200 leading-relaxed mb-4">
                  "{item.impact}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{item.author}</div>
                  <div className="text-xs text-slate-400">{item.role}</div>
                </div>
                <Quote className="w-6 h-6 text-slate-700 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
