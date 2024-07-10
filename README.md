# Shinier - Your One Stop for Collecting the Coolest and Rarest Pokemon Cards

## Table of Contents

1. [App Description](#App_-Description)
2. [Technologies](#Technologies)
3. [Project Planning](#Project-Planning)
4. [App Functionality](#App-Functionality)
5. [Deployment](#Deployment)
6. [Key Challenges](#Key-Challenges)
7. [Future Developments](#Future-Developments)

## App Description

This is a dockerized version of the Shinier App I designed. The link to the original app can be found below.

https://github.com/Xyfalix/shinier

## Technologies

- **Others**: Docker

## App Functionality

The full CRUD app can be started by executing the following command in the terminal, once Docker has been installed on the machine running this app.

`docker compose up -d`

The app can be accessed at http://localhost:8080/ once started on a local machine.

Caveats

- A valid MongoDb cluster address is required in order for the database connection to work correctly.
- Users are strongly advised to sign up for an API key from [PokemonTCG API](https://dev.pokemontcg.io/), otherwise searches will be severely rate limited.

The app and its respective commands can be stopped by running the following command

`docker compose down`

## Key Learnings

- The Nginx server needs to be configured manually to listen to specific ports other than the default (port 80).
- The Nginx server also needs to be proxied to the backend in order for requests made to the backend server to work correctly
- Docker sends all files and its subdirectories in the specified context directory to the Docker daemon. If the Dockerfile refers to files outside of the context directory, Docker _cannot_ access them, and the build will fail.
