# google-drive-api-demo
Simple example Electron app that uses [Google's Nodejs client library](https://github.com/google/google-api-nodejs-client) for interacting with Google Drive.

Allows you to...
- Authenticate the app using OAuth2 and consent page
- Browse files from your Google Drive
- View various details about the files
- Download/export files
- Upload and create new files to your Google Drive
- Play private videos directly from your Google Drive

# Setup

### Project Setup
1. Run `npm install` in a console window.
2. Next, run the npm script from `package.json` to start webpack: `npm run-script watch`
3. In another window or tab, run `npm start` to launch the Electron app.
4. (Optional) To package the app as a Mac OSX desktop application, you can use this: ```electron-packager ./google-drive-api-demo GoogleAPIDemo --version 1.2.4 --platform=darwin --out=/path/to/desired/output/directory/ --arch=all --ignore="(node_modules|src)"```

### Google Drive API Setup
Before you can use Google API's, you will need to setup your developer console. Follow step #1 of the NodeJS quickstart guide: https://developers.google.com/drive/v3/web/quickstart/nodejs

Once you have obtained a CLIENT_ID and SECRET_ID, paste them [here](https://github.com/denvaar/google-drive-api-demo/blob/master/main.js#L39).
