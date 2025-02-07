import { FileSystemTree } from '@webcontainer/api';

export const files: FileSystemTree = {
	'server.ts': {
		file: {
			contents: `
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

const app = new Hono();
app.use(logger());

app.get('/', (c) => c.text('Welcone to a WebContainers app!'));

serve(app, (info) => {
	console.log('Server is running on port ', info.port);
});
`,
		},
	},
	'package.json': {
		file: {
			contents: `{
  "name": "webcontainers",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "server:dev": "tsx watch server.ts",
    "app:dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "concurrently": "^9.1.2",
    "tsx": "^4.19.2",
    "vite": "^6.1.0"
  },
  "dependencies": {
    "@hono/node-server": "^1.13.8",
    "@oskartdragon/config": "^0.1.3",
    "@types/fs-extra": "^11.0.4",
    "@webcontainer/api": "^1.5.1-internal.8",
    "eslint": "^9.19.0",
    "fs-extra": "^11.3.0",
    "hono": "^4.7.0",
    "prettier": "^3.4.2",
    "tiny-invariant": "^1.3.3"
  },
  "prettier": "@oskartdragon/config/prettier"
}
`,
		},
	},
};
