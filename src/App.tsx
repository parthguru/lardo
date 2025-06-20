import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/globals.css';
import './i18n/index';

// Components
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Blog from './components/sections/Blog';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

// Hooks
import { useSEO } from './hooks/useSEO';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  
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

  return (
    <div className="App">
      {/* Skip Links for Accessibility */}
      <a href="#main-content" className="skip-link">
        {i18n.language === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
      </a>
      <a href="#navigation" className="skip-link">
        {i18n.language === 'es' ? 'Saltar a la navegación' : 'Skip to navigation'}
      </a>

      <Header />
      
      <main id="main-content" role="main">
        <Hero />
        <Services />
        <Blog />
        <About />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
