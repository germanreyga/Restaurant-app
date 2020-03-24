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

## Setting up the database

The system requires [Knex.js](http://knexjs.org/) to be installed globally.

```bash
npm i -g knex
```

After installing Knex.js, create a MariaDB/MySQL database named 'restaurant'. Then go back to root directory:
1. `cd server`
1. `knex migrate:latest` to create the database schema
1. `knex seed:run` to fill some data in the database

## Nodemon

The systems requires [nodemon](https://nodemon.io/) to be installed globally.

```bash
npm i -g nodemon
```

## Running the project
On root directory:
1. `cd restaurant`
1. `npm start`

This will run the frontend on port 3000 of the PC

Go back to root directory:
1. `cd server`
1. `npm run devstart`

This will run the backend on port 5000 of the PC

