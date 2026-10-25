import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Helper function to get Elementor template JSON
function getElementorTemplateJson(): string | null {
  const wpPath = path.resolve(__dirname, 'wordpress-elementor/sysmax-elementor-template.json');
  const distPath = path.resolve(__dirname, 'dist/sysmax-elementor-template.json');

  if (fs.existsSync(wpPath)) {
    return fs.readFileSync(wpPath, 'utf-8');
  }
  if (fs.existsSync(distPath)) {
    return fs.readFileSync(distPath, 'utf-8');
  }
  return null;
}

// API endpoint: Get Elementor Template as JSON (for direct Elementor plugin import or API use)
app.get(['/api/elementor-template.json', '/api/elementor-template', '/elementor.json', '/sysmax-elementor-template.json'], (req: Request, res: Response) => {
  const jsonContent = getElementorTemplateJson();
  if (!jsonContent) {
    return res.status(404).json({
      error: 'Template do Elementor ainda não gerado. Execute npm run build para compilar.',
    });
  }

  const shouldDownload = req.query.download === '1' || req.path.endsWith('.json');
  if (shouldDownload) {
    res.setHeader('Content-Disposition', 'attachment; filename="sysmax-elementor-template.json"');
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.send(jsonContent);
});

// API health endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    app: 'Sysmax Soluções em Telefonia e TI',
    timestamp: new Date().toISOString(),
    elementorTemplateReady: getElementorTemplateJson() !== null,
  });
});

async function bootstrap() {
  if (!isProd) {
    // Development mode: Mount Vite middleware on the Express instance
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static files from dist directory
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    // SPA fallback
    app.get('*', (req: Request, res: Response) => {
      const indexPath = path.resolve(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build files not found. Run npm run build.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Sysmax Server] Express server running at http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
    console.log(`[Sysmax Server] Elementor Template JSON available at http://0.0.0.0:${PORT}/api/elementor-template.json`);
  });
}

bootstrap().catch((err) => {
  console.error('[Sysmax Server] Failed to start server:', err);
  process.exit(1);
});
