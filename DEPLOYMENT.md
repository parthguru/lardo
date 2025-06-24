# Deployment Instructions for LaredoCarAccident.com

## Vercel Deployment Setup

### Frontend Deployment (Main Website)

1. **Connect your GitHub repository to Vercel**
2. **Import the project** and use these settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `laredo-car-accident` 
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `cd frontend && npm install`

3. **Environment Variables** (if needed):
   ```
   REACT_APP_STRAPI_URL=https://your-backend-url.vercel.app
   ```

### Backend Deployment (Strapi CMS)

1. **Create a separate Vercel project** for the backend
2. **Use these settings**:
   - **Framework Preset**: Node.js
   - **Root Directory**: `laredo-car-accident/backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=your-database-url
   JWT_SECRET=your-jwt-secret
   API_TOKEN_SALT=your-api-token-salt
   ADMIN_JWT_SECRET=your-admin-jwt-secret
   ```

## Alternative: Separate Repository Strategy

### Option 1: Split the Monorepo (Recommended)

```bash
# Create frontend repository
git subtree push --prefix=laredo-car-accident/frontend origin frontend-only

# Create backend repository  
git subtree push --prefix=laredo-car-accident/backend origin backend-only
```

### Option 2: Deploy with Existing Structure

The `vercel.json` files are already configured to handle the monorepo structure.

## Domain Configuration

1. **Frontend**: Point `laredocaraccident.com` to the frontend Vercel deployment
2. **Backend**: Point `api.laredocaraccident.com` to the backend Vercel deployment

## SEO Considerations

- ✅ **robots.txt** configured to block backend from search engines
- ✅ **Sitemap** included in frontend
- ✅ **Structured data** implemented
- ✅ **Meta tags** optimized for local search

## Post-Deployment Checklist

- [ ] Test frontend deployment
- [ ] Test backend API endpoints
- [ ] Verify robots.txt is working on backend
- [ ] Test sitemap accessibility
- [ ] Verify mobile responsiveness
- [ ] Test contact forms
- [ ] Check analytics integration
- [ ] Verify SEO meta tags
- [ ] Test bilingual functionality

## Troubleshooting

### Build Errors
- Check that all dependencies are installed
- Verify environment variables are set
- Ensure build commands are correct

### API Connection Issues
- Update REACT_APP_STRAPI_URL in frontend
- Check CORS settings in backend
- Verify API endpoints are accessible

### SEO Issues
- Verify meta tags in page source
- Check robots.txt accessibility
- Test structured data with Google's tool 