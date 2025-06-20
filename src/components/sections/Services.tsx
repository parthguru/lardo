import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const ServicesSection = styled.section`
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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-4xl);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  h2 {
    font-size: var(--font-size-5xl);
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

    @media (max-width: 768px) {
      font-size: var(--font-size-base);
    }
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: var(--space-2xl);
  margin-top: var(--space-4xl);

  @media (max-width: 768px) {
    gap: var(--space-xl);
  }
`;

const ServiceCard = styled(motion.div)`
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  transition: all var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-4px);
  }
`;

const ServiceHeader = styled.div`
  background: linear-gradient(135deg, var(--color-primary-blue-light), var(--color-white));
  padding: var(--space-2xl);
  cursor: pointer;
  position: relative;

  &:hover {
    background: linear-gradient(135deg, var(--color-primary-blue-light), var(--color-primary-blue-light));
  }

  .icon {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--space-md);
    display: block;
  }

  h3 {
    font-size: var(--font-size-3xl);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-sm);

    @media (max-width: 768px) {
      font-size: var(--font-size-2xl);
    }
  }

  h4 {
    font-size: var(--font-size-xl);
    color: var(--color-primary-blue);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-md);

    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
    }
  }

  p {
    font-size: var(--font-size-lg);
    color: var(--color-gray-700);
    line-height: var(--line-height-normal);
    margin-bottom: var(--space-lg);

    @media (max-width: 768px) {
      font-size: var(--font-size-base);
    }
  }
`;

const ExpandButton = styled.button`
  background: var(--color-primary-blue);
  color: var(--color-white);
  border: none;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-sm);

  &:hover {
    background: var(--color-primary-blue-dark);
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .arrow {
    transition: transform var(--transition-fast);
  }

  &.expanded .arrow {
    transform: rotate(180deg);
  }
`;

const ServiceContent = styled(motion.div)`
  padding: var(--space-2xl);
  background: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-200);

  .content-text {
    font-size: var(--font-size-base);
    color: var(--color-gray-800);
    line-height: var(--line-height-relaxed);
    white-space: pre-line;

    @media (max-width: 768px) {
      font-size: var(--font-size-sm);
    }
  }
`;

interface ServiceItemProps {
  icon: string;
  title: string;
  subtitle: string;
  preview: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  icon,
  title,
  subtitle,
  preview,
  content,
  isExpanded,
  onToggle
}) => {
  return (
    <ServiceCard
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <ServiceHeader onClick={onToggle}>
        <span className="icon" role="img" aria-label={title}>
          {icon}
        </span>
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
        <p>{preview}</p>
        <ExpandButton 
          className={isExpanded ? 'expanded' : ''}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${title} details`}
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
          <span className="arrow">⌄</span>
        </ExpandButton>
      </ServiceHeader>

      <AnimatePresence>
        {isExpanded && (
          <ServiceContent
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="content-text">{content}</div>
          </ServiceContent>
        )}
      </AnimatePresence>
    </ServiceCard>
  );
};

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (serviceKey: string) => {
    setExpandedService(expandedService === serviceKey ? null : serviceKey);
  };

  const services = [
    {
      key: 'chiropractic',
      icon: '🦴',
      title: t('services.chiropractic.title'),
      subtitle: t('services.chiropractic.subtitle'),
      preview: t('services.chiropractic.preview'),
      content: t('services.chiropractic.content')
    },
    {
      key: 'painManagement',
      icon: '💊',
      title: t('services.painManagement.title'),
      subtitle: t('services.painManagement.subtitle'),
      preview: t('services.painManagement.preview'),
      content: t('services.painManagement.content')
    },
    {
      key: 'diagnosticImaging',
      icon: '🔬',
      title: t('services.diagnosticImaging.title'),
      subtitle: t('services.diagnosticImaging.subtitle'),
      preview: t('services.diagnosticImaging.preview'),
      content: t('services.diagnosticImaging.content')
    }
  ];

  return (
    <ServicesSection id="services">
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('services.title')}
          </motion.h2>
          
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('services.subtitle')}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('services.overview')}
          </motion.p>
        </SectionHeader>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceItem
              key={service.key}
              icon={service.icon}
              title={service.title}
              subtitle={service.subtitle}
              preview={service.preview}
              content={service.content}
              isExpanded={expandedService === service.key}
              onToggle={() => toggleService(service.key)}
            />
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;