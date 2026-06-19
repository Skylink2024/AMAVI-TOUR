# Deployment Guide

This app is a Single Page Application (SPA) built with React and Vite. The `/admin` routes (and all other dynamic routes) are handled on the client-side by React Router.

## Why `/admin` Routes Don't Work on Production

When you access a URL like `/admin/login` on a production server, the server tries to find that as a file path instead of letting the client-side React Router handle it. The solution is to configure your server/host to serve `index.html` for all non-static asset requests.

## How to Deploy

### Option 1: Netlify (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will automatically detect `_redirects` file and handle routing
4. Build command: `npm run build`
5. Publish directory: `dist`

The `_redirects` file in the root handles all routing.

### Option 2: Vercel

1. Push your code to GitHub
2. Import your project in Vercel
3. Vercel will automatically detect `vercel.json` file
4. Build command: `npm run build`
5. Output directory: `dist`

The `vercel.json` file handles rewrites.

### Option 3: GitHub Pages

1. Build the project: `npm run build`
2. The `.nojekyll` file prevents Jekyll processing
3. Configure your repo for GitHub Pages to serve from `dist`

### Option 4: Apache Server (.htaccess)

The `public/.htaccess` file is configured for Apache servers. Make sure:
1. `mod_rewrite` is enabled on your Apache server
2. Upload the entire `dist` folder to your web host
3. Ensure `.htaccess` is deployed to the root of your web directory

### Option 5: Local Express Server

To test the production build locally:

```bash
npm run build
npm install express  # if not already installed
node server.js
```

Visit `http://localhost:3000` and all routes including `/admin/*` will work.

### Option 6: Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g express
COPY --from=build /app/dist ./dist
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t angola-rhythms .
docker run -p 3000:3000 angola-rhythms
```

## Testing Locally Before Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Test with Vite preview:
   ```bash
   npm run preview
   ```

3. Or use the Express server:
   ```bash
   node server.js
   ```

4. Visit `http://localhost:5000` (Vite preview) or `http://localhost:3000` (Express) and test the `/admin/login` route

## Environment Variables

Make sure your `.env.local` file has:
- `VITE_SUPABASE_URL=https://csehfqhxcfbylosowlrp.supabase.co`
- `VITE_SUPABASE_ANON_KEY=your_anon_key_here`

These should be set in your deployment platform's environment settings if deploying to a server.

## Troubleshooting

- **Routes return 404**: Make sure your host is configured to serve `index.html` as a fallback
- **Admin page shows blank**: Check browser console for JavaScript errors
- **Images/styles not loading**: Verify `base: '/'` in `vite.config.ts` and build output paths
