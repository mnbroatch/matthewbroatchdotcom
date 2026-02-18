# matthewbroatch.com

Static landing site built with React and Vite, designed for deployment to S3.

## Stack

- React 18 + Vite
- [react-dialogue-tree](https://github.com/mnbroatch/react-dialogue-tree) for the hero dialogue (Yarn Language)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/`. Configure `base` in `vite.config.js` if the site is served from a subpath (e.g. `base: '/mysite/'`).

## Deploy to S3

1. Build: `npm run build`
2. Sync to your bucket:

   ```bash
   S3_BUCKET=your-bucket-name npm run deploy
   ```

   Or run the sync manually:

   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

Ensure the bucket is set up for static website hosting (public read, index document `index.html`, error document for SPA if using client-side routing).
