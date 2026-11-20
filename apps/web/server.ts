/**
 * Simple static file server for development and production.
 * Serves the built static files from the client directory.
 */
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

process.env.NODE_ENV ??= 'production';

const isDevelopment = process.env.NODE_ENV === 'development';
const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? '::';
const appDirectory = path.dirname(fileURLToPath(import.meta.url));
const buildDirectory = path.resolve(appDirectory, '../../dist/apps/web');

const app = express();
const httpServer = createServer(app);

app.disable('x-powered-by');

if (isDevelopment) {
	// Development: use Vite to serve and hot-reload
	const serveDevelopment = async () => {
		const { createServer: createViteServer } = await import('vite');
		const vite = await createViteServer({
			root: appDirectory,
			server: { middlewareMode: true },
		});

		app.use(vite.middlewares);
		
		// Serve the React Router app through Vite
		app.use(async (req, res, next) => {
			try {
				const { createRequestHandler } = await import('@react-router/express');
				const viteManifest = await vite.ssrLoadModule('virtual:react-router/server-handlers-manifest');
				const handler = createRequestHandler({ 
					build: viteManifest,
					mode: 'development' 
				});
				await handler(req, res, next);
			} catch (error) {
				console.error('[server] request failed', error);
				next(error);
			}
		});

		return () => vite.close();
	};

	const closeVite = await serveDevelopment();

	httpServer.listen(port, host, () => {
		console.log(`[server] development server listening on http://localhost:${port}`);
	});

	process.once('SIGTERM', () => { closeVite().then(() => httpServer.close()); });
	process.once('SIGINT', () => { closeVite().then(() => httpServer.close()); });
} else {
	// Production: serve static files
	const clientDirectory = path.join(buildDirectory, 'client');
	
	app.use('/assets', express.static(path.join(clientDirectory, 'assets'), { immutable: true, maxAge: '1y' }));
	app.use(express.static(clientDirectory, { maxAge: '1h' }));

	// Serve index.html for all routes (SPA fallback)
	app.use((req, res) => {
		res.sendFile(path.join(clientDirectory, 'index.html'));
	});

	httpServer.listen(port, host, () => {
		console.log(`[server] production server listening on http://localhost:${port}`);
	});
}
