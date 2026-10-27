/**
 * Sysmax Business Telephony Calculator & Form Utilities
 */

export interface SavingsCalculation {
  extensions: number;
  traditionalEstimatedCost: number;
  sysmaxEstimatedCost: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
  tier: 'Starter' | 'Business' | 'Enterprise';
  tierLabel: string;
  recommendedFeatures: string[];
}

export function calculateTelephonySavings(
  extensions: number,
  customSpend?: number
): SavingsCalculation {
  const safeExt = Math.max(1, Math.min(500, Math.round(extensions)));

  // Benchmark traditional costs: ~R$ 115 per line/extension (line rental + hardware maintenance + E1 + tariffs)
  const traditionalCost = customSpend && customSpend > 0
    ? customSpend
    : safeExt * 115;

  // Sysmax Cloud PABX scale:
  // 1-5 extensions: R$ 44.90/ext
  // 6-20 extensions: R$ 39.90/ext
  // 21+ extensions: R$ 34.90/ext
  let pricePerExt = 44.9;
  let tier: 'Starter' | 'Business' | 'Enterprise' = 'Starter';
  let tierLabel = 'Plano Starter Cloud';
  let recommendedFeatures = [
    'PABX Virtual em Nuvem',
    'Ramal no Celular (Softphone)',
    'URA Simples de Atendimento',
    'Portabilidade do Número Atual',
  ];

  if (safeExt >= 21) {
    pricePerExt = 34.9;
    tier = 'Enterprise';
    tierLabel = 'Plano Enterprise Dedicado';
    recommendedFeatures = [
      'PABX Virtual em Nuvem Dedicado',
      'Gravação Contínua de Todas as Chamadas',
      'URA Inteligente Multinível com Fila',
      'Integração com WhatsApp & CRM',
      'Suporte Prioritário & Help Desk TI com SLA',
      'Número 0800 e DIDs Múltiplos',
    ];
  } else if (safeExt >= 6) {
    pricePerExt = 39.9;
    tier = 'Business';
    tierLabel = 'Plano Business Pro';
    recommendedFeatures = [
      'PABX Virtual em Nuvem',
      'Ramais no PC e Celular Ilimitados',
      'URA com Menu e Horário de Atendimento',
      'Gravação de Chamadas com Histórico',
      'Painel de Gestão e Relatórios em Tempo Real',
    ];
  }

  const sysmaxCost = Math.round(safeExt * pricePerExt);
  const monthlySavings = Math.max(0, traditionalCost - sysmaxCost);
  const annualSavings = monthlySavings * 12;
  const savingsPercentage = traditionalCost > 0
    ? Math.round((monthlySavings / traditionalCost) * 100)
    : 0;

  return {
    extensions: safeExt,
    traditionalEstimatedCost: Math.round(traditionalCost),
    sysmaxEstimatedCost: sysmaxCost,
    monthlySavings,
    annualSavings,
    savingsPercentage: Math.min(85, Math.max(10, savingsPercentage)),
    tier,
    tierLabel,
    recommendedFeatures,
  };
}

export function formatPhoneBR(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  // If user pasted with Brazilian country code +55
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    digits = digits.slice(2);
  }
  digits = digits.slice(0, 11);

  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export interface LeadFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  extensions?: number;
  message?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateLeadForm(data: LeadFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Por favor, informe seu nome completo.';
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Por favor, informe o nome da sua empresa.';
  }

  const phoneDigits = data.phone.replace(/\D/g, '');
  if (!phoneDigits || phoneDigits.length < 10) {
    errors.phone = 'Informe um telefone/WhatsApp válido com DDD (ex: 61 98765-4321).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Informe um e-mail corporativo válido.';
  }

  if (!data.service || data.service.trim().length === 0) {
    errors.service = 'Selecione a solução de seu principal interesse.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateWhatsAppQuoteLink(
  data: Partial<LeadFormData> & { extensionsCount?: number }
): string {
  const targetNumber = '556140428042';
  const name = data.name?.trim() || 'Olá';
  const company = data.company?.trim() ? ` da empresa ${data.company.trim()}` : '';
  const service = data.service || 'Telefonia Empresarial / PABX Virtual';
  const ext = data.extensionsCount || data.extensions ? ` (${data.extensionsCount || data.extensions} ramais)` : '';

  const text = encodeURIComponent(
    `Olá Sysmax! Me chamo ${name}${company}. Gostaria de solicitar um orçamento e falar com um especialista sobre: ${service}${ext}. Poderiam me atender?`
  );

  return `https://wa.me/${targetNumber}?text=${text}`;
}

export function generateProtocolNumber(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `SMX-${year}-${randomNum}`;
}

export interface ITAssessmentResult {
  workstations: number;
  servers: number;
  totalEndpoints: number;
  riskScore: number;
  riskLevel: 'Crítico' | 'Elevado' | 'Moderado' | 'Otimizado';
  riskDescription: string;
  recommendedPlan: string;
  monthlyEstimate: number;
  slaTime: string;
  includedPillars: string[];
}

export function calculateITAssessment(
  workstations: number,
  servers: number,
  vulnerabilities: string[] = []
): ITAssessmentResult {
  const safeWorkstations = Math.max(1, Math.min(500, Math.round(workstations)));
  const safeServers = Math.max(0, Math.min(50, Math.round(servers)));
  const total = safeWorkstations + safeServers;

  let score = 25;
  score += vulnerabilities.length * 20;
  if (safeServers > 0 && vulnerabilities.includes('sem-backup-testado')) {
    score += 15;
  }
  score = Math.min(100, Math.max(15, score));

  let riskLevel: 'Crítico' | 'Elevado' | 'Moderado' | 'Otimizado' = 'Moderado';
  let riskDescription = 'Ambiente com gaps de padronização e riscos de continuidade.';
  if (score >= 75) {
    riskLevel = 'Crítico';
    riskDescription = 'Alto risco de paralisação por ransomware, falha de hardware ou perda de dados sem recuperação.';
  } else if (score >= 50) {
    riskLevel = 'Elevado';
    riskDescription = 'Vulnerabilidades ativas que geram paradas recorrentes e insegurança para a diretoria.';
  } else if (score <= 30) {
    riskLevel = 'Otimizado';
    riskDescription = 'Ambiente com boa estrutura, demandando governança contínua e suporte ágil.';
  }

  const costWorkstations = safeWorkstations * (safeWorkstations >= 20 ? 79 : 95);
  const costServers = safeServers * 290;
  const monthlyEstimate = costWorkstations + costServers;

  let recommendedPlan = 'Sysmax MSP Business';
  let slaTime = 'Até 2 horas úteis';
  if (total >= 30 || safeServers >= 3) {
    recommendedPlan = 'Sysmax MSP Enterprise 24/7';
    slaTime = 'Até 1 hora com plantão crítico';
  } else if (total <= 8 && safeServers === 0) {
    recommendedPlan = 'Sysmax MSP Starter';
    slaTime = 'Até 4 horas úteis';
  }

  const includedPillars = [
    'Help Desk N1/N2/N3 Ilimitado (Remoto e Presencial no DF)',
    'Antivírus Corporativo EDR Gerenciado',
    'Monitoramento 24/7 de Saúde dos Computadores e Redes',
    'Gestão de Backup Automatizado 3-2-1 com Teste de Restauração',
    'Gestão de Atualizações e Patches de Segurança',
    'Relatórios Executivos Mensais com Indicadores de SLA',
  ];

  return {
    workstations: safeWorkstations,
    servers: safeServers,
    totalEndpoints: total,
    riskScore: score,
    riskLevel,
    riskDescription,
    recommendedPlan,
    monthlyEstimate,
    slaTime,
    includedPillars,
  };
}

export interface ITSupportPlanDetails {
  id: 'basico' | 'profissional' | 'enterprise';
  name: string;
  pricePerDevice: number;
  totalMonthly: number;
  slaResponse: string;
  supportHours: string;
  levelsIncluded: string[];
  features: string[];
}

export function calculateITSupportPlan(
  planId: 'basico' | 'profissional' | 'enterprise',
  workstations: number
): ITSupportPlanDetails {
  const safeCount = Math.max(1, Math.min(500, Math.round(workstations)));

  if (planId === 'enterprise') {
    return {
      id: 'enterprise',
      name: 'Plano Enterprise 24/7',
      pricePerDevice: 119,
      totalMonthly: safeCount * 119,
      slaResponse: 'Até 1h (com penalidades garantidas)',
      supportHours: '24 horas x 7 dias por semana',
      levelsIncluded: ['N1 (Básico)', 'N2 (Avançado)', 'N3 (Especialistas / Servidores)'],
      features: [
        'Chamados remotos e presenciais ilimitados',
        'Plantão crítico 24x7',
        'Antivírus corporativo EDR gerenciado incluso',
        'Backup 3-2-1 com teste de restauração periódico',
        'Gerente de conta técnico dedicado',
        'Relatórios executivos mensais de governança',
      ],
    };
  }

  if (planId === 'basico') {
    return {
      id: 'basico',
      name: 'Plano Básico Essencial',
      pricePerDevice: 69,
      totalMonthly: safeCount * 69,
      slaResponse: 'Até 4 horas úteis',
      supportHours: 'Segunda a Sexta, das 8h às 18h',
      levelsIncluded: ['N1 (Suporte a Usuários)', 'N2 (Configurações)'],
      features: [
        'Help desk remoto ilimitado',
        'Antivírus corporativo incluso',
        'Inventário de máquinas e licenças',
        'Gestão básica de patches e atualizações',
      ],
    };
  }

  // Default: profissional
  return {
    id: 'profissional',
    name: 'Plano Profissional Pro (Mais Escolhido)',
    pricePerDevice: 89,
    totalMonthly: safeCount * 89,
    slaResponse: 'Até 2 horas úteis',
    supportHours: 'Segunda a Sexta, das 8h às 18h (Plantão estendido)',
    levelsIncluded: ['N1 (Suporte)', 'N2 (Redes)', 'N3 (Servidores & Cloud)'],
    features: [
      'Atendimento remoto ilimitado + visitas presenciais no DF',
      'Monitoramento 24x7 preventivo de integridade',
      'Antivírus corporativo EDR gerenciado',
      'Backup em nuvem com auditoria periódica',
      'SLA rigoroso em contrato com penalidades',
      'Suporte para Windows, Mac, servidores e roteadores',
    ],
  };
}

export function calculateHourlyPackage(hours: 10 | 20 | 40): {
  hours: number;
  hourlyRate: number;
  totalPrice: number;
  savingsPercentage: number;
} {
  const rates = {
    10: { rate: 160, savings: 15 },
    20: { rate: 140, savings: 25 },
    40: { rate: 120, savings: 35 },
  };
  const selected = rates[hours] || rates[20];
  return {
    hours,
    hourlyRate: selected.rate,
    totalPrice: hours * selected.rate,
    savingsPercentage: selected.savings,
  };
}

export interface WhatsAppCallingMetrics {
  agentsCount: number;
  dailyCalls: number;
  simultaneousVoiceChannels: number;
  traditionalCallCostMonthly: number;
  whatsAppVoiceMinuteCost: number;
  monthlyCarrierSavings: number;
  annualSavings: number;
  contactRateIncreasePercent: number;
  estimatedRecoveredContactsPerMonth: number;
  recommendedPlan: string;
  recommendedChannels: string;
}

export function calculateWhatsAppCallingMetrics(
  agentsCount: number,
  dailyCalls: number
): WhatsAppCallingMetrics {
  const safeAgents = Math.max(1, Math.min(200, Math.round(agentsCount)));
  const safeCalls = Math.max(10, Math.min(5000, Math.round(dailyCalls)));

  // Simultaneous voice channels needed based on Erlang B / call volume
  const simultaneousVoiceChannels = Math.max(2, Math.ceil(safeAgents * 0.8));

  // Benchmark traditional mobile minutes: avg 3.2 minutes per call * R$ 0.28 per min * 22 working days
  const monthlyCalls = safeCalls * 22;
  const traditionalCallCostMonthly = Math.round(monthlyCalls * 3.2 * 0.28);
  const whatsAppVoiceMinuteCost = 0; // Meta API SIP trunk audio calls do not consume GSM operator minutes
  const monthlyCarrierSavings = Math.round(traditionalCallCostMonthly * 0.75); // up to 75% savings
  const annualSavings = monthlyCarrierSavings * 12;

  // Contact rate increase benchmark (ConectSIP / TwSolutions data: 22% -> 70% answer rate)
  const contactRateIncreasePercent = 218; // +218% contact answer rate
  const estimatedRecoveredContactsPerMonth = Math.round(monthlyCalls * 0.38);

  let recommendedPlan = 'WhatsApp Calling Starter';
  let recommendedChannels = 'Até 4 canais simultâneos';

  if (safeAgents >= 16 || safeCalls >= 300) {
    recommendedPlan = 'WhatsApp Calling Enterprise & Call Center';
    recommendedChannels = `${simultaneousVoiceChannels} canais simultâneos dedicados com balanceamento`;
  } else if (safeAgents >= 6 || safeCalls >= 80) {
    recommendedPlan = 'WhatsApp Calling Business Pro';
    recommendedChannels = `${simultaneousVoiceChannels} canais simultâneos em alta disponibilidade`;
  }

  return {
    agentsCount: safeAgents,
    dailyCalls: safeCalls,
    simultaneousVoiceChannels,
    traditionalCallCostMonthly,
    whatsAppVoiceMinuteCost,
    monthlyCarrierSavings,
    annualSavings,
    contactRateIncreasePercent,
    estimatedRecoveredContactsPerMonth,
    recommendedPlan,
    recommendedChannels,
  };
}

export interface CloudStoragePlanResult {
  storageTB: number;
  usersCount: number;
  monthlyCloudCost: number;
  traditionalOnPremCost: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
  recommendedPlan: string;
  retentionDays: number;
  ransomwareRollbackSpeed: string;
  features: string[];
}

export function calculateCloudStoragePlan(
  storageTB: number,
  usersCount: number
): CloudStoragePlanResult {
  const safeStorage = Math.max(0.5, Math.min(50, Number(storageTB.toFixed(1))));
  const safeUsers = Math.max(3, Math.min(500, Math.round(usersCount)));

  // Sysmax Cloud File Server pricing structure:
  // Base storage per TB: R$ 99/TB
  // User license (sync agent, desktop mapped drive, mobile app, AES-256):
  // 3-15 users: R$ 24.90/user
  // 16-50 users: R$ 19.90/user
  // 51+ users: R$ 15.90/user
  let perUserRate = 24.9;
  let recommendedPlan = 'Cloud File Server Starter';
  let retentionDays = 30;

  if (safeUsers >= 51 || safeStorage >= 5) {
    perUserRate = 15.9;
    recommendedPlan = 'Cloud File Server Enterprise';
    retentionDays = 90;
  } else if (safeUsers >= 16 || safeStorage >= 2) {
    perUserRate = 19.9;
    recommendedPlan = 'Cloud File Server Business Pro';
    retentionDays = 60;
  }

  const storageCost = Math.round(safeStorage * 99);
  const userCost = Math.round(safeUsers * perUserRate);
  const monthlyCloudCost = storageCost + userCost;

  // Traditional On-Premises File Server cost estimate:
  // Base fixed hardware & energy: R$ 750/mo + R$ 22/user CAL & AV + R$ 90/TB storage media
  const traditionalFixed = 750;
  const traditionalCALs = safeUsers * 22;
  const traditionalDrives = Math.round(safeStorage * 90);
  const traditionalOnPremCost = traditionalFixed + traditionalCALs + traditionalDrives;

  const monthlySavings = Math.max(0, traditionalOnPremCost - monthlyCloudCost);
  const annualSavings = monthlySavings * 12;
  const savingsPercentage = traditionalOnPremCost > 0
    ? Math.round((monthlySavings / traditionalOnPremCost) * 100)
    : 0;

  const features = [
    'Acesso nativo como disco local (Letra Z:) sem sobrecarregar SSD',
    `Retenção imutável de ${retentionDays} dias contra exclusão acidental e Ransomware`,
    'Criptografia ponta a ponta (SSL 256 bits + AES-256 no repouso)',
    'Controle granular de permissões por grupo, usuário e pasta',
    'Conformidade integral com a LGPD e auditoria com logs de acesso',
    'Sincronização em tempo real para Windows, macOS, iOS e Android',
    'Datacenter Tier III em solo brasileiro com SLA 99,9% garantido',
  ];

  return {
    storageTB: safeStorage,
    usersCount: safeUsers,
    monthlyCloudCost,
    traditionalOnPremCost,
    monthlySavings,
    annualSavings,
    savingsPercentage: Math.min(85, Math.max(15, savingsPercentage)),
    recommendedPlan,
    retentionDays,
    ransomwareRollbackSpeed: 'Rollback imediato com 1 clique',
    features,
  };
}

export interface EquipmentRentalQuoteInput {
  notebooks: number;
  desktops: number;
  servers: number;
  contractMonths: 12 | 24 | 36;
  slaTier: 'standard' | 'critical';
  taxRegime: 'lucro_real' | 'outros';
}

export interface EquipmentRentalQuoteResult {
  totalDevices: number;
  notebooks: number;
  desktops: number;
  servers: number;
  contractMonths: 12 | 24 | 36;
  slaTier: 'standard' | 'critical';
  taxRegime: 'lucro_real' | 'outros';
  monthlyRental: number;
  totalContractRental: number;
  upfrontPurchaseCost: number;
  estimatedMaintenanceSavedPerYear: number;
  estimatedTaxCreditMonthly: number;
  estimatedTaxCreditTotal: number;
  effectiveMonthlyCost: number;
  capitalPreservedImmediately: number;
  planName: string;
  slaText: string;
  includedBenefits: string[];
}

export function calculateEquipmentRentalQuote(
  input: EquipmentRentalQuoteInput
): EquipmentRentalQuoteResult {
  const safeNB = Math.max(0, Math.min(200, Math.round(input.notebooks || 0)));
  const safeDT = Math.max(0, Math.min(200, Math.round(input.desktops || 0)));
  const safeSRV = Math.max(0, Math.min(50, Math.round(input.servers || 0)));
  const totalDevices = safeNB + safeDT + safeSRV;

  const months = input.contractMonths === 12 || input.contractMonths === 24 ? input.contractMonths : 36;
  const slaTier = input.slaTier === 'critical' ? 'critical' : 'standard';
  const taxRegime = input.taxRegime === 'lucro_real' ? 'lucro_real' : 'outros';

  // Base 36m monthly unit rental
  const baseRateNB = 189; // Dell Latitude / Lenovo ThinkPad Core i5, 16GB, 512GB SSD
  const baseRateDT = 159; // Desktop Core i5 + Monitor 24" FHD + teclado/mouse
  const baseRateSRV = 490; // Servidor Rack / Firewall UTM dedicado

  // Term multipliers
  const termMultiplier = months === 12 ? 1.28 : months === 24 ? 1.12 : 1.0;

  // SLA multipliers
  const slaMultiplier = slaTier === 'critical' ? 1.12 : 1.0;

  // Base raw monthly sum
  const baseSum = (safeNB * baseRateNB) + (safeDT * baseRateDT) + (safeSRV * baseRateSRV);
  const adjustedMonthly = baseSum * termMultiplier * slaMultiplier;

  // Volume discount for fleet scale
  let volumeDiscount = 0;
  if (totalDevices >= 50) {
    volumeDiscount = 0.15;
  } else if (totalDevices >= 20) {
    volumeDiscount = 0.10;
  } else if (totalDevices >= 10) {
    volumeDiscount = 0.05;
  }

  const monthlyRental = Math.round(Math.max(180, adjustedMonthly * (1 - volumeDiscount)));
  const totalContractRental = monthlyRental * months;

  // CAPEX purchase comparison:
  // Buying enterprise notebook: ~R$ 5,200 (com garantia pro e Windows 11 Pro)
  // Buying desktop + monitor corporativo: ~R$ 4,400
  // Buying enterprise server/firewall: ~R$ 14,000
  const upfrontPurchaseCost = (safeNB * 5200) + (safeDT * 4400) + (safeSRV * 14000);

  // Annual maintenance/spare parts/internal labor costs saved when renting (~14% of asset value)
  const estimatedMaintenanceSavedPerYear = Math.round(upfrontPurchaseCost * 0.14);

  // Tax credit estimation (Lucro Real: 34% IRPJ + CSLL dedutível como despesa operacional OPEX)
  const estimatedTaxCreditMonthly = taxRegime === 'lucro_real'
    ? Math.round(monthlyRental * 0.34)
    : 0;
  const estimatedTaxCreditTotal = estimatedTaxCreditMonthly * months;
  const effectiveMonthlyCost = Math.max(0, monthlyRental - estimatedTaxCreditMonthly);

  // Capital preserved immediately: The upfront purchase price minus the first month payment
  const capitalPreservedImmediately = Math.max(0, upfrontPurchaseCost - monthlyRental);

  let planName = 'Sysmax HaaS Essential';
  if (totalDevices >= 30 || safeSRV >= 3) {
    planName = 'Sysmax HaaS Enterprise Scale';
  } else if (totalDevices >= 10 || slaTier === 'critical') {
    planName = 'Sysmax HaaS Corporate Pro';
  }

  const slaText = slaTier === 'critical'
    ? 'Swap Crítico em até 4 horas com equipamento reserva local'
    : 'Swap Padrão em até 24 horas úteis sem custo adicional';

  const includedBenefits = [
    'Substituição expressa (Swap de máquina) sem interrupção da sua operação',
    'Windows 11 Pro original e imagem corporativa padronizada com softwares da sua empresa',
    'Manutenção preventiva e corretiva completa (peças, componentes e mão de obra inclusos)',
    '100% de dedução fiscal do IRPJ e CSLL como OPEX para optantes pelo Lucro Real',
    'Zero desvalorização ou perda com obsolescência tecnológica de hardware',
    'Gestão completa do ciclo de vida e descarte ecológico com laudo de descaracterização de dados (LGPD)',
    'Suporte técnico Sysmax N1, N2 e N3 incluso durante toda a vigência do contrato',
  ];

  return {
    totalDevices,
    notebooks: safeNB,
    desktops: safeDT,
    servers: safeSRV,
    contractMonths: months,
    slaTier,
    taxRegime,
    monthlyRental,
    totalContractRental,
    upfrontPurchaseCost,
    estimatedMaintenanceSavedPerYear,
    estimatedTaxCreditMonthly,
    estimatedTaxCreditTotal,
    effectiveMonthlyCost,
    capitalPreservedImmediately,
    planName,
    slaText,
    includedBenefits,
  };
}

export interface PrintOutsourcingQuoteInput {
  monoPagesMonthly: number;
  colorPagesMonthly: number;
  printersCount: number;
  printerType: 'mono_compact' | 'mono_departamental' | 'color_multifunction' | 'thermal_barcode';
  contractMonths: 12 | 24 | 36;
  taxRegime: 'lucro_real' | 'outros';
}

export interface PrintOutsourcingQuoteResult {
  monoPagesMonthly: number;
  colorPagesMonthly: number;
  totalPagesMonthly: number;
  printersCount: number;
  printerType: 'mono_compact' | 'mono_departamental' | 'color_multifunction' | 'thermal_barcode';
  contractMonths: 12 | 24 | 36;
  taxRegime: 'lucro_real' | 'outros';
  monthlyRental: number;
  traditionalCostMonthly: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
  costPerPageMono: number;
  costPerPageColor: number;
  recommendedHardware: string;
  tonersEstimatedPerYear: number;
  taxCreditMonthly: number;
  effectiveMonthlyCost: number;
  includedBenefits: string[];
}

export function calculatePrintOutsourcingQuote(
  input: PrintOutsourcingQuoteInput
): PrintOutsourcingQuoteResult {
  const safeMono = Math.max(0, Math.min(200000, Math.round(input.monoPagesMonthly || 0)));
  const safeColor = Math.max(0, Math.min(50000, Math.round(input.colorPagesMonthly || 0)));
  const safePrinters = Math.max(1, Math.min(50, Math.round(input.printersCount || 1)));
  const totalPages = safeMono + safeColor;

  const months = input.contractMonths === 12 || input.contractMonths === 24 ? input.contractMonths : 36;
  const taxRegime = input.taxRegime === 'lucro_real' ? 'lucro_real' : 'outros';

  const machineBaseRate = {
    mono_compact: 149,
    mono_departamental: 249,
    color_multifunction: 339,
    thermal_barcode: 179,
  }[input.printerType] || 149;

  const costPerPageMono = 0.048;
  const costPerPageColor = 0.28;

  const termFactor = months === 12 ? 1.25 : months === 24 ? 1.10 : 1.0;

  const hardwareCost = safePrinters * machineBaseRate * termFactor;
  const pagesCost = (safeMono * costPerPageMono) + (safeColor * costPerPageColor);
  
  let volumeDiscount = 0;
  if (totalPages >= 30000) {
    volumeDiscount = 0.15;
  } else if (totalPages >= 10000) {
    volumeDiscount = 0.08;
  }

  const rawMonthly = (hardwareCost + pagesCost) * (1 - volumeDiscount);
  const monthlyRental = Math.round(Math.max(189, rawMonthly));

  const traditionalPagesCost = (safeMono * 0.12) + (safeColor * 0.60);
  const traditionalHardwareAmortization = safePrinters * 180;
  const traditionalCostMonthly = Math.round(traditionalPagesCost + traditionalHardwareAmortization + 160);

  const monthlySavings = Math.max(0, traditionalCostMonthly - monthlyRental);
  const annualSavings = monthlySavings * 12;
  const savingsPercentage = traditionalCostMonthly > 0
    ? Math.round((monthlySavings / traditionalCostMonthly) * 100)
    : 0;

  const taxCreditMonthly = taxRegime === 'lucro_real'
    ? Math.round(monthlyRental * 0.34)
    : 0;
  const effectiveMonthlyCost = Math.max(0, monthlyRental - taxCreditMonthly);

  const tonersEstimatedPerYear = Math.max(2, Math.ceil(totalPages * 12 / 3200));

  let recommendedHardware = 'Multifuncional Laser Monocromática Corporativa';
  if (input.printerType === 'color_multifunction') {
    recommendedHardware = 'Multifuncional Laser Colorida A4/A3 com Digitalização em Nuvem';
  } else if (input.printerType === 'mono_departamental') {
    recommendedHardware = 'Multifuncional Departamental de Alta Produção (50+ ppm)';
  } else if (input.printerType === 'thermal_barcode') {
    recommendedHardware = 'Impressora Térmica Industrial Zebra/Argox para Etiquetas';
  }

  const includedBenefits = [
    'Toners e cilindros 100% inclusos com monitoramento remoto inteligente',
    'Assistência técnica preventiva e corretiva presencial em todo o DF',
    'Máquina de backup imediata (Swap) caso o equipamento necessite de reparo complexo',
    'Software de bilhetagem com liberação segura por PIN ou crachá (Zero desperdício)',
    '100% de dedução fiscal como despesa operacional (OPEX) para empresas no Lucro Real',
    'Relatórios detalhados de consumo por centro de custo, departamento e colaborador',
    'Atendimento técnico ágil com técnicos locais em Brasília, Taguatinga e Região',
  ];

  return {
    monoPagesMonthly: safeMono,
    colorPagesMonthly: safeColor,
    totalPagesMonthly: totalPages,
    printersCount: safePrinters,
    printerType: input.printerType,
    contractMonths: months,
    taxRegime,
    monthlyRental,
    traditionalCostMonthly,
    monthlySavings,
    annualSavings,
    savingsPercentage: Math.min(65, Math.max(15, savingsPercentage)),
    costPerPageMono,
    costPerPageColor,
    recommendedHardware,
    tonersEstimatedPerYear,
    taxCreditMonthly,
    effectiveMonthlyCost,
    includedBenefits,
  };
}

export interface WebsiteQuoteInput {
  projectType: 'landing_page' | 'institutional' | 'ecommerce' | 'portal_custom';
  pagesCount?: number;
  features?: string[];
  urgency?: 'standard' | 'express';
}

export interface WebsiteQuoteResult {
  projectType: 'landing_page' | 'institutional' | 'ecommerce' | 'portal_custom';
  planName: string;
  basePrice: number;
  featuresPrice: number;
  totalEstimatedPrice: number;
  estimatedBusinessDays: number;
  installmentOption: string;
  deliverables: string[];
  techStack: string[];
  seoScoreProjected: string;
}

export function calculateWebsiteQuote(input: WebsiteQuoteInput): WebsiteQuoteResult {
  const pType = input.projectType || 'institutional';
  const features = input.features || [];
  const urgency = input.urgency || 'standard';

  // Base pricing based on Brazilian market references (ZagSites, SitesCWB, WebDesignBrasil, UpSites)
  let basePrice = 1890;
  let baseDays = 12;
  let planName = 'Site Institucional Corporativo Pro';

  if (pType === 'landing_page') {
    basePrice = 1290;
    baseDays = 7;
    planName = 'Landing Page de Alta Conversão';
  } else if (pType === 'ecommerce') {
    basePrice = 3490;
    baseDays = 22;
    planName = 'Loja Virtual E-commerce Completa';
  } else if (pType === 'portal_custom') {
    basePrice = 4890;
    baseDays = 30;
    planName = 'Portal Personalizado & Catálogo Digital';
  }

  // Feature add-on pricing
  const featurePricing: Record<string, { price: number; extraDays: number }> = {
    seo_advanced: { price: 390, extraDays: 2 },
    whatsapp_crm: { price: 250, extraDays: 1 },
    blog: { price: 350, extraDays: 2 },
    multilingual: { price: 590, extraDays: 3 },
    corporate_emails: { price: 190, extraDays: 1 },
    copywriting: { price: 450, extraDays: 2 },
  };

  let featuresPrice = 0;
  let extraDays = 0;

  for (const f of features) {
    if (featurePricing[f]) {
      featuresPrice += featurePricing[f].price;
      extraDays += featurePricing[f].extraDays;
    }
  }

  let totalDays = baseDays + extraDays;
  let urgencyMultiplier = 1.0;

  if (urgency === 'express') {
    urgencyMultiplier = 1.25;
    totalDays = Math.max(4, Math.round(totalDays * 0.65));
  }

  const totalEstimatedPrice = Math.round((basePrice + featuresPrice) * urgencyMultiplier);
  const installmentVal = Math.round(totalEstimatedPrice / 10);
  const installmentOption = `10x de R$ ${installmentVal.toLocaleString('pt-BR')} sem juros`;

  const deliverables = [
    'Design 100% exclusivo e responsivo (Mobile-First, Tablet e Desktop)',
    'Painel administrativo WordPress intuitivo e autogerenciável',
    'Otimização de velocidade Core Web Vitals (Tempo de carregamento < 2s)',
    'Estrutura preparada para o Google (SEO On-page, Meta Tags, Sitemap e robots.txt)',
    'Certificado de Segurança SSL (HTTPS) incluso gratuitamente',
    'Integração direta com botão flutuante de WhatsApp e formulários anti-spam',
    'Conformidade com a LGPD (Aviso de Cookies e Termos de Privacidade)',
    'Treinamento em vídeo para sua equipe gerenciar o site sem custos mensais',
  ];

  if (pType === 'ecommerce') {
    deliverables.push(
      'Integração de meios de pagamento (Pix instantâneo, Cartão de Crédito em até 12x e Boleto)',
      'Cálculo de frete automático (Correios, Melhor Envio, Jadlog e Motoboy DF)',
      'Gestão visual de estoque, variações de produto e cupons de desconto'
    );
  }

  if (pType === 'landing_page') {
    deliverables.push(
      'Copywriting persuasivo e gatilhos mentais estruturados para máxima conversão de leads',
      'Integração com Meta Pixel (Facebook/Instagram Ads) e Google Tag Manager / GA4'
    );
  }

  const techStack = [
    'WordPress & Elementor Pro / PHP 8.5',
    'HTML5 Semântico, CSS3 / Tailwind e JavaScript Moderno',
    'Nginx / Apache HTTP/3 com Cache Avançado e CDN Cloudflare',
    'Banco de Dados MySQL / MariaDB Otimizado',
  ];

  return {
    projectType: pType,
    planName,
    basePrice,
    featuresPrice,
    totalEstimatedPrice,
    estimatedBusinessDays: totalDays,
    installmentOption,
    deliverables,
    techStack,
    seoScoreProjected: '95+ no Google PageSpeed',
  };
}

