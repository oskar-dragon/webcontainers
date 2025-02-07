import { WebContainer } from '@webcontainer/api';
import invariant from 'tiny-invariant';

import { files } from '../files';

import './style.css';

const app = document.querySelector('#app');

if (!app) {
	throw new Error('No app');
}

app.innerHTML = `
<div class="container">
    <div class="editor">
      <textarea>I am a textarea</textarea>
    </div>
    <div class="preview">
      <iframe src="loading.html"></iframe>
    </div>
  </div>
`;

const iframeEl = document.querySelector('iframe');
const textareaEl = document.querySelector('textarea');

invariant(iframeEl, "iframe doesn't exist");
invariant(textareaEl, "textarea doesn't exist");

const serverFile = files['server.ts'];

if ('file' in serverFile && 'contents' in serverFile.file) {
	textareaEl.value = serverFile.file.contents as string;
}

const webcontainer = await initWebContainer();

const exitCode = await installDependencies();
invariant(exitCode === 0, 'installation Failed');

async function installDependencies() {
	// Install dependencies
	const installProcess = await webcontainer.spawn('pnpm', ['install']);

	installProcess.output.pipeTo(
		new WritableStream({
			write(data) {
				console.log({ data });
			},
		}),
	);
	// Wait for install command to exit
	return installProcess.exit;
}

async function initWebContainer(): Promise<WebContainer> {
	return new Promise((resolve, reject) => {
		window.addEventListener('load', async () => {
			try {
				const webcontainerInstance = await WebContainer.boot();
				await webcontainerInstance.mount(files);

				resolve(webcontainerInstance);
			} catch (error) {
				reject(error);
			}
		});
	});
}
