# Astro Frontend API Fixes

## Issues Fixed

### 1. Wrong API Port
- **Problem**: API client was using `http://localhost:8787` (old SonicJS default)
- **Fix**: Changed to `http://localhost:8788` (your development port)
- **File**: `www/src/lib/api.ts`

### 2. Wrong Collection Name
- **Problem**: Trying to fetch `blog-posts` (with hyphen)
- **Fix**: Changed to `blog_posts` (with underscore) - matches your CMS
- **File**: `www/src/lib/api.ts`

### 3. Wrong Response Structure
- **Problem**: Looking for `data.items` array
- **Fix**: Changed to `data.data` array (actual SonicJS response format)
- **File**: `www/src/lib/api.ts`

### 4. Missing Projects Collection
- **Problem**: Projects collection doesn't exist yet, was throwing error
- **Fix**: Added graceful handling for 404 with warning message
- **Result**: Site works even without projects collection

## Testing Results

### Backend API (Port 8788)
```bash
curl http://localhost:8788/api/collections
# ✅ Returns 3 collections: pages, news, blog_posts

curl http://localhost:8788/api/collections/blog_posts/content
# ✅ Returns empty array (no posts yet, but endpoint works)
```

### Frontend (Port 4321)
```bash
npm run dev:www
# ✅ Site loads without errors
# ⚠️ Empty state (no blog posts or projects yet - expected)
```

## Next Steps

### 1. Create Projects Collection
Go to: `http://localhost:8788/admin/collections/new`

Create collection with these fields:
- **Name**: `projects` (no underscore needed)
- **Display Name**: Projects
- **Schema**:
  - title (string, required)
  - slug (slug, required)
  - description (textarea)
  - content (quill/richtext, required)
  - featured_image (media)
  - project_url (string)
  - github_url (string)
  - tech_stack (string)
  - category (select: web-app, api, library, tool, experiment)
  - is_featured (boolean)
  - published_at (datetime)
  - status (select: draft, published, archived)

### 2. Add Sample Content
Create at least one blog post and one project to test the frontend display.

### 3. Commit Changes
```bash
git add www/src/lib/api.ts
git commit -m "fix: correct API client port and collection names"
git push origin main
```

## Status
✅ **Frontend now working correctly with backend**
- No more API errors
- Graceful handling of empty collections
- Ready for content creation
