#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Article templates and data
const CATEGORIES = {
  'treatment': { name: 'Treatment', color: '#4F46E5', icon: '🏥' },
  'legal': { name: 'Legal', color: '#059669', icon: '⚖️' },
  'recovery': { name: 'Recovery', color: '#DC2626', icon: '💪' }
};

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

// Translation helpers
const TRANSLATIONS = {
  'treatment': { es: 'tratamiento' },
  'legal': { es: 'legal' },
  'recovery': { es: 'recuperación' },
  'whiplash': { es: 'latigazo cervical' },
  'back pain': { es: 'dolor de espalda' },
  'concussion': { es: 'conmoción cerebral' },
  'insurance': { es: 'seguro' },
  'claim': { es: 'reclamo' },
  'compensation': { es: 'compensación' },
  'injury': { es: 'lesión' },
  'injuries': { es: 'lesiones' },
  'car accident': { es: 'accidente de carro' },
  'pain': { es: 'dolor' },
  'medical': { es: 'médico' },
  'care': { es: 'atención' },
  'doctor': { es: 'doctor' },
  'therapy': { es: 'terapia' },
  'physical': { es: 'físico' },
  'symptoms': { es: 'síntomas' },
  'diagnosis': { es: 'diagnóstico' },
  'rehabilitation': { es: 'rehabilitación' },
  'emergency': { es: 'emergencia' },
  'appointment': { es: 'cita' },
  'consultation': { es: 'consulta' },
  'attorney': { es: 'abogado' },
  'lawyer': { es: 'abogado' },
  'rights': { es: 'derechos' },
  'Understanding': { es: 'Entendiendo' },
  'Recognizing': { es: 'Reconociendo' },
  'Managing': { es: 'Manejando' },
  'Recovery': { es: 'Recuperación' },
  'Exercises': { es: 'Ejercicios' },
  'Guide': { es: 'Guía' },
  'Head': { es: 'Cabeza' },
  'Back': { es: 'Espalda' },
  'Physical Therapy': { es: 'Terapia Física' },
  'Your Rights': { es: 'Sus Derechos' },
  'After a Car Accident': { es: 'Después de un Accidente de Carro' },
  'A Legal Guide': { es: 'Una Guía Legal' }
};

class ArticleCreator {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.articlesDir = path.join(__dirname, '../frontend/public/data/articles');
  }

  async ask(question) {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  translateText(text) {
    let translated = text;
    Object.entries(TRANSLATIONS).forEach(([en, translations]) => {
      const regex = new RegExp(`\\b${en}\\b`, 'gi');
      translated = translated.replace(regex, translations.es);
    });
    return translated;
  }

  generateSEOKeywords(title, category, content) {
    const baseKeywords = {
      treatment: ['car accident treatment', 'injury recovery', 'medical care', 'laredo treatment'],
      legal: ['car accident lawyer', 'personal injury', 'insurance claim', 'laredo attorney'],
      recovery: ['injury recovery', 'rehabilitation', 'pain management', 'healing process']
    };

    const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 3);
    const contentWords = content.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const uniqueWords = [...new Set([...titleWords, ...contentWords.slice(0, 10)])];

    return [...baseKeywords[category], ...uniqueWords].slice(0, 15);
  }

  async createArticle() {
    console.log('\n🚀 Article Creator for Laredo Car Accident Center\n');

    try {
      // Collect article information
      const title = await this.ask('📝 Article title: ');
      const slug = this.generateSlug(title);
      
      console.log('\nAvailable categories:');
      Object.entries(CATEGORIES).forEach(([key, cat]) => {
        console.log(`  ${cat.icon} ${key} - ${cat.name}`);
      });
      const category = await this.ask('\n📂 Category (treatment/legal/recovery): ');
      
      console.log('\nAvailable authors:');
      Object.entries(AUTHORS).forEach(([key, author]) => {
        console.log(`  👨‍⚕️ ${key} - ${author.name}, ${author.credentials}`);
      });
      const authorKey = await this.ask('\n👤 Author key: ');
      
      const excerpt = await this.ask('📋 Brief excerpt (2-3 sentences): ');
      const readTime = await this.ask('⏱️  Estimated read time (minutes): ');
      const isFeatured = (await this.ask('⭐ Featured article? (y/n): ')).toLowerCase() === 'y';
      
      console.log('\n📝 Enter article content (type "END" on a new line to finish):');
      let content = '';
      let line;
      while ((line = await this.ask('')) !== 'END') {
        content += line + '\n';
      }

      // Generate translations
      const titleEs = this.translateText(title);
      const excerptEs = this.translateText(excerpt);
      const contentEs = this.translateText(content);

      // Generate SEO data
      const keywords = this.generateSEOKeywords(title, category, content);
      const keywordsEs = keywords.map(k => this.translateText(k));

      // Create article object
      const article = {
        id: slug,
        title: {
          en: title,
          es: titleEs
        },
        slug,
        excerpt: {
          en: excerpt.trim(),
          es: excerptEs.trim()
        },
        content: {
          en: content.trim(),
          es: contentEs.trim()
        },
        category,
        author: AUTHORS[authorKey],
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        readTime: parseInt(readTime) || 5,
        featured: isFeatured,
        tags: {
          en: keywords,
          es: keywordsEs
        },
        seo: {
          en: {
            title: `${title} | Laredo Car Accident Center`,
            description: excerpt.trim(),
            keywords: keywords.join(', ')
          },
          es: {
            title: `${titleEs} | Centro de Accidentes de Laredo`,
            description: excerptEs.trim(),
            keywords: keywordsEs.join(', ')
          }
        }
      };

      // Save article
      const filename = `${slug}.json`;
      const filepath = path.join(this.articlesDir, filename);
      
      // Ensure directory exists
      if (!fs.existsSync(this.articlesDir)) {
        fs.mkdirSync(this.articlesDir, { recursive: true });
      }

      fs.writeFileSync(filepath, JSON.stringify(article, null, 2));

      // Update index
      await this.updateIndex(article);

      console.log(`\n✅ Article created successfully!`);
      console.log(`📁 File: ${filename}`);
      console.log(`🔗 ID: ${article.id}`);
      console.log(`📊 Category: ${CATEGORIES[category].icon} ${CATEGORIES[category].name}`);
      console.log(`👤 Author: ${article.author.name}`);
      console.log(`⭐ Featured: ${isFeatured ? 'Yes' : 'No'}`);

    } catch (error) {
      console.error('❌ Error creating article:', error.message);
    } finally {
      this.rl.close();
    }
  }

  async updateIndex(newArticle) {
    const indexPath = path.join(this.articlesDir, 'index.json');
    let index = { articles: [], lastUpdated: new Date().toISOString() };

    if (fs.existsSync(indexPath)) {
      index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    }

    // Remove existing article with same ID (update case)
    index.articles = index.articles.filter(a => a.id !== newArticle.id);

    // Add new article
    index.articles.unshift({
      id: newArticle.id,
      title: newArticle.title,
      slug: newArticle.slug,
      excerpt: newArticle.excerpt,
      category: newArticle.category,
      author: newArticle.author,
      publishedAt: newArticle.publishedAt,
      readTime: newArticle.readTime,
      featured: newArticle.featured,
      tags: newArticle.tags
    });

    // Sort by publishedAt (newest first)
    index.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    index.lastUpdated = new Date().toISOString();

    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
    console.log('📋 Article index updated');
  }
}

// Run if called directly
if (require.main === module) {
  const creator = new ArticleCreator();
  creator.createArticle();
}

module.exports = ArticleCreator;