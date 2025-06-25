import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-white);
  box-shadow: var(--shadow-md);
  z-index: var(--z-fixed);
  transition: all var(--transition-base);

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }
`;

const Container = styled.div`
  max-width: var(--container-standard);
  margin: 0 auto;
  padding: var(--space-sm) var(--space-md);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: var(--space-sm);
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  h1 {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-blue-dark);
    margin: 0;
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: var(--font-size-lg);
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: var(--space-lg);

  @media (max-width: 768px) {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-white);
    box-shadow: var(--shadow-lg);
    padding: var(--space-lg);
    flex-direction: column;
    gap: var(--space-md);
    transition: top var(--transition-base);

    &.open {
      top: 60px;
    }

    &.closed {
      top: -400px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-lg);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--space-md);
    width: 100%;
  }
`;

const NavLink = styled.a`
  color: var(--color-gray-700);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  cursor: pointer;

  &:hover {
    color: var(--color-primary-blue);
    background: var(--color-primary-blue-light);
    text-decoration: none;
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: var(--space-md);
  }
`;

const EmergencyContact = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--color-accent-orange);
  color: var(--color-white);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: none;
    }
  }

  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
    padding: var(--space-xs) var(--space-sm);
  }
`;

const LanguageToggle = styled.button`
  background: var(--color-primary-blue);
  color: var(--color-white);
  border: none;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-white);
    color: var(--color-primary-blue);
    border: 2px solid var(--color-primary-blue);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  color: var(--color-primary-blue-dark);
  cursor: pointer;
  padding: var(--space-sm);

  @media (max-width: 768px) {
    display: block;
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
`;

const TopBar = styled.div`
  background: var(--color-primary-blue-dark);
  color: var(--color-white);
  padding: var(--space-xs) 0;
  text-align: center;
  font-size: var(--font-size-sm);

  a {
    color: inherit;
    text-decoration: none;
    font-weight: var(--font-weight-semibold);

    &:hover {
      text-decoration: none;
    }
  }
`;

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <TopBar>
        <div className="container">
          <a href="tel:+19563332727" aria-label={t('navigation.emergencyContact')}>
            {t('navigation.emergencyContact')}
          </a>
        </div>
      </TopBar>
      
      <HeaderWrapper className={isScrolled ? 'scrolled' : ''}>
        <Container>
          <Logo>
            <h1>
              {i18n.language === 'es' 
                ? 'Centro Médico Laredo'
                : 'Laredo Medical Center'
              }
            </h1>
          </Logo>

          <Navigation 
            id="navigation" 
            role="navigation" 
            aria-label="Main navigation"
            className={isMobileMenuOpen ? 'open' : 'closed'}
          >
            <NavLinks>
              <NavLink 
                onClick={() => scrollToSection('hero')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('hero')}
                tabIndex={0}
                role="button"
              >
                {t('navigation.home')}
              </NavLink>
              
              <NavLink 
                onClick={() => scrollToSection('services')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('services')}
                tabIndex={0}
                role="button"
              >
                {t('navigation.services')}
              </NavLink>
              
              <NavLink 
                onClick={() => scrollToSection('blog')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('blog')}
                tabIndex={0}
                role="button"
              >
                {t('navigation.blog')}
              </NavLink>
              
              <NavLink 
                onClick={() => scrollToSection('about')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('about')}
                tabIndex={0}
                role="button"
              >
                {t('navigation.about')}
              </NavLink>
              
              <NavLink 
                onClick={() => scrollToSection('contact')}
                onKeyDown={(e) => e.key === 'Enter' && scrollToSection('contact')}
                tabIndex={0}
                role="button"
              >
                {t('navigation.contact')}
              </NavLink>
            </NavLinks>

            <EmergencyContact>
              <a 
                href="tel:+19563332727"
                aria-label="Call emergency number"
              >
                📞 (956) 333-2727
              </a>
            </EmergencyContact>

            <LanguageToggle 
              onClick={handleLanguageChange}
              aria-label={`Switch to ${i18n.language === 'en' ? 'Spanish' : 'English'}`}
            >
              {t('navigation.languageToggle')}
            </LanguageToggle>
          </Navigation>

          <MobileMenuButton 
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </Container>
      </HeaderWrapper>
    </>
  );
};

export default Header;