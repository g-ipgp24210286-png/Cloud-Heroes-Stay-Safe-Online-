import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

// Serve static build from dist
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Also serve public directory for assets
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// API health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'cloud-heroes' });
});

// For any other request, send index.html (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Cloud Heroes Server listening on port ${port}`);
});
