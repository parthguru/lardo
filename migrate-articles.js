#!/usr/bin/env node

/**
 * Article Migration Script
 * Migrates existing blog articles from fallback data to Strapi CMS
 */

const https = require('https');
const http = require('http');

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_TOKEN = process.env.STRAPI_ADMIN_TOKEN;

// Articles from fallback data
const articles = [
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
- Requires specialized imaging for detection

**Soft Tissue Damage**
- Ligament tears and muscle strains
- Often invisible on X-rays
- Best detected with MRI imaging

#### Insurance and Documentation

Proper imaging serves multiple purposes:
- Provides baseline injury documentation
- Supports insurance claims
- Guides treatment decisions
- Creates legal evidence if needed

#### Working with Our Team

Our imaging coordination includes:
- Same-day X-ray capabilities
- MRI and CT scan referrals
- Insurance pre-authorization
- Immediate results interpretation
- Direct communication with treating physicians`,
    readingTime: 10,
    publishDate: '2024-01-08'
  },
  {
    id: 'recovery-timeline',
    category: 'Recovery',
    title: 'Car Accident Recovery Timeline: What to Expect',
    preview: 'Understanding the phases of recovery and setting realistic expectations for your healing journey.',
    content: `### Immediate Phase (0-72 Hours)

The first 72 hours after an accident are critical:
- Seek immediate medical attention
- Document all symptoms, even minor ones
- Begin ice therapy for inflammation
- Avoid strenuous activities
- Follow up with primary care physician

#### Week 1-2: Acute Phase

**Physical Symptoms:**
- Pain and stiffness peak
- Inflammation is highest
- Sleep may be disrupted
- Energy levels are low

**Treatment Focus:**
- Pain management
- Inflammation reduction
- Gentle movement to prevent stiffness
- Initial diagnostic imaging

#### Week 3-6: Recovery Phase

**Expected Progress:**
- Gradual pain reduction
- Improved range of motion
- Increased activity tolerance
- Better sleep patterns

**Treatment Activities:**
- Physical therapy begins
- Chiropractic adjustments
- Strengthening exercises
- Return to light activities

#### Month 2-3: Strengthening Phase

**Recovery Milestones:**
- Significant pain reduction
- Normal sleep patterns return
- Ability to perform daily activities
- Gradual return to work activities

#### Month 3-6: Maintenance Phase

**Long-term Goals:**
- Full range of motion restored
- Return to pre-accident activity levels
- Prevention strategies implemented
- Ongoing wellness maintenance

#### Factors Affecting Recovery

**Individual Factors:**
- Age and overall health
- Previous injuries
- Fitness level before accident
- Compliance with treatment

**Injury Factors:**
- Severity of impact
- Type of injuries sustained
- Early intervention timing
- Quality of medical care

#### Red Flags During Recovery

Seek immediate attention if you experience:
- Worsening pain after initial improvement
- New symptoms developing
- Loss of function
- Persistent headaches
- Mood changes or depression

#### Supporting Your Recovery

**Nutrition:**
- Anti-inflammatory foods
- Adequate protein for healing
- Proper hydration
- Supplements as recommended

**Lifestyle:**
- Adequate sleep (7-9 hours)
- Stress management techniques
- Gentle exercise as tolerated
- Avoiding alcohol and smoking`,
    readingTime: 15,
    publishDate: '2024-01-05'
  },
  {
    id: 'insurance-process',
    category: 'Legal',
    title: 'Navigating Insurance Claims After a Car Accident',
    preview: 'Step-by-step guide to handling insurance claims and protecting your rights after an accident.',
    content: `### Immediate Steps at the Accident Scene

**Safety First:**
- Move to a safe location if possible
- Call 911 for medical assistance and police
- Turn on hazard lights
- Set up emergency flares if available

**Documentation:**
- Take photos of all vehicles and damage
- Photograph the accident scene
- Document road conditions and traffic signs
- Get witness contact information

**Information Exchange:**
- Driver's license numbers
- Insurance policy information
- Vehicle registration details
- Contact information for all parties

#### Understanding Insurance Types

**Personal Injury Protection (PIP):**
- Covers medical expenses regardless of fault
- Available in no-fault states
- Typically covers 80% of medical bills
- May include lost wages

**Bodily Injury Liability:**
- Covers injuries you cause to others
- Required in most states
- Minimum coverage varies by state
- May not be sufficient for serious injuries

**Uninsured/Underinsured Motorist:**
- Protects you from drivers with inadequate coverage
- Essential protection in many situations
- Covers medical bills and lost wages
- May cover pain and suffering

#### Filing Your Claim

**Initial Contact:**
- Report the accident within 24-48 hours
- Provide basic facts without admitting fault
- Request claim number for reference
- Ask about coverage details

**Documentation Required:**
- Police report number
- Medical records and bills
- Photos of damage and injuries
- Witness statements
- Lost wage documentation

#### Common Insurance Tactics

**Delay Strategies:**
- Requesting unnecessary documentation
- Slow response to communications
- Multiple adjuster changes
- "Lost" paperwork claims

**Lowball Offers:**
- Quick settlement offers
- Pressure to settle immediately
- Excluding future medical costs
- Minimizing pain and suffering

#### Working with Adjusters

**Best Practices:**
- Keep detailed records of all communications
- Never provide recorded statements without attorney
- Don't sign anything without legal review
- Communicate in writing when possible

**Red Flags:**
- Pressure to settle quickly
- Requests for access to all medical records
- Attempts to blame you for the accident
- Unreasonably low settlement offers

#### When to Involve an Attorney

Consider legal representation if:
- Serious injuries occurred
- Fault is disputed
- Insurance company is uncooperative
- You receive a denial letter
- Settlement offer seems inadequate

#### Medical Treatment and Claims

**Important Considerations:**
- Seek medical attention immediately
- Follow all treatment recommendations
- Attend all appointments
- Keep detailed records
- Don't delay treatment due to insurance concerns

#### Settlement Negotiations

**Factors Affecting Value:**
- Medical expenses (past and future)
- Lost wages and earning capacity
- Pain and suffering
- Property damage
- Degree of fault
- Insurance policy limits

**Final Settlement:**
- Review settlement agreement carefully
- Understand what you're releasing
- Consider future medical needs
- Ensure all liens are addressed`,
    readingTime: 18,
    publishDate: '2024-01-03'
  },
  {
    id: 'choosing-medical-provider',
    category: 'Treatment',
    title: 'How to Choose the Right Medical Provider After a Car Accident',
    preview: 'Essential factors to consider when selecting healthcare providers for optimal recovery outcomes.',
    content: `### Immediate Medical Attention

**Emergency Room vs. Urgent Care:**
- Emergency room for life-threatening injuries
- Urgent care for non-emergent but immediate needs
- Primary care physician for follow-up
- Specialists for ongoing treatment

#### Types of Medical Providers

**Primary Care Physicians:**
- General medical evaluation
- Coordinate overall care
- Manage medications
- Provide referrals to specialists

**Chiropractors:**
- Spinal alignment and manipulation
- Soft tissue therapy
- Rehabilitation exercises
- Drug-free treatment approach

**Physical Therapists:**
- Movement restoration
- Strength and flexibility training
- Pain management techniques
- Functional improvement focus

**Orthopedic Specialists:**
- Bone and joint injuries
- Surgical interventions when needed
- Complex fracture management
- Sports medicine expertise

**Pain Management Specialists:**
- Chronic pain treatment
- Injection therapies
- Medication management
- Comprehensive pain programs

#### Key Factors in Provider Selection

**Experience with Auto Injuries:**
- Specialization in car accident injuries
- Understanding of common injury patterns
- Experience with insurance processes
- Track record of successful outcomes

**Treatment Philosophy:**
- Conservative vs. aggressive approaches
- Integration of multiple therapies
- Patient education emphasis
- Preventive care focus

**Insurance Acceptance:**
- In-network vs. out-of-network costs
- Letter of Protection availability
- Payment plan options
- Billing transparency

#### Questions to Ask Potential Providers

**About Their Practice:**
- How many car accident cases do you see annually?
- What is your typical treatment approach?
- How do you coordinate with other providers?
- What insurance plans do you accept?

**About Your Care:**
- What can I expect during treatment?
- How long might recovery take?
- What are the potential complications?
- How will we measure progress?

#### Red Flags to Avoid

**Concerning Practices:**
- Pressure to sign contracts immediately
- Promises of guaranteed outcomes
- Requests for payment upfront with insurance cases
- Reluctance to provide references
- Limited availability for emergencies

#### Multidisciplinary Approach

**Benefits of Integrated Care:**
- Comprehensive treatment plans
- Coordinated provider communication
- Reduced treatment time
- Better outcomes
- Streamlined insurance processes

**Team Members:**
- Primary care coordination
- Specialist consultations
- Rehabilitation therapists
- Mental health support
- Case management

#### Geographic and Practical Considerations

**Location Factors:**
- Proximity to home or work
- Parking availability
- Public transportation access
- Facility accessibility

**Scheduling:**
- Appointment availability
- Emergency access
- After-hours care options
- Weekend and holiday coverage

#### Evaluating Treatment Progress

**Positive Indicators:**
- Gradual pain reduction
- Improved function and mobility
- Better sleep patterns
- Increased activity tolerance
- Return to daily activities

**Concerning Signs:**
- Worsening symptoms
- New pain development
- Lack of progress after reasonable time
- Poor communication from provider
- Pressure to continue unnecessary treatment

#### Making Changes When Needed

**When to Consider Switching:**
- Lack of improvement
- Poor communication
- Scheduling difficulties
- Insurance issues
- Personality conflicts

**How to Transition:**
- Request medical records
- Get referrals if needed
- Inform insurance company
- Schedule overlap if possible
- Maintain treatment continuity`,
    readingTime: 14,
    publishDate: '2024-01-01'
  }
];

// Helper function to make HTTP requests
function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const protocol = options.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
}

// Create or find a category
async function createCategory(categoryName) {
  console.log(`Creating/finding category: ${categoryName}`);
  
  // First try to find existing category
  const findOptions = {
    hostname: 'localhost',
    port: 1337,
    path: `/api/categories?filters[name][$eq]=${encodeURIComponent(categoryName)}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  try {
    const findResult = await makeRequest(findOptions);
    if (findResult.data && findResult.data.data && findResult.data.data.length > 0) {
      console.log(`Found existing category: ${categoryName}`);
      return findResult.data.data[0].id;
    }
  } catch (error) {
    console.log(`Category lookup failed, will create new: ${error.message}`);
  }
  
  // Create new category
  const createOptions = {
    hostname: 'localhost',
    port: 1337,
    path: '/api/categories',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  const categoryData = JSON.stringify({
    data: {
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
      description: `Articles about ${categoryName.toLowerCase()}`,
      color: categoryName === 'Treatment' ? '#10B981' : categoryName === 'Legal' ? '#3B82F6' : '#8B5CF6'
    }
  });
  
  try {
    const result = await makeRequest(createOptions, categoryData);
    if (result.status === 200 || result.status === 201) {
      console.log(`Created category: ${categoryName}`);
      return result.data.data.id;
    } else {
      console.error(`Failed to create category: ${result.status}`, result.data);
      return null;
    }
  } catch (error) {
    console.error(`Error creating category: ${error.message}`);
    return null;
  }
}

// Create an article
async function createArticle(article, categoryId) {
  console.log(`Creating article: ${article.title}`);
  
  const options = {
    hostname: 'localhost',
    port: 1337,
    path: '/api/articles',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  const articleData = JSON.stringify({
    data: {
      title: article.title,
      content: article.content,
      excerpt: article.preview,
      slug: article.id,
      publishedAt: new Date(article.publishDate).toISOString(),
      readingTime: article.readingTime,
      featured: false,
      category: categoryId,
      locale: 'en'
    }
  });
  
  try {
    const result = await makeRequest(options, articleData);
    if (result.status === 200 || result.status === 201) {
      console.log(`✅ Created article: ${article.title}`);
      return result.data.data.id;
    } else {
      console.error(`❌ Failed to create article: ${result.status}`, result.data);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating article: ${error.message}`);
    return null;
  }
}

// Main migration function
async function migrateArticles() {
  console.log('🚀 Starting article migration to Strapi...\n');
  
  // Wait for Strapi to be ready
  console.log('⏳ Waiting for Strapi to be ready...');
  let attempts = 0;
  let strapiReady = false;
  
  while (!strapiReady && attempts < 10) {
    try {
      const healthCheck = await makeRequest({
        hostname: 'localhost',
        port: 1337,
        path: '/api/categories',
        method: 'GET'
      });
      if (healthCheck.status === 200) {
        strapiReady = true;
        console.log('✅ Strapi is ready!\n');
      }
    } catch (error) {
      attempts++;
      console.log(`⏳ Attempt ${attempts}/10 - Waiting for Strapi...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  if (!strapiReady) {
    console.error('❌ Could not connect to Strapi. Please make sure it is running on localhost:1337');
    process.exit(1);
  }
  
  // Create categories and articles
  const categoryMap = new Map();
  let created = 0;
  let failed = 0;
  
  for (const article of articles) {
    let categoryId = categoryMap.get(article.category);
    
    if (!categoryId) {
      categoryId = await createCategory(article.category);
      if (categoryId) {
        categoryMap.set(article.category, categoryId);
      }
    }
    
    if (categoryId) {
      const articleId = await createArticle(article, categoryId);
      if (articleId) {
        created++;
      } else {
        failed++;
      }
    } else {
      console.error(`❌ Could not create category for article: ${article.title}`);
      failed++;
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n📊 Migration Summary:');
  console.log(`✅ Articles created: ${created}`);
  console.log(`❌ Articles failed: ${failed}`);
  console.log(`📁 Categories created: ${categoryMap.size}`);
  
  if (created > 0) {
    console.log('\n🎉 Migration completed successfully!');
    console.log('📖 You can now view your articles in the Strapi admin panel at http://localhost:1337/admin');
  } else {
    console.log('\n⚠️  No articles were migrated. Please check the errors above.');
  }
}

// Run migration
if (require.main === module) {
  migrateArticles().catch(console.error);
}

module.exports = { migrateArticles };