# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual React/TypeScript + Strapi CMS monorepo for car accident medical center in Laredo, TX. Features multi-step forms, dynamic blog system with Strapi CMS, and comprehensive accessibility support. Built with Create React App, Styled Components, Framer Motion, react-i18next, and Strapi v5.

## Monorepo Structure

```
laredo-car-accident/
├── frontend/              # React application
├── backend/               # Strapi CMS
├── server.js             # Production proxy server
├── package.json          # Root monorepo configuration
└── CLAUDE.md            # This file
```

## Development Commands

```bash
# Monorepo commands (run from root)
npm run dev                 # Start both frontend and Strapi concurrently
npm run setup              # Install all dependencies and build everything
npm run build              # Build both frontend and backend for production
npm start                  # Start production server (serves both frontend + Strapi)

# Frontend only (run from root or frontend/)
npm run frontend:dev       # Start React dev server at localhost:3000
npm run frontend:build     # Production build (creates build/ folder)
cd frontend && npm test    # Run test suite

# Backend/Strapi only (run from root or backend/)
npm run backend:dev        # Start Strapi in development mode at localhost:1337
npm run strapi:dev         # Alias for backend:dev
npm run backend:build      # Build Strapi admin panel for production

# Production deployment
npm run start:production   # Start both Strapi and production proxy server
```

## Architecture Overview

### Content Management System
- **Strapi CMS** in `backend/` directory provides API for blog content
- **Content Types**: Article, Category, Author, Tag with bilingual support
- **Admin Panel**: Available at `/admin` in production
- **API Endpoints**: Available at `/api` with i18n support

### Frontend Integration
- **API Service**: `frontend/src/services/strapiApi.ts` handles all Strapi communication
- **Fallback System**: Uses local data when Strapi unavailable (`fallbackData.ts`)
- **Blog Service**: `frontend/src/services/blogService.ts` provides unified data interface
- **Environment Config**: `frontend/.env` contains Strapi URL configuration

### Blog System Architecture
- **Dynamic Content**: Fetched from Strapi API with search/filter/pagination
- **Bilingual Support**: Content automatically switches based on i18n language
- **Fallback Mode**: Gracefully degrades to static data if Strapi unavailable
- **In-Page Expansion**: Maintains original one-page design pattern
- **Real-time Updates**: Content managed through Strapi admin panel

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