import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import PatientModal from '../forms/PatientModal';
import AttorneyModal from '../forms/AttorneyModal';

const ContactSection = styled.section`
  padding: var(--space-5xl) 0;
  background: linear-gradient(135deg, var(--color-primary-blue-light) 0%, var(--color-white) 100%);
`;

const Container = styled.div`
  max-width: var(--container-standard);
  margin: 0 auto;
  padding: 0 var(--space-md);

  @media (max-width: 768px) {
    padding: 0 var(--space-sm);
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-4xl);

  h2 {
    font-size: var(--font-size-4xl);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-md);

    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }

  p {
    font-size: var(--font-size-xl);
    color: var(--color-gray-700);

    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
    }
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  margin-bottom: var(--space-4xl);

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: var(--space-2xl);
  }
`;

const ContactCard = styled(motion.div)`
  background: var(--color-white);
  padding: var(--space-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);

  h3 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-xl);
    display: flex;
    align-items: center;
    gap: var(--space-md);

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
    }

    .icon {
      font-size: var(--font-size-3xl);
    }
  }
`;

const ContactInfo = styled.div`
  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
    padding: var(--space-lg);
    background: var(--color-gray-50);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-gray-200);

    .item-icon {
      font-size: var(--font-size-xl);
      flex-shrink: 0;
      margin-top: 2px;
    }

    .item-content {
      flex: 1;

      .label {
        font-size: var(--font-size-sm);
        color: var(--color-gray-600);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--space-xs);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .value {
        font-size: var(--font-size-lg);
        color: var(--color-gray-800);
        font-weight: var(--font-weight-medium);
        line-height: var(--line-height-normal);

        @media (max-width: 768px) {
          font-size: var(--font-size-base);
        }

        a {
          color: var(--color-primary-blue);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

const HoursGrid = styled.div`
  display: grid;
  gap: var(--space-md);
  margin-top: var(--space-lg);

  .hours-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md);
    background: var(--color-white);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-gray-200);

    .day {
      font-weight: var(--font-weight-semibold);
      color: var(--color-gray-800);
    }

    .time {
      color: var(--color-primary-blue);
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-sm);
    }

    &.emergency {
      background: var(--color-accent-orange);
      color: var(--color-white);
      border-color: var(--color-accent-orange);

      .day, .time {
        color: var(--color-white);
      }
    }
  }
`;

const CTAGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-xl);
  margin-top: var(--space-3xl);
`;

const CTACard = styled(motion.div)`
  background: var(--color-white);
  padding: var(--space-2xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  text-align: center;
  border: 2px solid var(--color-primary-blue-light);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-primary-blue);
  }

  .cta-icon {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space-lg);
    display: block;
  }

  h4 {
    font-size: var(--font-size-xl);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-md);

    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
    }
  }

  p {
    font-size: var(--font-size-base);
    color: var(--color-gray-700);
    margin-bottom: var(--space-xl);
    line-height: var(--line-height-normal);
  }
`;

const CTAButton = styled.button`
  background: var(--color-primary-blue);
  color: var(--color-white);
  border: none;
  padding: var(--space-lg) var(--space-2xl);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  width: 100%;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    background: var(--color-primary-blue-dark);
    transform: translateY(-2px);
    text-decoration: none;
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  &.emergency {
    background: linear-gradient(135deg, #FF6B35 0%, #e55a2b 100%);
    color: var(--color-white);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &:hover {
      background: linear-gradient(135deg, #e55a2b 0%, #d14d26 100%);
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      text-decoration: none;
      color: var(--color-white);
    }

    &:active {
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    }
  }

  /* When used as anchor link */
  &[href] {
    border: none;
    outline: none;
  }

  @media (max-width: 768px) {
    padding: var(--space-md) var(--space-lg);
    font-size: var(--font-size-base);
  }
`;

const EmergencyBanner = styled(motion.div)`
  background: var(--color-accent-orange);
  color: var(--color-white);
  padding: var(--space-xl);
  border-radius: var(--radius-xl);
  text-align: center;
  margin-bottom: var(--space-3xl);
  box-shadow: var(--shadow-lg);

  h3 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-md);
    color: var(--color-white);

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
    }
  }

  p {
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-lg);

    @media (max-width: 768px) {
      font-size: var(--font-size-base);
    }
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    background: var(--color-white);
    color: var(--color-accent-orange);
    padding: var(--space-md) var(--space-xl);
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-lg);
    transition: all var(--transition-fast);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }
`;

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showAttorneyModal, setShowAttorneyModal] = useState(false);

  return (
    <ContactSection id="contact">
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('contact.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </SectionHeader>

        <EmergencyBanner
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>🚨 Emergency Medical Care Available</h3>
          <p>If you've been in a car accident and need immediate medical attention, don't wait.</p>
          <a href="tel:+19563332727">
            📞 Call Now: (956) 333-2727
          </a>
        </EmergencyBanner>

        <ContactGrid>
          <ContactCard
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>
              <span className="icon">📍</span>
              {t('contact.address.title')}
            </h3>
            
            <ContactInfo>
              <div className="contact-item">
                <span className="item-icon">🏥</span>
                <div className="item-content">
                  <div className="label">Address</div>
                  <div className="value">
                    {t('contact.address.street')}<br />
                    {t('contact.address.city')}
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <span className="item-icon">📞</span>
                <div className="item-content">
                  <div className="label">Phone</div>
                  <div className="value">
                    <a href="tel:+19563332727">{t('contact.address.phone')}</a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <span className="item-icon">🆘</span>
                <div className="item-content">
                  <div className="label">Emergency</div>
                  <div className="value">
                    <a href="tel:+19563332727">{t('contact.address.emergency')}</a>
                  </div>
                </div>
              </div>
            </ContactInfo>
          </ContactCard>

          <ContactCard
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>
              <span className="icon">🕒</span>
              {t('contact.address.hours.title')}
            </h3>
            
            <HoursGrid>
              <div className="hours-item">
                <span className="day">Monday - Friday</span>
                <span className="time">{t('contact.address.hours.weekdays')}</span>
              </div>
              <div className="hours-item">
                <span className="day">Saturday</span>
                <span className="time">{t('contact.address.hours.saturday')}</span>
              </div>
              <div className="hours-item">
                <span className="day">Sunday</span>
                <span className="time">{t('contact.address.hours.sunday')}</span>
              </div>
              <div className="hours-item emergency">
                <span className="day">Emergency</span>
                <span className="time">{t('contact.address.hours.emergency')}</span>
              </div>
            </HoursGrid>
          </ContactCard>
        </ContactGrid>

        <CTAGrid>
          <CTACard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="cta-icon">👥</span>
            <h4>For Patients</h4>
            <p>
              Schedule your consultation and begin your recovery journey. Our bilingual medical team is ready to help you get the treatment you need.
            </p>
            <CTAButton onClick={() => setShowPatientModal(true)}>
              {t('contact.cta.patient')}
            </CTAButton>
          </CTACard>

          <CTACard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="cta-icon">⚖️</span>
            <h4>For Attorneys</h4>
            <p>
              Refer your clients for comprehensive medical care. We provide detailed documentation and work with Letter of Protection arrangements.
            </p>
            <CTAButton onClick={() => setShowAttorneyModal(true)}>
              {t('contact.cta.attorney')}
            </CTAButton>
          </CTACard>

          <CTACard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="cta-icon">🚨</span>
            <h4>Emergency Care</h4>
            <p>
              Don't wait if you've been in an accident. Our emergency line is available 24/7 to provide immediate medical guidance and care.
            </p>
            <CTAButton as="a" href="tel:+19563332727" className="emergency">
              {t('contact.cta.emergency')}
            </CTAButton>
          </CTACard>
        </CTAGrid>
      </Container>

      {showPatientModal && (
        <PatientModal onClose={() => setShowPatientModal(false)} />
      )}

      {showAttorneyModal && (
        <AttorneyModal onClose={() => setShowAttorneyModal(false)} />
      )}
    </ContactSection>
  );
};

export default Contact;