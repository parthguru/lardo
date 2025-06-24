import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: var(--color-primary-blue-dark);
  color: var(--color-white);
  padding: var(--space-4xl) 0 var(--space-xl) 0;
`;

const Container = styled.div`
  max-width: var(--container-standard);
  margin: 0 auto;
  padding: 0 var(--space-md);

  @media (max-width: 768px) {
    padding: 0 var(--space-sm);
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-2xl);
  margin-bottom: var(--space-3xl);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
`;

const FooterColumn = styled.div`
  h4 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-lg);
    color: var(--color-white);
    border-bottom: 2px solid var(--color-primary-blue);
    padding-bottom: var(--space-sm);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: var(--space-md);
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    color: var(--color-white);
    text-decoration: none;
    transition: color var(--transition-fast);
    display: flex;
    align-items: center;
    gap: var(--space-sm);

    &:hover {
      color: var(--color-primary-blue-light);
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid var(--color-focus);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
  }

  p {
    color: var(--color-white);
    line-height: var(--line-height-normal);
    margin-bottom: var(--space-md);

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ContactInfo = styled.div`
  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
    
    .icon {
      font-size: var(--font-size-lg);
      margin-top: 2px;
      flex-shrink: 0;
    }
    
    .content {
      flex: 1;
      
      a {
        gap: 0;
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-lg);

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--color-primary-blue);
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);

    &:hover {
      background: var(--color-primary-blue-light);
      transform: translateY(-2px);
    }

    .icon {
      font-size: var(--font-size-lg);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--color-primary-blue);
  padding-top: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Copyright = styled.div`
  color: var(--color-white);
  font-size: var(--font-size-sm);
  
  p {
    margin: 0;
    color: var(--color-white) !important;
  }
`;

const LegalLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--space-sm);
  }

  a {
    color: var(--color-white);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-primary-blue-light);
      text-decoration: underline;
    }
  }
`;

const Disclaimer = styled.div`
  background: var(--color-gray-800);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  margin-top: var(--space-xl);
  border: 1px solid var(--color-gray-700);

  p {
    font-size: var(--font-size-sm);
    color: var(--color-white);
    margin: 0;
    text-align: center;
    line-height: var(--line-height-normal);
  }
`;

const StructuredDataScript = styled.script``;

interface FooterProps {
  onNavigate: (page: string, pageType?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  // Structured data for local business
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Laredo Car Accident Medical Center",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "8511 McPherson Road, Suite 208",
      "addressLocality": "Laredo",
      "addressRegion": "TX",
      "postalCode": "78045",
      "addressCountry": "US"
    },
    "telephone": "(956) 333-2727",
    "url": "https://laredocaraccident.com",
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-14:00"
    ],
    "medicalSpecialty": ["Chiropractic", "Pain Management", "Diagnostic Imaging"],
    "availableLanguage": ["English", "Spanish"]
  };

  return (
    <FooterWrapper>
      <Container>
        <FooterGrid>
          <FooterColumn>
            <h4>{t('footer.contact.title')}</h4>
            <ContactInfo>
              <div className="contact-item">
                <span className="icon">📍</span>
                <div className="content">
                  <p>{t('footer.contact.address')}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="icon">📞</span>
                <div className="content">
                  <a href="tel:+19563332727">{t('footer.contact.phone')}</a>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="icon">✉️</span>
                <div className="content">
                  <a href="mailto:info@laredocaraccident.com">{t('footer.contact.email')}</a>
                </div>
              </div>
            </ContactInfo>
          </FooterColumn>

          <FooterColumn>
            <h4>{t('footer.services.title')}</h4>
            <ul>
              <li>
                <a href="#services" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  🦴 {t('footer.services.chiropractic')}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  💊 {t('footer.services.painManagement')}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  🔬 {t('footer.services.diagnosticImaging')}
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  💬 {t('footer.services.consultation')}
                </a>
              </li>
            </ul>
          </FooterColumn>



          <FooterColumn>
            <h4>Legal Information</h4>
            <ul>
              <li>
                <a href="#legal" onClick={(e) => {
                  e.preventDefault();
                  onNavigate('legal', 'medical-disclaimer');
                }}>
                  📋 Medical Disclaimer
                </a>
              </li>
              <li>
                <a href="#legal" onClick={(e) => {
                  e.preventDefault();
                  onNavigate('legal', 'privacy');
                }}>
                  🔒 Privacy Policy
                </a>
              </li>
              <li>
                <a href="#legal" onClick={(e) => {
                  e.preventDefault();
                  onNavigate('legal', 'hipaa');
                }}>
                  🏥 HIPAA Notice
                </a>
              </li>
              <li>
                <a href="#legal" onClick={(e) => {
                  e.preventDefault();
                  onNavigate('legal', 'terms');
                }}>
                  📄 Terms of Service
                </a>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h4>{t('footer.social.title')}</h4>
            <p>Connect with us on social media for health tips and updates.</p>
            <SocialLinks>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <span className="icon">📘</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <span className="icon">📷</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <span className="icon">💼</span>
              </a>
            </SocialLinks>
          </FooterColumn>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            <p>{t('footer.copyright')}</p>
            <p style={{ 
              marginTop: 'var(--space-sm)', 
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-white)'
            }}>
              Powered by{' '}
              <a 
                href="https://synectus.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'var(--color-white)', 
                  textDecoration: 'none',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Synectus.com
              </a>
            </p>
          </Copyright>

          <LegalLinks>
            <a href="#legal" onClick={(e) => { e.preventDefault(); onNavigate('legal', 'medical-disclaimer'); }}>
              Medical Disclaimer
            </a>
            <a href="#legal" onClick={(e) => { e.preventDefault(); onNavigate('legal', 'privacy'); }}>
              Privacy Policy
            </a>
            <a href="#legal" onClick={(e) => { e.preventDefault(); onNavigate('legal', 'hipaa'); }}>
              HIPAA Notice
            </a>
            <a href="#legal" onClick={(e) => { e.preventDefault(); onNavigate('legal', 'terms'); }}>
              Terms of Service
            </a>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              Sitemap
            </a>
          </LegalLinks>
        </FooterBottom>

        <Disclaimer>
          <p>{t('footer.disclaimerText')}</p>
        </Disclaimer>
      </Container>

      <StructuredDataScript
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </FooterWrapper>
  );
};

export default Footer;