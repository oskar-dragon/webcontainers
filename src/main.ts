import { WebContainer } from '@webcontainer/api';
import { Terminal } from '@xterm/xterm';
import invariant from 'tiny-invariant';

import '@xterm/xterm/css/xterm.css';

import { files } from '../files';

import './style.css';

import { getElement, initWebContainer, installDependencies, startDevServer, writeToServer } from './utils';

async function main() {
	const serverFile = files['server.ts'];
	const webContainer = await initWebContainer(files);
	const app = getElement('#app');

	app.innerHTML = `
	<div class="container">
			<div class="editor">
				<textarea>I am a textarea</textarea>
				<div class="terminal"></div>
			</div>
			<div class="preview">
				<iframe src="loading.html"></iframe>
			</div>
		</div>

	`;

	const iframeEl = getElement('iframe');
	const textareaEl = getElement('textarea');
	const terminalEl = getElement('.terminal');

	const terminal = new Terminal({
		convertEol: true,
	});
	terminal.open(terminalEl as HTMLElement);

	const dependenciesExitNode = await installDependencies(webContainer, terminal);
	invariant(dependenciesExitNode === 0, 'Installation failed');
	await startDevServer(webContainer, terminal);
	webContainer.on('server-ready', (port, url) => {
		iframeEl.src = url;
	});

	invariant('file' in serverFile && 'contents' in serverFile.file, 'NOOO');
	textareaEl.value = serverFile.file.contents as string;
	textareaEl.addEventListener('input', (e) => {
		const target = e.currentTarget as HTMLTextAreaElement;
		writeToServer(webContainer, target.value);
	});
}

main();
