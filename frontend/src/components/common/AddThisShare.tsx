import React, { useEffect } from 'react';
import styled from 'styled-components';

const AddThisContainer = styled.div`
  margin: var(--space-lg) 0;
  display: flex;
  justify-content: center;
  
  .addthis_inline_share_toolbox {
    width: 100% !important;
    max-width: 400px;
  }
  
  .addthis_default_style .addthis_separator {
    margin: 0 5px;
  }
  
  /* Customize AddThis appearance */
  .at-share-btn {
    border-radius: var(--radius-md) !important;
    transition: all var(--transition-fast) !important;
    
    &:hover {
      transform: translateY(-2px) !important;
      box-shadow: var(--shadow-md) !important;
    }
  }
`;

const FallbackShare = styled.div`
  display: flex;
  gap: var(--space-sm);
  justify-content: center;
  align-items: center;
  
  .share-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    margin-right: var(--space-sm);
  }
  
  .share-btn {
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
    
    &.facebook {
      background-color: #1877F2;
    }
    
    &.twitter {
      background-color: #1DA1F2;
    }
    
    &.linkedin {
      background-color: #0077B5;
    }
    
    &.whatsapp {
      background-color: #25D366;
    }
    
    &.email {
      background-color: #34495e;
    }
    
    .icon {
      font-size: var(--font-size-lg);
    }
  }
`;

interface AddThisShareProps {
  url?: string;
  title?: string;
  description?: string;
  pubid?: string; // AddThis publisher ID
  className?: string;
  showFallback?: boolean;
}

const AddThisShare: React.FC<AddThisShareProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : 'https://laredocaraccident.com',
  title = 'Laredo Car Accident Medical Center - Expert Treatment',
  description = 'Expert car accident treatment in Laredo, Texas. Comprehensive chiropractic care, pain management & diagnostic imaging.',
  pubid = 'ra-YOUR-ADDTHIS-ID', // Replace with actual AddThis publisher ID
  className,
  showFallback = true
}) => {
  useEffect(() => {
    // Load AddThis script
    if (typeof window !== 'undefined' && !window.addthis) {
      const script = document.createElement('script');
      script.src = `//s7.addthis.com/js/300/addthis_widget.js#pubid=${pubid}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (window.addthis) {
          window.addthis.init();
        }
      };

      return () => {
        // Cleanup
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    } else if (window.addthis) {
      // Re-initialize if AddThis is already loaded
      window.addthis.init();
    }
  }, [pubid]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription} ${url}`
  };

  const handleShare = (platform: string, shareUrl: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: platform,
        content_type: 'page',
        item_id: url
      });
    }

    // Open share dialog
    if (platform !== 'email') {
      const width = 600;
      const height = 400;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      
      window.open(
        shareUrl,
        'share',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );
    } else {
      window.location.href = shareUrl;
    }
  };

  return (
    <AddThisContainer className={className}>
      {/* AddThis Inline Share Toolbox */}
      <div 
        className="addthis_inline_share_toolbox"
        data-url={url}
        data-title={title}
        data-description={description}
      ></div>
      
      {/* Fallback social sharing buttons */}
      {showFallback && (
        <FallbackShare style={{ display: 'none' }} id="fallback-share">
          <span className="share-label">Share:</span>
          
          <a
            href={shareUrls.facebook}
            className="share-btn facebook"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            onClick={(e) => {
              e.preventDefault();
              handleShare('facebook', shareUrls.facebook);
            }}
          >
            <span className="icon">📘</span>
          </a>
          
          <a
            href={shareUrls.twitter}
            className="share-btn twitter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            onClick={(e) => {
              e.preventDefault();
              handleShare('twitter', shareUrls.twitter);
            }}
          >
            <span className="icon">🐦</span>
          </a>
          
          <a
            href={shareUrls.linkedin}
            className="share-btn linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            onClick={(e) => {
              e.preventDefault();
              handleShare('linkedin', shareUrls.linkedin);
            }}
          >
            <span className="icon">💼</span>
          </a>
          
          <a
            href={shareUrls.whatsapp}
            className="share-btn whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            onClick={(e) => {
              e.preventDefault();
              handleShare('whatsapp', shareUrls.whatsapp);
            }}
          >
            <span className="icon">📱</span>
          </a>
          
          <a
            href={shareUrls.email}
            className="share-btn email"
            aria-label="Share via Email"
            onClick={(e) => {
              e.preventDefault();
              handleShare('email', shareUrls.email);
            }}
          >
            <span className="icon">✉️</span>
          </a>
        </FallbackShare>
      )}
    </AddThisContainer>
  );
};

// Add type declarations for AddThis
declare global {
  interface Window {
    addthis?: {
      init: () => void;
      update: (config: string, url: string, title: string) => void;
      toolbox: (selector: string) => void;
    };
  }
}

export default AddThisShare;