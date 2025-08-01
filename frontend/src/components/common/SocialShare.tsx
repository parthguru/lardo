import React from 'react';
import styled from 'styled-components';

const ShareContainer = styled.div`
  display: flex;
  gap: var(--space-sm);
  align-items: center;
  margin: var(--space-md) 0;
`;

const ShareLabel = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin-right: var(--space-sm);
`;

const ShareButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  color: var(--color-white);
  text-decoration: none;
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
  
  &.facebook {
    background-color: #1877F2;
    
    &:hover {
      background-color: #166FE5;
    }
  }
  
  &.twitter {
    background-color: #1DA1F2;
    
    &:hover {
      background-color: #1A91DA;
    }
  }
  
  &.linkedin {
    background-color: #0077B5;
    
    &:hover {
      background-color: #006BA1;
    }
  }
  
  &.whatsapp {
    background-color: #25D366;
    
    &:hover {
      background-color: #22C55E;
    }
  }
  
  .icon {
    font-size: var(--font-size-lg);
  }
`;

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : 'https://laredocaraccident.com',
  title = 'Laredo Car Accident Medical Center - Expert Treatment',
  description = 'Expert car accident treatment in Laredo, Texas. Comprehensive chiropractic care, pain management & diagnostic imaging.',
  hashtags = ['CarAccident', 'LaredoTX', 'ChiropracticCare', 'PainManagement'],
  className
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.map(tag => `#${tag}`).join(',');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtags.join(',')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`
  };

  const handleShare = (platform: string, shareUrl: string) => {
    // Track social sharing for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: platform,
        content_type: 'article',
        item_id: url
      });
    }

    // Open share dialog
    const width = 600;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      shareUrl,
      'share',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );
  };

  return (
    <ShareContainer className={className}>
      <ShareLabel>Share:</ShareLabel>
      
      <ShareButton
        className="facebook"
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        onClick={(e) => {
          e.preventDefault();
          handleShare('facebook', shareLinks.facebook);
        }}
      >
        <span className="icon">📘</span>
      </ShareButton>
      
      <ShareButton
        className="twitter"
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        onClick={(e) => {
          e.preventDefault();
          handleShare('twitter', shareLinks.twitter);
        }}
      >
        <span className="icon">🐦</span>
      </ShareButton>
      
      <ShareButton
        className="linkedin"
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        onClick={(e) => {
          e.preventDefault();
          handleShare('linkedin', shareLinks.linkedin);
        }}
      >
        <span className="icon">💼</span>
      </ShareButton>
      
      <ShareButton
        className="whatsapp"
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        onClick={(e) => {
          e.preventDefault();
          handleShare('whatsapp', shareLinks.whatsapp);
        }}
      >
        <span className="icon">📱</span>
      </ShareButton>
    </ShareContainer>
  );
};

export default SocialShare;