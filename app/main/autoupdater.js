'use strict';
// const os = require('os');
const {app, dialog} = require('electron');
const {autoUpdater} = require('electron-updater');

// We don't need to call all of these since it's automatically handled by electron-updater
// const version = app.getVersion();
// const platform = os.platform() + '_' + os.arch();  // usually returns darwin_64
// const updaterFeedURL = 'http://zulipdesktop.herokuapp.com/update/' + platform + '/' + version;

function appUpdater() {
	// autoUpdater.setFeedURL(updaterFeedURL);

	// Log whats happening
	const log = require('electron-log');
	log.transports.file.level = 'info';
	autoUpdater.logger = log;
	// TODO send autoUpdater events to renderer so that we could
	// it could console log in developer tools
	/*
	autoUpdater.on('error', err => console.log(err));
	autoUpdater.on('checking-for-update', () => console.log('checking-for-update'));
	autoUpdater.on('update-available', () => console.log('update-available'));
	autoUpdater.on('update-not-available', () => console.log('update-not-available'));
	*/

	// Ask the user if update is available
	autoUpdater.on('update-downloaded', (event, info) => {
		// let message = app.getName() + ' ' + info.releaseName + ' is now available. It will be installed the next time you restart the application.';
		// if (info.releaseNotes) {
			// const splitNotes = info.releaseNotes.split(/[^\r]\n/);
			// message += '\n\nRelease notes:\n';
			// splitNotes.forEach(notes => {
				// message += notes + '\n\n';
			// });
		// }
		// Ask user to update the app
		dialog.showMessageBox({
			type: 'question',
			buttons: ['Install and Relaunch', 'Later'],
			defaultId: 0,
			message: 'A new version of ' + app.getName() + ' has been downloaded',
			detail: 'It will be installed the next time you restart the application'
		}, response => {
			if (response === 0) {
				setTimeout(() => autoUpdater.quitAndInstall(), 1);
			}
		});
	});
	// init for updates
	autoUpdater.checkForUpdates();
}

exports = module.exports = {
	appUpdater
};
