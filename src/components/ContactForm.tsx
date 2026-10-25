import { useState, useEffect } from 'react';
import {
  formatPhoneBR,
  validateLeadForm,
  generateWhatsAppQuoteLink,
  generateProtocolNumber,
  LeadFormData,
} from '../utils/calculator';
import {
  Send,
  MessageSquare,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  User,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
  initialExtensions?: number;
}

export function ContactForm({ initialService, initialExtensions }: ContactFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: initialService || 'PABX Virtual em Nuvem',
    extensions: initialExtensions || 5,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProtocol, setSubmittedProtocol] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialExtensions) {
      setFormData((prev) => ({ ...prev, extensions: initialExtensions }));
    }
  }, [initialExtensions]);

  const handleChange = (field: keyof LeadFormData, value: any) => {
    let finalVal = value;
    if (field === 'phone') {
      finalVal = formatPhoneBR(value);
    }
    setFormData((prev) => ({ ...prev, [field]: finalVal }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate swift server/CRM registration
    setTimeout(() => {
      const protocol = generateProtocolNumber();
      setSubmittedProtocol(protocol);
      setIsSubmitting(false);
    }, 450);
  };

  const handleReset = () => {
    setSubmittedProtocol(null);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      service: 'PABX Virtual em Nuvem',
      extensions: 5,
      message: '',
    });
    setErrors({});
  };

  const whatsappDirectUrl = generateWhatsAppQuoteLink({
    name: formData.name,
    company: formData.company,
    phone: formData.phone,
    service: formData.service,
    extensions: formData.extensions,
  });

  return (
    <section id="contato" className="py-20 bg-[#0B132B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Commercial Contact & Assurance */}
          <div className="lg:col-span-5 text-left">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Atendimento Especializado
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance mb-6">
              Pronto para modernizar a comunicação da sua empresa?
            </h2>
            <p className="text-base text-slate-300 leading-relaxed mb-8">
              Preencha o formulário e receba um diagnóstico sem compromisso em até 30 minutos ou fale diretamente com nossos consultores técnicos.
            </p>

            <div className="space-y-6">
              <a
                href="https://wa.me/556140428042"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Atendimento Rápido WhatsApp</div>
                  <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors tabular-nums">
                    (61) 4042-8042
                  </div>
                  <div className="text-xs text-emerald-400/90 font-medium">Equipe técnica online agora</div>
                </div>
              </a>

              <a
                href="tel:6140428042"
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase font-semibold">Central Telefônica</div>
                  <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors tabular-nums">
                    (61) 4042-8042
                  </div>
                  <div className="text-xs text-slate-400">Atendimento de Segunda a Sexta, das 8h às 18h</div>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Compromisso de Confidencialidade e LGPD</span>
                </div>
                <p>
                  Seus dados comerciais nunca serão compartilhados com terceiros nem usados para spam.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form or Success Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
              {submittedProtocol ? (
                /* Success Card */
                <div className="text-center py-6 animate-in fade-in duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Solicitação Recebida com Sucesso
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-3">
                    Obrigado pelo contato, {formData.name}!
                  </h3>

                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Registramos seu pedido de proposta comercial para a empresa <strong className="text-white">{formData.company}</strong> referente ao serviço de <strong className="text-cyan-400">{formData.service}</strong>.
                  </p>

                  <div className="inline-block bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 mb-8 font-mono text-xs text-slate-300">
                    Número de Protocolo: <span className="text-cyan-400 font-bold">{submittedProtocol}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-950/40 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Agilizar no WhatsApp Oficial</span>
                    </a>
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Nova Solicitação</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-slate-800 pb-4 mb-4">
                    <h3 className="text-xl font-bold text-white">Solicite uma Proposta Sob Medida</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Preencha os dados abaixo e nosso consultor entrará em contato com a melhor opção para sua operação.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Seu Nome Completo *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="lead-name"
                          type="text"
                          required
                          placeholder="Ex: Carlos Silva"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                            errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-400'
                          }`}
                        />
                      </div>
                      {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="lead-company" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Nome da Empresa *
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="lead-company"
                          type="text"
                          required
                          placeholder="Ex: Alfa Soluções Médicas"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                            errors.company ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-400'
                          }`}
                        />
                      </div>
                      {errors.company && <p className="text-[11px] text-rose-400 mt-1">{errors.company}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone/WhatsApp */}
                    <div>
                      <label htmlFor="lead-phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Telefone / WhatsApp com DDD *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="lead-phone"
                          type="tel"
                          required
                          placeholder="(61) 98765-4321"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none tabular-nums transition-colors ${
                            errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-400'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="lead-email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        E-mail Corporativo *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          id="lead-email"
                          type="email"
                          required
                          placeholder="contato@empresa.com.br"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-950 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${
                            errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-400'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Service Selection */}
                    <div>
                      <label htmlFor="lead-service" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Serviço de Principal Interesse *
                      </label>
                      <select
                        id="lead-service"
                        value={formData.service}
                        onChange={(e) => handleChange('service', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="PABX Virtual em Nuvem">PABX Virtual em Nuvem</option>
                        <option value="Locação de Equipamentos de TI (HaaS)">Locação de Equipamentos de TI (HaaS - Notebooks/Desktops/Servidores)</option>
                        <option value="Cloud File Server / Servidor de Arquivos em Nuvem">Cloud File Server / Servidor de Arquivos em Nuvem</option>
                        <option value="WhatsApp Calling no PABX">WhatsApp Calling no PABX</option>
                        <option value="Suporte de TI & Help Desk (N1/N2/N3)">Suporte de TI & Help Desk (N1/N2/N3)</option>
                        <option value="Telefonia VoIP Corporativa">Telefonia VoIP Corporativa</option>
                        <option value="Portabilidade Numérica">Portabilidade Numérica</option>
                        <option value="URA e Atendimento Automático">URA e Atendimento Automático</option>
                        <option value="Gravação de Chamadas em Nuvem">Gravação de Chamadas em Nuvem</option>
                        <option value="Números Virtuais (DID) e 0800">Números Virtuais (DID) e 0800</option>
                        <option value="Integração com WhatsApp & CRM">Integração com WhatsApp & CRM</option>
                        <option value="Infraestrutura de Redes e Wi-Fi">Infraestrutura de Redes e Wi-Fi</option>
                        <option value="Projeto Completo de Telecom & TI">Projeto Completo de Telecom & TI</option>
                      </select>
                      {errors.service && <p className="text-[11px] text-rose-400 mt-1">{errors.service}</p>}
                    </div>

                    {/* Number of Extensions */}
                    <div>
                      <label htmlFor="lead-extensions" className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Estimativa de Ramais Necessários
                      </label>
                      <select
                        id="lead-extensions"
                        value={formData.extensions}
                        onChange={(e) => handleChange('extensions', parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="2">1 a 3 ramais (Pequena operação)</option>
                        <option value="5">4 a 6 ramais</option>
                        <option value="10">7 a 15 ramais (Média operação)</option>
                        <option value="25">16 a 30 ramais</option>
                        <option value="50">Mais de 30 ramais (Operação Corporativa)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="lead-message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Detalhes ou Observações Adicionais (opcional)
                    </label>
                    <textarea
                      id="lead-message"
                      rows={3}
                      placeholder="Conte um pouco sobre sua operação atual, quantidade de linhas ou dúvidas..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-950/40 hover:shadow-cyan-400/30 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Processando solicitação...</span>
                      ) : (
                        <>
                          <span>Solicitar Orçamento Gratuito</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
