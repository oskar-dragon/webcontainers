import { FitAddon } from '@xterm/addon-fit';
import { Terminal as XtermTerminal } from '@xterm/xterm';

export class Terminal extends XtermTerminal {
	fitAddon: FitAddon;
	constructor() {
		super();
		this.fitAddon = new FitAddon();
		this.loadAddon(this.fitAddon);
	}

	open(element: HTMLElement) {
		super.open(element);
		this.fitAddon.fit();
	}
}
