import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SocialShare from '../components/common/SocialShare';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  text-align: center;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
  z-index: 100;
  padding: var(--space-md);
  
  .logo {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-blue);
    text-decoration: none;
    
    &:hover {
      color: var(--color-primary-blue-dark);
    }
  }
`;

const ErrorContent = styled(motion.div)`
  max-width: 600px;
  margin-top: 80px;
`;

const ErrorCode = styled.h1`
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-blue);
  margin: 0;
  line-height: 1;
  text-shadow: 0 4px 8px rgba(44, 90, 160, 0.1);
`;

const ErrorTitle = styled.h2`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: var(--space-lg) 0;
`;

const ErrorDescription = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  margin-bottom: var(--space-2xl);
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-bottom: var(--space-2xl);
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const Button = styled(motion.button)`
  padding: var(--space-md) var(--space-xl);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  
  &.primary {
    background: var(--color-primary-blue);
    color: var(--color-white);
    
    &:hover {
      background: var(--color-primary-blue-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
  }
  
  &.secondary {
    background: var(--color-white);
    color: var(--color-primary-blue);
    border: 2px solid var(--color-primary-blue);
    
    &:hover {
      background: var(--color-primary-blue);
      color: var(--color-white);
    }
  }
  
  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
`;

const HelpfulLinks = styled.div`
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  margin: var(--space-2xl) 0;
  box-shadow: var(--shadow-md);
  
  h3 {
    color: var(--color-text-primary);
    margin-bottom: var(--space-lg);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: var(--space-md);
    
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  li {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
  
  a {
    color: var(--color-primary-blue);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--color-primary-blue-dark);
      text-decoration: underline;
    }
  }
`;

const ContactInfo = styled.div`
  background: var(--color-primary-blue-light);
  color: var(--color-white);
  border-radius: var(--radius-lg);
  padding: var(--space-xl);
  margin: var(--space-xl) 0;
  
  h3 {
    margin-bottom: var(--space-lg);
    font-size: var(--font-size-lg);
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
    
    a {
      color: var(--color-white);
      text-decoration: none;
      font-weight: var(--font-weight-medium);
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: var(--space-xl);
  right: var(--space-xl);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--color-primary-blue);
  color: var(--color-white);
  border: none;
  font-size: var(--font-size-lg);
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  
  &:hover {
    background: var(--color-primary-blue-dark);
    transform: translateY(-2px);
  }
`;

interface NotFoundPageProps {
  onNavigateHome?: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate('/');
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      handleGoHome();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Header>
        <a href="/" className="logo" onClick={(e) => {
          e.preventDefault();
          handleGoHome();
        }}>
          🏥 Laredo Car Accident Medical Center
        </a>
      </Header>
      
      <NotFoundContainer>
        <ErrorContent
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ErrorCode>404</ErrorCode>
          
          <ErrorTitle>
            {i18n.language === 'es' 
              ? 'Página No Encontrada' 
              : 'Page Not Found'
            }
          </ErrorTitle>
          
          <ErrorDescription>
            {i18n.language === 'es'
              ? 'Lo sentimos, la página que buscas no existe o ha sido movida. Pero no te preocupes, tenemos muchos recursos útiles para ayudarte.'
              : 'Sorry, the page you\'re looking for doesn\'t exist or has been moved. But don\'t worry, we have plenty of helpful resources to assist you.'
            }
          </ErrorDescription>
          
          <ActionButtons>
            <Button
              className="primary"
              onClick={handleGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🏠 {i18n.language === 'es' ? 'Ir al Inicio' : 'Go Home'}
            </Button>
            
            <Button
              className="secondary"
              onClick={handleGoBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← {i18n.language === 'es' ? 'Volver Atrás' : 'Go Back'}
            </Button>
          </ActionButtons>
          
          <HelpfulLinks>
            <h3>
              {i18n.language === 'es' 
                ? 'Enlaces Útiles' 
                : 'Helpful Links'
              }
            </h3>
            <ul>
              <li>
                <span>🦴</span>
                <a href="/#services" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>
                  {i18n.language === 'es' ? 'Atención Quiropráctica' : 'Chiropractic Care'}
                </a>
              </li>
              <li>
                <span>💊</span>
                <a href="/#services" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>
                  {i18n.language === 'es' ? 'Manejo del Dolor' : 'Pain Management'}
                </a>
              </li>
              <li>
                <span>🔬</span>
                <a href="/#services" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>
                  {i18n.language === 'es' ? 'Imágenes Diagnósticas' : 'Diagnostic Imaging'}
                </a>
              </li>
              <li>
                <span>📚</span>
                <a href="/#blog" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>
                  {i18n.language === 'es' ? 'Recursos Educativos' : 'Educational Resources'}
                </a>
              </li>
              <li>
                <span>💬</span>
                <a href="/#contact" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>
                  {i18n.language === 'es' ? 'Contactar' : 'Contact Us'}
                </a>
              </li>
              <li>
                <span>❓</span>
                <a href="/#faq" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>
                  {i18n.language === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}
                </a>
              </li>
            </ul>
          </HelpfulLinks>
          
          <ContactInfo>
            <h3>
              {i18n.language === 'es' 
                ? '¿Necesitas Ayuda Inmediata?' 
                : 'Need Immediate Help?'
              }
            </h3>
            
            <div className="contact-item">
              <span>📞</span>
              <a href="tel:+19563332727">(956) 333-2727</a>
            </div>
            
            <div className="contact-item">
              <span>📍</span>
              <span>8511 McPherson Road, Suite 208, Laredo, TX 78045</span>
            </div>
            
            <div className="contact-item">
              <span>⏰</span>
              <span>
                {i18n.language === 'es'
                  ? 'Lun-Vie: 8:00AM-6:00PM, Sáb: 9:00AM-2:00PM'
                  : 'Mon-Fri: 8:00AM-6:00PM, Sat: 9:00AM-2:00PM'
                }
              </span>
            </div>
          </ContactInfo>
          
          <SocialShare
            title={i18n.language === 'es' 
              ? 'Centro Médico de Accidentes Automovilísticos de Laredo'
              : 'Laredo Car Accident Medical Center'
            }
            description={i18n.language === 'es'
              ? 'Tratamiento experto para lesiones por accidentes automovilísticos en Laredo, Texas.'
              : 'Expert car accident injury treatment in Laredo, Texas.'
            }
          />
        </ErrorContent>
        
        <BackToTop
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ↑
        </BackToTop>
      </NotFoundContainer>
    </>
  );
};

export default NotFoundPage;