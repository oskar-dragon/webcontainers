import fs from 'fs-extra';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('Welcone to a WebContainers app!'));

export default {
	port: 3000,
	fetch: app.fetch,
};
