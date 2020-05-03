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
