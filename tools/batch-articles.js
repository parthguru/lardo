#!/usr/bin/env node

const ArticleCreator = require('./create-article');
const fs = require('fs');
const path = require('path');

// Sample articles for the medical center
const SAMPLE_ARTICLES = [
  {
    title: "Understanding Whiplash: Symptoms, Treatment, and Recovery",
    category: "treatment",
    author: "dr-martinez",
    excerpt: "Whiplash is one of the most common car accident injuries. Learn about symptoms, treatment options, and what to expect during recovery.",
    readTime: 8,
    featured: true,
    content: `Whiplash occurs when your head is suddenly jerked forward and backward during a car accident, causing strain to the neck muscles and ligaments. This injury affects thousands of people annually and can have lasting effects if not properly treated.

## Common Symptoms

The symptoms of whiplash may not appear immediately after an accident. Common signs include:

- Neck pain and stiffness
- Headaches, especially at the base of the skull
- Dizziness and fatigue
- Shoulder and upper back pain
- Tingling or numbness in arms

## Treatment Options

Our medical center offers comprehensive whiplash treatment including:

**Immediate Care:**
- Pain management and inflammation reduction
- Gentle neck exercises and stretches
- Ice and heat therapy

**Advanced Treatment:**
- Physical therapy and rehabilitation
- Chiropractic adjustments
- Massage therapy
- Prescription medications when necessary

## Recovery Timeline

Most whiplash injuries heal within 2-3 months with proper treatment. However, recovery time varies based on:
- Severity of the initial injury
- Age and overall health
- Adherence to treatment plan
- Previous neck injuries

## When to Seek Emergency Care

Contact us immediately if you experience:
- Severe neck pain
- Pain that radiates down arms
- Muscle weakness or numbness
- Difficulty concentrating or memory problems

Early intervention is crucial for optimal recovery. Our team in Laredo is equipped with the latest treatment methods to help you recover quickly and completely.`
  },
  {
    title: "Your Rights After a Car Accident: A Legal Guide",
    category: "legal",
    author: "attorney-garcia",
    excerpt: "Knowing your legal rights after a car accident can protect you from insurance companies and ensure fair compensation for your injuries.",
    readTime: 6,
    featured: true,
    content: `Being involved in a car accident can be overwhelming, especially when dealing with injuries, insurance companies, and potential legal issues. Understanding your rights is crucial for protecting yourself and ensuring fair compensation.

## Immediate Steps After an Accident

**At the Scene:**
1. Ensure safety and call 911 if anyone is injured
2. Document the scene with photos
3. Exchange insurance information
4. Get witness contact information
5. Never admit fault or make statements about the accident

**After Leaving the Scene:**
- Seek medical attention immediately, even for minor injuries
- Contact your insurance company
- Keep detailed records of all expenses
- Avoid signing documents without legal review

## Your Legal Rights in Texas

**Right to Medical Treatment:**
You have the right to choose your own doctor and medical facility. Insurance companies cannot force you to use their preferred providers.

**Right to Fair Compensation:**
Texas law entitles you to compensation for:
- Medical expenses (current and future)
- Lost wages and earning capacity
- Pain and suffering
- Property damage

**Right to Legal Representation:**
You have the right to consult with an attorney before making any statements or signing documents with insurance companies.

## Common Insurance Company Tactics

Be aware of these common strategies used to minimize your claim:
- Quick settlement offers before the full extent of injuries is known
- Requesting recorded statements without legal counsel
- Delaying claim processing
- Disputing medical necessity of treatments

## When to Contact an Attorney

Consider legal consultation if:
- You have significant injuries requiring ongoing treatment
- The other driver was uninsured or underinsured
- Fault is disputed
- Insurance company is acting in bad faith
- You're unsure about the value of your claim

## Statute of Limitations

In Texas, you generally have two years from the date of the accident to file a personal injury lawsuit. Don't wait – important evidence can be lost over time.

Our legal team in Laredo understands local laws and has extensive experience with car accident cases. We work on a contingency basis, meaning you don't pay unless we win your case.`
  },
  {
    title: "Back Injury Recovery: Physical Therapy and Exercises",
    category: "recovery",
    author: "dr-rodriguez",
    excerpt: "Back injuries from car accidents require specialized care. Learn about effective physical therapy techniques and safe exercises for recovery.",
    readTime: 7,
    featured: false,
    content: `Back injuries are among the most serious consequences of car accidents, potentially affecting your quality of life for months or years. Proper rehabilitation is essential for full recovery and preventing chronic pain.

## Types of Back Injuries from Car Accidents

**Soft Tissue Injuries:**
- Muscle strains and sprains
- Ligament damage
- Bruising and inflammation

**Spinal Injuries:**
- Herniated or bulging discs
- Fractured vertebrae
- Spinal cord injuries
- Pinched nerves

## The Importance of Physical Therapy

Physical therapy plays a crucial role in back injury recovery by:
- Reducing pain and inflammation
- Improving flexibility and range of motion
- Strengthening supporting muscles
- Preventing future injuries
- Restoring normal function

## Phase 1: Initial Recovery (0-2 weeks)

**Goals:** Pain control and protection
**Activities:**
- Gentle walking as tolerated
- Ice therapy for inflammation
- Basic breathing exercises
- Avoid bed rest for extended periods

## Phase 2: Early Mobilization (2-6 weeks)

**Goals:** Restore basic movement
**Exercises:**
- Pelvic tilts
- Knee-to-chest stretches
- Gentle spinal rotation
- Cat-cow stretches
- Walking program

## Phase 3: Strengthening (6-12 weeks)

**Goals:** Build strength and endurance
**Exercises:**
- Core strengthening (planks, bridges)
- Back extension exercises
- Hip flexor stretches
- Resistance band training
- Pool therapy when available

## Phase 4: Return to Activity (3+ months)

**Goals:** Full function restoration
**Activities:**
- Advanced strengthening exercises
- Sport-specific training if applicable
- Ergonomic training for work
- Maintenance exercise program

## Warning Signs to Watch For

Stop exercises and contact us immediately if you experience:
- Increased pain or new symptoms
- Numbness or tingling in legs
- Loss of bowel or bladder control
- Severe muscle weakness

## Creating a Home Exercise Program

**Equipment Needed:**
- Yoga mat or comfortable surface
- Resistance bands
- Small pillow for support
- Ice packs and heating pads

**Daily Routine Tips:**
- Start slowly and progress gradually
- Listen to your body
- Maintain consistency
- Track your progress

## Long-term Prevention

Prevent future back injuries by:
- Maintaining good posture
- Using proper lifting techniques
- Staying physically active
- Managing stress
- Sleeping on a supportive mattress

Our rehabilitation team in Laredo creates personalized recovery plans tailored to your specific injury and goals. We use the latest therapeutic techniques to help you return to your normal activities safely and efficiently.`
  },
  {
    title: "Concussion Care: Recognizing and Managing Head Injuries",
    category: "treatment",
    author: "dr-rodriguez",
    excerpt: "Head injuries from car accidents require immediate attention. Learn how to recognize concussion symptoms and the importance of proper medical care.",
    readTime: 5,
    featured: false,
    content: `Concussions are a type of traumatic brain injury that can occur even in minor car accidents. Understanding the signs and seeking prompt medical care is crucial for preventing long-term complications.

## What is a Concussion?

A concussion occurs when the brain is shaken inside the skull due to sudden impact or movement. This can happen during car accidents when:
- Your head hits the steering wheel, dashboard, or window
- Your head is jolted forward and backward rapidly
- The force of impact causes your brain to move within your skull

## Immediate Symptoms

Symptoms may appear immediately or develop over hours:

**Physical Symptoms:**
- Headache or pressure in head
- Nausea or vomiting
- Dizziness or balance problems
- Blurred or double vision
- Sensitivity to light or noise

**Cognitive Symptoms:**
- Confusion or feeling "foggy"
- Difficulty concentrating
- Memory problems
- Slowed thinking

**Emotional Symptoms:**
- Irritability
- Anxiety
- Depression
- Mood swings

## When to Seek Emergency Care

Call 911 immediately if the person experiences:
- Loss of consciousness
- Repeated vomiting
- Severe or worsening headache
- Extreme confusion
- Seizures
- Unusual behavior

## Medical Evaluation

Our medical team will conduct:
- Neurological examination
- Cognitive testing
- Balance and coordination tests
- CT scan or MRI if necessary
- Ongoing monitoring

## Treatment and Recovery

**Immediate Care:**
- Physical and cognitive rest
- Gradual return to activities
- Symptom monitoring
- Follow-up appointments

**Recovery Timeline:**
- Most concussions heal within 7-10 days
- Some may take weeks or months
- Children and teens often take longer to recover
- Previous concussions may extend recovery time

## Return-to-Activity Protocol

**Step 1:** Complete rest until symptom-free
**Step 2:** Light mental and physical activity
**Step 3:** Moderate activity without symptoms
**Step 4:** Heavy non-contact activity
**Step 5:** Full contact practice (if applicable)
**Step 6:** Return to normal activities

## Preventing Second Impact Syndrome

Never return to activities while experiencing concussion symptoms. A second injury before full recovery can cause:
- Severe brain swelling
- Permanent brain damage
- Death in rare cases

## Long-term Monitoring

Some people may experience post-concussion syndrome with symptoms lasting months. Our team provides:
- Ongoing neurological monitoring
- Cognitive rehabilitation
- Physical therapy for balance issues
- Psychological support if needed

If you've been in a car accident, even a minor one, and experience any head injury symptoms, seek medical evaluation immediately. Early diagnosis and proper management are key to full recovery.`
  }
];

class BatchArticleCreator {
  constructor() {
    this.creator = new ArticleCreator();
    this.articlesDir = path.join(__dirname, '../frontend/public/data/articles');
  }

  async createSampleArticles() {
    console.log('\n🏗️  Creating sample articles for Laredo Car Accident Center...\n');

    // Ensure directory exists
    if (!fs.existsSync(this.articlesDir)) {
      fs.mkdirSync(this.articlesDir, { recursive: true });
    }

    for (let i = 0; i < SAMPLE_ARTICLES.length; i++) {
      const articleData = SAMPLE_ARTICLES[i];
      console.log(`📝 Creating article ${i + 1}/${SAMPLE_ARTICLES.length}: "${articleData.title}"`);

      try {
        await this.createArticleFromData(articleData);
        console.log(`✅ Article created successfully\n`);
      } catch (error) {
        console.error(`❌ Error creating article: ${error.message}\n`);
      }
    }

    console.log('🎉 All sample articles created successfully!');
    console.log(`📁 Articles saved to: ${this.articlesDir}`);
  }

  async createArticleFromData(data) {
    const slug = this.creator.generateSlug(data.title);
    
    // Generate translations
    const titleEs = this.creator.translateText(data.title);
    const excerptEs = this.creator.translateText(data.excerpt);
    const contentEs = this.creator.translateText(data.content);

    // Get author data from create-article module
    const CreateArticle = require('./create-article');
    const AUTHORS = {
      'dr-martinez': {
        name: 'Dr. Elena Martinez',
        credentials: 'MD, Orthopedic Surgeon',
        specialty: 'Spinal Injuries & Rehabilitation'
      },
      'dr-rodriguez': {
        name: 'Dr. Carlos Rodriguez', 
        credentials: 'MD, Emergency Medicine',
        specialty: 'Trauma Care & Pain Management'
      },
      'attorney-garcia': {
        name: 'Maria Garcia',
        credentials: 'JD, Personal Injury Attorney',
        specialty: 'Car Accident Claims'
      }
    };
    
    const authorData = AUTHORS[data.author] || {
      name: 'Dr. Unknown',
      credentials: 'MD',
      specialty: 'General Practice'
    };

    // Generate SEO data
    const keywords = this.creator.generateSEOKeywords(data.title, data.category, data.content);
    const keywordsEs = keywords.map(k => this.creator.translateText(k));

    // Create article object
    const article = {
      id: slug,
      title: {
        en: data.title,
        es: titleEs
      },
      slug,
      excerpt: {
        en: data.excerpt,
        es: excerptEs
      },
      content: {
        en: data.content,
        es: contentEs
      },
      category: data.category,
      author: authorData,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      readTime: data.readTime,
      featured: data.featured,
      tags: {
        en: keywords,
        es: keywordsEs
      },
      seo: {
        en: {
          title: `${data.title} | Laredo Car Accident Center`,
          description: data.excerpt,
          keywords: keywords.join(', ')
        },
        es: {
          title: `${titleEs} | Centro de Accidentes de Laredo`,
          description: excerptEs,
          keywords: keywordsEs.join(', ')
        }
      }
    };

    // Save article
    const filename = `${slug}.json`;
    const filepath = path.join(this.articlesDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(article, null, 2));

    // Update index
    await this.creator.updateIndex(article);

    return article;
  }
}

// Run if called directly
if (require.main === module) {
  const batchCreator = new BatchArticleCreator();
  batchCreator.createSampleArticles().catch(console.error);
}

module.exports = BatchArticleCreator;