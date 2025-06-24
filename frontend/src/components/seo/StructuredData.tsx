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
  type: 'localBusiness' | 'medicalProcedure' | 'physician' | 'faq' | 'article';
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
    priceRange: '$$',
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