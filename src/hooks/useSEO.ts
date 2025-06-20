import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  lang: string;
  image?: string;
  url?: string;
  articleData?: {
    author?: string;
    publishDate?: string;
    modifiedDate?: string;
    section?: string;
    tags?: string[];
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

export const useSEO = ({ title, description, keywords, lang, image, url, articleData, breadcrumbs }: SEOProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Add favicon package
    const addFavicons = () => {
      const favicon16 = document.querySelector('link[rel="icon"][sizes="16x16"]') || document.createElement('link');
      favicon16.setAttribute('rel', 'icon');
      favicon16.setAttribute('type', 'image/png');
      favicon16.setAttribute('sizes', '16x16');
      favicon16.setAttribute('href', '/favicons/favicon-16x16.png');
      if (!document.head.contains(favicon16)) document.head.appendChild(favicon16);

      const favicon32 = document.querySelector('link[rel="icon"][sizes="32x32"]') || document.createElement('link');
      favicon32.setAttribute('rel', 'icon');
      favicon32.setAttribute('type', 'image/png');
      favicon32.setAttribute('sizes', '32x32');
      favicon32.setAttribute('href', '/favicons/favicon-32x32.png');
      if (!document.head.contains(favicon32)) document.head.appendChild(favicon32);

      const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') || document.createElement('link');
      appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
      appleTouchIcon.setAttribute('sizes', '180x180');
      appleTouchIcon.setAttribute('href', '/favicons/apple-touch-icon.png');
      if (!document.head.contains(appleTouchIcon)) document.head.appendChild(appleTouchIcon);

      const manifest = document.querySelector('link[rel="manifest"]') || document.createElement('link');
      manifest.setAttribute('rel', 'manifest');
      manifest.setAttribute('href', '/favicons/site.webmanifest');
      if (!document.head.contains(manifest)) document.head.appendChild(manifest);

      const maskIcon = document.querySelector('link[rel="mask-icon"]') || document.createElement('link');
      maskIcon.setAttribute('rel', 'mask-icon');
      maskIcon.setAttribute('href', '/favicons/safari-pinned-tab.svg');
      maskIcon.setAttribute('color', '#2C5AA0');
      if (!document.head.contains(maskIcon)) document.head.appendChild(maskIcon);

      const msconfig = document.querySelector('meta[name="msapplication-config"]') || document.createElement('meta');
      msconfig.setAttribute('name', 'msapplication-config');
      msconfig.setAttribute('content', '/favicons/browserconfig.xml');
      if (!document.head.contains(msconfig)) document.head.appendChild(msconfig);

      const themeColor = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
      themeColor.setAttribute('name', 'theme-color');
      themeColor.setAttribute('content', '#2C5AA0');
      if (!document.head.contains(themeColor)) document.head.appendChild(themeColor);
    };

    addFavicons();

    // Set or update meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Laredo Car Accident Medical Center');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', lang);

    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:locale', lang === 'es' ? 'es_MX' : 'en_US', 'property');
    updateMetaTag('og:site_name', 'Laredo Car Accident Medical Center', 'property');
    
    if (image) {
      updateMetaTag('og:image', image, 'property');
    }
    
    if (url) {
      updateMetaTag('og:url', url, 'property');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', title, 'name');
    updateMetaTag('twitter:description', description, 'name');
    
    if (image) {
      updateMetaTag('twitter:image', image, 'name');
    }

    // Medical/Local Business specific tags
    updateMetaTag('geo.region', 'US-TX', 'name');
    updateMetaTag('geo.placename', 'Laredo', 'name');
    updateMetaTag('geo.position', '27.5306;-99.4803', 'name');
    updateMetaTag('ICBM', '27.5306, -99.4803', 'name');

    // Structured Data - Local Business
    const addStructuredData = () => {
      const existingScript = document.querySelector('#structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "name": lang === 'es' 
          ? "Centro Médico de Accidentes Automovilísticos de Laredo"
          : "Laredo Car Accident Medical Center",
        "description": description,
        "url": url || "https://laredocaraccident.com",
        "telephone": "(956) 333-2727",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "8511 McPherson Road, Suite 208",
          "addressLocality": "Laredo",
          "addressRegion": "TX",
          "postalCode": "78045",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.5306,
          "longitude": -99.4803
        },
        "openingHours": [
          "Mo-Fr 08:00-18:00",
          "Sa 09:00-14:00"
        ],
        "medicalSpecialty": [
          "Chiropractic",
          "Pain Management",
          "Diagnostic Imaging"
        ],
        "availableLanguage": ["English", "Spanish"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": lang === 'es' ? "Servicios Médicos" : "Medical Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": lang === 'es' ? "Atención Quiropráctica" : "Chiropractic Care"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": lang === 'es' ? "Manejo del Dolor" : "Pain Management"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalProcedure",
                "name": lang === 'es' ? "Imágenes Diagnósticas" : "Diagnostic Imaging"
              }
            }
          ]
        },
        "areaServed": {
          "@type": "City",
          "name": "Laredo",
          "containedInPlace": {
            "@type": "State",
            "name": "Texas"
          }
        }
      };

      const script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    addStructuredData();

    // Set HTML lang attribute
    document.documentElement.lang = lang;

    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url || window.location.href;

    // Add hreflang for bilingual support
    const addHreflangLinks = () => {
      // Remove existing hreflang links
      const existingHreflangLinks = document.querySelectorAll('link[hreflang]');
      existingHreflangLinks.forEach(link => link.remove());

      const baseUrl = url || window.location.origin;
      
      // Add hreflang for English
      const enLink = document.createElement('link');
      enLink.rel = 'alternate';
      enLink.hreflang = 'en';
      enLink.href = `${baseUrl}?lang=en`;
      document.head.appendChild(enLink);

      // Add hreflang for Spanish
      const esLink = document.createElement('link');
      esLink.rel = 'alternate';
      esLink.hreflang = 'es';
      esLink.href = `${baseUrl}?lang=es`;
      document.head.appendChild(esLink);

      // Add x-default
      const defaultLink = document.createElement('link');
      defaultLink.rel = 'alternate';
      defaultLink.hreflang = 'x-default';
      defaultLink.href = baseUrl;
      document.head.appendChild(defaultLink);
    };

    addHreflangLinks();

  }, [title, description, keywords, lang, image, url]);
};