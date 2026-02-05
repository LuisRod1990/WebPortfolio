import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// 🔹 Necesario para que import.meta.dirname funcione correctamente en Node ESM
const __dirname = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = join(__dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Ejemplo de endpoints REST API en Express.
 * Puedes descomentar y definir los que necesites.
 *
 * Ejemplo:
 * app.get('/api/portfolio', (req, res) => {
 *   res.json({ message: 'Portfolio API funcionando!' });
 * });
 */

/**
 * Servir archivos estáticos desde /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Manejar todas las demás rutas renderizando la aplicación Angular
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Iniciar el servidor si este módulo es el entry point principal
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error?: Error) => {
    if (error) {
      throw error;
    }
    console.log(`Node Express server escuchando en http://localhost:${port}`);
  });
}

/**
 * Request handler usado por Angular CLI (dev-server y durante build)
 */
export const reqHandler = createNodeRequestHandler(app);