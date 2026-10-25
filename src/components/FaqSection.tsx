import { useState } from 'react';
import { ChevronDown, MessageSquare, Search } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'Como funciona a portabilidade do meu número de telefone atual?',
      answer: 'A portabilidade é 100% regulamentada pela Anatel e totalmente transparente. Você continua utilizando suas linhas normalmente na operadora atual enquanto cuidamos de todo o processo técnico. No momento da virada para o sistema Sysmax, a transição ocorre em minutos, sem nenhuma interrupção ou perda de ligações para sua empresa.',
    },
    {
      question: 'Preciso comprar aparelhos novos ou posso usar computadores e celulares?',
      answer: 'Você não precisa comprar aparelhos novos obrigatoriamente! Disponibilizamos aplicativos (softphones) gratuitos para Windows, Mac, Android e iOS. Seus colaboradores podem atender pelo headset no computador ou pelo próprio smartphone. Caso sua empresa prefira aparelhos de mesa tradicionais, oferecemos compatibilidade total com telefones IP das principais marcas (como Intelbras, Grandstream, Yealink) ou adaptadores ATA.',
    },
    {
      question: 'O que acontece se a internet do meu escritório cair?',
      answer: 'Como o PABX Sysmax opera 100% em nuvem em data centers redundantes, sua empresa nunca fica fora do ar. Configuramos rotas de contingência automática (fallback) que direcionam as chamadas recebidas para os celulares dos colaboradores ou para uma caixa postal inteligente com envio do áudio por e-mail caso haja instabilidade no seu link local.',
    },
    {
      question: 'Qual a velocidade de internet necessária para utilizar a telefonia VoIP?',
      answer: 'A tecnologia VoIP moderna utiliza codecs de alta compactação e fidelidade de áudio (como o Codec Opus HD). Cada chamada simultânea consome em média apenas cerca de 80 a 100 kbps de banda. Uma conexão de banda larga empresarial padrão (fibra óptica) suporta dezenas de ramais operando simultaneamente com folga e excelente qualidade sonora.',
    },
    {
      question: 'Existe fidelidade contratual abusiva ou multa rescisória?',
      answer: 'Não trabalhamos com cláusulas de fidelidade abusivas que prendem o cliente contra a sua vontade. Confiamos na qualidade da nossa entrega e na estabilidade do nosso serviço. Seus contratos têm condições transparentes e você tem flexibilidade para aumentar, diminuir ramais ou encerrar quando desejar.',
    },
    {
      question: 'Quanto tempo leva a ativação dos ramais e do PABX Virtual?',
      answer: 'A ativação da plataforma de PABX em nuvem com ramais em softphone pode ser concluída em até 24 horas úteis após a aprovação da proposta. Criamos os ramais, configuramos o menu da URA e entregamos o acesso com treinamento imediato para sua equipe.',
    },
    {
      question: 'Como funciona o suporte técnico e atendimento da Sysmax?',
      answer: 'Nosso suporte é realizado por profissionais técnicos qualificados e humanizados no Distrito Federal e com atendimento remoto ágil para todo o Brasil. Você pode acionar nossos especialistas diretamente pelo WhatsApp oficial, telefone fixo ou abertura de chamados, sem ter que passar por menus robóticos intermináveis.',
    },
    {
      question: 'Como as chamadas são gravadas e como tenho acesso ao histórico?',
      answer: 'Todas as ligações de entrada e saída dos ramais autorizados são gravadas automaticamente em áudio digital e salvas em nuvem segura com criptografia. Os gestores acessam um painel web intuitivo onde podem filtrar gravações por data, ramal, número do cliente, duração e escutar ou baixar o arquivo MP3 com apenas um clique.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-[#080E21] border-t border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            Tire Suas Dúvidas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Respostas claras e diretas sobre tecnologia VoIP, portabilidade, aparelhos e suporte.
          </p>

          {/* Quick Search Input */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Digite sua dúvida (ex: portabilidade, aparelhos...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-400 text-sm">
              Nenhuma pergunta encontrada para sua busca. Deseja falar com nossa equipe?
            </div>
          )}
        </div>

        {/* WhatsApp Direct Help Box */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-[#0F1E3D] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Ainda tem alguma dúvida específica para sua empresa?
            </h3>
            <p className="text-xs text-slate-300">
              Fale diretamente com um consultor da Sysmax pelo WhatsApp agora mesmo.
            </p>
          </div>
          <a
            href="https://wa.me/556140428042?text=Ol%C3%A1%20Sysmax!%20Tenho%20uma%20d%C3%BAvida%20sobre%20as%20solu%C3%A7%C3%B5es%20de%20telefonia."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-colors whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
