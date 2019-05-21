# HN

## Requirements

`Docker` and `Docker Compose` are required to build and run this project. Make sure that you have docker installed in your system.

## Create docker images

In the project folder, execute the following command:

```
docker-compose build --no-cache backend frontend
```

## Run project

1. Start docker services

```
docker-compose up -d
```

2. Run a manual synchronization

A cron task is configured to run a synchronization every hour, but if it's required force a synchronization, run the following command:

```
docker-compose exec crontab entrypoint.sh sync
```

3. Check site

Open a browser and open the url http://localhost:8000

## Configuration

All docker services are configurated with default values. If some configuration requires to be changed, update the `.env.backend` file with the new values and run `docker-compose up -d` to reload the services.

To change the external port used by the webapp (`8000`) or mongodb (`27017`), it's necessary update the `docker-compose.yml` file in the port section of each service and restart them. This change is only for ports that are exposed from the stack.
