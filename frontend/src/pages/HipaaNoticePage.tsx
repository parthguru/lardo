import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';
import PolicyHeader from '../components/layout/PolicyHeader';
import Footer from '../components/layout/Footer';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fefbf2 0%, #fef3e2 100%);
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
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
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
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
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
    color: var(--color-orange-600);
    margin-top: var(--space-10);
    margin-bottom: var(--space-6);
    position: relative;
    padding-left: var(--space-8);

    &::before {
      content: '🏥';
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
    color: var(--color-orange-700);
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
    background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
    padding: var(--space-8);
    border-radius: 16px;
    border: 1px solid var(--color-orange-200);
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
      color: var(--color-orange-800);
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
      color: var(--color-orange-900);
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

  .rights-highlight {
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    padding: var(--space-6);
    border-radius: 16px;
    border: 1px solid var(--color-blue-300);
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
      color: var(--color-blue-800);
      display: block;
      margin-bottom: var(--space-2);
    }

    p {
      margin-bottom: 0;
      color: var(--color-blue-700);
    }
  }

  .hipaa-examples {
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
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

interface HipaaNoticePageProps {
  onNavigateHome: () => void;
}

const HipaaNoticePage: React.FC<HipaaNoticePageProps> = ({ onNavigateHome }) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useSEO({
    title: 'HIPAA Notice of Privacy Practices - Laredo Car Accident Medical Center',
    description: 'Notice of Privacy Practices under HIPAA explaining how your medical information is used, disclosed, and protected at Laredo Car Accident Medical Center.',
    keywords: 'HIPAA notice, privacy practices, medical information, protected health information, patient rights, Laredo medical center',
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
              🏥
            </motion.div>
            <h1>HIPAA Notice of Privacy Practices</h1>
            <p className="subtitle">
              This notice describes how medical information about you may be used and disclosed 
              and how you can get access to this information. Please review it carefully.
            </p>
            <div className="last-updated">
              Effective Date: January 1, 2024
            </div>
          </Header>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Content>
              <div className="rights-highlight">
                <strong>Your Rights Under HIPAA</strong>
                <p>The Health Insurance Portability and Accountability Act (HIPAA) gives you important rights regarding your protected health information. This notice explains those rights and our responsibilities to protect your privacy.</p>
              </div>

              <h2>Our Commitment to Your Privacy</h2>
              <p>Laredo Car Accident Medical Center is required by law to maintain the privacy of your protected health information (PHI) and to provide you with this notice of our legal duties and privacy practices. We are committed to protecting your health information and will only use and disclose your PHI as described in this notice or as authorized by you.</p>

              <h2>How We May Use and Disclose Your Health Information</h2>

              <h3>Treatment</h3>
              <p>We may use your health information to provide you with medical treatment or services. We may disclose health information about you to doctors, nurses, technicians, or other personnel who are involved in taking care of you.</p>
              
              <div className="hipaa-examples">
                <h4>Examples include:</h4>
                <ul>
                  <li>A doctor treating you for car accident injuries may need to know if you have diabetes because diabetes may slow the healing process</li>
                  <li>We may share your information with specialists we refer you to for consultation</li>
                  <li>We may share information with physical therapy providers for your rehabilitation</li>
                  <li>Laboratory results may be shared with your treating physician</li>
                </ul>
              </div>

              <h3>Payment</h3>
              <p>We may use and disclose your health information so that treatment and services you receive may be billed to and payment may be collected from you, an insurance company, or a third party.</p>
              
              <div className="hipaa-examples">
                <h4>Examples include:</h4>
                <ul>
                  <li>Submitting claims to your health insurance company</li>
                  <li>Providing information to verify your insurance coverage</li>
                  <li>Sharing treatment information with your attorney for personal injury claims</li>
                  <li>Working with collection agencies for unpaid bills</li>
                </ul>
              </div>

              <h3>Health Care Operations</h3>
              <p>We may use and disclose your health information for health care operations, which include activities that are necessary to run our practice and ensure that all of our patients receive quality care.</p>
              
              <div className="hipaa-examples">
                <h4>Examples include:</h4>
                <ul>
                  <li>Quality assessment and improvement activities</li>
                  <li>Staff training and education programs</li>
                  <li>Compliance and risk management activities</li>
                  <li>Business planning and development</li>
                </ul>
              </div>

              <h2>Special Situations</h2>

              <h3>Business Associates</h3>
              <p>We may share your health information with third-party business associates who perform functions on our behalf or provide us with services. These business associates are required by law to protect your health information and are not allowed to use or disclose any information other than as specified in our contracts with them.</p>

              <h3>Emergency Situations</h3>
              <p>We may use or disclose your health information in emergency situations to provide you with the treatment you need. We will try to get your permission as soon as reasonably possible after providing emergency treatment.</p>

              <h3>Communication with Family and Friends</h3>
              <p>With your permission, we may share relevant health information with family members, friends, or others you identify as being involved in your care or payment for your care. We may also notify these individuals about your location, general condition, or death.</p>

              <h3>Required by Law</h3>
              <p>We will disclose your health information when required to do so by federal, state, or local law, including:</p>
              <ul>
                <li>Public health activities and disease reporting</li>
                <li>Health oversight activities and audits</li>
                <li>Judicial and administrative proceedings</li>
                <li>Law enforcement purposes</li>
                <li>To prevent serious threat to health or safety</li>
                <li>Workers' compensation cases</li>
                <li>Coroners, medical examiners, and funeral directors</li>
              </ul>

              <div className="important-note">
                <strong>Legal Proceedings</strong>
                <p>If you are involved in a lawsuit related to your car accident, we may be required to disclose your medical information in response to a court order, subpoena, or other lawful process.</p>
              </div>

              <h2>Your Individual Rights</h2>

              <h3>Right to Request Restrictions</h3>
              <p>You have the right to request restrictions on how we use or disclose your health information for treatment, payment, or health care operations. You also have the right to request that we restrict the health information we disclose about you to someone who is involved in your care or the payment for your care.</p>
              <p>We are not required to agree to your request for restrictions, except in the case where you have paid for a service or health care item out-of-pocket in full and request that we not disclose information about that item or service to your health plan.</p>

              <h3>Right to Request Confidential Communications</h3>
              <p>You have the right to request that we communicate with you about health matters in a certain way or at a certain location. For example, you can ask that we only contact you at work or by mail. We will accommodate reasonable requests.</p>

              <h3>Right to Inspect and Copy</h3>
              <p>You have the right to inspect and receive a copy of your health information that may be used to make decisions about your care. This typically includes medical and billing records.</p>
              <p>To inspect and copy your health information, you must submit your request in writing. We may charge a fee for the costs of copying, mailing, or other supplies associated with your request.</p>

              <h3>Right to Request Amendment</h3>
              <p>If you believe that health information we have about you is incorrect or incomplete, you may ask us to amend the information. You have the right to request an amendment for as long as the information is kept by or for our practice.</p>
              <p>To request an amendment, you must submit your request in writing and provide a reason that supports your request. We may deny your request if it is not in writing or does not include a reason to support the request.</p>

              <h3>Right to an Accounting of Disclosures</h3>
              <p>You have the right to request an accounting of disclosures of your health information. This is a list of certain disclosures we made of your health information for purposes other than treatment, payment, and health care operations.</p>
              <p>To request an accounting of disclosures, you must submit your request in writing. The first list you request within a 12-month period will be free. For additional lists, we may charge you for the costs of providing the list.</p>

              <h3>Right to a Paper Copy of This Notice</h3>
              <p>You have the right to receive a paper copy of this notice at any time, even if you have agreed to receive the notice electronically. You may ask us to give you a copy of this notice at any time.</p>

              <h3>Right to File a Complaint</h3>
              <p>If you believe your privacy rights have been violated, you may file a complaint with us or with the U.S. Department of Health and Human Services. To file a complaint with us, contact our Privacy Officer using the information provided at the end of this notice.</p>
              <p>You will not be penalized or retaliated against for filing a complaint.</p>

              <h2>Changes to This Notice</h2>
              <p>We reserve the right to change this notice at any time. We reserve the right to make the revised or changed notice effective for health information we already have about you as well as any information we receive in the future.</p>
              <p>We will post a copy of the current notice in our office and on our website. The notice will contain the effective date on the first page.</p>

              <h2>Minimum Necessary Standard</h2>
              <p>When using or disclosing health information or when requesting health information from another covered entity, we make reasonable efforts to limit the information to the minimum necessary to accomplish the intended purpose of the use, disclosure, or request.</p>

              <h2>Breach Notification</h2>
              <p>In the case of a breach of your unsecured protected health information, we will notify you in writing within 60 days of the discovery of the breach. The notification will include:</p>
              <ul>
                <li>A description of what happened</li>
                <li>The types of information that were involved in the breach</li>
                <li>The steps you should take to protect yourself from potential harm</li>
                <li>What we are doing to investigate the breach and prevent future breaches</li>
                <li>Contact procedures so you can ask questions or learn additional information</li>
              </ul>

              <h2>Uses and Disclosures Requiring Authorization</h2>
              <p>Other than as described in this notice, we will not use or disclose your health information without your written authorization. If you give us authorization to use or disclose your health information, you may revoke that authorization in writing at any time.</p>
              <p>Uses and disclosures that always require your authorization include:</p>
              <ul>
                <li>Marketing communications</li>
                <li>Sale of your health information</li>
                <li>Most uses and disclosures of psychotherapy notes</li>
                <li>Uses and disclosures for purposes not described in this notice</li>
              </ul>

              <div className="contact-info">
                <h3>Contact Information</h3>
                <p>If you have questions about this notice or want to exercise any of your rights, please contact our Privacy Officer:</p>
                <p><strong>Laredo Car Accident Medical Center</strong><br />
                Attention: HIPAA Privacy Officer<br />
                8511 McPherson Road, Suite 208<br />
                Laredo, TX 78045<br />
                Phone: (956) 333-2727<br />
                Email: privacy@laredocaraccident.com</p>
                
                <p><strong>To file a complaint with the U.S. Department of Health and Human Services:</strong><br />
                Office for Civil Rights<br />
                U.S. Department of Health and Human Services<br />
                200 Independence Avenue, S.W.<br />
                Washington, D.C. 20201<br />
                Phone: 1-877-696-6775<br />
                Website: www.hhs.gov/ocr/privacy/hipaa/complaints/</p>
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

export default HipaaNoticePage; 