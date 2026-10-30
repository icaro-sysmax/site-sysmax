import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BenefitsBanner } from './components/BenefitsBanner';
import { ServicesGrid } from './components/ServicesGrid';
import { ProblemSolution } from './components/ProblemSolution';
import { EconomyCalculator } from './components/EconomyCalculator';
import { StepByStep } from './components/StepByStep';
import { TrustAndCases } from './components/TrustAndCases';
import { FaqSection } from './components/FaqSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ManagedITView } from './components/ManagedITView';
import { ITSupportView } from './components/ITSupportView';
import { WhatsAppCallingView } from './components/WhatsAppCallingView';
import { CloudFileServerView } from './components/CloudFileServerView';
import { EquipmentRentalView } from './components/EquipmentRentalView';
import { PrintOutsourcingView } from './components/PrintOutsourcingView';
import { WebsiteCreationView } from './components/WebsiteCreationView';

interface AppProps {
  initialView?: 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao' | 'criacao-sites';
}

export function getServiceHtmlFile(view: 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao' | 'criacao-sites'): string {
  switch (view) {
    case 'telefonia': return 'index.html';
    case 'whatsapp-calling': return 'whatsapp-calling.html';
    case 'suporte-ti': return 'suporte-ti.html';
    case 'ti': return 'ti-gerenciada.html';
    case 'cloud': return 'cloud-file-server.html';
    case 'locacao': return 'locacao-de-equipamentos.html';
    case 'impressao': return 'outsourcing-de-impressao.html';
    case 'criacao-sites': return 'criacao-de-sites.html';
    default: return 'index.html';
  }
}

export default function App({ initialView = 'telefonia' }: AppProps = {}) {
  const resolveInitialView = (): 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao' | 'criacao-sites' => {
    if (typeof window === 'undefined') return initialView;
    if ((window as any).__SYSMAX_PAGE_VIEW__) {
      return (window as any).__SYSMAX_PAGE_VIEW__;
    }

    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const servico = params.get('servico') || params.get('page');

    if (path.includes('site') || path.includes('marketing') || hash.includes('site') || hash.includes('marketing') || servico === 'criacao-sites') {
      return 'criacao-sites';
    }
    if (path.includes('impress') || path.includes('outsourcing') || hash.includes('impress') || hash.includes('outsourcing') || servico === 'impressao') {
      return 'impressao';
    }
    if (path.includes('locacao') || path.includes('haas') || path.includes('equipamento') || hash.includes('locacao') || servico === 'locacao') {
      return 'locacao';
    }
    if (path.includes('whatsapp') || hash.includes('whatsapp') || servico === 'whatsapp-calling') {
      return 'whatsapp-calling';
    }
    if (path.includes('cloud') || hash.includes('cloud') || servico === 'cloud') {
      return 'cloud';
    }
    if (path.includes('suporte') || hash.includes('suporte') || servico === 'suporte-ti') {
      return 'suporte-ti';
    }
    if (path.includes('ti') || hash.includes('ti') || servico === 'ti') {
      return 'ti';
    }
    return initialView;
  };

  const [currentView, setCurrentView] = useState<'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao' | 'criacao-sites'>(resolveInitialView);
  const [selectedService, setSelectedService] = useState<string>('PABX Virtual em Nuvem');
  const [selectedExtensions, setSelectedExtensions] = useState<number>(5);

  useEffect(() => {
    const checkHashAndParams = () => {
      if (typeof window === 'undefined') return;

      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const servico = params.get('servico') || params.get('page');

      // Hash ou query params prioritários
      if (hash.includes('site') || hash.includes('marketing') || servico === 'criacao-sites') {
        setCurrentView('criacao-sites');
        return;
      } else if (hash.includes('impress') || hash.includes('outsourcing') || servico === 'impressao') {
        setCurrentView('impressao');
        return;
      } else if (hash.includes('locacao') || hash.includes('haas') || hash.includes('equipamento') || servico === 'locacao') {
        setCurrentView('locacao');
        return;
      } else if (hash.includes('cloud') || servico === 'cloud') {
        setCurrentView('cloud');
        return;
      } else if (hash.includes('whatsapp') || servico === 'whatsapp-calling') {
        setCurrentView('whatsapp-calling');
        return;
      } else if (hash.includes('suporte') || servico === 'suporte-ti') {
        setCurrentView('suporte-ti');
        return;
      } else if (hash.includes('ti-gerenciada') || hash.includes('msp') || servico === 'ti') {
        setCurrentView('ti');
        return;
      } else if (hash.includes('telefonia') || hash.includes('pabx') || servico === 'telefonia') {
        setCurrentView('telefonia');
        return;
      }

      // Se a página injetou explicitamente sua view padrão (ex: SSR / SSG estático)
      if ((window as any).__SYSMAX_PAGE_VIEW__) {
        setCurrentView((window as any).__SYSMAX_PAGE_VIEW__);
        return;
      }

      // Se não há hash de serviço, respeita a rota do pathname
      const path = window.location.pathname.toLowerCase();
      if (path.includes('site') || path.includes('marketing')) {
        setCurrentView('criacao-sites');
      } else if (path.includes('impress') || path.includes('outsourcing')) {
        setCurrentView('impressao');
      } else if (path.includes('locacao') || path.includes('haas') || path.includes('equipamento')) {
        setCurrentView('locacao');
      } else if (path.includes('cloud')) {
        setCurrentView('cloud');
      } else if (path.includes('whatsapp')) {
        setCurrentView('whatsapp-calling');
      } else if (path.includes('suporte')) {
        setCurrentView('suporte-ti');
      } else if (path.includes('ti-gerenciada') || path.includes('ti.html') || path.endsWith('/ti')) {
        setCurrentView('ti');
      } else if (path.includes('telefonia') || path.includes('index.html')) {
        setCurrentView('telefonia');
      }
    };

    checkHashAndParams();
    window.addEventListener('hashchange', checkHashAndParams);
    return () => window.removeEventListener('hashchange', checkHashAndParams);
  }, []);

  const handleNavigate = (view: 'telefonia' | 'whatsapp-calling' | 'ti' | 'suporte-ti' | 'cloud' | 'locacao' | 'impressao' | 'criacao-sites') => {
    setCurrentView(view);
    const targetFile = getServiceHtmlFile(view);

    // Se estiver navegando em páginas HTML estáticas locais ou no servidor
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const isHtmlEnv = path.endsWith('.html') || window.location.protocol === 'file:' || path.includes('html-version');
      if (isHtmlEnv) {
        const currentFile = path.split('/').pop() || 'index.html';
        if (currentFile !== targetFile) {
          window.location.href = targetFile;
          return;
        }
      }
    }

    if (view === 'criacao-sites') {
      window.location.hash = 'criacao-sites';
    } else if (view === 'impressao') {
      window.location.hash = 'outsourcing-impressao';
    } else if (view === 'locacao') {
      window.location.hash = 'locacao-equipamentos';
    } else if (view === 'cloud') {
      window.location.hash = 'cloud';
    } else if (view === 'whatsapp-calling') {
      window.location.hash = 'whatsapp-calling';
    } else if (view === 'suporte-ti') {
      window.location.hash = 'suporte-ti';
    } else if (view === 'ti') {
      window.location.hash = 'ti-gerenciada';
    } else {
      window.location.hash = 'telefonia';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    let targetId = 'contato';
    if (currentView === 'criacao-sites') targetId = 'contato-site';
    if (currentView === 'impressao') targetId = 'contato-impressao';
    if (currentView === 'locacao') targetId = 'contato-locacao';
    if (currentView === 'cloud') targetId = 'contato-cloud';
    if (currentView === 'whatsapp-calling') targetId = 'contato-whatsapp-calling';
    if (currentView === 'ti') targetId = 'form-ti';
    if (currentView === 'suporte-ti') targetId = 'contato-suporte';

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('servicos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToContact();
  };

  const handleApplyPlan = (extensions: number, tierLabel: string) => {
    setSelectedExtensions(extensions);
    setSelectedService(`PABX Virtual em Nuvem (${tierLabel})`);
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header with Interactive Services & Sub-Menu */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenQuote={() => scrollToContact()}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {currentView === 'telefonia' && (
          <>
            {/* Hero Section with Telephony Platform Mockup */}
            <Hero
              onOpenQuote={() => scrollToContact()}
              onExploreServices={() => scrollToServices()}
            />

            {/* Commercial Differentials & Benefits Strip */}
            <BenefitsBanner />

            {/* Core Services Bento Grid */}
            <ServicesGrid onSelectService={handleSelectService} />

            {/* Operational Transformation: Problems vs Sysmax Solutions */}
            <ProblemSolution onOpenQuote={() => scrollToContact()} />

            {/* Interactive Extensions & Savings Simulator */}
            <EconomyCalculator onApplyPlan={handleApplyPlan} />

            {/* Onboarding & Implementation Steps */}
            <StepByStep onOpenQuote={() => scrollToContact()} />

            {/* Real Cases & Trust Markers */}
            <TrustAndCases />

            {/* Frequently Asked Questions */}
            <FaqSection />

            {/* Final Conversion & Contact / Quote Form */}
            <ContactForm
              initialService={selectedService}
              initialExtensions={selectedExtensions}
            />
          </>
        )}

        {currentView === 'whatsapp-calling' && (
          /* Dedicated WhatsApp Calling Page */
          <WhatsAppCallingView
            onSwitchToTelefonia={() => handleNavigate('telefonia')}
            onSwitchToTI={() => handleNavigate('ti')}
          />
        )}

        {currentView === 'ti' && (
          /* Dedicated Managed IT Page (MDF Technology Reference) */
          <ManagedITView onSwitchToTelefonia={() => handleNavigate('telefonia')} />
        )}

        {currentView === 'suporte-ti' && (
          /* Dedicated Suporte de TI Page (MDF Technology Suporte-de-TI Reference) */
          <ITSupportView
            onSwitchToTelefonia={() => handleNavigate('telefonia')}
            onSwitchToTIGeneric={() => handleNavigate('ti')}
          />
        )}

        {currentView === 'cloud' && (
          /* Dedicated Cloud File Server Page (MDF Technology Cloud File Server Reference) */
          <CloudFileServerView
            onSwitchToTelefonia={() => handleNavigate('telefonia')}
            onSwitchToTI={() => handleNavigate('ti')}
            onSwitchToSuporte={() => handleNavigate('suporte-ti')}
          />
        )}

        {currentView === 'locacao' && (
          /* Dedicated Hardware as a Service (HaaS) / Locação de Equipamentos Page */
          <EquipmentRentalView
            onSwitchToTelefonia={() => handleNavigate('telefonia')}
            onSwitchToTI={() => handleNavigate('ti')}
            onSwitchToCloud={() => handleNavigate('cloud')}
            onSwitchToImpressao={() => handleNavigate('impressao')}
          />
        )}

        {currentView === 'impressao' && (
          /* Dedicated Outsourcing de Impressão & Multifuncionais Page */
          <PrintOutsourcingView
            onSwitchToTelefonia={() => handleNavigate('telefonia')}
            onSwitchToTI={() => handleNavigate('ti')}
            onSwitchToEquipmentRental={() => handleNavigate('locacao')}
          />
        )}

        {currentView === 'criacao-sites' && (
          /* Dedicated Marketing Digital - Criação de Sites Page */
          <WebsiteCreationView
            onSwitchToTelefonia={() => handleNavigate('telefonia')}
            onSwitchToTI={() => handleNavigate('ti')}
            onSwitchToLocacao={() => handleNavigate('locacao')}
          />
        )}
      </main>

      {/* Corporate Footer with Cross Navigation */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Sticky WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
