# Vortexa mapping exercise

The coding challenge for Vortexa as per the guidelines [here](https://github.com/JRGranell/javascript-challenge).

## How to run locally

The application can either be started using `docker-compose` to run the services within Docker containers, or on the local machine as separate services.

```bash
# OPTION 1: Docker containers using docker-compose
docker-compose up

# OPTION 2: Separate local services
# Start the API
cd api
npm install
npm start

# Start the web application
cd web
npm install
npm start
```

## Architecture decisions

| Decision                                        | Reasoning                                                    |
| ----------------------------------------------- | ------------------------------------------------------------ |
| JavaScript over TypeScript                      | I wanted to be able to quickly prototype and get a proof of concept out with the required functionality. In reality I would prefer to do this properly in TypeScript. |
| Express API                                     | Requirement was to serve the data using a RESTful API approach. Quickly making a simple Express app with a single endpoint and a GET method made sense in this situation. |
| Snowpack                                        | I've been exploring alternative bundlers like Snowpack (and have been reading into Vite) and thought this would be a good example to take advantage of it's great Developer Experience with it's unbundled dev server. |
| Redux Toolkit                                   | This is the recommended method of implementing Redux in a project now. Having mostly used tools like Apollo Client, Zustand and React Context to manage my state, I was happy to use the toolkit to implement Redux due to time constraints and the fact it covered all of the functionality I would need to set up if starting from scratch anyway. In reality I would like to dive deeper into setting up Redux from scratch without the toolkit, to clear up what is going on under the hood with reducers and actions. React Context with the useReducer callback has been a useful tool for me in the past, and I understand that it is a similar concept to Redux's implementation. |
| Google Maps JavaScript API vs Leaflet/Mapbox GL | I started out using Leaflet with React-Leaflet, based on OSM but quickly found that the data input to the GeoJSON component was immutable and so once the response from the fetch to the server came back, the data would not load onto the map. I'm sure I'd be able to get around this but I moved onto a proprietary solution to try something else. I'm fairly familiar with Mapbox GL and so chose the Google Maps JS API for which I could get free credit on a new GCP account. It functions fairly similarly to the Mapbox GL JS API and it did what I needed it to do so I stuck with it. |
| Recharts                                        | There were other alternatives such as CanvasJS and React-Charts but I found they had fairly low download rates on NPM, and weren't recently maintained. Recharts was quick to implement and looked the most healthy of the options. |
| CSS Modules                                     | I think if I had more time and I was exploring something new for me, I'd choose a CSS in JS solution. As it stands, I'm familiar with CSS modules which cleanly scopes the CSS for each component and results in a clean, and scaleable styling solution. |
| ``/services` and `/components` directories      | I've found this pattern to scale well and separate business logic with UI logic sufficiently so that testing can be appropriately targeted (if the UI is going to change lots and rapid iterations are required, unit tests can focus on business logic instead). |

