import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Container, Flex, Icon } from '../common/UIComponents';

const HeaderWrapper = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  transition: var(--transition-default);
  
  ${props => props.isScrolled ? `
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow-lg);
    border-bottom: 1px solid var(--color-gray-200);
  ` : `
    background: transparent;
  `}
`;

const TopBar = styled.div`
  background: var(--gradient-cta);
  color: var(--color-white);
  padding: var(--space-2) 0;
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: 500;

  a,
  a.no-underline,
  .no-underline {
    color: inherit !important;
    text-decoration: none !important;
    border: none !important;
    border-bottom: none !important;
    outline: none !important;
    box-shadow: none !important;
    text-decoration-line: none !important;
    text-decoration-style: none !important;
    text-decoration-color: transparent !important;
    transition: var(--transition-default);
    
    &:hover,
    &:focus,
    &:active,
    &:visited,
    &:link {
      opacity: 0.9;
      text-decoration: none !important;
      border: none !important;
      border-bottom: none !important;
      outline: none !important;
      box-shadow: none !important;
      text-decoration-line: none !important;
      text-decoration-style: none !important;
      text-decoration-color: transparent !important;
    }
  }

  * {
    text-decoration: none !important;
    border-bottom: none !important;
  }

  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
    padding: var(--space-1) 0;
  }
`;

const MainHeader = styled.div`
  padding: var(--space-4) 0;

  @media (max-width: 768px) {
    padding: var(--space-3) 0;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 0;
    width: 100%;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  min-width: 0;
  cursor: pointer;

  .logo-image {
    height: 48px;
    width: auto;
    transition: var(--transition-default);
    
    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 1200px) {
    .logo-image {
      height: 40px;
    }
  }

  @media (max-width: 768px) {
    .logo-image {
      height: 36px;
    }
  }

  @media (max-width: 480px) {
    .logo-image {
      height: 32px;
    }
  }
`;

const Navigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--space-8);

  @media (max-width: 1200px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 320px;
    max-width: 80vw;
    background: var(--color-white);
    box-shadow: var(--shadow-2xl);
    padding: var(--space-8) var(--space-6);
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-6);
    transform: translateX(${props => props.isOpen ? '0' : '100%'});
    transition: transform var(--transition-default);
    z-index: var(--z-modal);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-6);

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
    width: 100%;
  }
`;

const NavLink = styled(motion.button)`
  background: none;
  border: none;
  color: var(--color-gray-700);
  font-weight: 600;
  font-size: var(--font-size-base);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition-default);
  position: relative;

  &:hover {
    color: var(--color-primary-600);
    background: var(--color-primary-50);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-500);
  }

  @media (max-width: 1200px) {
    width: 100%;
    text-align: left;
    padding: var(--space-3) var(--space-4);
    font-size: var(--font-size-lg);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);

  @media (max-width: 1200px) {
    flex-direction: column;
    width: 100%;
    gap: var(--space-3);
  }
`;

const EmergencyButton = styled(Button)`
  background: var(--gradient-emergency);
  color: var(--color-white);
  font-weight: 600;
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-4);
  white-space: nowrap;

  @media (max-width: 1200px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
    padding: var(--space-2) var(--space-3);
  }
`;

const LanguageToggle = styled.button`
  background: #3b82f6;
  color: white;
  font-weight: 600;
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;

  &:hover {
    background: #1d4ed8 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #3b82f6;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1200px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
    padding: var(--space-2) var(--space-3);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--color-gray-600);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  transition: var(--transition-default);

  @media (max-width: 1200px) {
    display: block;
  }

  &:hover {
    background: var(--color-gray-100);
    color: var(--color-gray-800);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-500);
  }
`;

const MobileOverlay = styled(motion.div)`
  display: none;

  @media (max-width: 1200px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: var(--z-modal-backdrop);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  color: var(--color-gray-500);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  transition: var(--transition-default);

  &:hover {
    background: var(--color-gray-100);
    color: var(--color-gray-700);
  }

  @media (min-width: 1025px) {
    display: none;
  }
`;

interface PolicyHeaderProps {
  className?: string;
}

const PolicyHeader: React.FC<PolicyHeaderProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navigateToHome = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navigateToHomeWithSection = (sectionId: string) => {
    navigate('/');
    setIsMobileMenuOpen(false);
    // After navigation, wait for the page to load and then scroll to section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 100;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <HeaderWrapper isScrolled={isScrolled} className={className}>
        <TopBar>
          <Container>
            <Flex justify="center" align="center">
              <Icon size="sm">🚨</Icon>
              <span 
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  border: 'none',
                  borderBottom: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => window.location.href = 'tel:+19563332727'}
                role="button"
                tabIndex={0}
                aria-label={t('navigation.emergencyContact')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.location.href = 'tel:+19563332727';
                  }
                }}
              >
                {t('navigation.emergencyContact')}
              </span>
            </Flex>
          </Container>
        </TopBar>

        <MainHeader>
          <Container>
            <div className="header-content">
              <Logo
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                onClick={navigateToHome}
              >
                <img 
                  src="/images/laredo-medical-logo.svg" 
                  alt="Laredo Car Accident Medical Center Logo"
                  className="logo-image"
                  width="160"
                  height="48"
                />
              </Logo>

              <Navigation isOpen={isMobileMenuOpen} id="navigation" role="navigation" aria-label="Main navigation">
                <CloseButton onClick={closeMobileMenu} aria-label="Close menu">
                  ✕
                </CloseButton>

                <NavLinks>
                  <NavLink 
                    onClick={navigateToHome}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('navigation.home')}
                  </NavLink>
                  
                  <NavLink 
                    onClick={() => navigateToHomeWithSection('services')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('navigation.services')}
                  </NavLink>
                  
                  <NavLink 
                    onClick={() => navigateToHomeWithSection('blog')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('navigation.blog')}
                  </NavLink>
                  
                  <NavLink 
                    onClick={() => navigateToHomeWithSection('about')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('navigation.about')}
                  </NavLink>
                  
                  <NavLink 
                    onClick={() => navigateToHomeWithSection('contact')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('navigation.contact')}
                  </NavLink>
                </NavLinks>

                <HeaderActions>
                  <EmergencyButton 
                    as="a" 
                    href="tel:+19563332727"
                  >
                    <Icon size="sm">📞</Icon>
                    (956) 333-2727
                  </EmergencyButton>

                  <LanguageToggle 
                    onClick={handleLanguageChange}
                    aria-label={`Switch to ${i18n.language === 'en' ? 'Spanish' : 'English'}`}
                  >
                    {t('navigation.languageToggle')}
                  </LanguageToggle>
                </HeaderActions>
              </Navigation>

              <MobileMenuButton 
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </MobileMenuButton>
            </div>
          </Container>
        </MainHeader>
      </HeaderWrapper>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PolicyHeader; 