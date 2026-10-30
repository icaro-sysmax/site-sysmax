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

// Helper to get WordPress plugin ZIP path
function getWordPressPluginZipPath(): string | null {
  const candidates = [
    path.resolve(__dirname, 'wordpress-elementor/sysmax-landing-page.zip'),
    path.resolve(__dirname, 'dist/sysmax-landing-page.zip'),
    path.resolve(__dirname, 'sysmax-landing-page.zip'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

// API endpoint: Download WordPress Plugin (.zip)
app.get(['/api/download-wordpress-plugin', '/api/wordpress-plugin.zip', '/sysmax-plugin.zip', '/sysmax-landing-page.zip'], (req: Request, res: Response) => {
  const zipPath = getWordPressPluginZipPath();
  if (!zipPath) {
    return res.status(404).json({
      error: 'Plugin do WordPress ainda não gerado. Execute npm run build para compilar.',
    });
  }

  res.setHeader('Content-Disposition', 'attachment; filename="sysmax-landing-page.zip"');
  res.setHeader('Content-Type', 'application/zip');
  return res.sendFile(zipPath);
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

// Serve html-version directory for direct pure static HTML access
app.use('/html-version', express.static(path.resolve(__dirname, 'html-version')));
app.use('/assets', express.static(path.resolve(__dirname, 'html-version/assets')));
app.use(express.static(path.resolve(__dirname, 'public')));

// Direct routes to physical HTML pages
const staticPagesMap: Record<string, string> = {
  '/criacao-de-sites': 'criacao-de-sites.html',
  '/criacao-de-sites.html': 'criacao-de-sites.html',
  '/marketing-digital': 'marketing-digital.html',
  '/marketing-digital.html': 'marketing-digital.html',
  '/locacao-de-equipamentos': 'locacao-de-equipamentos.html',
  '/locacao-de-equipamentos.html': 'locacao-de-equipamentos.html',
  '/locacao': 'locacao.html',
  '/locacao.html': 'locacao.html',
  '/outsourcing-de-impressao': 'outsourcing-de-impressao.html',
  '/outsourcing-de-impressao.html': 'outsourcing-de-impressao.html',
  '/impressao': 'impressao.html',
  '/impressao.html': 'impressao.html',
  '/whatsapp-calling': 'whatsapp-calling.html',
  '/whatsapp-calling.html': 'whatsapp-calling.html',
  '/cloud-file-server': 'cloud-file-server.html',
  '/cloud-file-server.html': 'cloud-file-server.html',
  '/suporte-ti': 'suporte-ti.html',
  '/suporte-ti.html': 'suporte-ti.html',
  '/ti-gerenciada': 'ti-gerenciada.html',
  '/ti-gerenciada.html': 'ti-gerenciada.html',
};

Object.entries(staticPagesMap).forEach(([routePath, htmlFilename]) => {
  app.get(routePath, (req: Request, res: Response, next) => {
    const filePath = path.resolve(__dirname, 'html-version', htmlFilename);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
    next();
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
