# google-drive-api-demo
Simple example Electron app that uses [Google's Nodejs client library](https://github.com/google/google-api-nodejs-client) for interacting with Google Drive.

Allows you to...
- Authenticate the app using OAuth2 and consent page
- Browse files from your Google Drive
- View various details about the files
- Download/export files
- Upload and create new files to your Google Drive
- Play private videos directly from your Google Drive

Stream Videos  | View Files and Details
:-----:|:-----:
<img width=380 src="https://cloud.githubusercontent.com/assets/10538978/24336921/cc71c1e8-1253-11e7-9c4c-921f6e04ef9c.png" /> | <img width=380 src="https://cloud.githubusercontent.com/assets/10538978/24336922/cc8333ce-1253-11e7-9a77-b93ccc40417f.png" />

Ask user consent  | Export & Download
:-----:|:-----:
<img width=380 src="https://cloud.githubusercontent.com/assets/10538978/24336963/7b5e46ae-1254-11e7-81c1-dd02a462e1b0.png" /> | <img width=380 src="https://cloud.githubusercontent.com/assets/10538978/24336924/cc8a3516-1253-11e7-90b7-9c8f016ca320.png" />

# Setup

### Project Setup
1. Run `npm install` in a console window.
2. Next, run the npm script from `package.json` to start webpack: `npm run-script watch`
3. In another window or tab, run `npm start` to launch the Electron app.
4. (Optional) To package the app as a Mac OSX desktop application, you can use this: ```electron-packager ./google-drive-api-demo GoogleAPIDemo --version <ELECTRON VERSION> --platform=darwin --out=/path/to/desired/output/directory/ --arch=all --ignore="(node_modules|src)"```

### Google Drive API Setup
Before you can use Google API's, you will need to setup your developer console. Follow step #1 of the NodeJS quickstart guide: https://developers.google.com/drive/v3/web/quickstart/nodejs

Once you have obtained a CLIENT_ID and SECRET_ID, paste them [here](https://github.com/denvaar/google-drive-api-demo/blob/master/main.js#L39).

# Gotcha's
These are a few things that I got hung up on while working on this demo. Hopefuly I can help to clarify things for others.

### Using the redirect URL

The [quickstart guide](https://developers.google.com/drive/v3/web/quickstart/nodejs) has some awesome example code of getting an OAuth token and making an authenticated request to the Drive API, but this example requires the user to copy and paste the application's authorization key from the browser to the console, which is not very cool. There is a caveat at the end that says:
>The authorization flow in this example is designed for a command line application. For information on how to perform authorization in other contexts, see the Authorizing and Authenticating. section of the library's README.

Curious to know how to do authorization in those "other contexts," I visited the [library's README](https://github.com/google/google-api-nodejs-client/#authorizing-and-authenticating). The docs basically state that after the consent page, Google will do a redirect to the provided _redirect url_ with the auth code in the query parameters. This part stumped me, because I wasn't quite sure how to provide a redirect url that I could use to get the params. I had an Ah-ha moment when I realized that you can use localhost as that redirect url. That means that if you have an HTTP server running at the address, you can snatch up the auth code that you need. The `http.createServer` function in `main.js` is an example of this.

### Careful passing around the OAuth data

I was getting an error like this when I would try to make a request to the Drive API: ```TypeError: authClient.request is not a function```. After doing some digging, I came accross [this Stack Overflow post](http://stackoverflow.com/questions/42853532/googleapis-typeerror-authclient-request-is-not-a-function-in-nodejs), which seemed to address the issue that I was having. I think that it boiled down to the fact that I was trying to pass around the OAuth object from Nodejs code to client-side React code, and it was getting messed up. Though the SO question/answer is not toally related to my scenerio, I think the same issue was happening: things were getting stripped from the OAuth object. The solution was to keep it in a global store somewhere. So I just ended up keeping it as a global in `main.js`.


# Resources
I found the following links helpful while working on this demo.

- Nodejs quickstart guide: https://developers.google.com/drive/v3/web/quickstart/nodejs
- Drive API Reference: https://developers.google.com/drive/v3/reference/
- Using OAuth2 to Access Google API's: https://developers.google.com/identity/protocols/OAuth2
- OAuth2 for Mobile and Desktop Apps: https://developers.google.com/identity/protocols/OAuth2InstalledApp
