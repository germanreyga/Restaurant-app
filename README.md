# Restaurant-app

Web application for a restaurant using React for the frontend and Node.js (Express) for the backend

## Project structure

The `restaurant` folder contains the frontend, the `server` folder contains the backend

## Install dependencies

On root directory:

1. `cd restaurant`
1. `npm install`

Go back to root directory:

1. `cd server`
1. `npm install`

## Edit environment variables

Edit the .env.example file in the `server` directory:

1. Remove the .example extension in the filename
2. Edit the file so the environment variables match your database and PC settings

## Setting up the database

This project requires MariaDB/MySQL to be running on the PC.

Create the MariaDB/MySQL database for the app. Then go back to `server` directory:

1. `npm run migrations` to create the database schema
1. `npm run seeds` to fill up the database with some data

## Running the project

On root directory:

1. `cd restaurant`
1. `npm start`

This will run the frontend on port 3000 of the PC

On a new terminal, on root directory:

1. `cd server`
1. `npm run devstart`

This will run the backend on port 5000 of the PC (if by some reason you change the backend's port number, be sure to update the "proxy": "http://localhost:5000" line in the frontend's package.json file accordingly)

## Main technologies used

- React
- Node.js (Express)
- MySQL
- Socket.io
- react-bootstrap
- Axios
- Mocha

## How to run unitary tests
1. `cd server`
2. `npm run test`

## Screenshots
* Homepage
![home_menu](https://user-images.githubusercontent.com/26470569/82774294-0a6d0580-9e0a-11ea-8e0c-607083eaea10.png)

* Food ordering page
![order_menu](https://user-images.githubusercontent.com/26470569/82774438-79e2f500-9e0a-11ea-8d56-c262f981487d.png)

* Admin dashboard
![admin_menu](https://user-images.githubusercontent.com/26470569/82774302-0e992300-9e0a-11ea-9b5e-2d3f4ca9323b.png)

* Employee dashboard
![employee_menu](https://user-images.githubusercontent.com/26470569/82774304-0e992300-9e0a-11ea-996a-9cd9e77ec051.png)
