# Vortexa mapping exercise

The coding challenge for Vortexa as per the guidelines [here](https://github.com/JRGranell/javascript-challenge).

## How to run locally

The plan will be to dockerise both apps and use docker compose to start up the
application with one command, but currently the API and web applications are
both required to be started separately.

```bash
# Start the API
cd api
npm install
npm start

# Start the web application
cd web
npm install
npm start
```
