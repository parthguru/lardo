import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../common/UIComponents';
import StructuredData from '../seo/StructuredData';

const FAQSection = styled.section`
  padding: var(--space-5xl) 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: var(--space-4xl);

  h2 {
    font-size: var(--font-size-4xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-lg);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: var(--font-size-xl);
    color: var(--color-gray-600);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    margin-bottom: var(--space-3xl);
    
    h2 {
      font-size: var(--font-size-3xl);
    }
    
    p {
      font-size: var(--font-size-lg);
      padding: 0 var(--space-md);
    }
  }
`;

const FAQGrid = styled.div`
  display: grid;
  gap: var(--space-lg);
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: var(--space-md);
    padding: 0 var(--space-md);
  }
`;

const FAQItem = styled(motion.div)`
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  transition: var(--transition-default);

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-2px);
  }
`;

const QuestionButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: var(--space-xl);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-lg);
  transition: var(--transition-default);

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: -2px;
  }

  &:hover {
    background: var(--color-gray-50);
  }

  h3 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary-blue-dark);
    margin: 0;
    line-height: 1.4;
  }

  .icon {
    font-size: var(--font-size-xl);
    color: var(--color-primary-600);
    transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
    transition: transform var(--transition-default);
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: var(--space-lg);
    gap: var(--space-md);

    h3 {
      font-size: var(--font-size-base);
    }

    .icon {
      font-size: var(--font-size-lg);
    }
  }
`;

const AnswerWrapper = styled(motion.div)`
  overflow: hidden;
`;

const AnswerContent = styled.div`
  padding: 0 var(--space-xl) var(--space-xl);
  
  p {
    color: var(--color-gray-700);
    font-size: var(--font-size-base);
    line-height: 1.6;
    margin: 0;
  }

  ul, ol {
    color: var(--color-gray-700);
    margin: var(--space-md) 0;
    padding-left: var(--space-lg);
  }

  li {
    margin-bottom: var(--space-sm);
  }

  strong {
    color: var(--color-primary-blue-dark);
    font-weight: var(--font-weight-semibold);
  }

  @media (max-width: 768px) {
    padding: 0 var(--space-lg) var(--space-lg);
    
    p {
      font-size: var(--font-size-sm);
    }
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-4xl);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-bottom: var(--space-3xl);
    gap: var(--space-sm);
  }
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: var(--space-2) var(--space-4);
  border: 2px solid var(--color-primary-600);
  border-radius: var(--radius-lg);
  background: ${props => props.active ? 'var(--color-primary-600)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-white)' : 'var(--color-primary-600)'};
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition-default);

  &:hover {
    background: var(--color-primary-600);
    color: var(--color-white);
  }

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: var(--space-2) var(--space-3);
    font-size: var(--font-size-xs);
  }
`;

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Fallback FAQ data with Laredo-specific content
const fallbackFAQs: FAQItem[] = [
  {
    id: '1',
    question: 'What should I do immediately after a car accident in Laredo, Texas?',
    answer: 'If you\'re involved in a car accident in Laredo: 1) Ensure everyone\'s safety and call 911 if needed, 2) Call Laredo Police Department (956-795-2800) to report the accident, 3) Exchange insurance information with other drivers, 4) Take photos of vehicles, damage, and the accident scene, 5) Seek immediate medical attention even if you feel fine - injuries like whiplash may not appear immediately. Contact our clinic at (956) 333-2727 for same-day emergency care.',
    category: 'emergency'
  },
  {
    id: '2',
    question: 'Do you accept Letter of Protection (LOP) for car accident treatment in Laredo?',
    answer: 'Yes, we proudly accept Letter of Protection arrangements for car accident victims in Laredo and Webb County. This means you can receive immediate medical treatment without paying upfront costs. Your attorney coordinates with our clinic to guarantee payment from your settlement. We work with attorneys throughout South Texas and have extensive experience with LOP billing processes.',
    category: 'billing'
  },
  {
    id: '3',
    question: 'How long does car accident recovery typically take in Texas?',
    answer: 'Recovery time varies depending on the severity of your injuries, but most car accident patients see significant improvement within 6-12 weeks of consistent treatment. Minor whiplash injuries may resolve in 2-4 weeks, while more complex injuries involving disc herniation or multiple trauma sites may require 3-6 months. Early treatment is crucial - studies show that patients who begin treatment within 72 hours of their accident have better long-term outcomes.',
    category: 'treatment'
  },
  {
    id: '4',
    question: 'What types of car accident injuries do you treat in Webb County?',
    answer: 'Our Laredo clinic specializes in treating all types of auto injuries including: whiplash and neck injuries, back pain and disc problems, shoulder and arm injuries, headaches and concussion symptoms, soft tissue injuries and muscle spasms, joint pain and stiffness. We also coordinate care for more serious injuries requiring specialized treatment, ensuring you receive comprehensive care close to home.',
    category: 'treatment'
  },
  {
    id: '5',
    question: 'Do you have bilingual staff for Spanish-speaking patients?',
    answer: 'Absolutely! Our entire medical team is bilingual and fluent in both English and Spanish. We understand that 95% of Laredo\'s population is Hispanic, and we\'re committed to providing culturally competent care in your preferred language. All consultations, treatment explanations, and paperwork can be conducted in Spanish to ensure you fully understand your treatment plan.',
    category: 'general'
  },
  {
    id: '6',
    question: 'Where is your clinic located in Laredo?',
    answer: 'We\'re conveniently located at 8511 McPherson Road, Suite 208, Laredo, TX 78045. We\'re easily accessible from I-35, Loop 20, and major Laredo intersections. Our location serves patients from throughout Webb County, including the Gateway to the Americas area, TAMIU campus vicinity, and all Laredo neighborhoods. Ample parking is available.',
    category: 'general'
  },
  {
    id: '7',
    question: 'What insurance do you accept for car accident treatment?',
    answer: 'We accept most major insurance plans including PIP (Personal Injury Protection), medical payments coverage, health insurance, and we work directly with auto insurance companies. We also accept Letter of Protection arrangements, cash payments, and offer payment plans. Our billing specialists will verify your coverage and explain your benefits before treatment begins.',
    category: 'billing'
  },
  {
    id: '8',
    question: 'How quickly can I get an appointment after my accident?',
    answer: 'We understand that car accident injuries require immediate attention. We offer same-day emergency appointments for acute injuries, and most new patients can be seen within 24-48 hours. Our clinic hours are Monday-Friday 8:00 AM to 6:00 PM, and Saturday 9:00 AM to 2:00 PM. For urgent after-hours needs, call (956) 333-2727 and follow the emergency prompts.',
    category: 'appointment'
  },
  {
    id: '9',
    question: 'What should I bring to my first appointment?',
    answer: 'Please bring: 1) Valid driver\'s license or ID, 2) Insurance cards (auto and health), 3) Police report number if available, 4) List of current medications, 5) Any previous medical records related to injuries, 6) Attorney contact information if you have legal representation, 7) Information about the accident (date, time, how it happened). This helps us provide the most effective treatment from day one.',
    category: 'appointment'
  },
  {
    id: '10',
    question: 'Do you provide documentation for legal cases?',
    answer: 'Yes, we provide comprehensive medical documentation that supports your legal case. This includes detailed injury reports, treatment records, progress notes, diagnostic imaging results, and expert medical opinions when needed. Our physicians have extensive experience working with attorneys and can provide testimony if required. All documentation meets legal standards and insurance company requirements.',
    category: 'legal'
  }
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [faqs, setFaqs] = useState<FAQItem[]>(fallbackFAQs);
  const [loading, setLoading] = useState<boolean>(false);

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'emergency', label: 'Emergency Care' },
    { id: 'treatment', label: 'Treatment' },
    { id: 'billing', label: 'Billing & Insurance' },
    { id: 'appointment', label: 'Appointments' },
    { id: 'legal', label: 'Legal Support' },
    { id: 'general', label: 'General Info' }
  ];

  // Filter FAQs by category
  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  // Toggle FAQ item
  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  // Try to load FAQs from Strapi (will fall back to static data if API fails)
  useEffect(() => {
    const loadFAQs = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:1337/api/faqs?populate=*');
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            const strapiFAQs = data.data.map((item: any) => ({
              id: item.id.toString(),
              question: item.attributes.question,
              answer: item.attributes.answer,
              category: item.attributes.category || 'general'
            }));
            setFaqs(strapiFAQs);
          }
        }
        // If API fails, we keep the fallback data
      } catch (error) {
        console.warn('Could not load FAQs from Strapi, using fallback data:', error);
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  // Generate FAQ structured data
  const faqStructuredData = filteredFaqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));

  return (
    <FAQSection id="faq">
      <StructuredData type="faq" data={faqStructuredData} />
      
      <Container>
        <ContentWrapper>
          <Header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Frequently Asked Questions</h2>
            <p>
              Get answers to common questions about car accident treatment, 
              insurance, and our services in Laredo, Texas.
            </p>
          </Header>

          <CategoryFilter>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </CategoryButton>
            ))}
          </CategoryFilter>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-4xl)' }}>
              <p>Loading FAQs...</p>
            </div>
          ) : (
            <FAQGrid>
              {filteredFaqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <QuestionButton
                    isOpen={openItems.has(faq.id)}
                    onClick={() => toggleItem(faq.id)}
                    aria-expanded={openItems.has(faq.id)}
                    aria-controls={`answer-${faq.id}`}
                  >
                    <h3>{faq.question}</h3>
                    <span className="icon">+</span>
                  </QuestionButton>

                  <AnimatePresence>
                    {openItems.has(faq.id) && (
                      <AnswerWrapper
                        id={`answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <AnswerContent>
                          <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AnswerContent>
                      </AnswerWrapper>
                    )}
                  </AnimatePresence>
                </FAQItem>
              ))}
            </FAQGrid>
          )}

          {filteredFaqs.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: 'var(--space-4xl)' }}>
              <p>No FAQs found for the selected category.</p>
            </div>
          )}
        </ContentWrapper>
      </Container>
    </FAQSection>
  );
};

export default FAQ;