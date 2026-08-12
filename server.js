import express from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { generateAboutMeImage } from './src/imageGenerator.js';
import { createCacheKey, getCachedImage, setCachedImage } from './src/cache.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure TTF fonts are registered in user font directory for Linux Fontconfig/librsvg
try {
  const userFontDir = path.join(os.homedir(), '.fonts');
  if (!fs.existsSync(userFontDir)) {
    fs.mkdirSync(userFontDir, { recursive: true });
  }
  const fontsDir = path.join(__dirname, 'assets', 'fonts');
  if (fs.existsSync(fontsDir)) {
    const fontFiles = fs.readdirSync(fontsDir);
    fontFiles.forEach((file) => {
      if (file.endsWith('.ttf')) {
        fs.copyFileSync(path.join(fontsDir, file), path.join(userFontDir, file));
      }
    });
    try {
      execSync('fc-cache -f ~/.fonts', { stdio: 'ignore' });
    } catch (_) {}
  }
} catch (e) {
  console.warn('Font registration warning:', e.message);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets if needed
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Primary API Endpoint: GET /api/about-me
app.get('/api/about-me', async (req, res) => {
  try {
    const queryData = {
      name: req.query.name,
      age: req.query.age,
      location: req.query.location,
      religion: req.query.religion,
      relationship: req.query.relationship,
      height: req.query.height,
      birthday: req.query.birthday,
      bestie: req.query.bestie,
      font_style: req.query.font_style,
    };

    // Generate unique cache key from query parameters
    const cacheKey = createCacheKey(queryData);
    const cachedBuffer = getCachedImage(cacheKey);

    if (cachedBuffer) {
      res.set({
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=3600',
      });
      return res.send(cachedBuffer);
    }

    // Generate PNG buffer using Sharp + SVG overlay
    const pngBuffer = await generateAboutMeImage(queryData);

    // Save to cache
    setCachedImage(cacheKey, pngBuffer);

    // Return direct PNG image binary
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline',
      'Cache-Control': 'public, max-age=3600',
    });

    return res.send(pngBuffer);
  } catch (err) {
    console.error('Error generating image:', err);
    return res.status(500).send('Internal Server Error generating About Me image.');
  }
});

// Setup Vite middleware in development or serve static SPA in production
async function setupFrontend() {
  const distPath = path.join(__dirname, 'dist');
  const hasDist = fs.existsSync(distPath);

  if (hasDist || process.env.NODE_ENV === 'production') {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static files from dist directory.');
  } else {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
      console.log('Vite development middleware attached.');
    } catch (e) {
      console.warn('Vite dev server initialization skipped:', e.message);
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
      });
    }
  }
}

await setupFrontend();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`About Me Image API Server running at http://0.0.0.0:${PORT}`);
});
