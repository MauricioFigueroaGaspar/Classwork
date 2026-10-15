import express from 'express';

const router = express.Router();

const cities = {
  GDL: { lat: 20.6597, long: -103.349, name: "Guadalajara" },
  LSN: { lat: 46.52, long: 6.63, name: "Lausanne" }
}

router.get('/weatherGDL', async (req, res) => {
  const respString = await getWeatherFrom(20.6597, -103.349, "Guadalajara");
  res.send(respString);
});

router.get('/weatherLSN', async (req, res) => {
  const respString = await getWeatherFrom(46.52, 6.63, "Lausanne");
  res.send(respString);
});

/*router.get('/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    if(!city) throw new Error("City code is required");
    if(!cities[city]) throw new Error("City code is invalid");
    const { lat, long, name } = cities[city];

    const respString = await getWeatherFrom(lat, long, name);
    res.send(respString);
  }
  catch(error) {
    console.error(error);
    if(error.message === "City code is required") {
      res.status(400).send({ error: "City code is required" });
    }
    res.status(500).send({ error: "Unknown error" });
  }
});*/

router.get('/weather/:city', async (req, res, next) => {
  const { city } = req.params;
  if(!city)
    next(new WeatherError("City code is required", 400, "/weather/:city"));
  if(!cities[city])
    next(new WeatherError("City code is invalid", 400, "/weather/:city"));
  const { lat, long, name } = cities[city];
  const respString = await getWeatherFrom(lat, long, name);
  res.send(respString);
});

export default router;