# lets-code-this-thang

I kept trying to get my wife to program with me. She finally caved in to my nagging and said, "Let's code this thang." So, This is a simple todo list app we made together to demonstrate some basic programming ideas.

We used [React](https://facebook.github.io/react/) and [Electron](http://electron.atom.io/).

<img align="center" src="https://cloud.githubusercontent.com/assets/10538978/20457064/5e0a34b4-ae40-11e6-931a-1bf331811631.gif" width="250" />


## Setup
1. `npm install`
2. `npm run-script watch` and `npm start` in another tab.
3. To package as an app: `electron-packager ./lets-code-this-thang PusheenTodo --version 1.2.4 --platform=darwin --out=/Users/denversmith/Desktop/ --arch=all --ignore="(node_modules|src)"`
