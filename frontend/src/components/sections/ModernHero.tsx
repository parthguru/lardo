import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { 
  Button, 
  Container, 
  Section, 
  Card, 
  Icon,
  fadeInUpVariants,
  staggerContainerVariants 
} from '../common/UIComponents';
import PatientModal from '../forms/PatientModal';

const HeroSection = styled(Section)`
  background: var(--color-white);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 140px; /* Account for fixed header */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.5'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    min-height: 90vh;
    padding-top: 120px;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  color: var(--color-gray-900);
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: var(--font-size-6xl);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--space-6);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space-4);
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: var(--font-size-2xl);
  font-weight: 500;
  margin-bottom: var(--space-8);
  opacity: 0.95;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-6);
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: var(--font-size-lg);
  line-height: 1.7;
  margin-bottom: var(--space-12);
  opacity: 0.9;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: var(--font-size-base);
    margin-bottom: var(--space-8);
  }
`;

const TrustSignalsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-12);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-8);
  }
`;

const TrustSignal = styled(Card)`
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  text-align: center;
  padding: var(--space-6);
  transition: var(--transition-default);
  box-shadow: var(--shadow-sm);

  &:hover {
    background: var(--color-gray-50);
    transform: translateY(-4px) scale(1.02);
    box-shadow: var(--shadow-lg);
  }

  .icon {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-3);
    display: block;
  }

  .text {
    color: var(--color-gray-800);
    font-weight: 600;
    font-size: var(--font-size-base);
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    padding: var(--space-4);
    
    .icon {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-2);
    }
    
    .text {
      font-size: var(--font-size-sm);
    }
  }
`;

const CTASection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: var(--space-8);
  }
`;

const PrimaryButton = styled(Button)`
  background: var(--gradient-primary);
  color: var(--color-white);
  font-size: var(--font-size-lg);
  font-weight: 700;
  padding: var(--space-4) var(--space-8);
  box-shadow: var(--shadow-xl);
  border: none;

  &:hover:not(:disabled) {
    background: var(--color-primary-700);
    transform: translateY(-3px);
    box-shadow: var(--shadow-2xl);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    font-size: var(--font-size-base);
    padding: var(--space-3) var(--space-6);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: var(--color-primary-600);
  border: 2px solid var(--color-primary-600);
  font-size: var(--font-size-lg);
  font-weight: 600;
  padding: var(--space-4) var(--space-8);

  &:hover:not(:disabled) {
    background: var(--color-primary-50);
    border-color: var(--color-primary-700);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    font-size: var(--font-size-base);
    padding: var(--space-3) var(--space-6);
  }
`;

const EmergencyCallout = styled(motion.div)`
  background: var(--color-red-50);
  border: 2px solid var(--color-red-200);
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  margin-top: var(--space-12);
  text-align: center;

  h3 {
    color: var(--color-red-800);
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: var(--space-3);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
    }
  }

  p {
    color: var(--color-red-700);
    font-size: var(--font-size-base);
    margin-bottom: var(--space-4);
    
    @media (max-width: 768px) {
      font-size: var(--font-size-sm);
    }
  }

  .emergency-button {
    background: var(--gradient-emergency);
    color: var(--color-white);
    font-weight: 700;
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-xl);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    transition: var(--transition-default);
    box-shadow: var(--shadow-lg);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-xl);
    }

    @media (max-width: 768px) {
      width: 100%;
      justify-content: center;
      max-width: 280px;
    }
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;

  .floating-icon {
    position: absolute;
    color: rgba(44, 90, 160, 0.25);
    font-size: var(--font-size-4xl);
    animation: float 6s ease-in-out infinite;

    &:nth-child(1) {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    &:nth-child(2) {
      top: 40%;
      right: 15%;
      animation-delay: 2s;
    }

    &:nth-child(3) {
      bottom: 30%;
      left: 20%;
      animation-delay: 4s;
    }

    &:nth-child(4) {
      bottom: 20%;
      right: 25%;
      animation-delay: 1s;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ModernHero: React.FC = () => {
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

  const trustSignals = [
    { icon: '👨‍⚕️', text: t('hero.trustSignals.experience') },
    { icon: '🌎', text: t('hero.trustSignals.bilingual') },
    { icon: '🏥', text: t('hero.trustSignals.insurance') },
    { icon: '📋', text: t('hero.trustSignals.lop') }
  ];

  return (
    <HeroSection id="hero">
      <FloatingElements>
        <div className="floating-icon">🏥</div>
        <div className="floating-icon">⚕️</div>
        <div className="floating-icon">📋</div>
        <div className="floating-icon">🩺</div>
      </FloatingElements>

      <Container>
        <HeroContent>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroTitle variants={fadeInUpVariants}>
              {t('hero.title')}
            </HeroTitle>

            <HeroSubtitle variants={fadeInUpVariants}>
              {t('hero.subtitle')}
            </HeroSubtitle>

            <HeroDescription variants={fadeInUpVariants}>
              {t('hero.description')}
            </HeroDescription>

            <TrustSignalsGrid variants={fadeInUpVariants}>
              {trustSignals.map((signal, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <TrustSignal>
                    <span className="icon" role="img" aria-label={signal.text}>
                      {signal.icon}
                    </span>
                    <div className="text">{signal.text}</div>
                  </TrustSignal>
                </motion.div>
              ))}
            </TrustSignalsGrid>

            <CTASection variants={fadeInUpVariants}>
              <PrimaryButton 
                onClick={handleGetTreatment}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size="sm">📅</Icon>
                {t('hero.cta.primary')}
              </PrimaryButton>

              <SecondaryButton 
                onClick={handleFreeConsultation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size="sm">💬</Icon>
                {t('hero.cta.secondary')}
              </SecondaryButton>
            </CTASection>

            <EmergencyCallout variants={fadeInUpVariants}>
              <h3>🚨 Emergency Medical Care Available</h3>
              <p>If you've been in a car accident and need immediate medical attention, don't wait.</p>
              <a 
                href="tel:+19563332727" 
                className="emergency-button"
                aria-label="Call emergency number"
              >
                <Icon size="sm">📞</Icon>
                Call Now: (956) 333-2727
              </a>
            </EmergencyCallout>
          </motion.div>
        </HeroContent>
      </Container>

      {showPatientModal && (
        <PatientModal onClose={() => setShowPatientModal(false)} />
      )}
    </HeroSection>
  );
};

export default ModernHero;