import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Modern Card Component
export const Card = styled(motion.div)<{ variant?: 'default' | 'elevated' | 'glass' }>`
  background: ${props => {
    switch (props.variant) {
      case 'elevated':
        return 'var(--gradient-card)';
      case 'glass':
        return 'rgba(255, 255, 255, 0.25)';
      default:
        return 'var(--color-white)';
    }
  }};
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-gray-200);
  transition: var(--transition-default);
  position: relative;
  overflow: hidden;

  ${props => props.variant === 'glass' && `
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-2xl);
  }

  @media (max-width: 768px) {
    padding: var(--space-4);
    border-radius: var(--radius-xl);
  }
`;

// Modern Button Components
export const Button = styled(motion.button)<{ 
  variant?: 'primary' | 'secondary' | 'ghost' | 'emergency';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-family-display);
  font-weight: 600;
  text-decoration: none;
  border: none;
  border-radius: var(--radius-xl);
  transition: var(--transition-default);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  /* Size variants */
  ${props => {
    switch (props.size) {
      case 'sm':
        return `
          padding: var(--space-2) var(--space-4);
          font-size: var(--font-size-sm);
          min-height: 36px;
        `;
      case 'lg':
        return `
          padding: var(--space-4) var(--space-8);
          font-size: var(--font-size-lg);
          min-height: 56px;
        `;
      case 'xl':
        return `
          padding: var(--space-5) var(--space-10);
          font-size: var(--font-size-xl);
          min-height: 64px;
        `;
      default:
        return `
          padding: var(--space-3) var(--space-6);
          font-size: var(--font-size-base);
          min-height: 44px;
        `;
    }
  }}

  /* Color variants */
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: var(--gradient-cta);
          color: var(--color-white);
          box-shadow: var(--shadow-lg);
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: var(--shadow-xl);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'emergency':
        return `
          background: var(--gradient-emergency);
          color: var(--color-white);
          box-shadow: var(--shadow-lg);
          
          &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: var(--shadow-xl);
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: var(--color-primary-600);
          border: 2px solid var(--color-primary-200);
          
          &:hover:not(:disabled) {
            background: var(--color-primary-50);
            border-color: var(--color-primary-300);
          }
        `;
      default:
        return `
          background: var(--color-white);
          color: var(--color-primary-600);
          border: 2px solid var(--color-primary-500);
          
          &:hover:not(:disabled) {
            background: var(--color-primary-50);
            transform: translateY(-2px);
          }
        `;
    }
  }}

  ${props => props.fullWidth && 'width: 100%;'}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.3);
  }

  /* Mobile optimizations */
  @media (max-width: 768px) {
    font-size: 16px; /* Prevent zoom on iOS */
    min-height: 44px; /* Touch target requirement */
  }

  /* Touch device optimizations */
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

// Gradient Text Component
export const GradientText = styled.span<{ gradient?: string }>`
  background: ${props => props.gradient || 'var(--gradient-primary)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;

// Modern Input Component
export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid ${props => props.hasError ? 'var(--color-error)' : 'var(--color-gray-300)'};
  border-radius: var(--radius-lg);
  font-size: 16px; /* Prevent zoom on iOS */
  font-family: var(--font-family-body);
  background-color: var(--color-white);
  transition: var(--transition-default);

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? 'var(--color-error)' : 'var(--color-primary-500)'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(220, 38, 38, 0.1)' : 'rgba(44, 90, 160, 0.1)'};
  }

  &::placeholder {
    color: var(--color-gray-400);
  }
`;

// Modern Textarea Component
export const Textarea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 120px;
  padding: var(--space-3) var(--space-4);
  border: 2px solid ${props => props.hasError ? 'var(--color-error)' : 'var(--color-gray-300)'};
  border-radius: var(--radius-lg);
  font-size: 16px;
  font-family: var(--font-family-body);
  background-color: var(--color-white);
  transition: var(--transition-default);
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? 'var(--color-error)' : 'var(--color-primary-500)'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(220, 38, 38, 0.1)' : 'rgba(44, 90, 160, 0.1)'};
  }

  &::placeholder {
    color: var(--color-gray-400);
  }
`;

// Badge Component
export const Badge = styled.span<{ variant?: 'default' | 'success' | 'warning' | 'error' }>`
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 500;
  
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: rgba(16, 185, 129, 0.1);
          color: var(--color-success);
        `;
      case 'warning':
        return `
          background: rgba(245, 158, 11, 0.1);
          color: var(--color-warning);
        `;
      case 'error':
        return `
          background: rgba(220, 38, 38, 0.1);
          color: var(--color-error);
        `;
      default:
        return `
          background: var(--color-primary-100);
          color: var(--color-primary-700);
        `;
    }
  }}
`;

// Section Container
export const Section = styled.section<{ 
  background?: 'white' | 'gray' | 'gradient' | 'primary';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}>`
  width: 100%;
  
  ${props => {
    switch (props.background) {
      case 'gray':
        return 'background: var(--color-gray-50);';
      case 'gradient':
        return 'background: var(--gradient-hero);';
      case 'primary':
        return 'background: var(--color-primary-600);';
      default:
        return 'background: var(--color-white);';
    }
  }}

  ${props => {
    switch (props.padding) {
      case 'sm':
        return 'padding: var(--space-12) 0;';
      case 'lg':
        return 'padding: var(--space-24) 0;';
      case 'xl':
        return 'padding: var(--space-32) 0;';
      default:
        return 'padding: var(--space-16) 0;';
    }
  }}

  @media (max-width: 768px) {
    ${props => {
      switch (props.padding) {
        case 'sm':
          return 'padding: var(--space-8) 0;';
        case 'lg':
          return 'padding: var(--space-16) 0;';
        case 'xl':
          return 'padding: var(--space-20) 0;';
        default:
          return 'padding: var(--space-12) 0;';
      }
    }}
  }
`;

// Container Component
export const Container = styled.div<{ 
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  center?: boolean;
}>`
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-4);

  ${props => {
    switch (props.size) {
      case 'sm':
        return 'max-width: var(--breakpoint-sm);';
      case 'md':
        return 'max-width: var(--breakpoint-md);';
      case 'lg':
        return 'max-width: var(--breakpoint-lg);';
      case 'xl':
        return 'max-width: var(--breakpoint-xl);';
      case '2xl':
        return 'max-width: var(--breakpoint-2xl);';
      default:
        return 'max-width: 1200px;';
    }
  }}

  ${props => props.center && 'text-align: center;'}

  @media (min-width: 640px) {
    padding: 0 var(--space-6);
  }

  @media (min-width: 768px) {
    padding: 0 var(--space-8);
  }

  @media (min-width: 1024px) {
    padding: 0 var(--space-12);
  }
`;

// Grid Component
export const Grid = styled.div<{ 
  cols?: number;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}>`
  display: grid;
  grid-template-columns: ${props => 
    props.responsive 
      ? `repeat(auto-fit, minmax(300px, 1fr))`
      : `repeat(${props.cols || 1}, 1fr)`
  };
  
  ${props => {
    switch (props.gap) {
      case 'sm':
        return 'gap: var(--space-4);';
      case 'lg':
        return 'gap: var(--space-8);';
      case 'xl':
        return 'gap: var(--space-12);';
      default:
        return 'gap: var(--space-6);';
    }
  }}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
`;

// Flex Component
export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => {
    switch (props.align) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'stretch': return 'stretch';
      default: return 'center';
    }
  }};
  justify-content: ${props => {
    switch (props.justify) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'between': return 'space-between';
      case 'around': return 'space-around';
      default: return 'center';
    }
  }};
  
  ${props => {
    switch (props.gap) {
      case 'sm':
        return 'gap: var(--space-2);';
      case 'lg':
        return 'gap: var(--space-6);';
      case 'xl':
        return 'gap: var(--space-8);';
      default:
        return 'gap: var(--space-4);';
    }
  }}

  ${props => props.wrap && 'flex-wrap: wrap;'}
`;

// Icon Component
export const Icon = styled.span<{ size?: 'sm' | 'md' | 'lg' | 'xl' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return 'font-size: var(--font-size-lg);';
      case 'lg':
        return 'font-size: var(--font-size-3xl);';
      case 'xl':
        return 'font-size: var(--font-size-4xl);';
      default:
        return 'font-size: var(--font-size-2xl);';
    }
  }}
`;

// Loading Spinner
export const Spinner = styled.div<{ size?: 'sm' | 'md' | 'lg' }>`
  border: 2px solid var(--color-gray-200);
  border-top: 2px solid var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  ${props => {
    switch (props.size) {
      case 'sm':
        return 'width: 16px; height: 16px;';
      case 'lg':
        return 'width: 32px; height: 32px;';
      default:
        return 'width: 24px; height: 24px;';
    }
  }}

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Progress Bar
export const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 8px;
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: var(--gradient-cta);
    border-radius: var(--radius-full);
    transition: width var(--transition-default);
  }
`;

// Tooltip Component
export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  
  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: var(--space-2) var(--space-3);
    background: var(--color-gray-900);
    color: var(--color-white);
    font-size: var(--font-size-sm);
    border-radius: var(--radius-lg);
    white-space: nowrap;
    z-index: var(--z-tooltip);
    margin-bottom: var(--space-2);
  }
`;

// Animation Wrappers
export const FadeInUp = styled(motion.div)``;
export const FadeIn = styled(motion.div)``;
export const SlideInLeft = styled(motion.div)``;
export const SlideInRight = styled(motion.div)``;

// Animation variants for consistent animations
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};