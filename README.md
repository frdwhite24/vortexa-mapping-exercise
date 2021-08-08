<div align="center">
  <img src="assets/intro.gif"/>
  <h1>Vortexa Mapping Exercise</h1>
</div>

## Introduction

This application shows the positions of boat ramps around Gold Coast, Australia. The map contains bar charts showing the count of boat ramps by material, and the count of boat ramps by area range.

Clicking on the bar charts allows for filtering by the category clicked, zooming allows filtering of the data on the charts to only show the data visible in the view-port. The filters can be cleared by clicking the button in the bottom left.

The coding challenge for [Vortexa](https://www.vortexa.com/) as per the guidelines [here](https://github.com/JRGranell/javascript-challenge).

## How to run locally

The application can either be started using `docker-compose` to run the services within Docker containers, or on your local machine as separate services. Please ensure you don't have anything running on ports 8082 and 3002 and if you use option 2, ensure you have Node v15 / npm v7 installed.

```bash
# OPTION 1: Docker containers using docker-compose
# -d flag to run in detatched mode, if the service is not working, run without
# this flag and review the server logs
# NOTE: Snowpack requires a minute or two upon first start, so the Web
# application will not be available at the below port right away.
docker-compose up -d

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

With both solutions, the services will be served at:

- API: localhost:3002/boat_ramps
- Web: localhost:8082

## Built with

- JavaScript
- [Snowpack](https://www.snowpack.dev/)
- Express
- React
- [Google Maps JS API](https://developers.google.com/maps/documentation/javascript/overview)
- [React Google Maps](https://www.npmjs.com/package/@react-google-maps/api)
- [Recharts](https://www.npmjs.com/package/recharts)
- [Redux Toolkit](https://redux-toolkit.js.org/)

## Architecture decisions

| Decision                                        | Reasoning                                                    |
| ----------------------------------------------- | ------------------------------------------------------------ |
| Docker compose                                  | The ease of starting up the whole application with one command was really what drove this decision. |
| JavaScript over TypeScript                      | I wanted to be able to quickly prototype and get a proof of concept out with the required functionality. In reality I would prefer to do this properly in TypeScript. |
| Express API                                     | Requirement was to serve the data using a RESTful API approach. Quickly making a simple Express app with a single endpoint and a GET method made sense in this situation. |
| Snowpack                                        | I've been exploring alternative bundlers like Snowpack (and have been reading into Vite) and thought this would be a good example to take advantage of it's great Developer Experience with it's unbundled dev server. |
| Redux Toolkit                                   | This is the recommended method of implementing Redux in a project now. Having mostly used tools like Apollo Client, Zustand and React Context to manage my state, I was happy to use the toolkit to implement Redux due to time constraints and the fact it covered all of the functionality I would need to set up if starting from scratch anyway. In reality I would like to dive deeper into setting up Redux from scratch without the toolkit, to clear up what is going on under the hood with reducers and actions. React Context with the useReducer callback has been a useful tool for me in the past, and I understand that it is a similar concept to Redux's implementation. |
| Google Maps JavaScript API vs Leaflet/Mapbox GL | I started out using Leaflet with React-Leaflet, based on OSM but quickly found that the data input to the GeoJSON component was immutable and so once the response from the fetch to the server came back, the data would not load onto the map. I'm sure I'd be able to get around this but I moved onto a proprietary solution to try something else. I'm fairly familiar with Mapbox GL and so chose the Google Maps JS API for which I could get free credit on a new GCP account. It functions fairly similarly to the Mapbox GL JS API and it did what I needed it to do so I stuck with it. |
| Recharts                                        | There were other alternatives such as CanvasJS and React-Charts but I found they had fairly low download rates on NPM, and weren't recently maintained. Recharts was quick to implement and looked the most healthy of the options. |
| CSS Modules                                     | I think if I had more time and I was exploring something new for me, I'd choose a CSS in JS solution. As it stands, I'm familiar with CSS modules which cleanly scopes the CSS for each component and results in a clean, and scaleable styling solution. |
| `/services` and `/components` directories       | I've found this pattern to scale well and separate business logic with UI logic sufficiently so that testing can be appropriately targeted (if the UI is going to change lots and rapid iterations are required, unit tests can focus on business logic instead). |

## Things to improve

1. Sort out responsiveness, currently it is only designed for a desktop sized viewport.
2. Extra tests, most business logic in the services are tested, and these are mostly all the interfaces between the mapping lib and charting lib. Testing on the state handling is a must after this!
3. Create a page header which contains the title and an about route to give some context on what the application is for.
4. Fix the positions of the categories on the bar charts so they don't jump around.
5. Consider a different visualisation method rather than just 2 bar charts.
6. CSS Modules not scoping to the component correctly (missing component name at start of class name)
7. Fix auto imports in Vim with alias routing
8. Fully restrict the Google Maps API key so it can't be abused. Remove from source code and rotate if the repository becomes public.

