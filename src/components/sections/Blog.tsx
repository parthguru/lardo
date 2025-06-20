import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useBlogExpansion } from '../../hooks/useBlogExpansion';

const BlogSection = styled.section`
  padding: var(--space-5xl) 0;
  background: var(--color-gray-50);
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

  h2 {
    font-size: var(--font-size-5xl);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-md);

    @media (max-width: 768px) {
      font-size: var(--font-size-3xl);
    }
  }

  p {
    font-size: var(--font-size-xl);
    color: var(--color-gray-700);
    line-height: var(--line-height-normal);

    @media (max-width: 768px) {
      font-size: var(--font-size-lg);
    }
  }
`;

const BlogControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  input {
    width: 100%;
    padding: var(--space-md) var(--space-lg);
    padding-left: var(--space-5xl);
    border: 2px solid var(--color-gray-300);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    transition: border-color var(--transition-fast);

    &:focus {
      border-color: var(--color-primary-blue);
      outline: none;
      box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.1);
    }
  }

  .search-icon {
    position: absolute;
    left: var(--space-lg);
    top: 50%;
    transform: translateY(-50%);
    font-size: var(--font-size-xl);
    color: var(--color-gray-500);
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'var(--color-primary-blue)' : 'var(--color-white)'};
  color: ${props => props.active ? 'var(--color-white)' : 'var(--color-primary-blue)'};
  border: 2px solid var(--color-primary-blue);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-primary-blue);
    color: var(--color-white);
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  gap: var(--space-2xl);

  @media (max-width: 768px) {
    gap: var(--space-xl);
  }
`;

const BlogCard = styled(motion.article)`
  background: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
  transition: all var(--transition-base);

  &:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px);
  }
`;

const BlogHeader = styled.div`
  padding: var(--space-2xl);
  cursor: pointer;

  .category {
    background: var(--color-primary-blue-light);
    color: var(--color-primary-blue-dark);
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    display: inline-block;
    margin-bottom: var(--space-md);
  }

  h3 {
    font-size: var(--font-size-2xl);
    color: var(--color-primary-blue-dark);
    margin-bottom: var(--space-md);
    line-height: var(--line-height-tight);

    @media (max-width: 768px) {
      font-size: var(--font-size-xl);
    }
  }

  p {
    font-size: var(--font-size-base);
    color: var(--color-gray-700);
    line-height: var(--line-height-normal);
    margin-bottom: var(--space-lg);
  }

  .meta {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);

    .reading-time {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
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
  margin-top: var(--space-md);

  &:hover {
    background: var(--color-primary-blue-dark);
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

const BlogContent = styled(motion.div)`
  padding: var(--space-2xl);
  background: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-200);

  .content-text {
    font-size: var(--font-size-base);
    color: var(--color-gray-800);
    line-height: var(--line-height-relaxed);
    white-space: pre-line;

    h4 {
      color: var(--color-primary-blue-dark);
      margin: var(--space-xl) 0 var(--space-md) 0;
    }

    p {
      margin-bottom: var(--space-md);
    }

    ul, ol {
      margin: var(--space-md) 0;
      padding-left: var(--space-xl);
    }

    li {
      margin-bottom: var(--space-sm);
    }
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

const Blog: React.FC = () => {
  const { t } = useTranslation();
  const { expandedArticles, searchTerm, categoryFilter, toggleArticle, setSearchTerm, setCategoryFilter } = useBlogExpansion();

  // Sample blog articles - in a real app, these would come from a CMS or API
  const blogArticles: BlogArticle[] = [
    {
      id: 'whiplash-treatment',
      category: 'Treatment',
      title: 'Complete Guide to Whiplash Recovery After Car Accidents',
      preview: 'Understanding whiplash symptoms, treatment options, and recovery timeline for car accident victims in Laredo.',
      content: `Whiplash is one of the most common injuries sustained in car accidents, particularly rear-end collisions. This comprehensive guide covers everything you need to know about whiplash recovery, treatment options, and long-term prognosis.

What is Whiplash?

Whiplash occurs when the head and neck are suddenly forced backward and then forward, similar to the cracking of a whip. This rapid motion can damage the muscles, ligaments, discs, and nerves in the neck.

Common Symptoms of Whiplash

Symptoms may not appear immediately after an accident and can include:
• Neck pain and stiffness
• Headaches, especially at the base of the skull
• Shoulder pain and muscle spasms
• Dizziness and fatigue
• Difficulty concentrating
• Memory problems
• Sleep disturbances

Treatment Options

Immediate care focuses on reducing inflammation and pain:
• Ice application for the first 24-48 hours
• Gentle range of motion exercises
• Over-the-counter pain medications
• Prescription medications if needed

Professional Treatment

Our comprehensive approach includes:
• Chiropractic adjustments to restore proper alignment
• Physical therapy to strengthen supporting muscles
• Massage therapy to reduce muscle tension
• Pain management techniques when necessary

Recovery Timeline

Most whiplash injuries heal within 2-3 months with proper treatment. However, some patients may experience symptoms for longer periods. Early intervention significantly improves outcomes.

When to Seek Medical Attention

Seek immediate medical care if you experience:
• Severe neck pain
• Pain radiating into shoulders or arms
• Numbness or tingling in arms
• Weakness in arms or hands
• Difficulty moving your neck

Legal Considerations

Document your injuries thoroughly for insurance and legal purposes. Keep detailed records of all symptoms, treatments, and how the injury affects your daily life.

Prevention Tips

While not all accidents are preventable, proper headrest positioning and good posture while driving can reduce injury severity.`,
      readingTime: 8,
      publishDate: '2024-01-15'
    },
    {
      id: 'lop-process',
      category: 'Legal',
      title: 'Understanding Letter of Protection (LOP) for Car Accident Treatment',
      preview: 'How Letter of Protection arrangements work to help car accident victims receive immediate medical care.',
      content: `A Letter of Protection (LOP) is a crucial legal document that allows car accident victims to receive immediate medical treatment without upfront costs. This guide explains how LOPs work and their benefits.

What is a Letter of Protection?

A Letter of Protection is a legal agreement between your attorney, your healthcare provider, and you. It guarantees payment to the medical provider from any settlement or judgment received in your case.

How LOPs Work

The process is straightforward:
1. Your attorney evaluates your case
2. A letter is sent to the medical provider
3. Treatment begins immediately
4. Payment is deferred until case resolution
5. Medical bills are paid from settlement proceeds

Benefits of LOP Arrangements

For Patients:
• Immediate access to medical care
• No upfront costs or copays
• Treatment based on medical necessity, not insurance limitations
• Focus on recovery, not financial stress

For Attorneys:
• Clients receive proper medical documentation
• Stronger case evidence through comprehensive treatment records
• Better settlement outcomes due to thorough medical care

For Medical Providers:
• Guaranteed payment upon case resolution
• Ability to provide optimal care without insurance restrictions
• Clear documentation requirements for legal proceedings

Qualifying for LOP Treatment

To qualify for LOP arrangements:
• You must have a viable personal injury claim
• An attorney must accept your case
• The medical provider must agree to LOP terms
• Treatment must be medically necessary

What Treatments are Covered?

LOP arrangements typically cover:
• Emergency room visits
• Diagnostic imaging (X-rays, MRI, CT scans)
• Chiropractic care
• Physical therapy
• Pain management procedures
• Specialist consultations
• Surgical procedures when necessary

Important Considerations

Understand these key points:
• Treatment decisions should be based on medical necessity
• Keep detailed records of all treatments
• Communicate regularly with your attorney
• Follow all prescribed treatment plans
• LOPs don't guarantee case outcomes

Choosing the Right Medical Provider

Select providers who:
• Have experience with LOP arrangements
• Understand legal documentation requirements
• Provide comprehensive care
• Maintain detailed treatment records
• Communicate effectively with legal teams

Common Misconceptions

LOP arrangements are often misunderstood:
• They're not "free" treatment - bills must be paid from settlements
• They don't affect the quality of care provided
• They're standard practice in personal injury cases
• They benefit all parties involved

Working with Our Team

Our medical center has extensive experience with LOP arrangements:
• We work directly with attorneys
• We provide detailed documentation
• We focus on medically necessary treatment
• We maintain transparent communication
• We support your legal case with proper records

The LOP process ensures that car accident victims receive the medical care they need while their legal case proceeds. This arrangement removes financial barriers to treatment and often leads to better medical and legal outcomes.`,
      readingTime: 12,
      publishDate: '2024-01-10'
    },
    {
      id: 'diagnostic-imaging',
      category: 'Treatment',
      title: 'The Importance of Diagnostic Imaging After Car Accidents',
      preview: 'Why proper diagnostic imaging is crucial for identifying hidden injuries and supporting your recovery.',
      content: `Diagnostic imaging plays a critical role in identifying and documenting injuries after car accidents. Many injuries are not immediately apparent but can cause long-term problems if left untreated.

Types of Diagnostic Imaging

X-rays
• Most common initial imaging
• Excellent for detecting fractures
• Shows bone alignment issues
• Quick and cost-effective
• Limited soft tissue visibility

MRI (Magnetic Resonance Imaging)
• Superior soft tissue visualization
• Detects disc herniation and bulges
• Shows ligament and muscle damage
• No radiation exposure
• More detailed than other methods

CT Scans
• Excellent for emergency situations
• Detailed bone and organ imaging
• Fast imaging process
• Good for internal bleeding detection
• Higher radiation exposure

Ultrasound
• Real-time imaging capability
• No radiation exposure
• Good for soft tissue evaluation
• Cost-effective option
• Limited depth penetration

When Imaging is Necessary

Immediate imaging may be needed if you experience:
• Severe pain or inability to move
• Numbness or tingling
• Weakness in extremities
• Loss of consciousness
• Severe headaches
• Vision problems

Delayed imaging is often recommended because:
• Some injuries don't show symptoms immediately
• Inflammation can mask certain conditions
• Adrenaline can hide pain initially
• Documentation may be needed for legal purposes

Common Hidden Injuries

Disc Herniation
• May not cause immediate pain
• Can worsen without treatment
• Often requires MRI for diagnosis
• Early detection improves outcomes

Soft Tissue Damage
• Muscle tears and strains
• Ligament damage
• Tendon injuries
• Often missed on X-rays

Traumatic Brain Injury
• Symptoms may be subtle initially
• Can have long-term consequences
• Requires specialized imaging
• Important for legal documentation

Internal Injuries
• Organ damage may not be apparent
• Can be life-threatening if missed
• Emergency imaging is crucial
• May require immediate surgery

The Imaging Process at Our Facility

Our state-of-the-art imaging center provides:
• Multiple imaging modalities
• Experienced technologists
• Board-certified radiologists
• Same-day appointments when needed
• Direct communication with treating physicians

Preparing for Your Imaging

Before your appointment:
• Remove metal jewelry
• Wear comfortable clothing
• Inform staff of any implants
• Bring insurance information
• Arrive early for paperwork

During the procedure:
• Follow technologist instructions
• Remain still during imaging
• Communicate any discomfort
• Ask questions if unclear
• Relax and breathe normally

Understanding Your Results

Image interpretation involves:
• Detailed radiologist analysis
• Comparison with normal anatomy
• Correlation with clinical symptoms
• Written report generation
• Discussion with your physician

Legal Implications

Proper imaging documentation:
• Establishes injury existence
• Shows injury severity
• Provides timeline evidence
• Supports treatment necessity
• Strengthens legal cases

Insurance Considerations

Most insurance plans cover:
• Medically necessary imaging
• Emergency imaging procedures
• Follow-up imaging when appropriate
• Pre-authorization may be required

For uninsured patients:
• LOP arrangements available
• Payment plans offered
• Sliding scale fees considered
• Emergency care regardless of ability to pay

Quality Assurance

Our imaging center maintains:
• Equipment calibration standards
• Radiation safety protocols
• Image quality control
• Technologist certification
• Radiologist board certification

Follow-up Care

After imaging:
• Results review with physician
• Treatment plan adjustment
• Additional imaging if needed
• Progress monitoring
• Outcome documentation

Diagnostic imaging is an essential component of comprehensive car accident injury care. Early and appropriate imaging can identify injuries that might otherwise go undetected, leading to better treatment outcomes and stronger legal cases.`,
      readingTime: 10,
      publishDate: '2024-01-05'
    },
    {
      id: 'pain-management',
      category: 'Recovery',
      title: 'Effective Pain Management Strategies for Car Accident Injuries',
      preview: 'Comprehensive approaches to managing acute and chronic pain following motor vehicle accidents.',
      content: `Effective pain management is crucial for car accident recovery. This comprehensive guide covers various approaches to managing both acute and chronic pain resulting from motor vehicle injuries.

Understanding Pain Types

Acute Pain
• Occurs immediately after injury
• Usually sharp and intense
• Serves as a warning signal
• Typically resolves with healing
• Responds well to immediate treatment

Chronic Pain
• Persists beyond normal healing time
• Often dull and aching
• Can affect daily functioning
• May require long-term management
• More complex treatment approach

Common Pain Patterns After Car Accidents

Neck Pain
• Most common complaint
• Can radiate to shoulders and arms
• May worsen with movement
• Often accompanies headaches
• Usually improves with proper treatment

Back Pain
• Lower back most commonly affected
• Can be sharp or aching
• May limit mobility significantly
• Often associated with muscle spasms
• Can become chronic if untreated

Headaches
• Often tension-type or cervicogenic
• May be accompanied by dizziness
• Can interfere with concentration
• Sometimes indicates more serious injury
• Usually improve with neck treatment

Comprehensive Pain Management Approach

Medication Management
• Anti-inflammatory drugs (NSAIDs)
• Muscle relaxants for spasms
• Pain relievers for comfort
• Topical preparations
• Prescription medications when necessary

Physical Therapies
• Chiropractic adjustments
• Physical therapy exercises
• Massage therapy
• Heat and cold therapy
• Ultrasound treatments

Interventional Procedures
• Trigger point injections
• Epidural steroid injections
• Facet joint injections
• Nerve blocks
• Radiofrequency ablation

Alternative Therapies
• Acupuncture
• Meditation and mindfulness
• Biofeedback
• Yoga and tai chi
• Herbal supplements

Medication Safety

Important considerations:
• Follow prescribed dosages
• Be aware of side effects
• Don't mix with alcohol
• Inform doctors of all medications
• Avoid long-term opioid use when possible

Common side effects to watch for:
• Stomach upset with NSAIDs
• Drowsiness with muscle relaxants
• Dependency risk with opioids
• Interactions with other medications

Non-Medication Approaches

Heat Therapy
• Improves blood circulation
• Relaxes muscles
• Reduces stiffness
• Apply for 15-20 minutes
• Use after initial inflammation subsides

Cold Therapy
• Reduces inflammation
• Numbs pain
• Decreases swelling
• Apply for 10-15 minutes
• Use immediately after injury

Exercise and Movement
• Gentle stretching
• Range of motion exercises
• Strengthening programs
• Gradual activity increase
• Professional guidance recommended

Lifestyle Modifications

Sleep Hygiene
• Maintain regular sleep schedule
• Create comfortable sleep environment
• Use supportive pillows
• Avoid screens before bedtime
• Consider sleep positioning aids

Stress Management
• Practice relaxation techniques
• Maintain social connections
• Consider counseling if needed
• Engage in enjoyable activities
• Avoid excessive worry about recovery

Nutrition and Hydration
• Anti-inflammatory foods
• Adequate water intake
• Limit processed foods
• Consider supplements if needed
• Maintain healthy weight

When to Seek Professional Help

Contact your healthcare provider if:
• Pain worsens despite treatment
• New symptoms develop
• Numbness or tingling occurs
• Weakness develops
• Sleep is significantly disrupted
• Daily activities are severely limited

Red Flag Symptoms
Seek immediate medical attention for:
• Severe, sudden-onset pain
• Pain with fever
• Weakness in arms or legs
• Loss of bladder or bowel control
• Severe headache with vision changes

Creating a Pain Management Plan

Work with your healthcare team to:
• Set realistic goals
• Track pain levels
• Monitor treatment effectiveness
• Adjust approaches as needed
• Plan for setbacks
• Celebrate improvements

Recovery Timeline Expectations

Week 1-2: Focus on inflammation control
Week 3-6: Begin active treatments
Week 7-12: Increase activity levels
Month 4-6: Return to normal activities
Beyond 6 months: Address chronic issues

Long-term Strategies

For lasting pain relief:
• Maintain regular exercise
• Practice good posture
• Manage stress effectively
• Continue healthy habits
• Have regular check-ups
• Address new symptoms promptly

Our Comprehensive Approach

At our medical center, we provide:
• Individualized treatment plans
• Multiple therapy options
• Coordination between specialists
• Patient education and support
• Regular progress monitoring
• Adjustment of treatments as needed

Effective pain management requires a comprehensive approach tailored to your specific needs. With proper treatment and commitment to recovery, most car accident victims can achieve significant pain relief and return to their normal activities.`,
      readingTime: 15,
      publishDate: '2023-12-28'
    },
    {
      id: 'recovery-timeline',
      category: 'Recovery',
      title: 'What to Expect: Car Accident Injury Recovery Timeline',
      preview: 'Understanding the typical recovery process and timeline for common car accident injuries.',
      content: `Recovery from car accident injuries follows predictable patterns, though individual experiences vary. Understanding typical timelines helps set realistic expectations and improve outcomes.

Immediate Phase (0-72 Hours)

Primary Focus: Stabilization and Assessment
• Emergency medical evaluation
• Pain and inflammation control
• Initial diagnostic imaging
• Documentation of injuries
• Rest and protection of injured areas

Common experiences:
• Shock and adrenaline effects
• Pain may be minimal initially
• Stiffness often develops
• Sleep may be disrupted
• Emotional reactions are normal

Treatment priorities:
• Ice application for inflammation
• Gentle movement as tolerated
• Pain medication if needed
• Follow medical instructions
• Avoid activities that increase pain

Acute Phase (3 Days - 2 Weeks)

Primary Focus: Pain Control and Early Mobility
• Regular medical monitoring
• Introduction of gentle treatments
• Basic physical therapy exercises
• Patient education
• Symptom tracking

Expected changes:
• Pain may initially worsen
• Stiffness typically peaks
• Bruising becomes more apparent
• Sleep patterns may improve
• Initial healing begins

Treatment progression:
• Heat therapy may be introduced
• Gentle stretching exercises
• Basic strengthening activities
• Medication adjustment as needed
• Activity modification guidance

Subacute Phase (2 Weeks - 3 Months)

Primary Focus: Function Restoration
• Active rehabilitation begins
• Strength building exercises
• Range of motion improvement
• Return to daily activities
• Pain reduction focus

Typical improvements:
• Significant pain reduction
• Increased mobility
• Better sleep quality
• Improved mood
• Gradual activity increase

Treatment intensification:
• More aggressive physical therapy
• Chiropractic adjustments
• Work conditioning programs
• Sports-specific training if appropriate
• Psychological support if needed

Chronic Phase (3+ Months)

Primary Focus: Optimization and Maintenance
• Address persistent symptoms
• Prevent re-injury
• Maintain improvements
• Lifestyle modifications
• Long-term management strategies

Realistic expectations:
• Some symptoms may persist
• Function should be significantly improved
• Return to most activities
• Occasional flare-ups are normal
• Continued improvement possible

Factors Affecting Recovery Time

Age and General Health
• Younger patients typically heal faster
• Pre-existing conditions may slow recovery
• Overall fitness level influences outcomes
• Nutrition affects healing speed
• Sleep quality impacts recovery

Injury Severity
• Minor injuries: 2-6 weeks
• Moderate injuries: 6-12 weeks
• Severe injuries: 3-12 months or longer
• Multiple injuries extend timelines
• Complications can delay healing

Treatment Compliance
• Following prescribed treatments
• Attending all appointments
• Performing home exercises
• Taking medications as directed
• Lifestyle modifications

Psychological Factors
• Positive attitude helps recovery
• Anxiety can slow healing
• Depression may complicate recovery
• Social support improves outcomes
• Stress management is important

Common Recovery Patterns

Whiplash Injuries
• Week 1-2: Peak pain and stiffness
• Week 3-6: Gradual improvement
• Week 7-12: Significant recovery
• Month 4-6: Near-normal function
• Some cases may take longer

Back Injuries
• Week 1-4: Acute pain phase
• Month 2-3: Active recovery
• Month 4-6: Function restoration
• 6+ months: Maintenance phase
• Chronic cases need ongoing care

Soft Tissue Injuries
• Week 1-3: Inflammation and pain
• Week 4-8: Healing and strengthening
• Week 9-12: Return to activities
• Ongoing: Prevention focus

Warning Signs of Extended Recovery

Contact your healthcare provider if:
• Pain increases rather than decreases
• New symptoms develop
• Function doesn't improve as expected
• Depression or anxiety worsens
• Sleep problems persist

Red flags requiring immediate attention:
• Severe, sudden pain increases
• Neurological symptoms (numbness, weakness)
• Signs of infection
• Severe mood changes
• Substance abuse concerns

Optimizing Your Recovery

Maintain Treatment Consistency
• Attend all scheduled appointments
• Perform prescribed exercises daily
• Take medications as directed
• Communicate with your healthcare team
• Report changes in symptoms

Lifestyle Support
• Prioritize adequate sleep
• Maintain proper nutrition
• Stay hydrated
• Manage stress levels
• Avoid smoking and excessive alcohol

Activity Management
• Gradually increase activity levels
• Listen to your body's signals
• Avoid activities that worsen symptoms
• Use proper body mechanics
• Take breaks as needed

Setting Realistic Goals

Short-term goals (1-4 weeks):
• Pain reduction
• Improved sleep
• Basic daily activities
• Medication management
• Treatment tolerance

Medium-term goals (1-3 months):
• Significant function improvement
• Return to work activities
• Exercise tolerance
• Reduced medication dependence
• Normal sleep patterns

Long-term goals (3+ months):
• Near-normal function
• Return to all activities
• Pain management without medication
• Injury prevention strategies
• Quality of life restoration

Remember that recovery is not always linear. Setbacks are normal and don't necessarily indicate treatment failure. Stay committed to your treatment plan and maintain open communication with your healthcare team for the best possible outcome.`,
      readingTime: 12,
      publishDate: '2023-12-20'
    }
  ];

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

  const categories = [
    { key: 'all', label: t('blog.filterAll') },
    { key: 'treatment', label: t('blog.filterTreatment') },
    { key: 'legal', label: t('blog.filterLegal') },
    { key: 'recovery', label: t('blog.filterRecovery') }
  ];

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
          {filteredArticles.map((article, index) => (
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
                    <div className="content-text">{article.content}</div>
                  </BlogContent>
                )}
              </AnimatePresence>
            </BlogCard>
          ))}
        </BlogGrid>

        {filteredArticles.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-4xl)', color: 'var(--color-gray-600)' }}>
            No articles found matching your search criteria.
          </div>
        )}
      </Container>
    </BlogSection>
  );
};

export default Blog;