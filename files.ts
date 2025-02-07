import { FileSystemTree } from '@webcontainer/api';

export const files: FileSystemTree = {
	'server.ts': {
		file: {
			contents: `
      import { Hono } from 'hono';
      
      const app = new Hono();
      
      app.get('/', (c) => c.text('Welcone to a WebContainers app!'));
      
      export default {
        port: 4000,
        fetch: app.fetch,
      };
      `,
		},
	},
	'package.json': {
		file: {
			contents: `
      {
  "name": "webcontainers-express-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "server:dev": "bun server.ts --watch",
    "app:dev": "vite",
    "dev": "concurrently \"bun server:dev\" \"bun app:dev\"",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^6.1.0",
    "concurrently": "^9.1.2"
  },
  "dependencies": {
    "@oskartdragon/config": "^0.1.3",
    "@webcontainer/api": "^1.5.1-internal.8",
    "eslint": "^9.19.0",
    "hono": "^4.7.0",
    "prettier": "^3.4.2"
  },
  "prettier": "@oskartdragon/config/prettier"
}
`,
		},
	},
};
