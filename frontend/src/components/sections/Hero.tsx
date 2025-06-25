import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PatientModal from '../forms/PatientModal';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--color-primary-blue-light) 0%, var(--color-white) 100%);
  padding: 120px 0 var(--space-5xl);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 100px 0 var(--space-4xl);
  }
`;

const Container = styled.div`
  max-width: var(--container-standard);
  margin: 0 auto;
  padding: 0 var(--space-md);
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 var(--space-sm);
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: var(--font-size-6xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-blue-dark);
  margin-bottom: var(--space-md);
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: var(--font-size-4xl);
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-blue);
  margin-bottom: var(--space-lg);
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: var(--font-size-xl);
  }
`;

const Description = styled(motion.p)`
  font-size: var(--font-size-lg);
  color: var(--color-gray-700);
  margin-bottom: var(--space-2xl);
  line-height: var(--line-height-relaxed);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: var(--font-size-base);
    margin-bottom: var(--space-xl);
  }
`;

const TrustSignals = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
    margin-bottom: var(--space-xl);
  }
`;

const TrustSignal = styled.div`
  background: var(--color-white);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
  transition: all var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .icon {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-sm);
  }

  .text {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary-blue-dark);
  }
`;

const CTAGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  background: var(--color-primary-blue);
  color: var(--color-white);
  border: none;
  padding: var(--space-lg) var(--space-2xl);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);

  &:hover {
    background: var(--color-primary-blue-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: var(--color-primary-blue);
  border: 2px solid var(--color-primary-blue);
  padding: var(--space-md) var(--space-xl);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-primary-blue);
    color: var(--color-white);
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }
`;

const EmergencyButton = styled.a`
  background: linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%);
  color: var(--color-white);
  border: none;
  padding: var(--space-md) var(--space-xl);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-lg);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }

  &:hover {
    background: linear-gradient(135deg, #e55a2b 0%, #d14d26 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: var(--color-white);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: 3px solid rgba(255, 107, 53, 0.3);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
    padding: var(--space-lg) var(--space-xl);
    font-size: var(--font-size-lg);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    }
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C5AA0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
`;

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [showPatientModal, setShowPatientModal] = useState(false);

  const handleGetTreatment = () => {
    setShowPatientModal(true);
  };

  const handleFreeConsultation = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="hero">
      <BackgroundDecoration />
      <Container>
        <HeroContent>
          <Title
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('hero.title')}
          </Title>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </Subtitle>

          <Description
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('hero.description')}
          </Description>

          <TrustSignals
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <TrustSignal>
              <div className="icon">👨‍⚕️</div>
              <div className="text">{t('hero.trustSignals.experience')}</div>
            </TrustSignal>
            <TrustSignal>
              <div className="icon">🌎</div>
              <div className="text">{t('hero.trustSignals.bilingual')}</div>
            </TrustSignal>
            <TrustSignal>
              <div className="icon">🏥</div>
              <div className="text">{t('hero.trustSignals.insurance')}</div>
            </TrustSignal>
            <TrustSignal>
              <div className="icon">📋</div>
              <div className="text">{t('hero.trustSignals.lop')}</div>
            </TrustSignal>
          </TrustSignals>

          <CTAGroup
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <PrimaryButton onClick={handleGetTreatment}>
              {t('hero.cta.primary')}
            </PrimaryButton>

            <SecondaryButton onClick={handleFreeConsultation}>
              {t('hero.cta.secondary')}
            </SecondaryButton>

            <EmergencyButton href="tel:+19563332727">
              🚨 {t('hero.cta.emergency')}
            </EmergencyButton>
          </CTAGroup>
        </HeroContent>
      </Container>

      {showPatientModal && (
        <PatientModal onClose={() => setShowPatientModal(false)} />
      )}
    </HeroSection>
  );
};

export default Hero;