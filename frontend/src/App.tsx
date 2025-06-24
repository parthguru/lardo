import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import './styles/globals.css';
import './i18n/index';

// Modern Components
import ModernHeader from './components/layout/ModernHeader';
import ModernHero from './components/sections/ModernHero';
import Services from './components/sections/Services';
import Blog from './components/sections/Blog';
import FAQ from './components/sections/FAQ';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

// SEO Components
import SEOHead from './components/seo/SEOHead';
import StructuredData from './components/seo/StructuredData';

// Pages
import LegalPage from './pages/LegalPage';

// Hooks
import { useSEO } from './hooks/useSEO';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [legalPageType, setLegalPageType] = useState<string>('');

  // SEO setup
  useSEO({
    title: i18n.language === 'es' 
      ? 'Centro Médico de Accidentes Automovilísticos de Laredo - Tratamiento Experto'
      : 'Laredo Car Accident Medical Center - Expert Treatment',
    description: i18n.language === 'es'
      ? 'Centro médico especializado en tratamiento de lesiones por accidentes automovilísticos en Laredo, TX. Atención quiropráctica, manejo del dolor e imágenes diagnósticas. Personal bilingüe.'
      : 'Specialized medical center for car accident injury treatment in Laredo, TX. Chiropractic care, pain management, and diagnostic imaging. Bilingual staff.',
    keywords: i18n.language === 'es'
      ? 'doctor accidentes automovilísticos Laredo, tratamiento lesiones auto Laredo, quiropráctico accidentes Laredo, manejo dolor Laredo'
      : 'Laredo car accident doctor, car accident treatment Laredo, Laredo auto injury, chiropractor car accident Laredo, pain management Laredo',
    lang: i18n.language
  });

  // Language persistence
  useEffect(() => {
    const handleLanguageChange = (lang: string) => {
      localStorage.setItem('preferred-language', lang);
      document.documentElement.lang = lang;
    };

    i18n.on('languageChanged', handleLanguageChange);
    document.documentElement.lang = i18n.language;

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Simple navigation handler
  const handleNavigation = (page: string, pageType?: string) => {
    setCurrentPage(page);
    if (pageType) {
      setLegalPageType(pageType);
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentPage === 'legal') {
      return <LegalPage page={legalPageType} onNavigateHome={() => handleNavigation('home')} />;
    }

    return (
      <>
        <ModernHeader />
        
        <main id="main-content" role="main">
          <ModernHero />
          <Services />
          <Blog />
          <FAQ />
          <About />
          <Contact />
        </main>
        
        <Footer onNavigate={handleNavigation} />
      </>
    );
  };

  // Local Business Structured Data
  const localBusinessData = {
    name: "Laredo Car Accident Medical Center",
    description: "Leading car accident treatment clinic in Laredo, Texas specializing in chiropractic care, pain management, and diagnostic imaging with Letter of Protection acceptance.",
    url: "https://laredocaraccident.com/",
    telephone: "(956) 333-2727",
    address: {
      streetAddress: "8511 McPherson Road, Suite 208",
      addressLocality: "Laredo",
      addressRegion: "TX",
      postalCode: "78045",
      addressCountry: "US"
    },
    geo: {
      latitude: "27.5306",
      longitude: "-99.4803"
    },
    openingHours: [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-14:00"
    ],
    paymentAccepted: ["Letter of Protection", "Insurance", "Cash", "Credit Card"],
    currenciesAccepted: "USD",
    availableLanguage: ["English", "Spanish"],
    medicalSpecialty: [
      "Chiropractic Medicine",
      "Pain Management", 
      "Diagnostic Radiology",
      "Auto Injury Rehabilitation"
    ],
    serviceArea: {
      geoRadius: "50 miles"
    }
  };

  return (
    <HelmetProvider>
      <div className="App">
        {/* SEO Head with enhanced meta tags */}
        <SEOHead
          title={i18n.language === 'es' 
            ? 'Centro Médico de Accidentes Automovilísticos de Laredo - Tratamiento Experto'
            : 'Car Accident Doctor Laredo TX | Chiropractic Care & Pain Management | LOP Accepted'
          }
          description={i18n.language === 'es'
            ? 'Centro médico especializado en tratamiento de lesiones por accidentes automovilísticos en Laredo, TX. Atención quiropráctica, manejo del dolor e imágenes diagnósticas. Personal bilingüe. Llame (956) 333-2727.'
            : 'Expert car accident treatment in Laredo, Texas. Comprehensive chiropractic care, pain management & diagnostic imaging. Letter of Protection accepted. Bilingual staff. Call (956) 333-2727 for immediate care.'
          }
          keywords={i18n.language === 'es'
            ? 'doctor accidentes automovilísticos Laredo, tratamiento lesiones auto Laredo, quiropráctico accidentes Laredo, manejo dolor Laredo, LOP Laredo'
            : 'car accident doctor Laredo, chiropractor Laredo TX, auto injury treatment Laredo, Letter of Protection Laredo, car accident clinic Webb County, bilingual car accident treatment'
          }
          canonical="/"
          type="website"
        />
        
        {/* Local Business Structured Data */}
        <StructuredData type="localBusiness" data={localBusinessData} />
        
        {/* Skip Links for Accessibility */}
        <a href="#main-content" className="skip-link">
          {i18n.language === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
        </a>
        <a href="#navigation" className="skip-link">
          {i18n.language === 'es' ? 'Saltar a la navegación' : 'Skip to navigation'}
        </a>

        {renderPage()}
      </div>
    </HelmetProvider>
  );
};

export default App;
