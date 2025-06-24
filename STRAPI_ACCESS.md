# How to Access Strapi Admin Panel

## Local Development Access

### 1. Start Your Strapi Backend
```bash
cd laredo-car-accident/backend
npm run develop
```

### 2. Access Admin Panel
- **URL**: `http://localhost:1337/admin`
- **Default Port**: 1337
- **Admin Path**: `/admin`

### 3. First Time Setup
If this is your first time accessing Strapi, you'll need to create an admin account:
1. Navigate to `http://localhost:1337/admin`
2. Fill out the registration form:
   - First Name
   - Last Name
   - Email
   - Password (min 8 characters)
3. Click "Let's start"

### 4. Login to Existing Account
If you already have an admin account:
1. Go to `http://localhost:1337/admin`
2. Enter your email and password
3. Click "Sign in"

## Production Access

### After Deployment to Vercel
- **Frontend**: `https://laredocaraccident.com`
- **Backend Admin**: `https://your-backend-url.vercel.app/admin`

Replace `your-backend-url` with your actual Vercel backend deployment URL.

## Content Management

### Available Content Types:
1. **Articles** - Blog posts and medical articles
2. **Categories** - Article categories
3. **Authors** - Article authors  
4. **Tags** - Article tags
5. **FAQs** - Frequently asked questions
6. **Services** - Medical services offered
7. **Physicians** - Doctor profiles

### Managing Content:
1. Click on any content type in the left sidebar
2. Click "Create new entry" to add content
3. Fill out the required fields
4. Click "Save" to save as draft
5. Click "Publish" to make content live

### Important Notes:
- Content must be **published** (not just saved) to appear on the frontend
- The `publishDate` field controls when articles appear on the website
- Articles are automatically filtered by publish date on the frontend

## API Access

### API Endpoints:
- **Articles**: `http://localhost:1337/api/articles`
- **Categories**: `http://localhost:1337/api/categories`
- **FAQs**: `http://localhost:1337/api/faqs`

### Making API Calls Public:
1. Go to Settings → Users & Permissions plugin → Roles
2. Click on "Public" role
3. Under each content type, check the permissions you want to allow
4. Common permissions: `find`, `findOne`
5. Click "Save"

## Browser Extensions

### Strapi Admin Tools (Optional):
While there's no specific Strapi browser extension, you can:

1. **Bookmark the Admin Panel**:
   - Add `http://localhost:1337/admin` to bookmarks
   - Create a bookmark folder for "Development Tools"

2. **Use Browser Developer Tools**:
   - Press F12 to open developer tools
   - Use Network tab to monitor API calls
   - Use Console to debug any issues

3. **JSON Viewer Extensions**:
   - Install "JSON Viewer" or "JSONView" browser extension
   - Makes API responses easier to read when visiting API endpoints directly

## Troubleshooting

### Can't Access Admin Panel?
1. Make sure backend is running: `npm run develop`
2. Check if port 1337 is available
3. Try clearing browser cache
4. Check console for any errors

### Forgot Password?
Currently, password reset needs to be done manually in the database or by creating a new admin user.

### Content Not Showing on Frontend?
1. Make sure content is **published** (not just saved)
2. Check the `publishDate` field
3. Verify API permissions in Strapi admin
4. Check browser console for API errors

## Quick Access Commands

```bash
# Start backend (from project root)
cd laredo-car-accident/backend && npm run develop

# Start frontend (from project root) 
cd laredo-car-accident/frontend && npm start

# Access URLs
# Frontend: http://localhost:3000
# Strapi Admin: http://localhost:1337/admin
# API: http://localhost:1337/api
``` 