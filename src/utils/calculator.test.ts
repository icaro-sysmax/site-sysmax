import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTelephonySavings,
  formatPhoneBR,
  validateLeadForm,
  generateWhatsAppQuoteLink,
  generateProtocolNumber,
  calculateITAssessment,
  calculateITSupportPlan,
  calculateHourlyPackage,
  calculateWhatsAppCallingMetrics,
  calculateCloudStoragePlan,
  calculateEquipmentRentalQuote,
  calculatePrintOutsourcingQuote,
} from './calculator';

test('calculateITSupportPlan computes plans, SLA, and pricing accurately', () => {
  const pro = calculateITSupportPlan('profissional', 10);
  assert.equal(pro.id, 'profissional');
  assert.equal(pro.totalMonthly, 890);
  assert.ok(pro.slaResponse.includes('2'));
  assert.ok(pro.levelsIncluded.length === 3);

  const ent = calculateITSupportPlan('enterprise', 20);
  assert.equal(ent.totalMonthly, 2380);
  assert.ok(ent.supportHours.includes('24'));

  const basic = calculateITSupportPlan('basico', 5);
  assert.equal(basic.totalMonthly, 345);
});

test('calculateHourlyPackage computes rate tiers correctly', () => {
  const pack10 = calculateHourlyPackage(10);
  assert.equal(pack10.totalPrice, 1600);
  assert.equal(pack10.hourlyRate, 160);

  const pack40 = calculateHourlyPackage(40);
  assert.equal(pack40.totalPrice, 4800);
  assert.equal(pack40.savingsPercentage, 35);
});


test('calculateITAssessment computes risk score, levels, and plans accurately', () => {
  // Test low-risk optimized setup
  const lowRisk = calculateITAssessment(5, 0, []);
  assert.equal(lowRisk.totalEndpoints, 5);
  assert.equal(lowRisk.riskLevel, 'Otimizado');
  assert.equal(lowRisk.recommendedPlan, 'Sysmax MSP Starter');
  assert.ok(lowRisk.monthlyEstimate > 0);

  // Test high-risk environment with multiple critical issues
  const highRisk = calculateITAssessment(25, 2, [
    'sem-backup-testado',
    'sem-antivirus-central',
    'suporte-lento',
  ]);
  assert.equal(highRisk.totalEndpoints, 27);
  assert.equal(highRisk.riskLevel, 'Crítico');
  assert.ok(highRisk.riskScore >= 75);
  assert.ok(highRisk.includedPillars.some((p) => p.includes('Backup')));
});


test('calculateTelephonySavings correctly computes tiers and savings', () => {
  // Test Starter tier (5 extensions)
  const starter = calculateTelephonySavings(5);
  assert.equal(starter.extensions, 5);
  assert.equal(starter.tier, 'Starter');
  assert.ok(starter.sysmaxEstimatedCost > 0);
  assert.ok(starter.monthlySavings > 0);
  assert.ok(starter.annualSavings === starter.monthlySavings * 12);
  assert.ok(starter.savingsPercentage >= 50);

  // Test Business tier (15 extensions)
  const business = calculateTelephonySavings(15);
  assert.equal(business.extensions, 15);
  assert.equal(business.tier, 'Business');
  assert.ok(business.recommendedFeatures.includes('PABX Virtual em Nuvem'));

  // Test Enterprise tier (30 extensions)
  const enterprise = calculateTelephonySavings(30);
  assert.equal(enterprise.extensions, 30);
  assert.equal(enterprise.tier, 'Enterprise');
  assert.ok(enterprise.recommendedFeatures.some((f) => f.includes('Dedicado')));

  // Test custom spend
  const custom = calculateTelephonySavings(10, 2000);
  assert.equal(custom.traditionalEstimatedCost, 2000);
  assert.ok(custom.monthlySavings === 2000 - custom.sysmaxEstimatedCost);
});

test('formatPhoneBR formats Brazilian phone numbers dynamically', () => {
  assert.equal(formatPhoneBR(''), '');
  assert.equal(formatPhoneBR('61'), '(61');
  assert.equal(formatPhoneBR('614042'), '(61) 4042');
  assert.equal(formatPhoneBR('6140428042'), '(61) 4042-8042');
  assert.equal(formatPhoneBR('61987654321'), '(61) 98765-4321');
  // strips non-digits
  assert.equal(formatPhoneBR('+55 (61) 98765-4321'), '(61) 98765-4321');
});

test('validateLeadForm verifies mandatory fields accurately', () => {
  // Incomplete data
  const invalid = validateLeadForm({
    name: '',
    company: '',
    phone: '123',
    email: 'not-an-email',
    service: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.company);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.service);

  // Valid data
  const valid = validateLeadForm({
    name: 'Carlos Oliveira',
    company: 'Oliveira Advogados',
    phone: '(61) 99123-4567',
    email: 'carlos@oliveira.adv.br',
    service: 'PABX Virtual em Nuvem',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('generateWhatsAppQuoteLink builds valid link with official number', () => {
  const link = generateWhatsAppQuoteLink({
    name: 'Mariana',
    company: 'Tech Consultoria',
    phone: '(61) 98888-7777',
    service: 'Portabilidade Numérica',
    extensions: 12,
  });
  assert.ok(link.startsWith('https://wa.me/556140428042?text='));
  assert.ok(link.includes('Mariana'));
  assert.ok(link.includes('Tech%20Consultoria'));
  assert.ok(link.includes('12%20ramais'));
});

test('generateProtocolNumber generates valid protocol format', () => {
  const proto = generateProtocolNumber();
  assert.match(proto, /^SMX-2026-\d{4}$/);
});

test('calculateWhatsAppCallingMetrics calculates simultaneous channels, savings and answer rate accurately', () => {
  const metrics = calculateWhatsAppCallingMetrics(10, 150);
  assert.equal(metrics.agentsCount, 10);
  assert.equal(metrics.dailyCalls, 150);
  assert.ok(metrics.simultaneousVoiceChannels >= 8);
  assert.ok(metrics.monthlyCarrierSavings > 0);
  assert.ok(metrics.annualSavings === metrics.monthlyCarrierSavings * 12);
  assert.equal(metrics.whatsAppVoiceMinuteCost, 0);
  assert.equal(metrics.recommendedPlan, 'WhatsApp Calling Business Pro');
  assert.ok(metrics.estimatedRecoveredContactsPerMonth > 0);
});

test('calculateCloudStoragePlan computes cloud storage pricing, savings vs on-prem, and retention tiers accurately', () => {
  // Small team test (1 TB, 10 users)
  const starter = calculateCloudStoragePlan(1, 10);
  assert.equal(starter.storageTB, 1);
  assert.equal(starter.usersCount, 10);
  assert.equal(starter.recommendedPlan, 'Cloud File Server Starter');
  assert.equal(starter.retentionDays, 30);
  assert.ok(starter.monthlyCloudCost > 0);
  assert.ok(starter.traditionalOnPremCost > starter.monthlyCloudCost);
  assert.ok(starter.monthlySavings > 0);
  assert.ok(starter.annualSavings === starter.monthlySavings * 12);
  assert.ok(starter.savingsPercentage >= 20);

  // Business tier test (3 TB, 25 users)
  const business = calculateCloudStoragePlan(3, 25);
  assert.equal(business.recommendedPlan, 'Cloud File Server Business Pro');
  assert.equal(business.retentionDays, 60);

  // Enterprise tier test (10 TB, 80 users)
  const enterprise = calculateCloudStoragePlan(10, 80);
  assert.equal(enterprise.recommendedPlan, 'Cloud File Server Enterprise');
  assert.equal(enterprise.retentionDays, 90);
  assert.ok(enterprise.features.some((f) => f.includes('LGPD')));
  assert.ok(enterprise.features.some((f) => f.includes('AES-256')));
});

test('calculateEquipmentRentalQuote calculates equipment rental, CAPEX economy, tax benefits, and SLA tiers', () => {
  // Test corporate fleet: 10 notebooks, 5 desktops, 1 server, 36m, Lucro Real, Critical SLA
  const quote = calculateEquipmentRentalQuote({
    notebooks: 10,
    desktops: 5,
    servers: 1,
    contractMonths: 36,
    slaTier: 'critical',
    taxRegime: 'lucro_real',
  });

  assert.equal(quote.totalDevices, 16);
  assert.equal(quote.notebooks, 10);
  assert.equal(quote.desktops, 5);
  assert.equal(quote.servers, 1);
  assert.equal(quote.contractMonths, 36);
  assert.equal(quote.slaTier, 'critical');
  assert.equal(quote.taxRegime, 'lucro_real');

  // Verify financial outputs
  assert.ok(quote.monthlyRental > 0);
  assert.ok(quote.upfrontPurchaseCost > 50000, 'Upfront purchase CAPEX should be substantial');
  assert.ok(quote.capitalPreservedImmediately > 0);
  assert.ok(quote.estimatedTaxCreditMonthly > 0, 'Lucro Real must compute 34% tax deduction');
  assert.equal(quote.effectiveMonthlyCost, quote.monthlyRental - quote.estimatedTaxCreditMonthly);
  assert.ok(quote.slaText.includes('4 horas'));
  assert.ok(quote.includedBenefits.some((b) => b.includes('Swap')));
  assert.ok(quote.includedBenefits.some((b) => b.includes('Windows 11 Pro')));

  // Test starter fleet with 12m contract and standard SLA
  const starter = calculateEquipmentRentalQuote({
    notebooks: 3,
    desktops: 2,
    servers: 0,
    contractMonths: 12,
    slaTier: 'standard',
    taxRegime: 'outros',
  });

  assert.equal(starter.totalDevices, 5);
  assert.equal(starter.contractMonths, 12);
  assert.equal(starter.slaTier, 'standard');
  assert.equal(starter.estimatedTaxCreditMonthly, 0); // Outros regimes do not deduct 34%
  assert.equal(starter.effectiveMonthlyCost, starter.monthlyRental);
  assert.ok(starter.slaText.includes('24 horas'));
});

test('calculatePrintOutsourcingQuote calculates print volume, toners, savings and tax credits accurately', () => {
  // Test scenario: 8,000 mono pages, 1,000 color pages, 2 multifunctions, 36m, Lucro Real
  const quote = calculatePrintOutsourcingQuote({
    monoPagesMonthly: 8000,
    colorPagesMonthly: 1000,
    printersCount: 2,
    printerType: 'color_multifunction',
    contractMonths: 36,
    taxRegime: 'lucro_real',
  });

  assert.equal(quote.monoPagesMonthly, 8000);
  assert.equal(quote.colorPagesMonthly, 1000);
  assert.equal(quote.totalPagesMonthly, 9000);
  assert.equal(quote.printersCount, 2);
  assert.equal(quote.printerType, 'color_multifunction');
  assert.equal(quote.contractMonths, 36);
  assert.equal(quote.taxRegime, 'lucro_real');

  assert.ok(quote.monthlyRental > 0);
  assert.ok(quote.traditionalCostMonthly > quote.monthlyRental, 'Traditional purchase and toner should cost more than outsourcing');
  assert.ok(quote.monthlySavings > 0);
  assert.ok(quote.annualSavings === quote.monthlySavings * 12);
  assert.ok(quote.savingsPercentage >= 20);
  assert.ok(quote.taxCreditMonthly > 0, 'Lucro Real should calculate 34% tax deduction');
  assert.equal(quote.effectiveMonthlyCost, quote.monthlyRental - quote.taxCreditMonthly);
  assert.ok(quote.tonersEstimatedPerYear >= 10);
  assert.ok(quote.includedBenefits.some((b) => b.includes('Toners e cilindros 100% inclusos')));
  assert.ok(quote.includedBenefits.some((b) => b.includes('Swap')));
  assert.ok(quote.includedBenefits.some((b) => b.includes('bilhetagem')));

  // Test compact mono printer with 12m contract and non-lucro-real
  const compact = calculatePrintOutsourcingQuote({
    monoPagesMonthly: 2500,
    colorPagesMonthly: 0,
    printersCount: 1,
    printerType: 'mono_compact',
    contractMonths: 12,
    taxRegime: 'outros',
  });

  assert.equal(compact.colorPagesMonthly, 0);
  assert.equal(compact.taxCreditMonthly, 0);
  assert.equal(compact.effectiveMonthlyCost, compact.monthlyRental);
  assert.ok(compact.monthlySavings > 0);
});

