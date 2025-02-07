import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';

const app = new Hono();
app.use(logger());

app.get('/', (c) => c.text('Welcone to a WebContainers apphaha!'));

serve(app, (info) => {
	console.log('Server is running on port ', info.port);
});
