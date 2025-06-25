#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://lardo.vercel.app';
const ARTICLES_DIR = path.join(__dirname, '../frontend/public/data/articles');
const SITEMAP_PATH = path.join(__dirname, '../frontend/public/sitemap.xml');

class SitemapGenerator {
  constructor() {
    this.urls = [];
  }

  addUrl(loc, lastmod, changefreq = 'monthly', priority = '0.5', alternatives = []) {
    const url = {
      loc: `${DOMAIN}${loc}`,
      lastmod,
      changefreq,
      priority,
      alternatives
    };
    this.urls.push(url);
  }

  async loadArticles() {
    try {
      const indexPath = path.join(ARTICLES_DIR, 'index.json');
      if (!fs.existsSync(indexPath)) {
        console.log('No articles index found, skipping articles in sitemap');
        return [];
      }

      const indexContent = fs.readFileSync(indexPath, 'utf8');
      const data = JSON.parse(indexContent);
      return data.articles || [];
    } catch (error) {
      console.error('Error loading articles:', error);
      return [];
    }
  }

  formatDate(dateString) {
    return new Date(dateString).toISOString().split('T')[0];
  }

  generateXML() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

`;

    this.urls.forEach(url => {
      xml += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
`;

      // Add hreflang alternatives
      url.alternatives.forEach(alt => {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>
`;
      });

      // Add news tags for articles
      if (url.news) {
        xml += `    <news:news>
      <news:publication>
        <news:name>Laredo Car Accident Medical Center</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${url.news.publishDate}</news:publication_date>
      <news:title>${url.news.title}</news:title>
      <news:keywords>${url.news.keywords}</news:keywords>
    </news:news>
`;
      }

      xml += `  </url>

`;
    });

    xml += `</urlset>`;
    return xml;
  }

  async generate() {
    console.log('🗺️  Generating sitemap for Laredo Car Accident Center...\n');

    const today = this.formatDate(new Date());

    // Add main pages
    this.addUrl('/', today, 'daily', '1.0', [
      { hreflang: 'en', href: `${DOMAIN}/?lang=en` },
      { hreflang: 'es', href: `${DOMAIN}/?lang=es` },
      { hreflang: 'x-default', href: `${DOMAIN}/` }
    ]);

    // Add main sections
    this.addUrl('/#services', today, 'weekly', '0.9', [
      { hreflang: 'en', href: `${DOMAIN}/#services?lang=en` },
      { hreflang: 'es', href: `${DOMAIN}/#services?lang=es` }
    ]);

    this.addUrl('/#about', today, 'monthly', '0.7', [
      { hreflang: 'en', href: `${DOMAIN}/#about?lang=en` },
      { hreflang: 'es', href: `${DOMAIN}/#about?lang=es` }
    ]);

    this.addUrl('/#contact', today, 'monthly', '0.8', [
      { hreflang: 'en', href: `${DOMAIN}/#contact?lang=en` },
      { hreflang: 'es', href: `${DOMAIN}/#contact?lang=es` }
    ]);

    this.addUrl('/#blog', today, 'daily', '0.8', [
      { hreflang: 'en', href: `${DOMAIN}/#blog?lang=en` },
      { hreflang: 'es', href: `${DOMAIN}/#blog?lang=es` }
    ]);

    // Add service-specific pages
    const services = [
      'chiropractic-care',
      'pain-management', 
      'diagnostic-imaging',
      'physical-therapy',
      'legal-consultation'
    ];

    services.forEach(service => {
      this.addUrl(`/#services-${service}`, today, 'weekly', '0.8');
    });

    // Load and add articles
    const articles = await this.loadArticles();
    console.log(`📚 Found ${articles.length} articles to add to sitemap`);

    articles.forEach(article => {
      const lastmod = this.formatDate(article.updatedAt || article.publishedAt);
      const priority = article.featured ? '0.8' : '0.7';
      
      // Add article URL (since it's a SPA, we'll use fragment URLs)
      const url = {
        loc: `${DOMAIN}/#blog-${article.slug}`,
        lastmod,
        changefreq: 'monthly',
        priority,
        alternatives: [
          { hreflang: 'en', href: `${DOMAIN}/#blog-${article.slug}?lang=en` },
          { hreflang: 'es', href: `${DOMAIN}/#blog-${article.slug}?lang=es` }
        ],
        news: {
          publishDate: this.formatDate(article.publishedAt),
          title: article.title.en,
          keywords: article.tags.en.join(', ')
        }
      };

      this.urls.push(url);
      console.log(`  ✅ Added: ${article.title.en}`);
    });

    // Add legal pages
    this.addUrl('/privacy-policy', today, 'yearly', '0.3');
    this.addUrl('/terms-of-service', today, 'yearly', '0.3');

    // Generate and save XML
    const xml = this.generateXML();
    fs.writeFileSync(SITEMAP_PATH, xml);

    console.log(`\n✅ Sitemap generated successfully!`);
    console.log(`📁 File: ${SITEMAP_PATH}`);
    console.log(`🔗 URLs: ${this.urls.length} total`);
    console.log(`📄 Articles: ${articles.length} included`);
    console.log(`🌐 Domain: ${DOMAIN}`);
    
    return xml;
  }
}

// Run if called directly
if (require.main === module) {
  const generator = new SitemapGenerator();
  generator.generate().catch(console.error);
}

module.exports = SitemapGenerator;