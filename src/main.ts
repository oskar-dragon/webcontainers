import { WebContainer } from '@webcontainer/api';
import invariant from 'tiny-invariant';

import { Terminal } from './terminal';

import '@xterm/xterm/css/xterm.css';

import { files } from '../files';

import './style.css';

import { getElement, initWebContainer, startShell, writeToServer } from './utils';

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

	const terminal = new Terminal();

	terminal.open(terminalEl as HTMLElement);

	webContainer.on('server-ready', (port, url) => {
		iframeEl.src = url;
	});

	const shellProcess = await startShell(webContainer, terminal);
	window.addEventListener('resize', () => {
		terminal.fitAddon.fit();
		shellProcess.resize({
			cols: terminal.cols,
			rows: terminal.rows,
		});
	});

	invariant('file' in serverFile && 'contents' in serverFile.file, 'NOOO');
	textareaEl.value = serverFile.file.contents as string;
	textareaEl.addEventListener('input', (e) => {
		const target = e.currentTarget as HTMLTextAreaElement;
		writeToServer(webContainer, target.value);
	});
}

main();
