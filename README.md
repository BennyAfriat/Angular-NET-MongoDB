# Angular-NET-MongoDB

First clone this repo into your desired folder

To run the app, we need to spin up the mongoDB, backend and frontend.

cd <path to cloned repo>/Angular-NET-MongoDB

## Start  mongoDB

Assuming you have mongoDB installed, execute the following command using mongod
(on a mac, go to bin folder of the installed mongoDB)

`./mongod --dbpath <FULL PATH TO CLONED REPO>/Angular-NET-MongoDB/mongodbData`

If you prefer docker - use this to launch the DB using docker container

`docker run -p 27017:27017 --name local-mongo -v <FULL PATH TO CLONED REPO>/Angular-NET-MongoDB/mongodbData:/data/db -d mongo`

This will spin up the DB connected to the default port (27017)

## Start .net core webAPI

run command while inside /users-app-api:

`dotnet restore`

`dotnet build`

`dotnet run`

or alternatively use visual studio to raise the development server on port 5000

## Start the frontend

cd <path to cloned repo>/Angular-NET-MongoDB/users-app-ui

run command

`npm install`

and after that's done run command

`npm run start`

