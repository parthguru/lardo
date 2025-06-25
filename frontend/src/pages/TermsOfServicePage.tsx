import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import PolicyHeader from '../components/layout/PolicyHeader';
import Footer from '../components/layout/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f0ff 0%, #e8e5ff 100%);
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
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
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
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
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
    color: var(--color-purple-600);
    margin-top: var(--space-10);
    margin-bottom: var(--space-6);
    position: relative;
    padding-left: var(--space-8);

    &::before {
      content: '📄';
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
    color: var(--color-purple-700);
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
    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
    padding: var(--space-8);
    border-radius: 16px;
    border: 1px solid var(--color-purple-200);
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
      color: var(--color-purple-800);
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
      color: var(--color-purple-900);
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

  .legal-highlight {
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
      content: '⚖️';
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

  .service-info {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    padding: var(--space-6);
    border-radius: 16px;
    border: 1px solid var(--color-green-300);
    margin: var(--space-8) 0;

    @media (max-width: 768px) {
      padding: var(--space-4);
      margin: var(--space-6) 0;
    }

    h4 {
      color: var(--color-green-800);
      margin-bottom: var(--space-4);
      font-size: var(--font-size-lg);
      font-weight: 600;
    }

    ul {
      margin: 0;
    }

    li {
      color: var(--color-green-700);
    }
  }
`;

interface TermsOfServicePageProps {
  onNavigateHome: () => void;
}

const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onNavigateHome }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useSEO({
    title: 'Terms of Service - Laredo Car Accident Medical Center',
    description: 'Terms of Service governing the use of our website and medical services at Laredo Car Accident Medical Center. Please read carefully.',
    keywords: 'terms of service, terms and conditions, website terms, medical services terms, Laredo medical center',
    lang: 'en'
  });

  // Handle navigation for footer
  const handleNavigation = (page: string) => {
    if (page === 'home') {
      onNavigateHome();
    }
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
              📄
            </motion.div>
            <h1>Terms of Service</h1>
            <p className="subtitle">
              These terms govern your use of our website and medical services. 
              By using our services, you agree to these terms and conditions.
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
              <div className="legal-highlight">
                <strong>Legal Agreement</strong>
                <p>These Terms of Service constitute a legally binding agreement between you and Laredo Car Accident Medical Center. Please read them carefully before using our website or services.</p>
              </div>

              <h2>Acceptance of Terms</h2>
              <p>By accessing or using our website, scheduling appointments, or receiving medical services from Laredo Car Accident Medical Center, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.</p>

              <h2>Description of Services</h2>
              <p>Laredo Car Accident Medical Center provides medical services specifically designed for individuals who have been involved in motor vehicle accidents. Our services include but are not limited to:</p>
              
              <div className="service-info">
                <h4>Medical Services:</h4>
                <ul>
                  <li>Emergency medical evaluation and treatment</li>
                  <li>Diagnostic imaging (X-rays, MRI, CT scans)</li>
                  <li>Physical therapy and rehabilitation</li>
                  <li>Pain management and treatment</li>
                  <li>Specialist consultations and referrals</li>
                  <li>Medical documentation for legal proceedings</li>
                </ul>
              </div>

              <h2>Website Use</h2>
              <h3>Permitted Uses</h3>
              <p>You may use our website for the following purposes:</p>
              <ul>
                <li>Learning about our medical services and staff</li>
                <li>Scheduling medical appointments</li>
                <li>Accessing patient forms and information</li>
                <li>Contacting our office for questions or support</li>
                <li>Reading educational content about car accident injuries</li>
              </ul>

              <h3>Prohibited Uses</h3>
              <p>You may not use our website for any unlawful purpose or in any way that could damage, disable, overburden, or impair our services. Specifically, you agree not to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit any harmful, threatening, or offensive content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated scripts or bots to access our website</li>
                <li>Interfere with the proper functioning of our website</li>
                <li>Collect or harvest information about our users</li>
                <li>Impersonate any person or entity</li>
                <li>Transmit viruses or malicious code</li>
              </ul>

              <h2>Medical Services Terms</h2>
              <h3>Doctor-Patient Relationship</h3>
              <p>A doctor-patient relationship is established only when you physically visit our facility and receive a medical examination from one of our licensed healthcare providers. Visiting our website or filling out online forms does not create a doctor-patient relationship.</p>

              <h3>Medical Records and Privacy</h3>
              <p>Your medical records and personal health information are protected under HIPAA and other applicable privacy laws. Please refer to our Privacy Policy and HIPAA Notice for detailed information about how we handle your medical information.</p>

              <h3>Insurance and Payment</h3>
              <p>You are responsible for providing accurate insurance information and understanding your coverage. You agree to pay for all services rendered that are not covered by your insurance. We will work with your insurance company to maximize your benefits, but we cannot guarantee coverage or payment amounts.</p>

              <div className="important-note">
                <strong>Payment Responsibility</strong>
                <p>Patients are ultimately responsible for all charges incurred. If your insurance does not cover certain services, you will be responsible for payment. We recommend verifying your coverage before treatment.</p>
              </div>

              <h2>Attorney and Legal Matters</h2>
              <h3>Personal Injury Cases</h3>
              <p>If you are represented by an attorney for your car accident case, we may work directly with your legal team to provide necessary medical documentation and testimony. However, our primary obligation is always to provide appropriate medical care.</p>

              <h3>Letter of Protection (LOP)</h3>
              <p>In some cases, we may accept a Letter of Protection from your attorney as a guarantee of payment. This arrangement does not change our commitment to providing medically necessary care, regardless of legal outcomes.</p>

              <h3>Medical Documentation</h3>
              <p>We will provide accurate and truthful medical documentation based on our clinical findings. We cannot and will not alter medical records or provide false information for legal purposes.</p>

              <h2>Limitations and Disclaimers</h2>
              <h3>Website Information</h3>
              <p>The information on our website is for educational purposes only and should not be considered medical advice. Always consult with a qualified healthcare provider for medical diagnosis and treatment recommendations.</p>

              <h3>Service Availability</h3>
              <p>We strive to provide continuous access to our website and services, but we cannot guarantee uninterrupted availability. We reserve the right to modify, suspend, or discontinue any part of our services at any time.</p>

              <h3>Third-Party Content</h3>
              <p>Our website may contain links to third-party websites or reference third-party services. We do not endorse or assume responsibility for the content, privacy policies, or practices of third-party sites.</p>

              <h2>Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, Laredo Car Accident Medical Center shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. This includes but is not limited to:</p>
              <ul>
                <li>Loss of profits or business opportunities</li>
                <li>Data loss or corruption</li>
                <li>Service interruptions</li>
                <li>Technical failures or errors</li>
                <li>Third-party actions or omissions</li>
              </ul>

              <div className="legal-highlight">
                <strong>Texas Law Governs</strong>
                <p>These Terms of Service are governed by the laws of the State of Texas. Any disputes arising under these terms will be subject to the exclusive jurisdiction of the courts in Webb County, Texas.</p>
              </div>

              <h2>Indemnification</h2>
              <p>You agree to indemnify and hold harmless Laredo Car Accident Medical Center, its employees, and affiliates from any claims, damages, or expenses arising from your use of our website or services, your violation of these terms, or your violation of any rights of another party.</p>

              <h2>Intellectual Property</h2>
              <h3>Our Content</h3>
              <p>All content on our website, including text, graphics, logos, images, and software, is the property of Laredo Car Accident Medical Center and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>

              <h3>User-Generated Content</h3>
              <p>By submitting any content to our website (such as reviews or comments), you grant us a non-exclusive, royalty-free license to use, reproduce, and distribute that content. You represent that you have the right to grant this license and that your content does not violate any third-party rights.</p>

              <h2>Privacy and Data Protection</h2>
              <p>Your privacy is important to us. Our collection, use, and protection of your personal and medical information is governed by our Privacy Policy and HIPAA Notice. By using our services, you consent to the collection and use of your information as described in these documents.</p>

              <h2>Communication Preferences</h2>
              <p>By providing your contact information, you consent to receive communications from us via phone, email, or text message regarding:</p>
              <ul>
                <li>Appointment confirmations and reminders</li>
                <li>Test results and treatment updates</li>
                <li>Billing and payment information</li>
                <li>Important health and safety notifications</li>
              </ul>
              <p>You may opt out of non-essential communications at any time by contacting our office.</p>

              <h2>Termination</h2>
              <p>We reserve the right to terminate or suspend your access to our website or services at any time, without notice, for any reason, including violation of these Terms of Service. Upon termination, your right to use our website ceases immediately.</p>

              <h2>Emergency Situations</h2>
              <div className="important-note">
                <strong>Medical Emergencies</strong>
                <p>Our website and online forms are not intended for emergency situations. If you are experiencing a medical emergency, call 911 immediately or go to the nearest emergency room.</p>
              </div>

              <h2>Severability</h2>
              <p>If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions will continue to be valid and enforceable to the fullest extent permitted by law.</p>

              <h2>Entire Agreement</h2>
              <p>These Terms of Service, together with our Privacy Policy and HIPAA Notice, constitute the entire agreement between you and Laredo Car Accident Medical Center regarding your use of our website and services.</p>

              <h2>Changes to Terms</h2>
              <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our website or services after any changes constitutes acceptance of the new terms.</p>

              <h2>Age Requirements</h2>
              <p>Our website is not intended for use by individuals under the age of 18 without parental or guardian supervision. If you are under 18, you may only use our website with the involvement of a parent or guardian.</p>

              <h2>Accessibility</h2>
              <p>We strive to make our website accessible to all users, including those with disabilities. If you experience any difficulty accessing our website, please contact us, and we will work to provide alternative access methods.</p>

              <div className="contact-info">
                <h3>Contact Information</h3>
                <p>If you have questions about these Terms of Service, please contact us:</p>
                <p><strong>Laredo Car Accident Medical Center</strong><br />
                8511 McPherson Road, Suite 208<br />
                Laredo, TX 78045<br />
                Phone: (956) 333-2727<br />
                Email: info@laredocaraccident.com</p>
                
                <p><strong>Business Hours:</strong><br />
                Monday - Friday: 8:00 AM - 5:00 PM<br />
                Saturday - Sunday: Closed<br />
                Emergency appointments available by arrangement</p>
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

export default TermsOfServicePage; 