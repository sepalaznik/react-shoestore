# React Shop Example No 5

Sergei Palaznik, 2021

https://github.com/sepalaznik/react-shoestore.git

My fifth attempt at creating a store app, based on the Dennis Archakov stream "React Sneakers".
And now getting started with Create React App.

This project was bootstrapped with [Create React App].
This project also includes:
- React + hooks
- React Router
- React Context
- axios
- node-sass (v.4.14.1) + scss-module
- mockAPI
- deployment on Github Pages

## Additionally
Basing a database in mockAPI with a dynamic id, led to an unnecessary complication of the task: 
in order to correctly add products to the shopping cart and to favorites, 
the trainer used "crutches" in the form of fixing and transferring id to a static view;
at the same time, adding products to the cart from the favorites page didn't work correctly. 
To solve this problem, I added the vendor code to the database, which is required when working with products,
and made it a control attribute for working with the shopping cart and favorites page.

## Available Scripts
In the project directory, you can run:

### `yarn start` or `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build` or `npm run predeploy`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
The app is ready to be deployed!

### `npm run deploy`
Builds and deploy the app for production to the Github Pages.\
* In the package.json before "dev", "build" or "predeploy" need added local address:
  "homepage": "."
And for "deploy" need change to repositorium address:
  "homepage": "https://sepalaznik.github.io/react-shoestore"
