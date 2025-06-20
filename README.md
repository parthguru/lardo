# LaredoCarAccident.com

A comprehensive, bilingual React application for a car accident medical center in Laredo, Texas. Built with accessibility, SEO, and performance in mind.

## Features

- 🌐 **Bilingual Support**: Full English/Spanish translation with react-i18next
- ♿ **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- 📱 **Responsive Design**: Mobile-first approach with progressive enhancement
- 🚀 **Performance Optimized**: Code splitting, lazy loading, and optimized assets
- 📝 **Multi-step Forms**: Patient and attorney intake forms with validation
- 📖 **Expandable Blog**: In-page article expansion with search and filtering
- 🔍 **SEO Optimized**: Schema markup, meta tags, and structured data
- 🏥 **HIPAA Compliant**: Secure form handling and data protection

## Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Styled Components with CSS Variables
- **Animation**: Framer Motion
- **Forms**: React Hook Form with validation
- **Internationalization**: react-i18next
- **Build Tool**: Create React App

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd laredo-car-accident

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Header, Footer, Navigation
│   ├── sections/        # Page sections (Hero, Services, etc.)
│   ├── blog/           # Blog expansion components
│   └── forms/          # Multi-step form components
├── hooks/              # Custom React hooks
├── i18n/              # Translation files
├── styles/            # Global styles and variables
├── utils/             # Helper functions
└── services/          # API and data handling
```

## Key Components

### Multi-step Forms

- **PatientModal**: 3-step patient intake form
- **AttorneyModal**: 3-step attorney referral form
- Both include real-time validation and accessibility features

### Blog System

- Expandable articles with search and filtering
- Categories: Treatment, Legal, Recovery
- Smooth animations and accessibility support

### SEO Features

- Dynamic meta tags with language support
- Schema.org structured data for medical practice
- Local business optimization
- Canonical URLs and hreflang tags

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios
- Focus management in modals

## Performance Optimizations

- Component lazy loading
- Image optimization
- Code splitting by route
- CSS-in-JS with styled-components
- Font optimization

## Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Environment Variables

Create a `.env` file for environment-specific configuration:

```
REACT_APP_API_URL=your_api_url
REACT_APP_GOOGLE_ANALYTICS_ID=your_ga_id
```

## Content Management

### Adding Blog Articles

Blog articles are currently defined in `src/components/sections/Blog.tsx`. In a production environment, these would typically come from a CMS or API.

### Translation Updates

Update translation files in `src/i18n/`:
- `en.json` - English translations
- `es.json` - Spanish translations

### SEO Content

Update SEO content in the `useSEO` hook calls within components.

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary and confidential.

## Contact

For questions or support, contact the development team.

---

Built with ❤️ for the Laredo community