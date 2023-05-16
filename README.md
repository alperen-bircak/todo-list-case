# Todo List Case

## Using Docker Compose

This repository contains the source code for a Todo App. To run this application locally, you'll need to have `docker-compose` installed on your machine.

## Installing Docker Compose

If you haven't already installed `docker-compose`, you can do so by following the instructions on the official [Docker documentation](https://docs.docker.com/compose/install/).

## Building the Application

Before running the application, you'll need to build the Docker image. To do so, navigate to the root directory of the project and run the following command:

```
docker-compose build
```
This might take a while!

## Running the Application

Once the image has been built, you can start the application with the following command:

```
docker-compose up
```

This will start the application and output the logs to your terminal. After starting the application, you can acces the web page on your browser at [http://localhost:3000](http://localhost:3000).


## Stopping the Application

To stop the application, simply press `Ctrl + C` in your terminal. Alternatively, you can run the following command:

```
docker-compose down
```

This will stop and remove all containers, networks, and volumes associated with the application.

## Features
* User Register
* User Login
* Add todos
* Remove todos
* Re-order todos by dragging them around
* Check todos
* Search todos
* Edit todos
