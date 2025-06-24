import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'service';
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Car Accident Doctor Laredo TX | Chiropractic Care & Pain Management | LOP Accepted",
  description = "Expert car accident treatment in Laredo, Texas. Comprehensive chiropractic care, pain management & diagnostic imaging. Letter of Protection accepted. Bilingual staff. Call (956) 333-2727 for immediate care.",
  keywords = "car accident doctor Laredo, chiropractor Laredo TX, auto injury treatment, Letter of Protection, bilingual medical care, Webb County",
  canonical,
  image = "/images/laredo-car-accident-medical-center.jpg",
  type = "website",
  articleData,
  noindex = false,
  structuredData
}) => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://laredocaraccident.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : `${siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  // Enhanced title with proper US English formatting
  const enhancedTitle = title.length <= 60 ? title : title.substring(0, 57) + '...';
  
  // Enhanced description with US English and local Laredo context
  const enhancedDescription = description.length <= 160 ? description : description.substring(0, 157) + '...';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{enhancedTitle}</title>
      <meta name="description" content={enhancedDescription} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots & Indexing */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Language & Location */}
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="Laredo, Texas" />
      <meta name="geo.position" content="27.5306;-99.4803" />
      <meta name="ICBM" content="27.5306, -99.4803" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={enhancedTitle} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content="Laredo Car Accident Medical Center" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && articleData && (
        <>
          {articleData.publishedTime && (
            <meta property="article:published_time" content={articleData.publishedTime} />
          )}
          {articleData.modifiedTime && (
            <meta property="article:modified_time" content={articleData.modifiedTime} />
          )}
          {articleData.author && (
            <meta property="article:author" content={articleData.author} />
          )}
          {articleData.section && (
            <meta property="article:section" content={articleData.section} />
          )}
          {articleData.tags && articleData.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={enhancedTitle} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Business & Medical specific */}
      <meta name="rating" content="4.8" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="target" content="car accident victims, auto injury patients, Laredo Texas residents" />
      <meta name="DC.title" content={enhancedTitle} />
      <meta name="DC.description" content={enhancedDescription} />
      <meta name="DC.subject" content="Car Accident Treatment, Chiropractic Care, Pain Management, Laredo Texas" />
      <meta name="DC.coverage" content="Laredo, Texas, Webb County" />
      <meta name="DC.type" content="Medical Service" />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content={fullCanonical} />
      <meta name="DC.language" content="en-US" />
      
      {/* Medical & Healthcare specific */}
      <meta name="medical.condition" content="Car Accident Injuries, Whiplash, Back Pain, Neck Pain" />
      <meta name="medical.treatment" content="Chiropractic Care, Pain Management, Diagnostic Imaging" />
      <meta name="medical.location" content="Laredo, Texas" />
      <meta name="medical.insurance" content="Letter of Protection, Most Insurance Plans Accepted" />
      
      {/* Local Business */}
      <meta name="business.hours" content="Monday-Friday 8:00AM-6:00PM, Saturday 9:00AM-2:00PM" />
      <meta name="business.phone" content="(956) 333-2727" />
      <meta name="business.address" content="8511 McPherson Road, Suite 208, Laredo, TX 78045" />
      <meta name="business.type" content="Medical Center" />
      
      {/* Additional SEO Tags */}
      <meta name="revisit-after" content="7 days" />
      <meta name="expires" content="never" />
      <meta name="pragma" content="no-cache" />
      <meta name="cache-control" content="no-cache" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;