import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessData {
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: string;
    longitude: string;
  };
  openingHours: string[];
  paymentAccepted: string[];
  currenciesAccepted: string;
  availableLanguage: string[];
  medicalSpecialty: string[];
  serviceArea: {
    geoRadius: string;
  };
}

interface MedicalProcedureData {
  name: string;
  description: string;
  procedureType: string;
  bodyLocation: string[];
  preparation?: string;
  howPerformed?: string;
  recovery?: string;
}

interface PhysicianData {
  name: string;
  medicalSpecialty: string[];
  availableLanguage: string[];
  availableService: Array<{
    name: string;
    description?: string;
  }>;
  yearsExperience?: number;
  education?: string[];
}

interface StructuredDataProps {
  type: 'localBusiness' | 'medicalProcedure' | 'physician' | 'faq' | 'article' | 'service' | 'blog';
  data: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateLocalBusinessSchema = (businessData: LocalBusinessData) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: businessData.name,
    description: businessData.description,
    url: businessData.url,
    telephone: businessData.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessData.address.streetAddress,
      addressLocality: businessData.address.addressLocality,
      addressRegion: businessData.address.addressRegion,
      postalCode: businessData.address.postalCode,
      addressCountry: businessData.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessData.geo.latitude,
      longitude: businessData.geo.longitude,
    },
    openingHours: businessData.openingHours,
    paymentAccepted: businessData.paymentAccepted,
    currenciesAccepted: businessData.currenciesAccepted,
    availableLanguage: businessData.availableLanguage,
    medicalSpecialty: businessData.medicalSpecialty,
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: businessData.geo.latitude,
        longitude: businessData.geo.longitude,
      },
      geoRadius: businessData.serviceArea.geoRadius,
    },
    hasMap: `https://maps.google.com/?q=${businessData.geo.latitude},${businessData.geo.longitude}`,
    areaServed: [
      {
        '@type': 'City',
        name: 'Laredo',
        '@id': 'https://en.wikipedia.org/wiki/Laredo,_Texas',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Webb County',
        '@id': 'https://en.wikipedia.org/wiki/Webb_County,_Texas',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: '$0-$500',
    image: [
      `${window.location.origin}/images/laredo-medical-logo.svg`,
      `${window.location.origin}/logo512.png`,
      `${window.location.origin}/logo192.png`
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${window.location.origin}/images/laredo-medical-logo.svg`,
      width: 160,
      height: 48
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Emergency Care',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Car Accident Emergency Treatment',
                description: 'Immediate medical care for car accident injuries'
              },
              price: '0',
              priceCurrency: 'USD',
              availability: 'InStock',
              acceptedPaymentMethod: ['Insurance', 'LOP', 'Cash']
            }
          ]
        },
        {
          '@type': 'OfferCatalog', 
          name: 'Physical Therapy',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Post-Accident Physical Therapy',
                description: 'Comprehensive rehabilitation services'
              },
              price: '0',
              priceCurrency: 'USD',
              availability: 'InStock',
              acceptedPaymentMethod: ['Insurance', 'LOP', 'Cash']
            }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Diagnostic Services', 
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Medical Imaging & Diagnostics',
                description: 'X-rays, MRI, CT scans for accident injuries'
              },
              price: '0',
              priceCurrency: 'USD',
              availability: 'InStock',
              acceptedPaymentMethod: ['Insurance', 'LOP', 'Cash']
            }
          ]
        }
      ]
    },
  });

  const generateMedicalProcedureSchema = (procedureData: MedicalProcedureData) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: procedureData.name,
    description: procedureData.description,
    procedureType: procedureData.procedureType,
    bodyLocation: procedureData.bodyLocation,
    preparation: procedureData.preparation,
    howPerformed: procedureData.howPerformed,
    followup: procedureData.recovery,
    medicationClass: 'Non-invasive treatment',
    status: 'Available',
  });

  const generatePhysicianSchema = (physicianData: PhysicianData) => ({
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: physicianData.name,
    medicalSpecialty: physicianData.medicalSpecialty,
    availableLanguage: physicianData.availableLanguage,
    hospitalAffiliation: {
      '@type': 'MedicalBusiness',
      name: 'Laredo Car Accident Medical Center',
    },
    availableService: physicianData.availableService.map(service => ({
      '@type': 'MedicalTherapy',
      name: service.name,
      description: service.description,
    })),
    yearsExperience: physicianData.yearsExperience,
    educationalCredentialAwarded: physicianData.education,
  });

  const generateFAQSchema = (faqData: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });

  const generateArticleSchema = (articleData: any) => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    headline: articleData.title,
    description: articleData.excerpt,
    url: `${window.location.origin}/blog/${articleData.slug}`,
    datePublished: articleData.publishDate,
    dateModified: articleData.lastReviewed || articleData.publishDate,
    author: {
      '@type': 'Person',
      name: articleData.author?.name || 'Laredo Car Accident Medical Center',
    },
    publisher: {
      '@type': 'MedicalBusiness',
      name: 'Laredo Car Accident Medical Center',
      url: window.location.origin,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${window.location.origin}/blog/${articleData.slug}`,
    },
    image: articleData.featuredImage?.url,
    wordCount: articleData.wordCount,
    keywords: [articleData.focusKeyword, ...(articleData.localKeywords?.split(',') || [])],
    about: {
      '@type': 'MedicalCondition',
      name: 'Car Accident Injuries',
    },
    audience: {
      '@type': 'PeopleAudience',
      geographicArea: {
        '@type': 'City',
        name: 'Laredo, Texas',
      },
    },
    inLanguage: 'en-US',
  });

  const generateServiceSchema = (serviceData: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceData.name || 'Car Accident Medical Services',
    description: serviceData.description || 'Comprehensive medical care for car accident injuries in Laredo, Texas',
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Laredo Car Accident Medical Center',
      url: window.location.origin,
      telephone: '+19563332727',
      address: {
        '@type': 'PostalAddress',
        streetAddress: serviceData.address?.streetAddress || '1234 Medical Center Blvd',
        addressLocality: 'Laredo',
        addressRegion: 'TX',
        postalCode: serviceData.address?.postalCode || '78041',
        addressCountry: 'US'
      },
      image: `${window.location.origin}/images/laredo-medical-logo.svg`
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Laredo'
      },
      {
        '@type': 'AdministrativeArea', 
        name: 'Webb County'
      }
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      availableLanguage: ['en', 'es'],
      serviceType: 'Emergency Medical Care',
      serviceLocation: {
        '@type': 'Place',
        name: 'Laredo Car Accident Medical Center',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Laredo',
          addressRegion: 'TX'
        }
      }
    },
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Treatment covered by insurance and LOP (Letter of Protection)',
        acceptedPaymentMethod: [
          'http://purl.org/goodrelations/v1#ByInvoice',
          'http://purl.org/goodrelations/v1#Cash',
          'http://purl.org/goodrelations/v1#PayPal'
        ],
        availability: 'http://schema.org/InStock'
      }
    ],
    serviceType: [
      'Emergency Medical Care',
      'Physical Therapy', 
      'Pain Management',
      'Diagnostic Imaging',
      'Rehabilitation Services',
      'Chiropractic Care'
    ],
    category: 'Medical Services',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical Services for Car Accident Victims',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalTherapy',
            name: 'Whiplash Treatment',
            medicalSpecialty: 'Physical Therapy'
          },
          price: '0',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalTherapy', 
            name: 'Back Injury Rehabilitation',
            medicalSpecialty: 'Physical Therapy'
          },
          price: '0',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'MedicalTest',
            name: 'X-Ray Diagnostic Imaging',
            medicalSpecialty: 'Radiology'
          },
          price: '0', 
          priceCurrency: 'USD'
        }
      ]
         }
   });

  const generateBlogSchema = (blogData: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: blogData.name || 'Car Accident Medical Information Blog',
    description: blogData.description || 'Expert medical advice and information about car accident injuries, treatment options, and recovery tips from Laredo Car Accident Medical Center.',
    url: `${window.location.origin}/#blog`,
    publisher: {
      '@type': 'MedicalBusiness',
      name: 'Laredo Car Accident Medical Center',
      url: window.location.origin,
      logo: {
        '@type': 'ImageObject',
        url: `${window.location.origin}/images/laredo-medical-logo.svg`,
        width: 160,
        height: 48
      },
      telephone: '+19563332727',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '8511 McPherson Road, Suite 208',
        addressLocality: 'Laredo',
        addressRegion: 'TX',
        postalCode: '78045',
        addressCountry: 'US'
      }
    },
    inLanguage: ['en-US', 'es-US'],
    audience: {
      '@type': 'PeopleAudience',
      geographicArea: [
        {
          '@type': 'City',
          name: 'Laredo, Texas'
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Webb County, Texas'
        }
      ]
    },
    about: [
      {
        '@type': 'MedicalCondition',
        name: 'Car Accident Injuries'
      },
      {
        '@type': 'MedicalSpecialty',
        name: 'Auto Injury Treatment'
      },
      {
        '@type': 'MedicalTherapy',
        name: 'Physical Therapy'
      },
      {
        '@type': 'MedicalSpecialty',
        name: 'Chiropractic Care'
      }
    ],
    blogPost: blogData.articles?.map((article: any) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      url: `${window.location.origin}/#blog`,
      datePublished: article.publishDate || new Date().toISOString(),
      dateModified: article.lastReviewed || article.publishDate || new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: article.author?.name || 'Dr. Medical Expert',
        jobTitle: 'Medical Professional',
        worksFor: {
          '@type': 'MedicalBusiness',
          name: 'Laredo Car Accident Medical Center'
        }
      },
      publisher: {
        '@type': 'MedicalBusiness',
        name: 'Laredo Car Accident Medical Center',
        logo: {
          '@type': 'ImageObject',
          url: `${window.location.origin}/images/laredo-medical-logo.svg`
        }
      },
      mainEntityOfPage: {
        '@type': 'MedicalWebPage',
        '@id': `${window.location.origin}/#blog`
      },
      image: article.featuredImage?.url || `${window.location.origin}/images/laredo-medical-logo.svg`,
      keywords: [
        article.focusKeyword,
        ...(article.localKeywords?.split(',') || []),
        'car accident medical care',
        'Laredo medical treatment',
        'auto injury recovery'
      ].filter(Boolean),
      wordCount: article.wordCount || 800,
      about: {
        '@type': 'MedicalCondition',
        name: article.category || 'Car Accident Injuries'
      },
      audience: {
        '@type': 'PeopleAudience',
        geographicArea: {
          '@type': 'City',
          name: 'Laredo, Texas'
        }
      },
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      genre: 'Medical Information',
      articleSection: article.category || 'Medical Treatment'
    })) || []
  });

  const getSchema = () => {
    switch (type) {
      case 'localBusiness':
        return generateLocalBusinessSchema(data);
      case 'medicalProcedure':
        return generateMedicalProcedureSchema(data);
      case 'physician':
        return generatePhysicianSchema(data);
      case 'faq':
        return generateFAQSchema(data);
      case 'article':
        return generateArticleSchema(data);
      case 'service':
        return generateServiceSchema(data);
      case 'blog':
        return generateBlogSchema(data);
      default:
        return null;
    }
  };

  const schema = getSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;