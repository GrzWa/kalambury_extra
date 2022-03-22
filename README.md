WORK IN PROGRESS

A simple charades-like game.

In order for the app to work you need to add your Firestore API details in ".env.local" file:

```
REACT_APP_API_KEY="YOUR-VALUE-HERE"
REACT_APP_AUTH_DOMAIN="YOUR-VALUE-HERE"
REACT_APP_PROJECT_ID="YOUR-VALUE-HERE"
REACT_APP_STORAGE_BUCKET="YOUR-VALUE-HERE"
REACT_APP_MESSAGING_SENDER_ID="YOUR-VALUE-HERE"
REACT_APP_APP_ID="YOUR-VALUE-HERE"
REACT_APP_MEASUREMENT_ID="YOUR-VALUE-HERE"
```

Features of the app:

- Can be played on one or multiple devices
- Includes "Spectator Mode" - it can show real-time data on e.g. separate TV screen
- Includes a simple "Admin Page" for minor question sets changes or game data adjustements (points, questions left, current round etc.)

Rules of the game:

1. There are 2 teams and 3 round.
2. Teams take turns and have certain amount of time to guess as many of the words/phrases as they can.
3. If all the questions from the set are guessed the next round commences
4. In the 1st round the chosen person in the team can describe the phrase however they want.
5. In the 2nd round the phrase can only be describe with one word and nothing more.
6. In the 3rd round the phrase can only be acted out, no words or sounds can be used.
7. If the team guesses corectly the phrase, the person describing it should press "Next", otherwise the phrase can be skipped.
8. For each correct guess the team gets one point.
9. At the end of the game the team with more points wins.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
