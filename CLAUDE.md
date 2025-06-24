# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual React/TypeScript medical center website for car accident treatment in Laredo, TX. Features multi-step forms, JSON-based blog system with article management tools, and comprehensive accessibility support. Built with Create React App, Styled Components, Framer Motion, and react-i18next for internationalization.

## Project Structure

```
laredo-car-accident/
├── frontend/              # React application
├── tools/                 # Article management tools
├── package.json          # Root configuration
└── CLAUDE.md            # This file
```

## Development Commands

```bash
# Development
npm run dev                 # Start React dev server at localhost:3000
npm run build              # Production build (creates build/ folder)
npm test                   # Run test suite

# Article Management
npm run new-article         # Create new article (interactive)
npm run batch-articles      # Create multiple articles from templates
npm run preview-article     # Preview article before publishing

# Setup
npm run install:frontend    # Install frontend dependencies
```

## Architecture Overview

### Article Management System
- **JSON-Based**: Articles stored as JSON files in `frontend/public/data/articles/`
- **Bilingual Support**: Each article contains English and Spanish content
- **Article Tools**: Interactive CLI tools for creating and managing content
- **Auto-Translation**: Basic Spanish translation for common terms
- **SEO Optimized**: Automatic meta tags, keywords, and structured data

### Blog System Architecture
- **Static Content**: Fast loading from CDN-served JSON files
- **Bilingual Support**: Content automatically switches based on i18n language
- **Search & Filter**: Client-side filtering by category, keywords, and featured status
- **In-Page Expansion**: Maintains original one-page design pattern
- **Article Creator**: Simple tools for non-technical content creation

### Form System Architecture (Unchanged)
- Multi-step forms using custom `useMultiStepForm` hook
- **PatientModal**: 3-step intake (Contact → Accident → Assessment)
- **AttorneyModal**: 3-step referral process
- Real-time validation with error state management
- Form submission currently mocked (PatientModal.tsx:458)

### Styling Architecture (Unchanged)
- **Dual CSS approach**: CSS Variables (globals.css) + Styled Components
- Design system defined in CSS custom properties in globals.css:5-107
- Component-level styling with styled-components throughout
- Responsive design with mobile-first breakpoints

### Navigation & State (Unchanged)
- Custom string-based routing in App.tsx instead of React Router
- Simple page state management with `currentPage` state
- LegalPage component for terms/privacy (renders conditionally)

### Internationalization Structure (Enhanced)
- react-i18next with namespace organization
- Translation files: `frontend/src/i18n/en.json` and `frontend/src/i18n/es.json`
- Language persistence in localStorage
- Dynamic SEO content based on language (App.tsx:27-38)
- **Strapi Integration**: Content fetched based on current i18n locale

## Content Management

### Adding New Articles
1. Access Strapi admin at `http://localhost:1337/admin` (development) or `/admin` (production)
2. Create/edit articles with bilingual content
3. Assign categories, authors, and tags
4. Publish articles to make them live on the frontend

### Managing Categories & Authors
- **Categories**: Manage in Strapi admin with colors, icons, and display order
- **Authors**: Add medical professionals with credentials and specialties
- **Tags**: Create tags for better content organization

### Environment Configuration
```bash
# Frontend (.env)
REACT_APP_STRAPI_URL=http://localhost:1337  # Development
REACT_APP_STRAPI_URL=http://yourdomain.com  # Production

# Backend (Strapi uses built-in environment handling)
DATABASE_CLIENT=sqlite                       # Development
DATABASE_CLIENT=postgres                     # Production recommended
```

## Deployment Architecture

### Single Domain Deployment
- **Frontend**: Served at `/` (React SPA)
- **Strapi Admin**: Available at `/admin`
- **API**: Available at `/api`
- **Production Server**: `server.js` proxies requests appropriately

### Production Considerations
- Strapi requires separate build step (`npm run backend:build`)
- Frontend optimized build serves static assets
- Proxy server handles routing between frontend and Strapi
- Database should be PostgreSQL for production (currently SQLite for development)

## Key File Changes from Original

- **NEW**: `backend/` - Complete Strapi CMS installation
- **NEW**: `frontend/src/services/strapiApi.ts` - Strapi API integration
- **NEW**: `frontend/src/services/blogService.ts` - Unified blog data service
- **NEW**: `frontend/src/services/fallbackData.ts` - Offline fallback data
- **MODIFIED**: `frontend/src/components/sections/Blog.tsx` - Now uses Strapi API
- **NEW**: `server.js` - Production deployment server
- **NEW**: Root `package.json` - Monorepo configuration

## Migration Status

✅ **Completed**: Strapi setup, content types, API integration, frontend updates
⏳ **Pending**: Content migration, production deployment testing
🔄 **Fallback Active**: System gracefully uses static data when Strapi unavailable

The system maintains 100% compatibility with the original design while adding dynamic content management capabilities.