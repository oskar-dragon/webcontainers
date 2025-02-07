import { FileSystemTree, WebContainer } from '@webcontainer/api';
import { Terminal } from '@xterm/xterm';
import invariant from 'tiny-invariant';

export function getElement<T extends keyof HTMLElementTagNameMap>(selectors: T): HTMLElementTagNameMap[T];
export function getElement<T extends keyof SVGElementTagNameMap>(selectors: T): SVGElementTagNameMap[T];
export function getElement<T extends keyof MathMLElementTagNameMap>(selectors: T): MathMLElementTagNameMap[T];
/** @deprecated */
export function getElement<T extends keyof HTMLElementDeprecatedTagNameMap>(
	selectors: T,
): HTMLElementDeprecatedTagNameMap[T];
export function getElement<T extends Element = Element>(selectors: string): T;
export function getElement<T extends keyof HTMLElementTagNameMap>(
	selectors: keyof HTMLElementTagNameMap | string,
): HTMLElementTagNameMap[T] {
	const el = document.querySelector(selectors);

	invariant(el, `${selectors} does not exist`);

	return el as HTMLElementTagNameMap[T];
}

export async function initWebContainer(files: FileSystemTree | Uint8Array | ArrayBuffer): Promise<WebContainer> {
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

export async function installDependencies(container: WebContainer, terminal: Terminal) {
	const installprocess = await container.spawn('pnpm', ['install']);

	installprocess.output.pipeTo(
		new WritableStream({
			write(chunk) {
				terminal.write(chunk);
			},
			abort(err) {
				console.error(err);
			},
		}),
	);

	return installprocess.exit;
}

export async function startDevServer(container: WebContainer, terminal: Terminal) {
	const spawn = await container.spawn('pnpm', ['server:dev']);
	spawn.output.pipeTo(
		new WritableStream({
			write(chunk) {
				terminal.write(chunk);
			},
		}),
	);
}

export async function writeToServer(container: WebContainer, content: string) {
	console.log({ content });
	await container.fs.writeFile('/server.ts', content);
}
