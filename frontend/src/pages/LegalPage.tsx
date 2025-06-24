import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';

const LegalPageContainer = styled.div`
  min-height: 100vh;
  background: var(--color-white);
  padding-top: 120px;

  @media (max-width: 768px) {
    padding-top: 100px;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: var(--space-12);

  @media (max-width: 768px) {
    margin-bottom: var(--space-8);
  }

  h1 {
    font-size: var(--font-size-4xl);
    color: var(--color-primary-600);
    margin-bottom: var(--space-4);

    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }

  .last-updated {
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);
    margin-top: var(--space-4);
  }
`;

const Content = styled.div`
  font-size: var(--font-size-base);
  line-height: 1.7;
  color: var(--color-gray-800);

  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
    line-height: 1.6;
  }

  h2 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary-600);
    margin-top: var(--space-8);
    margin-bottom: var(--space-4);

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
      margin-top: var(--space-6);
    }
  }

  h3 {
    font-size: var(--font-size-xl);
    color: var(--color-primary-700);
    margin-top: var(--space-6);
    margin-bottom: var(--space-3);

    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
      margin-top: var(--space-4);
    }
  }

  p {
    margin-bottom: var(--space-4);

    @media (max-width: 768px) {
      margin-bottom: var(--space-3);
    }
  }

  ul, ol {
    margin: var(--space-4) 0;
    padding-left: var(--space-6);

    @media (max-width: 768px) {
      margin: var(--space-3) 0;
      padding-left: var(--space-5);
    }

    li {
      margin-bottom: var(--space-2);

      @media (max-width: 768px) {
        margin-bottom: var(--space-1);
      }
    }
  }

  .contact-info {
    background: var(--color-gray-50);
    padding: var(--space-6);
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--color-primary-600);
    margin: var(--space-8) 0;

    @media (max-width: 768px) {
      padding: var(--space-4);
      margin: var(--space-6) 0;
    }
  }

  .important-note {
    background: var(--color-blue-50);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-blue-200);
    margin: var(--space-6) 0;

    @media (max-width: 768px) {
      padding: var(--space-3);
      margin: var(--space-4) 0;
    }

    strong {
      color: var(--color-blue-800);
    }
  }
`;

const BackButton = styled.button`
  background: var(--color-primary-600);
  color: var(--color-white);
  border: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-default);
  margin-bottom: var(--space-8);
  display: flex;
  align-items: center;
  gap: var(--space-2);

  @media (max-width: 768px) {
    margin-bottom: var(--space-6);
    padding: var(--space-2) var(--space-4);
  }

  &:hover {
    background: var(--color-primary-700);
  }

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
`;

const legalContent = {
  'hipaa': {
    title: 'HIPAA Privacy Notice',
    content: `
      <h2>Notice of Privacy Practices</h2>
      
      <div class="important-note">
        <strong>This notice describes how medical information about you may be used and disclosed and how you can get access to this information. Please review it carefully.</strong>
      </div>

      <h3>Our Commitment to Your Privacy</h3>
      <p>Laredo Car Accident Medical Center is committed to protecting the privacy of your health information. We are required by law to maintain the privacy of protected health information, provide this notice of our legal duties and privacy practices regarding protected health information, and notify affected individuals following a breach of unsecured protected health information.</p>

      <h3>How We May Use and Disclose Your Health Information</h3>
      
      <h4>Treatment</h4>
      <p>We may use your health information to provide you with medical treatment or services. We may disclose health information about you to doctors, nurses, technicians, or other personnel who are involved in taking care of you.</p>
      
      <h4>Payment</h4>
      <p>We may use and disclose your health information to obtain payment for services we provide to you. For example, we may contact your health insurer to certify that you are eligible for benefits, and we may provide your insurer with details regarding your treatment to determine if your insurer will cover, or pay for, your treatment.</p>
      
      <h4>Health Care Operations</h4>
      <p>We may use and disclose your health information for our health care operations, which include internal administration and planning and various activities that improve the quality and cost effectiveness of the care we deliver to you.</p>

      <h3>Your Health Information Rights</h3>
      <ul>
        <li><strong>Right to Request Restrictions:</strong> You have the right to request that we place additional restrictions on our use or disclosure of your health information.</li>
        <li><strong>Right to Receive Confidential Communications:</strong> You have the right to request that we communicate with you about your health and related issues in a particular manner or at a certain location.</li>
        <li><strong>Right to Inspect and Copy:</strong> You have the right to inspect or obtain a copy of your health information.</li>
        <li><strong>Right to Amend:</strong> You may ask us to amend your health information if you believe it is incorrect or incomplete.</li>
        <li><strong>Right to an Accounting:</strong> You have the right to request an accounting of disclosures of your health information.</li>
        <li><strong>Right to a Paper Copy:</strong> You have the right to obtain a paper copy of this notice from us upon request.</li>
      </ul>

      <h3>Our Responsibilities</h3>
      <ul>
        <li>We are required by law to maintain the privacy and security of your protected health information.</li>
        <li>We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information.</li>
        <li>We must follow the duties and privacy practices described in this notice and give you a copy of it.</li>
        <li>We will not use or share your information other than as described here unless you tell us we can in writing.</li>
      </ul>

      <h3>Changes to This Notice</h3>
      <p>We reserve the right to change our privacy practices and the terms of this notice at any time, provided such changes are permitted by applicable law. We reserve the right to make the changes in our privacy practices and the new terms of our notice effective for all health information that we maintain.</p>

      <div class="contact-info">
        <h3>Contact Information</h3>
        <p>If you have questions about this notice or have concerns about your privacy rights, please contact our Privacy Officer:</p>
        <p><strong>Privacy Officer</strong><br>
        Laredo Car Accident Medical Center<br>
        8511 McPherson Road, Suite 208<br>
        Laredo, TX 78045<br>
        Phone: (956) 333-2727<br>
        Email: privacy@laredocaraccident.com</p>
      </div>
    `
  },
  'terms': {
    title: 'Terms of Service',
    content: `
      <h2>Terms of Service</h2>
      
      <p><strong>Effective Date:</strong> January 1, 2024</p>
      
      <div class="important-note">
        <strong>Please read these Terms of Service carefully before using our website or services. By accessing or using our services, you agree to be bound by these terms.</strong>
      </div>

      <h3>1. Acceptance of Terms</h3>
      <p>By accessing and using the Laredo Car Accident Medical Center website and services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our website, located at laredocaraccident.com, and all related services provided by us.</p>

      <h3>2. Description of Service</h3>
      <p>Laredo Car Accident Medical Center provides medical treatment services for individuals injured in motor vehicle accidents. Our services include but are not limited to:</p>
      <ul>
        <li>Chiropractic care and spinal adjustments</li>
        <li>Pain management and rehabilitation</li>
        <li>Diagnostic imaging and assessment</li>
        <li>Medical documentation for legal proceedings</li>
        <li>Letter of Protection (LOP) arrangements</li>
      </ul>

      <h3>3. Medical Disclaimer</h3>
      <p>The information provided on this website is for educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>

      <h3>4. Appointment and Treatment Terms</h3>
      <ul>
        <li><strong>Scheduling:</strong> Appointments must be scheduled in advance and are subject to availability.</li>
        <li><strong>Cancellation Policy:</strong> We require 24-hour notice for appointment cancellations to avoid cancellation fees.</li>
        <li><strong>Treatment Plans:</strong> All treatment plans are developed based on individual medical needs and may be modified as necessary.</li>
        <li><strong>Payment Terms:</strong> Payment arrangements, including Letter of Protection agreements, will be established prior to treatment.</li>
      </ul>

      <h3>5. Privacy and Confidentiality</h3>
      <p>We are committed to protecting your privacy and maintaining the confidentiality of your medical information in accordance with HIPAA regulations and applicable state laws. Please refer to our HIPAA Privacy Notice for detailed information about how we protect and use your health information.</p>

      <h3>6. Insurance and Payment</h3>
      <ul>
        <li>We accept most major insurance plans and will verify coverage prior to treatment.</li>
        <li>Letter of Protection arrangements are available for qualified personal injury cases.</li>
        <li>Patients are responsible for understanding their insurance benefits and any applicable deductibles or co-payments.</li>
        <li>Payment for services not covered by insurance or LOP arrangements is due at the time of service.</li>
      </ul>

      <h3>7. Website Use</h3>
      <ul>
        <li>You may use our website for lawful purposes only.</li>
        <li>You agree not to use the website in any way that could damage, disable, overburden, or impair our servers or networks.</li>
        <li>You may not attempt to gain unauthorized access to any portion of the website or any other systems or networks connected to the website.</li>
      </ul>

      <h3>8. Intellectual Property</h3>
      <p>All content on this website, including text, graphics, logos, images, and software, is the property of Laredo Car Accident Medical Center and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.</p>

      <h3>9. Limitation of Liability</h3>
      <p>To the fullest extent permitted by law, Laredo Car Accident Medical Center shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services or website.</p>

      <h3>10. Modifications to Terms</h3>
      <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms of Service.</p>

      <div class="contact-info">
        <h3>Contact Information</h3>
        <p>If you have any questions about these Terms of Service, please contact us:</p>
        <p><strong>Laredo Car Accident Medical Center</strong><br>
        8511 McPherson Road, Suite 208<br>
        Laredo, TX 78045<br>
        Phone: (956) 333-2727<br>
        Email: info@laredocaraccident.com</p>
      </div>
    `
  },
  'privacy': {
    title: 'Privacy Policy',
    content: `
      <h2>Privacy Policy</h2>
      
      <p><strong>Last Updated:</strong> January 1, 2024</p>
      
      <div class="important-note">
        <strong>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.</strong>
      </div>

      <h3>Information We Collect</h3>
      
      <h4>Personal Information</h4>
      <p>We may collect personal information that you voluntarily provide to us, including:</p>
      <ul>
        <li>Name, address, phone number, and email address</li>
        <li>Date of birth and emergency contact information</li>
        <li>Insurance information and employment details</li>
        <li>Medical history and current symptoms</li>
        <li>Information about your accident or injury</li>
      </ul>

      <h4>Website Usage Information</h4>
      <p>When you visit our website, we may automatically collect certain information, including:</p>
      <ul>
        <li>IP address and browser type</li>
        <li>Pages visited and time spent on our website</li>
        <li>Referring website or search terms used</li>
        <li>Device information and operating system</li>
      </ul>

      <h3>How We Use Your Information</h3>
      <ul>
        <li><strong>Medical Treatment:</strong> To provide medical care, create treatment plans, and maintain medical records</li>
        <li><strong>Appointment Scheduling:</strong> To schedule and confirm appointments and send appointment reminders</li>
        <li><strong>Insurance Processing:</strong> To verify insurance coverage and process claims</li>
        <li><strong>Legal Documentation:</strong> To provide medical records and reports for legal proceedings</li>
        <li><strong>Communication:</strong> To respond to your inquiries and provide important updates about your care</li>
        <li><strong>Website Improvement:</strong> To analyze website usage and improve our online services</li>
      </ul>

      <h3>Information Sharing and Disclosure</h3>
      <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
      
      <ul>
        <li><strong>Healthcare Providers:</strong> With other healthcare providers involved in your treatment</li>
        <li><strong>Insurance Companies:</strong> For payment and coverage verification purposes</li>
        <li><strong>Legal Professionals:</strong> With your attorney or as required for legal proceedings</li>
        <li><strong>Business Associates:</strong> With vendors who assist us in providing services (under strict confidentiality agreements)</li>
        <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulations</li>
      </ul>

      <h3>Data Security</h3>
      <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
      <ul>
        <li>Encryption of sensitive data during transmission</li>
        <li>Secure servers and restricted access to personal information</li>
        <li>Regular security assessments and updates</li>
        <li>Employee training on privacy and security protocols</li>
        <li>HIPAA-compliant data handling procedures</li>
      </ul>

      <h3>Your Rights and Choices</h3>
      <ul>
        <li><strong>Access:</strong> You may request access to your personal information we maintain</li>
        <li><strong>Correction:</strong> You may request correction of inaccurate or incomplete information</li>
        <li><strong>Deletion:</strong> You may request deletion of your personal information (subject to legal and medical record retention requirements)</li>
        <li><strong>Communication Preferences:</strong> You may opt out of non-essential communications</li>
        <li><strong>Medical Records:</strong> You have the right to access and obtain copies of your medical records</li>
      </ul>

      <h3>Cookies and Tracking Technologies</h3>
      <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences, though disabling cookies may affect website functionality.</p>

      <h3>Children's Privacy</h3>
      <p>Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.</p>

      <h3>Changes to This Privacy Policy</h3>
      <p>We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website with a new effective date.</p>

      <div class="contact-info">
        <h3>Contact Us</h3>
        <p>If you have questions about this Privacy Policy or how we handle your information, please contact us:</p>
        <p><strong>Privacy Officer</strong><br>
        Laredo Car Accident Medical Center<br>
        8511 McPherson Road, Suite 208<br>
        Laredo, TX 78045<br>
        Phone: (956) 333-2727<br>
        Email: privacy@laredocaraccident.com</p>
      </div>
    `
  },
  'medical-disclaimer': {
    title: 'Medical Disclaimer',
    content: `
      <h2>Medical Disclaimer</h2>
      
      <div class="important-note">
        <strong>Important: This disclaimer contains important information about the medical information provided on this website. Please read carefully before using our website or services.</strong>
      </div>

      <h3>General Medical Disclaimer</h3>
      <p>The information provided on the Laredo Car Accident Medical Center website is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition or treatment.</p>

      <h3>No Doctor-Patient Relationship</h3>
      <p>The use of this website and the information contained herein does not create a doctor-patient relationship between you and Laredo Car Accident Medical Center or any of our healthcare providers. A doctor-patient relationship is established only through direct, personal consultation and examination by a qualified healthcare provider at our facility.</p>

      <h3>Emergency Medical Situations</h3>
      <p><strong>In case of a medical emergency, call 911 immediately.</strong> Do not rely on information from this website or attempt to contact us through this website for emergency medical care. If you are experiencing a medical emergency, seek immediate medical attention at the nearest emergency room or urgent care facility.</p>

      <h3>Accuracy of Information</h3>
      <p>While we strive to provide accurate and up-to-date medical information, we make no warranties or representations regarding the accuracy, completeness, or timeliness of the content on this website. Medical knowledge and treatments are constantly evolving, and information that was accurate at the time of publication may become outdated.</p>

      <h3>Individual Medical Situations</h3>
      <ul>
        <li>Every individual's medical situation is unique, and treatment outcomes may vary significantly from person to person.</li>
        <li>The information on this website should not be used to diagnose or treat any medical condition.</li>
        <li>Treatment recommendations must be individualized based on a thorough medical examination and assessment.</li>
        <li>Past treatment results do not guarantee similar outcomes for future patients.</li>
      </ul>

      <h3>Risks and Benefits</h3>
      <p>All medical treatments carry inherent risks and potential benefits. The information on this website provides general information about treatments and procedures but does not constitute medical advice about risks, benefits, or appropriateness for any individual patient. Specific risks and benefits must be discussed with a qualified healthcare provider during a personal consultation.</p>

      <h3>Third-Party Information</h3>
      <p>Our website may contain links to third-party websites or reference third-party medical information. We do not endorse or assume responsibility for the accuracy or reliability of any information provided by third parties. We recommend verifying any third-party information with qualified healthcare providers.</p>

      <h3>Limitation of Liability</h3>
      <p>To the fullest extent permitted by law, Laredo Car Accident Medical Center, its healthcare providers, employees, and affiliates shall not be liable for any damages arising from your use of this website or reliance on the information contained herein. This includes but is not limited to direct, indirect, incidental, consequential, or punitive damages.</p>

      <h3>Professional Licensing</h3>
      <p>Our healthcare providers are licensed to practice in the state of Texas. If you are located outside of Texas, please consult with healthcare providers licensed in your state or jurisdiction. Medical licenses and scope of practice may vary by state.</p>

      <h3>Patient Responsibilities</h3>
      <p>As a patient or website visitor, you are responsible for:</p>
      <ul>
        <li>Providing accurate and complete medical history information</li>
        <li>Following prescribed treatment plans and attending scheduled appointments</li>
        <li>Reporting any changes in your condition or adverse reactions to treatment</li>
        <li>Seeking immediate medical attention for emergency situations</li>
        <li>Informing us of all medications, supplements, and other treatments you are receiving</li>
      </ul>

      <h3>Confidentiality and Privacy</h3>
      <p>Any medical information you provide through this website or during treatment is subject to our Privacy Policy and HIPAA regulations. However, please be aware that internet communications may not be completely secure, and you should avoid sending sensitive medical information through unsecured email or website forms.</p>

      <h3>Changes to This Disclaimer</h3>
      <p>We reserve the right to update this Medical Disclaimer at any time without notice. Changes will be effective immediately upon posting on our website. Please review this disclaimer periodically to stay informed of any updates.</p>

      <div class="contact-info">
        <h3>Contact Information</h3>
        <p>If you have questions about this Medical Disclaimer or need clarification about any medical information, please contact us:</p>
        <p><strong>Laredo Car Accident Medical Center</strong><br>
        8511 McPherson Road, Suite 208<br>
        Laredo, TX 78045<br>
        Phone: (956) 333-2727<br>
        Email: info@laredocaraccident.com</p>
        
        <p><strong>For medical emergencies, call 911 immediately.</strong></p>
      </div>
    `
  }
};

interface LegalPageProps {
  page: string;
  onNavigateHome: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ page, onNavigateHome }) => {
  const content = page && legalContent[page as keyof typeof legalContent] 
    ? legalContent[page as keyof typeof legalContent]
    : null;
  
  useSEO({
    title: content 
      ? `${content.title} - Laredo Car Accident Medical Center`
      : 'Legal Information - Laredo Car Accident Medical Center',
    description: content 
      ? `${content.title} for Laredo Car Accident Medical Center. Important legal and medical information for our patients and website visitors.`
      : 'Legal information for Laredo Car Accident Medical Center.',
    keywords: content 
      ? `${content.title.toLowerCase()}, legal information, medical center, Laredo`
      : 'legal information, medical center, Laredo',
    lang: 'en'
  });

  if (!content) {
    onNavigateHome();
    return null;
  }

  return (
    <LegalPageContainer>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BackButton onClick={onNavigateHome}>
            ← Back to Home
          </BackButton>
          
          <Header>
            <h1>{content.title}</h1>
            <div className="last-updated">
              Last Updated: January 1, 2024
            </div>
          </Header>
          
          <Content dangerouslySetInnerHTML={{ __html: content.content }} />
        </motion.div>
      </Container>
    </LegalPageContainer>
  );
};

export default LegalPage;