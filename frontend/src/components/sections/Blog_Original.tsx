import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { useBlogExpansion } from '../../hooks/useBlogExpansion';

const BlogSection = styled.section`
  padding: var(--space-20) 0;
  background: var(--color-gray-50);

  @media (max-width: 768px) {
    padding: var(--space-16) 0;
  }
`;

const Container = styled.div`
  max-width: var(--container-standard);
  margin: 0 auto;
  padding: 0 var(--space-6);

  @media (max-width: 768px) {
    padding: 0 var(--space-4);
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-16);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: var(--space-12);
  }

  h2 {
    font-size: var(--font-size-4xl);
    color: var(--color-primary-600);
    margin-bottom: var(--space-4);

    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
      margin-bottom: var(--space-3);
    }
  }

  p {
    font-size: var(--font-size-lg);
    color: var(--color-gray-700);
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: var(--font-size-base);
    }
  }
`;

const BlogControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-12);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-6);
  }

  @media (max-width: 768px) {
    margin-bottom: var(--space-8);
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }

  input {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    padding-left: var(--space-12);
    border: 2px solid var(--color-gray-300);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    transition: border-color var(--transition-default);

    @media (max-width: 768px) {
      padding: var(--space-3) var(--space-3);
      padding-left: var(--space-10);
      font-size: var(--font-size-sm);
    }

    &:focus {
      border-color: var(--color-primary-500);
      outline: none;
      box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
    }
  }

  .search-icon {
    position: absolute;
    left: var(--space-4);
    top: 50%;
    transform: translateY(-50%);
    font-size: var(--font-size-lg);
    color: var(--color-gray-500);

    @media (max-width: 768px) {
      left: var(--space-3);
      font-size: var(--font-size-base);
    }
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: var(--space-1);
  }
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'var(--color-primary-600)' : 'var(--color-white)'};
  color: ${props => props.active ? 'var(--color-white)' : 'var(--color-primary-600)'};
  border: 2px solid var(--color-primary-600);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-default);

  @media (max-width: 768px) {
    padding: var(--space-2) var(--space-3);
    font-size: var(--font-size-xs);
  }

  &:hover {
    background: var(--color-primary-600);
    color: var(--color-white);
  }

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  gap: var(--space-8);

  @media (max-width: 768px) {
    gap: var(--space-6);
  }
`;

const BlogCard = styled(motion.article)`
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  transition: all var(--transition-default);

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    border-radius: var(--radius-lg);
  }
`;

const BlogHeader = styled.div`
  padding: var(--space-8);
  cursor: pointer;

  @media (max-width: 768px) {
    padding: var(--space-6);
  }

  .category {
    background: var(--color-primary-50);
    color: var(--color-primary-700);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--font-size-xs);
    font-weight: 600;
    display: inline-block;
    margin-bottom: var(--space-3);

    @media (max-width: 768px) {
      font-size: var(--font-size-xs);
      margin-bottom: var(--space-2);
    }
  }

  h3 {
    font-size: var(--font-size-2xl);
    color: var(--color-gray-900);
    margin-bottom: var(--space-3);
    line-height: 1.3;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
      margin-bottom: var(--space-2);
      line-height: 1.25;
    }
  }

  p {
    font-size: var(--font-size-base);
    color: var(--color-gray-700);
    line-height: 1.6;
    margin-bottom: var(--space-4);

    @media (max-width: 768px) {
      font-size: var(--font-size-sm);
      margin-bottom: var(--space-3);
      line-height: 1.5;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);
    margin-bottom: var(--space-4);

    @media (max-width: 768px) {
      gap: var(--space-3);
      font-size: var(--font-size-xs);
      flex-wrap: wrap;
    }

    .reading-time {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }
  }
`;

const ExpandButton = styled.button`
  background: var(--color-primary-600);
  color: var(--color-white);
  border: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-default);
  display: flex;
  align-items: center;
  gap: var(--space-2);

  @media (max-width: 768px) {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-xs);
    width: 100%;
    justify-content: center;
  }

  &:hover {
    background: var(--color-primary-700);
  }

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  .arrow {
    transition: transform var(--transition-default);
  }

  &.expanded .arrow {
    transform: rotate(180deg);
  }
`;

const BlogContent = styled(motion.div)`
  padding: var(--space-8);
  background: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-200);

  @media (max-width: 768px) {
    padding: var(--space-6);
  }

  .content-text {
    font-size: var(--font-size-base);
    color: var(--color-gray-800);
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: var(--font-size-sm);
      line-height: 1.5;
    }

    h3 {
      font-size: var(--font-size-2xl);
      color: var(--color-primary-600);
      font-weight: 700;
      margin-bottom: var(--space-4);
      margin-top: var(--space-6);

      @media (max-width: 768px) {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-3);
        margin-top: var(--space-4);
      }
    }

    h4 {
      font-size: var(--font-size-xl);
      color: var(--color-primary-700);
      font-weight: 600;
      margin-bottom: var(--space-3);
      margin-top: var(--space-5);

      @media (max-width: 768px) {
        font-size: var(--font-size-lg);
        margin-bottom: var(--space-2);
        margin-top: var(--space-4);
      }
    }

    p {
      font-size: var(--font-size-base);
      color: var(--color-gray-800);
      line-height: 1.6;
      margin-bottom: var(--space-4);

      @media (max-width: 768px) {
        font-size: var(--font-size-sm);
        margin-bottom: var(--space-3);
        line-height: 1.5;
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
        font-size: var(--font-size-base);
        color: var(--color-gray-800);
        line-height: 1.6;
        margin-bottom: var(--space-2);

        @media (max-width: 768px) {
          font-size: var(--font-size-sm);
          margin-bottom: var(--space-1);
          line-height: 1.5;
        }
      }
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-12);

  @media (max-width: 768px) {
    margin-top: var(--space-8);
    gap: var(--space-2);
    flex-wrap: wrap;
  }
`;

const PaginationButton = styled.button<{ active?: boolean; disabled?: boolean }>`
  background: ${props => props.active ? 'var(--color-primary-600)' : 'var(--color-white)'};
  color: ${props => props.active ? 'var(--color-white)' : 'var(--color-primary-600)'};
  border: 2px solid var(--color-primary-600);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-default);
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: var(--space-2) var(--space-3);
    font-size: var(--font-size-xs);
    min-width: 40px;
    height: 40px;
  }

  &:hover:not(:disabled) {
    background: var(--color-primary-600);
    color: var(--color-white);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: var(--color-gray-300);
    color: var(--color-gray-500);
  }

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }
`;

const PaginationInfo = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  margin: 0 var(--space-4);

  @media (max-width: 768px) {
    font-size: var(--font-size-xs);
    margin: 0 var(--space-2);
    order: -1;
    width: 100%;
    text-align: center;
    margin-bottom: var(--space-3);
  }
`;

interface BlogArticle {
  id: string;
  category: string;
  title: string;
  preview: string;
  content: string;
  readingTime: number;
  publishDate: string;
}

const ARTICLES_PER_PAGE = 5;

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const { expandedArticles, searchTerm, categoryFilter, toggleArticle, setSearchTerm, setCategoryFilter } = useBlogExpansion();
  const [currentPage, setCurrentPage] = useState(1);

  // Sample blog articles with markdown content
  const blogArticles: BlogArticle[] = useMemo(() => [
    {
      id: 'whiplash-treatment',
      category: 'Treatment',
      title: 'Complete Guide to Whiplash Recovery After Car Accidents',
      preview: 'Understanding whiplash symptoms, treatment options, and recovery timeline for car accident victims in Laredo.',
      content: `### What is Whiplash?

Whiplash occurs when the head and neck are suddenly forced backward and then forward, similar to the cracking of a whip. This rapid motion can damage the muscles, ligaments, discs, and nerves in the neck.

#### Common Symptoms of Whiplash

Symptoms may not appear immediately after an accident and can include:
- Neck pain and stiffness
- Headaches, especially at the base of the skull
- Shoulder pain and muscle spasms
- Dizziness and fatigue
- Difficulty concentrating
- Memory problems
- Sleep disturbances

#### Treatment Options

**Immediate care** focuses on reducing inflammation and pain:
- Ice application for the first 24-48 hours
- Gentle range of motion exercises
- Over-the-counter pain medications
- Prescription medications if needed

#### Professional Treatment

Our comprehensive approach includes:
- Chiropractic adjustments to restore proper alignment
- Physical therapy to strengthen supporting muscles
- Massage therapy to reduce muscle tension
- Pain management techniques when necessary

#### Recovery Timeline

Most whiplash injuries heal within 2-3 months with proper treatment. However, some patients may experience symptoms for longer periods. Early intervention significantly improves outcomes.

#### When to Seek Medical Attention

Seek immediate medical care if you experience:
- Severe neck pain
- Pain radiating into shoulders or arms
- Numbness or tingling in arms
- Weakness in arms or hands
- Difficulty moving your neck`,
      readingTime: 8,
      publishDate: '2024-01-15'
    },
    {
      id: 'lop-process',
      category: 'Legal',
      title: 'Understanding Letter of Protection (LOP) for Car Accident Treatment',
      preview: 'How Letter of Protection arrangements work to help car accident victims receive immediate medical care.',
      content: `### What is a Letter of Protection?

A Letter of Protection (LOP) is a legal agreement between your attorney, your healthcare provider, and you. It guarantees payment to the medical provider from any settlement or judgment received in your case.

#### How LOPs Work

The process is straightforward:
1. Your attorney evaluates your case
2. A letter is sent to the medical provider
3. Treatment begins immediately
4. Payment is deferred until case resolution
5. Medical bills are paid from settlement proceeds

#### Benefits of LOP Arrangements

**For Patients:**
- Immediate access to medical care
- No upfront costs or copays
- Treatment based on medical necessity, not insurance limitations
- Focus on recovery, not financial stress

**For Attorneys:**
- Clients receive proper medical documentation
- Stronger case evidence through comprehensive treatment records
- Better settlement outcomes due to thorough medical care

#### Qualifying for LOP Treatment

To qualify for LOP arrangements:
- You must have a viable personal injury claim
- An attorney must accept your case
- The medical provider must agree to LOP terms
- Treatment must be medically necessary

#### What Treatments are Covered?

LOP arrangements typically cover:
- Emergency room visits
- Diagnostic imaging (X-rays, MRI, CT scans)
- Chiropractic care
- Physical therapy
- Pain management procedures
- Specialist consultations
- Surgical procedures when necessary`,
      readingTime: 12,
      publishDate: '2024-01-10'
    },
    {
      id: 'diagnostic-imaging',
      category: 'Treatment',
      title: 'The Importance of Diagnostic Imaging After Car Accidents',
      preview: 'Why proper diagnostic imaging is crucial for identifying hidden injuries and supporting your recovery.',
      content: `### Types of Diagnostic Imaging

#### X-rays
- Most common initial imaging
- Excellent for detecting fractures
- Shows bone alignment issues
- Quick and cost-effective
- Limited soft tissue visibility

#### MRI (Magnetic Resonance Imaging)
- Superior soft tissue visualization
- Detects disc herniation and bulges
- Shows ligament and muscle damage
- No radiation exposure
- More detailed than other methods

#### CT Scans
- Excellent for emergency situations
- Detailed bone and organ imaging
- Fast imaging process
- Good for internal bleeding detection
- Higher radiation exposure

#### When Imaging is Necessary

Immediate imaging may be needed if you experience:
- Severe pain or inability to move
- Numbness or tingling
- Weakness in extremities
- Loss of consciousness
- Severe headaches
- Vision problems

#### Common Hidden Injuries

**Disc Herniation**
- May not cause immediate pain
- Can worsen without treatment
- Often requires MRI for diagnosis
- Early detection improves outcomes

**Soft Tissue Damage**
- Muscle tears and strains
- Ligament damage
- Tendon injuries
- Often missed on X-rays

#### Legal Implications

Proper imaging documentation:
- Establishes injury existence
- Shows injury severity
- Provides timeline evidence
- Supports treatment necessity
- Strengthens legal cases`,
      readingTime: 10,
      publishDate: '2024-01-05'
    },
    {
      id: 'pain-management',
      category: 'Recovery',
      title: 'Effective Pain Management Strategies for Car Accident Injuries',
      preview: 'Comprehensive approaches to managing acute and chronic pain following motor vehicle accidents.',
      content: `### Understanding Pain Types

#### Acute Pain
- Occurs immediately after injury
- Usually sharp and intense
- Serves as a warning signal
- Typically resolves with healing
- Responds well to immediate treatment

#### Chronic Pain
- Persists beyond normal healing time
- Often dull and aching
- Can affect daily functioning
- May require long-term management
- More complex treatment approach

### Common Pain Patterns After Car Accidents

#### Neck Pain
- Most common complaint
- Can radiate to shoulders and arms
- May worsen with movement
- Often accompanies headaches
- Usually improves with proper treatment

#### Back Pain
- Lower back most commonly affected
- Can be sharp or aching
- May limit mobility significantly
- Often associated with muscle spasms
- Can become chronic if untreated

### Comprehensive Pain Management Approach

#### Medication Management
- Anti-inflammatory drugs (NSAIDs)
- Muscle relaxants for spasms
- Pain relievers for comfort
- Topical preparations
- Prescription medications when necessary

#### Physical Therapies
- Chiropractic adjustments
- Physical therapy exercises
- Massage therapy
- Heat and cold therapy
- Ultrasound treatments

#### Non-Medication Approaches

**Heat Therapy**
- Improves blood circulation
- Relaxes muscles
- Reduces stiffness
- Apply for 15-20 minutes
- Use after initial inflammation subsides

**Cold Therapy**
- Reduces inflammation
- Numbs pain
- Decreases swelling
- Apply for 10-15 minutes
- Use immediately after injury`,
      readingTime: 15,
      publishDate: '2023-12-28'
    },
    {
      id: 'recovery-timeline',
      category: 'Recovery',
      title: 'What to Expect Car Accident Injury Recovery Timeline',
      preview: 'Understanding the typical recovery process and timeline for common car accident injuries.',
      content: `### Immediate Phase (0-72 Hours)

**Primary Focus: Stabilization and Assessment**
- Emergency medical evaluation
- Pain and inflammation control
- Initial diagnostic imaging
- Documentation of injuries
- Rest and protection of injured areas

#### Common experiences:
- Shock and adrenaline effects
- Pain may be minimal initially
- Stiffness often develops
- Sleep may be disrupted
- Emotional reactions are normal

### Acute Phase (3 Days - 2 Weeks)

**Primary Focus: Pain Control and Early Mobility**
- Regular medical monitoring
- Introduction of gentle treatments
- Basic physical therapy exercises
- Patient education
- Symptom tracking

#### Expected changes:
- Pain may initially worsen
- Stiffness typically peaks
- Bruising becomes more apparent
- Sleep patterns may improve
- Initial healing begins

### Subacute Phase (2 Weeks - 3 Months)

**Primary Focus: Function Restoration**
- Active rehabilitation begins
- Strength building exercises
- Range of motion improvement
- Return to daily activities
- Pain reduction focus

#### Typical improvements:
- Significant pain reduction
- Increased mobility
- Better sleep quality
- Improved mood
- Gradual activity increase

### Factors Affecting Recovery Time

#### Age and General Health
- Younger patients typically heal faster
- Pre-existing conditions may slow recovery
- Overall fitness level influences outcomes
- Nutrition affects healing speed
- Sleep quality impacts recovery

#### Injury Severity
- Minor injuries: 2-6 weeks
- Moderate injuries: 6-12 weeks
- Severe injuries: 3-12 months or longer
- Multiple injuries extend timelines
- Complications can delay healing`,
      readingTime: 12,
      publishDate: '2023-12-20'
    },
    {
      id: 'insurance-claims',
      category: 'Legal',
      title: 'Navigating Car Accident Insurance Claims in Texas',
      preview: 'A complete guide to understanding and managing your car accident insurance claim process.',
      content: `### Understanding Texas Insurance Laws

Texas is an "at-fault" state, meaning the driver who caused the accident is responsible for damages. Understanding your rights and the claims process is crucial for fair compensation.

#### Required Insurance Coverage in Texas

**Minimum Liability Requirements:**
- $30,000 bodily injury per person
- $60,000 bodily injury per accident
- $25,000 property damage per accident

#### Types of Available Coverage

**Personal Injury Protection (PIP)**
- Optional in Texas
- Covers medical expenses regardless of fault
- Typically covers 80% of medical bills
- May include lost wages and essential services

**Uninsured/Underinsured Motorist Coverage**
- Protects you if the at-fault driver lacks adequate insurance
- Covers medical expenses and lost wages
- Highly recommended in Texas

### The Claims Process

#### Immediate Steps After an Accident

1. **Ensure Safety and Call 911**
   - Move to safety if possible
   - Call police for accident report
   - Seek medical attention immediately

2. **Document Everything**
   - Take photos of vehicles and scene
   - Get contact information from all parties
   - Obtain witness statements
   - Note weather and road conditions

3. **Contact Your Insurance Company**
   - Report the accident promptly
   - Provide basic facts only
   - Avoid admitting fault
   - Request claim number for reference

#### Working with Insurance Adjusters

**Your Insurance Company:**
- Generally work in your best interest
- Handle property damage claims
- May provide rental car coverage
- Coordinate with other party's insurance

**Other Party's Insurance:**
- Represent their insured's interests
- May try to minimize claim value
- Often request recorded statements
- Consider legal representation before extensive communication

### Common Insurance Tactics to Avoid

#### Quick Settlement Offers
- Often below fair compensation
- May not account for future medical needs
- Difficult to negotiate once accepted
- Consult attorney before accepting

#### Recorded Statements
- Not always required
- Can be used against you later
- May limit future claim options
- Consider legal advice first

### Maximizing Your Claim Value

#### Medical Documentation
- Seek immediate medical attention
- Follow all treatment recommendations
- Keep detailed records of all appointments
- Document how injuries affect daily life

#### Lost Wages Documentation
- Obtain letter from employer
- Provide pay stubs and tax returns
- Document missed work days
- Include lost opportunities or promotions`,
      readingTime: 14,
      publishDate: '2023-12-15'
    }
  ], []);

  const filteredArticles = useMemo(() => {
    return blogArticles.filter(article => {
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || 
        article.category.toLowerCase() === categoryFilter.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [blogArticles, searchTerm, categoryFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  const categories = [
    { key: 'all', label: t('blog.filterAll') },
    { key: 'treatment', label: t('blog.filterTreatment') },
    { key: 'legal', label: t('blog.filterLegal') },
    { key: 'recovery', label: t('blog.filterRecovery') }
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of blog section
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    buttons.push(
      <PaginationButton
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ←
      </PaginationButton>
    );

    // First page if not visible
    if (startPage > 1) {
      buttons.push(
        <PaginationButton
          key={1}
          onClick={() => handlePageChange(1)}
          active={currentPage === 1}
        >
          1
        </PaginationButton>
      );
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1">...</span>);
      }
    }

    // Visible page numbers
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <PaginationButton
          key={page}
          onClick={() => handlePageChange(page)}
          active={currentPage === page}
        >
          {page}
        </PaginationButton>
      );
    }

    // Last page if not visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2">...</span>);
      }
      buttons.push(
        <PaginationButton
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          active={currentPage === totalPages}
        >
          {totalPages}
        </PaginationButton>
      );
    }

    // Next button
    buttons.push(
      <PaginationButton
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        →
      </PaginationButton>
    );

    return buttons;
  };

  return (
    <BlogSection id="blog">
      <Container>
        <SectionHeader>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('blog.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('blog.subtitle')}
          </motion.p>
        </SectionHeader>

        <BlogControls>
          <SearchBar>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={t('blog.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search articles"
            />
          </SearchBar>

          <FilterButtons>
            {categories.map(category => (
              <FilterButton
                key={category.key}
                active={categoryFilter === category.key}
                onClick={() => setCategoryFilter(category.key)}
                aria-label={`Filter by ${category.label}`}
              >
                {category.label}
              </FilterButton>
            ))}
          </FilterButtons>
        </BlogControls>

        <BlogGrid>
          {currentArticles.map((article, index) => (
            <BlogCard
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BlogHeader onClick={() => toggleArticle(article.id)}>
                <span className="category">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.preview}</p>
                <div className="meta">
                  <span className="reading-time">
                    📖 {article.readingTime} min read
                  </span>
                  <span>📅 {new Date(article.publishDate).toLocaleDateString()}</span>
                </div>
                <ExpandButton
                  className={expandedArticles.has(article.id) ? 'expanded' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleArticle(article.id);
                  }}
                  aria-expanded={expandedArticles.has(article.id)}
                  aria-label={`${expandedArticles.has(article.id) ? 'Collapse' : 'Expand'} article`}
                >
                  {expandedArticles.has(article.id) ? t('blog.readLess') : t('blog.readMore')}
                  <span className="arrow">⌄</span>
                </ExpandButton>
              </BlogHeader>

              <AnimatePresence>
                {expandedArticles.has(article.id) && (
                  <BlogContent
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="content-text">
                      <ReactMarkdown>{article.content}</ReactMarkdown>
                    </div>
                  </BlogContent>
                )}
              </AnimatePresence>
            </BlogCard>
          ))}
        </BlogGrid>

        {filteredArticles.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: 'var(--space-16)', 
            color: 'var(--color-gray-600)',
            fontSize: 'var(--font-size-lg)'
          }}>
            No articles found matching your search criteria.
          </div>
        )}

        {totalPages > 1 && (
          <PaginationContainer>
            <PaginationInfo>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of {filteredArticles.length} articles
            </PaginationInfo>
            {renderPaginationButtons()}
          </PaginationContainer>
        )}
      </Container>
    </BlogSection>
  );
};

export default Blog;