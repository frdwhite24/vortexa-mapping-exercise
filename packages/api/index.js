const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/boat_ramps", (req, res) => {
  try {
    const data = fs.readFileSync("./data/boat_ramps.geojson", "utf8");
    res.send(data);
  } catch (error) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Api serving data at http://localhost:${port}/boat_ramps`);
});
