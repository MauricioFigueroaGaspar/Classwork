const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = 3000;
const API_KEY = process.env.WEATHER_API_KEY;


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/', (req, res) => {
    const city = req.body.cityName;
    if (!city) {
        return res.send('<h1>Error</h1><p>Please provide a city name.</p><a href="/">Go back</a>');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            try {
                const weatherData = JSON.parse(data);

                if (weatherData.cod !== 200) {
                    return res.send(`
                        <div style="text-align:center; font-family:sans-serif; margin-top:50px;">
                            <h1 style="color:red;">API Error</h1>
                            <p>${weatherData.message}</p>
                            <a href="/">Try again</a>
                        </div>
                    `);
                }

                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const iconIndex = weatherData.weather[0].icon;
                const cityName = weatherData.name;
                const iconUrl = `http://openweathermap.org/img/wn/${iconIndex}@2x.png`;

                res.send(`
                    <div style="text-align:center; font-family:sans-serif; margin-top:50px;">
                        <h1>Weather in ${cityName}</h1>
                        <div style="font-size: 24px; margin-bottom: 10px;">
                            <strong>Temperature:</strong> ${temp}°C
                        </div>
                        <div style="font-size: 20px; text-transform: capitalize;">
                            <strong>Description:</strong> ${description}
                        </div>
                        <img src="${iconUrl}" alt="Weather Icon" style="width: 100px;">
                        <br><br>
                        <a href="/">Go back to home</a>
                    </div>
                `);
            } catch (e) {
                res.send('<h1>System Error</h1><p>Error parsing API response.</p><a href="/">Go back</a>');
            }
        });
    }).on('error', (err) => {
        res.send(`
            <div style="text-align:center; font-family:sans-serif; margin-top:50px;">
                <h1 style="color:red;">Connection Error</h1>
                <p>${err.message}</p>
                <a href="/">Go back</a>
            </div>
        `);
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});