# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual React/TypeScript medical center website for car accident treatment in Laredo, TX. Features multi-step forms, blog system, and comprehensive accessibility support. Built with Create React App, Styled Components, Framer Motion, and react-i18next for internationalization.

## Project Structure

```
laredo-car-accident/
├── frontend/              # React application
├── tools/                 # Article management tools (placeholder)
├── package.json          # Root configuration
└── CLAUDE.md            # This file
```

## Development Commands

```bash
# Development
npm start                    # Start development server at localhost:3000
npm run build               # Production build (creates build/ folder)
npm test                    # Run test suite
npm test -- --watchAll     # Run tests in watch mode
npm test ComponentName      # Run specific test file

# No linting commands configured - uses Create React App defaults
```

## Architecture Overview

### State Management Pattern
- No global state library (Redux/Zustand) - uses React state and custom hooks
- Form state managed locally with react-hook-form integration
- Navigation state handled in App.tsx with simple string-based routing

### Styling Architecture
- **Dual CSS approach**: CSS Variables (globals.css) + Styled Components
- Design system defined in CSS custom properties in globals.css:5-107
- Component-level styling with styled-components throughout
- Responsive design with mobile-first breakpoints

### Form System Architecture
- Multi-step forms using custom `useMultiStepForm` hook
- **PatientModal**: 3-step intake (Contact → Accident → Assessment)
- **AttorneyModal**: 3-step referral process
- Real-time validation with error state management
- Form submission currently mocked (PatientModal.tsx:458)

### Blog System Architecture
- Article data in `public/data/articles/` JSON files
- In-page expansion rather than routing
- Categories: Treatment, Legal, Recovery
- Search and filtering with `useBlogExpansion` hook

### SEO & Accessibility
- Custom `useSEO` hook for dynamic meta tags
- Comprehensive accessibility features (skip links, ARIA labels, keyboard nav)
- High contrast and reduced motion support
- Screen reader compatibility throughout

### Internationalization Structure
- react-i18next with namespace organization
- Translation files: `src/i18n/en.json` and `src/i18n/es.json`
- Language persistence in localStorage
- Dynamic SEO content based on language (App.tsx:27-38)

## Key Architectural Decisions

### Navigation
- Custom string-based routing in App.tsx instead of React Router
- Simple page state management with `currentPage` state
- LegalPage component for terms/privacy (renders conditionally)

### Animation System
- Framer Motion with predefined variants in UIComponents.tsx
- Accessibility-aware animations (respects prefers-reduced-motion)
- Staggered animations for list items and cards

### Form Data Flow
1. Form state managed locally in modal components
2. Validation on step navigation and submission
3. Phone number formatting with custom logic
4. Multi-select checkboxes for pain location assessment
5. Conditional fields (attorney info shown when hasAttorney === 'yes')

### Bilingual Implementation
- Language detection and persistence
- Dynamic document.documentElement.lang updates
- Both UI text and SEO content translated
- Hardcoded emergency phone number (956) 333-2727 needs externalization

## Critical Files

- **App.tsx:21-102** - Main app logic, navigation, SEO setup
- **PatientModal.tsx:360-886** - Complex multi-step form with validation
- **UIComponents.tsx** - Shared styled components and animation variants
- **globals.css:1-337** - Complete design system and CSS variables
- **src/i18n/** - Translation system setup and content

## Production Considerations

- Build output: ~192KB gzipped (reasonable for feature set)
- Form submission needs backend integration (currently mocked)
- Emergency contact number hardcoded in ModernHero.tsx:404
- No error boundary or loading states implemented
- Blog system designed for JSON data (could integrate with headless CMS)