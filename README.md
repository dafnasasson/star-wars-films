### `Made by Dafna Sasson, home assignment for "Zoomin Software".`

Build and Run instructions below.

This is an app that allows the user to select his favorite STAR WARS movies.
The application componenets includes:

#### `-FilmsCollection`:
The component fetches details of STAR WARS movies via the API: swapi.dev and present them to the user.
The user can choose his favorite movies by pressing the "like" button next to each movie 
and to click on the '...' icon to see the full details of the movie. This feature was implemented using 'react-router-dom'.
This componenet also has a FAVORITES button, which allows the user to view his favorite movies and to click on a movie
to access the same page that shows full details of it;
The favorite movies are saved using Local-storage.

-Film:
Displays the main details of each movie and used inside the component: FilmsCollection

-FilmFullContent:
Displays the full details of the movie that the user selected.

-NavBar:
Displays the main nav bar of the app

-Spinner:
The component is displayed to the user while waiting for information from the api to load.

The app uses:
React, React-router-dom, fetch, promiseAll, Material-Ui, Google-Fonts.

------------------------------------------------------------------------------------------

## How to Build and Run this project:

In the project directory, you can run:

### `npm install`
Installs the external dependencies used in this project

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
