/*
	 _____ _____ _____ _____ _____ _____
	|     |   __|   | |_   _|   __| __  |
	|   --|   __| | | | | | |   __|    -|
	|_____|_____|_|___| |_| |_____|__|__|

	       the everything dashboard
*/

import {app, BrowserWindow} from 'electron';

function createWindow(): void {
	let win = new BrowserWindow({
		width: 1024,
		height: 768,
		minWidth: 340,
		minHeight: 270,
		show: false,
		backgroundColor: '#000000',
		webPreferences: {
			nodeIntegration: false
		},
		titleBarStyle: 'hiddenInset'
	});

	win.once('ready-to-show', (): void => {
		win.show();
		win.webContents.openDevTools();
	});

	win.on('close', (): void => {
		win = null;
	});

	win.loadURL(`file:///${__dirname}/browser/index.html`);
}

app.on('ready', createWindow);

