import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: var(--space-5xl) 0;
  background: var(--color-white);
`;

const Container = styled.div`
  max-width: var(--container-standard);
  margin: 0 auto;
  padding: 0 var(--space-md);

  @media (max-width: 768px) {
    padding: 0 var(--space-sm);
  }
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl);
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: var(--space-3xl);
  }
`;

const ContentColumn = styled.div`
  h2 {
    font-size: var(--font-size-4xl);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-md);

    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }

  h3 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary-blue);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-lg);

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
    }
  }

  p {
    font-size: var(--font-size-lg);
    color: var(--color-gray-700);
    line-height: var(--line-height-relaxed);
    margin-bottom: var(--space-lg);

    @media (max-width: 768px) {
      font-size: var(--font-size-base);
    }
  }
`;

const CredentialsColumn = styled.div`
  background: var(--color-gray-50);
  padding: var(--space-2xl);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-gray-200);

  h3 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-xl);
    text-align: center;

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
    }
  }
`;

const CredentialsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CredentialItem = styled(motion.li)`
  background: var(--color-white);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-gray-200);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  transition: all var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .icon {
    font-size: var(--font-size-2xl);
    flex-shrink: 0;
  }

  .text {
    font-size: var(--font-size-base);
    color: var(--color-gray-800);
    font-weight: var(--font-weight-medium);

    @media (max-width: 768px) {
      font-size: var(--font-size-sm);
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-lg);
  margin: var(--space-4xl) 0;
`;

const StatCard = styled(motion.div)`
  background: var(--color-primary-blue-light);
  padding: var(--space-2xl);
  border-radius: var(--radius-xl);
  text-align: center;
  border: 2px solid var(--color-primary-blue);

  .number {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-blue-dark);
    display: block;
    margin-bottom: var(--space-sm);

    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }

  .label {
    font-size: var(--font-size-lg);
    color: var(--color-primary-blue-dark);
    font-weight: var(--font-weight-semibold);

    @media (max-width: 768px) {
      font-size: var(--font-size-base);
    }
  }
`;

const LocationCard = styled(motion.div)`
  background: var(--color-primary-blue-dark);
  color: var(--color-white);
  padding: var(--space-2xl);
  border-radius: var(--radius-xl);
  margin-top: var(--space-2xl);

  h4 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-lg);
    color: var(--color-white);

    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
    }
  }

  .address {
    font-size: var(--font-size-lg);
    line-height: var(--line-height-normal);
    margin-bottom: var(--space-md);

    @media (max-width: 768px) {
      font-size: var(--font-size-base);
    }
  }

  .contact {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);

    a {
      color: var(--color-white);
      text-decoration: none;
      font-weight: var(--font-weight-semibold);
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.8;
        text-decoration: underline;
      }
    }
  }
`;

const AccreditationBadges = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-xl);
  margin-top: var(--space-4xl);
  padding: var(--space-3xl);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-gray-200);

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-lg);
    padding: var(--space-xl);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
`;

const Badge = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  padding: var(--space-xl);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  text-align: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.6s;
  }

  .badge-icon {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-md);
    display: block;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
      font-size: var(--font-size-2xl);
      margin-bottom: var(--space-sm);
    }
  }

  .badge-text {
    font-size: var(--font-size-base);
    color: var(--color-gray-800);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    opacity: 0.9;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      font-size: var(--font-size-sm);
    }
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
    border-color: var(--color-primary-blue-light);
    background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);

    &::before {
      left: 100%;
    }

    .badge-icon {
      transform: scale(1.1);
    }

    .badge-text {
      color: var(--color-primary-blue-dark);
      opacity: 1;
    }
  }

  &:focus {
    outline: 3px solid var(--color-primary-blue-light);
    outline-offset: 4px;
  }
`;

const About: React.FC = () => {
  const { t } = useTranslation();

  const credentials = [
    { icon: '👨‍⚕️', text: t('about.credentials.items.0') },
    { icon: '🦴', text: t('about.credentials.items.1') },
    { icon: '💪', text: t('about.credentials.items.2') },
    { icon: '🌎', text: t('about.credentials.items.3') }
  ];

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '5,000+', label: 'Patients Treated' },
    { number: '95%', label: 'Patient Satisfaction' },
    { number: '24/7', label: 'Emergency Support' }
  ];

  const accreditations = [
    { icon: '✅', text: 'State Licensed' },
    { icon: '🔒', text: 'Board Certified' },
    { icon: '⭐', text: 'HIPAA Compliant' },
    { icon: '🌟', text: 'Accredited Facility' },
    { icon: '🏆', text: 'Quality Certified' },
    { icon: '🛡️', text: 'Insured Practice' }
  ];

  return (
    <AboutSection id="about">
      <Container>
        <AboutGrid>
          <ContentColumn>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('about.title')}
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('about.subtitle')}
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              dangerouslySetInnerHTML={{ __html: t('about.content').replace(/\n/g, '</p><p>') }}
            />

            <LocationCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4>📍 Our Location</h4>
              <div className="address">
                8511 McPherson Road, Suite 208<br />
                Laredo, TX 78045
              </div>
              <div className="contact">
                <a href="tel:+19563332727">
                  📞 (956) 333-2727
                </a>
                <a href="mailto:info@laredocaraccident.com">
                  ✉️ info@laredocaraccident.com
                </a>
              </div>
            </LocationCard>
          </ContentColumn>

          <CredentialsColumn>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('about.credentials.title')}
            </motion.h3>
            
            <CredentialsList>
              {credentials.map((credential, index) => (
                <CredentialItem
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span className="icon" role="img" aria-label="credential">
                    {credential.icon}
                  </span>
                  <span className="text">{credential.text}</span>
                </CredentialItem>
              ))}
            </CredentialsList>
          </CredentialsColumn>
        </AboutGrid>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span className="number">{stat.number}</span>
              <span className="label">{stat.label}</span>
            </StatCard>
          ))}
        </StatsGrid>

        <AccreditationBadges>
          {accreditations.map((badge, index) => (
            <Badge
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="badge-icon" role="img" aria-label="accreditation">
                {badge.icon}
              </span>
              <span className="badge-text">{badge.text}</span>
            </Badge>
          ))}
        </AccreditationBadges>
      </Container>
    </AboutSection>
  );
};

export default About;