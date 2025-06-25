import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import PolicyHeader from '../components/layout/PolicyHeader';
import Footer from '../components/layout/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding-top: 120px;
  position: relative;

  @media (max-width: 768px) {
    padding-top: 100px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    opacity: 0.1;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--space-16);
  background: white;
  padding: var(--space-8);
  border-radius: 24px;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    margin-bottom: var(--space-12);
    padding: var(--space-6);
  }

  .icon {
    font-size: 4rem;
    margin-bottom: var(--space-4);
    display: block;
  }

  h1 {
    font-size: clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl));
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: var(--space-4);
    font-weight: 800;
  }

  .subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-gray-600);
    font-weight: 500;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .last-updated {
    font-size: var(--font-size-sm);
    color: var(--color-gray-500);
    margin-top: var(--space-6);
    padding-top: var(--space-4);
    border-top: 1px solid var(--color-gray-200);
  }
`;

const Content = styled.div`
  background: white;
  padding: var(--space-10);
  border-radius: 24px;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  font-size: var(--font-size-base);
  line-height: 1.7;
  color: var(--color-gray-800);

  @media (max-width: 768px) {
    padding: var(--space-6);
    font-size: var(--font-size-sm);
    line-height: 1.6;
  }

  h2 {
    font-size: clamp(var(--font-size-xl), 3vw, var(--font-size-2xl));
    color: var(--color-primary-600);
    margin-top: var(--space-10);
    margin-bottom: var(--space-6);
    position: relative;
    padding-left: var(--space-8);

    &::before {
      content: '📋';
      position: absolute;
      left: 0;
      top: 0;
      font-size: var(--font-size-lg);
    }

    &:first-child {
      margin-top: 0;
    }
  }

  h3 {
    font-size: clamp(var(--font-size-lg), 2.5vw, var(--font-size-xl));
    color: var(--color-primary-700);
    margin-top: var(--space-8);
    margin-bottom: var(--space-4);
    position: relative;
    padding-left: var(--space-6);

    &::before {
      content: '▶️';
      position: absolute;
      left: 0;
      top: 0;
      font-size: var(--font-size-sm);
    }
  }

  p {
    margin-bottom: var(--space-6);
    text-align: justify;

    @media (max-width: 768px) {
      margin-bottom: var(--space-4);
    }
  }

  ul, ol {
    margin: var(--space-6) 0;
    padding-left: var(--space-8);

    @media (max-width: 768px) {
      margin: var(--space-4) 0;
      padding-left: var(--space-6);
    }

    li {
      margin-bottom: var(--space-3);
      line-height: 1.6;

      @media (max-width: 768px) {
        margin-bottom: var(--space-2);
      }
    }
  }

  .contact-info {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    padding: var(--space-8);
    border-radius: 16px;
    border: 1px solid var(--color-blue-200);
    margin: var(--space-10) 0;
    position: relative;

    @media (max-width: 768px) {
      padding: var(--space-6);
      margin: var(--space-8) 0;
    }

    &::before {
      content: '📞';
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      font-size: var(--font-size-2xl);
    }

    h3 {
      color: var(--color-blue-800);
      margin-bottom: var(--space-4);
      padding-left: 0;

      &::before {
        display: none;
      }
    }

    p {
      margin-bottom: var(--space-3);
      
      &:last-child {
        margin-bottom: 0;
      }
    }

    strong {
      color: var(--color-blue-900);
    }
  }

  .important-note {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    padding: var(--space-6);
    border-radius: 16px;
    border: 1px solid var(--color-yellow-300);
    margin: var(--space-8) 0;
    position: relative;

    @media (max-width: 768px) {
      padding: var(--space-4);
      margin: var(--space-6) 0;
    }

    &::before {
      content: '⚠️';
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      font-size: var(--font-size-xl);
    }

    strong {
      color: var(--color-yellow-800);
      display: block;
      margin-bottom: var(--space-2);
    }

    p {
      margin-bottom: 0;
      color: var(--color-yellow-700);
    }
  }

  .emergency-note {
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    padding: var(--space-6);
    border-radius: 16px;
    border: 1px solid var(--color-red-300);
    margin: var(--space-8) 0;
    position: relative;

    @media (max-width: 768px) {
      padding: var(--space-4);
      margin: var(--space-6) 0;
    }

    &::before {
      content: '🚨';
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      font-size: var(--font-size-xl);
    }

    strong {
      color: var(--color-red-800);
      display: block;
      margin-bottom: var(--space-2);
    }

    p {
      margin-bottom: 0;
      color: var(--color-red-700);
    }
  }
`;



interface MedicalDisclaimerPageProps {
  onNavigateHome: () => void;
}

const MedicalDisclaimerPage: React.FC<MedicalDisclaimerPageProps> = ({ onNavigateHome }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useSEO({
    title: 'Medical Disclaimer - Laredo Car Accident Medical Center',
    description: 'Important medical disclaimer and liability information for Laredo Car Accident Medical Center. Please read carefully before using our medical services.',
    keywords: 'medical disclaimer, liability, medical information, emergency care, Laredo medical center',
    lang: 'en'
  });

  // Handle navigation for footer
  const handleNavigation = (page: string) => {
    if (page === 'home') {
      onNavigateHome();
    }
    // For other navigation, handle appropriately
  };

  return (
    <>
      <PolicyHeader />
      <PageContainer>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

          
          <Header>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="icon"
            >
              📋
            </motion.div>
            <h1>Medical Disclaimer</h1>
            <p className="subtitle">
              Important information about the medical content and services provided on this website. 
              Please read carefully before using our website or services.
            </p>
            <div className="last-updated">
              Last Updated: January 1, 2024
            </div>
          </Header>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Content>
              <div className="important-note">
                <strong>Important Disclaimer</strong>
                <p>This disclaimer contains important information about the medical information provided on this website. Please read carefully before using our website or services.</p>
              </div>

              <h2>General Medical Disclaimer</h2>
              <p>The information provided on the Laredo Car Accident Medical Center website is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition or treatment.</p>

              <h2>No Doctor-Patient Relationship</h2>
              <p>The use of this website and the information contained herein does not create a doctor-patient relationship between you and Laredo Car Accident Medical Center or any of our healthcare providers. A doctor-patient relationship is established only through direct, personal consultation and examination by a qualified healthcare provider at our facility.</p>

              <h2>Emergency Medical Situations</h2>
              <div className="emergency-note">
                <strong>Medical Emergency Warning</strong>
                <p>In case of a medical emergency, call 911 immediately. Do not rely on information from this website or attempt to contact us through this website for emergency medical care.</p>
              </div>
              <p>If you are experiencing a medical emergency, seek immediate medical attention at the nearest emergency room or urgent care facility. Do not delay seeking treatment based on information from this website.</p>

              <h2>Accuracy of Information</h2>
              <p>While we strive to provide accurate and up-to-date medical information, we make no warranties or representations regarding the accuracy, completeness, or timeliness of the content on this website. Medical knowledge and treatments are constantly evolving, and information that was accurate at the time of publication may become outdated.</p>

              <h2>Individual Medical Situations</h2>
              <ul>
                <li>Every individual's medical situation is unique, and treatment outcomes may vary significantly from person to person.</li>
                <li>The information on this website should not be used to diagnose or treat any medical condition.</li>
                <li>Treatment recommendations must be individualized based on a thorough medical examination and assessment.</li>
                <li>Past treatment results do not guarantee similar outcomes for future patients.</li>
                <li>All medical procedures carry inherent risks that must be discussed with qualified healthcare providers.</li>
              </ul>

              <h2>Risks and Benefits</h2>
              <p>All medical treatments carry inherent risks and potential benefits. The information on this website provides general information about treatments and procedures but does not constitute medical advice about risks, benefits, or appropriateness for any individual patient. Specific risks and benefits must be discussed with a qualified healthcare provider during a personal consultation.</p>

              <h2>Third-Party Information</h2>
              <p>Our website may contain links to third-party websites or reference third-party medical information. We do not endorse or assume responsibility for the accuracy or reliability of any information provided by third parties. We recommend verifying any third-party information with qualified healthcare providers.</p>

              <h2>Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, Laredo Car Accident Medical Center, its healthcare providers, employees, and affiliates shall not be liable for any damages arising from your use of this website or reliance on the information contained herein. This includes but is not limited to direct, indirect, incidental, consequential, or punitive damages.</p>

              <h2>Professional Licensing</h2>
              <p>Our healthcare providers are licensed to practice in the state of Texas. If you are located outside of Texas, please consult with healthcare providers licensed in your state or jurisdiction. Medical licenses and scope of practice may vary by state.</p>

              <h2>Patient Responsibilities</h2>
              <p>As a patient or website visitor, you are responsible for:</p>
              <ul>
                <li>Providing accurate and complete medical history information</li>
                <li>Following prescribed treatment plans and attending scheduled appointments</li>
                <li>Reporting any changes in your condition or adverse reactions to treatment</li>
                <li>Seeking immediate medical attention for emergency situations</li>
                <li>Informing us of all medications, supplements, and other treatments you are receiving</li>
                <li>Understanding that medical treatments may not guarantee specific outcomes</li>
              </ul>

              <h2>Confidentiality and Privacy</h2>
              <p>Any medical information you provide through this website or during treatment is subject to our Privacy Policy and HIPAA regulations. However, please be aware that internet communications may not be completely secure, and you should avoid sending sensitive medical information through unsecured email or website forms.</p>

              <h2>Changes to This Disclaimer</h2>
              <p>We reserve the right to update this Medical Disclaimer at any time without notice. Changes will be effective immediately upon posting on our website. Please review this disclaimer periodically to stay informed of any updates.</p>

              <div className="contact-info">
                <h3>Contact Information</h3>
                <p>If you have questions about this Medical Disclaimer or need clarification about any medical information, please contact us:</p>
                <p><strong>Laredo Car Accident Medical Center</strong><br />
                8511 McPherson Road, Suite 208<br />
                Laredo, TX 78045<br />
                Phone: (956) 333-2727<br />
                Email: info@laredocaraccident.com</p>
                
                <p><strong>For medical emergencies, call 911 immediately.</strong></p>
              </div>
            </Content>
          </motion.div>
        </motion.div>
      </Container>
    </PageContainer>
    <Footer onNavigate={handleNavigation} />
    </>
  );
};

export default MedicalDisclaimerPage; 