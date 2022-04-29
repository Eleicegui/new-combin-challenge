# NewCombinChallenge

This site connects to an API provided by the challange.
To make a correct use of this development, run the API locally alongside this angular project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Docker image

A docker image can be pulled from `dockerhub` with the following command: `docker pull eleicegui/new-combin-challenge:eleicegui`.
That image is a dockerized version of a production enviroment build of this project.
Run the docker image locally alongside the API with this command `docker run -d -p 80:80 eleicegui`
