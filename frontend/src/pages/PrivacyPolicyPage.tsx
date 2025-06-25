import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import PolicyHeader from '../components/layout/PolicyHeader';
import Footer from '../components/layout/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
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
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
    color: var(--color-green-600);
    margin-top: var(--space-10);
    margin-bottom: var(--space-6);
    position: relative;
    padding-left: var(--space-8);

    &::before {
      content: '🔒';
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
    color: var(--color-green-700);
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
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    padding: var(--space-8);
    border-radius: 16px;
    border: 1px solid var(--color-green-200);
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
      color: var(--color-green-800);
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
      color: var(--color-green-900);
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

  .privacy-highlight {
    background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%);
    padding: var(--space-6);
    border-radius: 16px;
    border: 1px solid var(--color-cyan-300);
    margin: var(--space-8) 0;
    position: relative;

    @media (max-width: 768px) {
      padding: var(--space-4);
      margin: var(--space-6) 0;
    }

    &::before {
      content: '🛡️';
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      font-size: var(--font-size-xl);
    }

    strong {
      color: var(--color-cyan-800);
      display: block;
      margin-bottom: var(--space-2);
    }

    p {
      margin-bottom: 0;
      color: var(--color-cyan-700);
    }
  }
`;

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigateHome }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useSEO({
    title: 'Privacy Policy - Laredo Car Accident Medical Center',
    description: 'Our comprehensive privacy policy explaining how we collect, use, and protect your personal and medical information at Laredo Car Accident Medical Center.',
    keywords: 'privacy policy, data protection, HIPAA, medical privacy, personal information, Laredo medical center',
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
              🔒
            </motion.div>
            <h1>Privacy Policy</h1>
            <p className="subtitle">
              We are committed to protecting your privacy and safeguarding your personal and medical information. 
              Learn how we collect, use, and protect your data.
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
              <div className="privacy-highlight">
                <strong>Your Privacy Matters</strong>
                <p>At Laredo Car Accident Medical Center, we take your privacy seriously and are committed to protecting your personal and medical information in accordance with HIPAA regulations and applicable privacy laws.</p>
              </div>

              <h2>Information We Collect</h2>
              <h3>Personal Information</h3>
              <p>We may collect the following types of personal information:</p>
              <ul>
                <li>Name, address, phone number, and email address</li>
                <li>Date of birth and social security number</li>
                <li>Insurance information and policy details</li>
                <li>Emergency contact information</li>
                <li>Attorney information (if applicable)</li>
                <li>Employment and income information (if relevant to treatment)</li>
              </ul>

              <h3>Medical Information</h3>
              <p>We collect medical information necessary for your care, including:</p>
              <ul>
                <li>Medical history and current symptoms</li>
                <li>Physical examination results</li>
                <li>Diagnostic test results (X-rays, MRI, CT scans, etc.)</li>
                <li>Treatment plans and progress notes</li>
                <li>Medication information and allergies</li>
                <li>Billing and payment information</li>
              </ul>

              <h3>Website Information</h3>
              <p>When you visit our website, we may collect:</p>
              <ul>
                <li>IP address and browser information</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
                <li>Device and operating system information</li>
                <li>Cookie and tracking information (with your consent)</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <h3>Medical Care and Treatment</h3>
              <p>We use your information primarily to:</p>
              <ul>
                <li>Provide medical diagnosis, treatment, and care coordination</li>
                <li>Schedule appointments and send appointment reminders</li>
                <li>Coordinate with other healthcare providers</li>
                <li>Manage your medical records and treatment plans</li>
                <li>Monitor your progress and adjust treatments as needed</li>
              </ul>

              <h3>Administrative Purposes</h3>
              <p>We may use your information for:</p>
              <ul>
                <li>Insurance billing and claims processing</li>
                <li>Payment processing and account management</li>
                <li>Legal documentation and compliance</li>
                <li>Quality assurance and healthcare improvement</li>
                <li>Business operations and administrative functions</li>
              </ul>

              <h3>Communication</h3>
              <p>We may use your contact information to:</p>
              <ul>
                <li>Send appointment confirmations and reminders</li>
                <li>Provide test results and treatment updates</li>
                <li>Send billing statements and payment reminders</li>
                <li>Share important health and safety information</li>
                <li>Respond to your questions and concerns</li>
              </ul>

              <h2>How We Share Your Information</h2>
              <h3>Healthcare Providers</h3>
              <p>We may share your medical information with:</p>
              <ul>
                <li>Other healthcare providers involved in your care</li>
                <li>Specialists to whom we refer you for treatment</li>
                <li>Laboratories and diagnostic imaging centers</li>
                <li>Emergency medical personnel when necessary</li>
                <li>Healthcare facilities for continuity of care</li>
              </ul>

              <h3>Insurance and Payment</h3>
              <p>We share information as necessary for:</p>
              <ul>
                <li>Insurance authorization and claims processing</li>
                <li>Payment verification and collection</li>
                <li>Medical necessity documentation</li>
                <li>Coordination of benefits</li>
              </ul>

              <h3>Legal Requirements</h3>
              <p>We may disclose information when required by:</p>
              <ul>
                <li>Court orders and legal subpoenas</li>
                <li>Law enforcement investigations</li>
                <li>Public health reporting requirements</li>
                <li>Worker's compensation proceedings</li>
                <li>Regulatory compliance and audits</li>
              </ul>

              <div className="important-note">
                <strong>Attorney Communication</strong>
                <p>If you have an attorney representing you for your car accident case, we may share relevant medical information with your attorney as authorized by you and necessary for your legal representation.</p>
              </div>

              <h2>Data Security and Protection</h2>
              <h3>Physical Safeguards</h3>
              <ul>
                <li>Secure facilities with controlled access</li>
                <li>Locked filing cabinets for paper records</li>
                <li>Secure disposal of medical records</li>
                <li>Employee access controls and training</li>
              </ul>

              <h3>Technical Safeguards</h3>
              <ul>
                <li>Encrypted data transmission and storage</li>
                <li>Secure servers and network protection</li>
                <li>Regular security updates and monitoring</li>
                <li>Access logs and audit trails</li>
                <li>Multi-factor authentication systems</li>
              </ul>

              <h3>Administrative Safeguards</h3>
              <ul>
                <li>Privacy policies and procedures</li>
                <li>Employee training and background checks</li>
                <li>Incident response and breach notification procedures</li>
                <li>Regular risk assessments and security reviews</li>
              </ul>

              <h2>Your Privacy Rights</h2>
              <h3>Access to Your Information</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Request and receive copies of your medical records</li>
                <li>Review and inspect your personal information</li>
                <li>Request amendments to incorrect information</li>
                <li>Receive an accounting of disclosures</li>
              </ul>

              <h3>Control Over Your Information</h3>
              <p>You can:</p>
              <ul>
                <li>Request restrictions on how we use or share your information</li>
                <li>Choose how we communicate with you</li>
                <li>Opt out of certain communications</li>
                <li>Withdraw consent for certain uses (where applicable)</li>
              </ul>

              <h3>Website Privacy Controls</h3>
              <ul>
                <li>Disable cookies in your browser settings</li>
                <li>Opt out of tracking and analytics</li>
                <li>Request deletion of website data</li>
                <li>Update your communication preferences</li>
              </ul>

              <h2>Data Retention</h2>
              <p>We retain your information for the following periods:</p>
              <ul>
                <li>Medical records: As required by Texas state law (minimum 7 years for adults, until age 20 for minors)</li>
                <li>Billing records: 7 years from the last date of service</li>
                <li>Website data: 2-3 years unless you request earlier deletion</li>
                <li>Marketing communications: Until you unsubscribe</li>
              </ul>

              <h2>Third-Party Services</h2>
              <p>We may use third-party services that have access to your information:</p>
              <ul>
                <li>Electronic health record systems</li>
                <li>Billing and payment processors</li>
                <li>Cloud storage and backup services</li>
                <li>Communication and scheduling platforms</li>
                <li>Website analytics and marketing tools</li>
              </ul>
              <p>All third-party services are required to maintain appropriate privacy and security protections for your information.</p>

              <h2>Children's Privacy</h2>
              <p>We do not knowingly collect personal information from children under 13 through our website without parental consent. For medical care of minors, we collect only information necessary for treatment and follow all applicable laws regarding minors' medical privacy.</p>

              <h2>Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by:</p>
              <ul>
                <li>Posting the updated policy on our website</li>
                <li>Providing notice during your next visit</li>
                <li>Sending email notifications (if you've provided consent)</li>
                <li>Posting notices in our office</li>
              </ul>

              <h2>Breach Notification</h2>
              <p>In the unlikely event of a data breach involving your personal or medical information, we will:</p>
              <ul>
                <li>Notify you within 60 days of discovery</li>
                <li>Provide details about what information was involved</li>
                <li>Explain steps we're taking to address the breach</li>
                <li>Offer recommendations to protect yourself</li>
                <li>Notify appropriate regulatory authorities as required</li>
              </ul>

              <div className="contact-info">
                <h3>Privacy Officer Contact</h3>
                <p>If you have questions about this Privacy Policy or want to exercise your privacy rights, please contact our Privacy Officer:</p>
                <p><strong>Laredo Car Accident Medical Center</strong><br />
                Attention: Privacy Officer<br />
                8511 McPherson Road, Suite 208<br />
                Laredo, TX 78045<br />
                Phone: (956) 333-2727<br />
                Email: privacy@laredocaraccident.com</p>
                
                <p><strong>For urgent privacy concerns, please call during business hours: Monday-Friday, 8:00 AM - 5:00 PM</strong></p>
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

export default PrivacyPolicyPage; 