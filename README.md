# Boosted Chat Web Client

This is a frontend React application written in Typescript and bootstrapped with
Vite.

## Install dependencies

Having pnpm installed, run `pnpm dev` to install all npm dependencies

## Run the Application locally in development mode

In the project directory, you can run `pnpm dev` which will start the local
server on port 5173.\
Open [http://localhost:5173](http://localhost:5173) to view the application in
the browser.\
Vite also comes with Hot Module Replacement by default so any changes made to
the code will be automatically reflected in the browser.

## Run with docker

You may alternatively run the application with docker by running
`docker compose up -d`. This will build and run a production image of the built
application served with nginx.

The container binds on port 80, and if this is already in use you may change the
port to 8080 on the docker-compose.yaml file.
