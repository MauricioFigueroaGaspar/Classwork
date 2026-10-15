import express from 'express';
// const express = require('express');
// import axios from 'axios';
import { weatherRoutes } from "./routes/weatherRoutes.js";
import { getWeatherFrom } from "./services/meteo-service.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json()); // Middleware: something that will change the configuration of the server as a whole

import { loadEnvFile } from "node:process";
loadEnvFile(); // Loads the default .env in the current working directory
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = "FirstDB";

const scientists = [
  { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
  { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
  { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

class WeatherError extends Error {
  constructor(message, statusCode, rootCauseClass) {
    super(message);
    this.name = "WeatherError";
    this.statusCode = statusCode;
    this.rootCauseClass = rootCauseClass;
  }
}


const mongoUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.p5wxtpe.mongodb.net/${dbName}`;
connectDB(mongoUrl);


const protect = (req, res, next) => {
  const { token } = req.headers;
  if (!token || token !== "my secret token") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}



// use of GET method: to receive public information
app.get('/', (req, res) => {
  res.send('Hello World')
});

app.get('/about', (req, res) => {
  res.send('This is my WebApp Class project')
});

// /greet?name=***&city=***
app.get('/greet', (req, res) => {
  const { name, city } = req.query; // <- Destructuring
  res.send(`Hello ${name}, how is the weather in ${city}?`)
});

// /api/scientists?dept=***
app.get('/api/scientists', (req, res) => {
  const { dept } = req.query; // <- Destructuring
  if (dept) {
    /*
    const result = [];
    for(const scientist of scientists) {
      if(scientist.department === dept) {
        result.push(scientist);
      }
    }
    return result;
    */
    const result = scientists.filter(
      (scientist) => scientist.department.toLowerCase() === dept.toLowerCase()
    );

    if (result && result.length > 0) {
      return res.json({
        deptScientists: result,
        dept,
        count: result.length,
      });
    }
    else {
      return res.json({
        errorMsg: `No results for department ${dept}`,
        dept
      })
    }
  }
  return res.json({ deptScientists: scientists });
});


app.get('/api/scientists/:id/profile/:keyword', (req, res) => {
  const scientistId = parseInt(req.params.id);
  const { keyword } = req.params;
  const scientist = scientists.find((scientist) => scientist.id === scientistId);

  if (!scientist) {
    return res.json({ success: false, errorMsg: "No scientist found." })
  }

  res.json({
    success: true,
    data: scientist,
    keyword,
  });
});

app.get("/api/initiatives", (req, res) => {
  res.json({ initiatives, status: "Ok" });
});

app.post("/api/initiatives", (req, res) => {
  const { title, budget, department } = req.body;
  const initiative = { title, budget, department };
  initiatives.push(initiative);
  res.json({ title, budget, department, status: "Ok" });
});

app.post('/about', (req, res) => {
  res.send('This is still my WebApp Class project, but secure')
});

app.post('/about',
  (req, res, next) => {
    const user_type = "viewer";
    req._internalMsg = "This is my WebApp Class project.";
    if (user_type !== "viewer") {
      return
    }
    next();
  },
  (req, res, next) => {
    res.send(`Second endpoint`);
  }
);

app.use("/api/weather", protect, weatherRoutes);

// Handler for Unfound Routes
app.all("/{*splat}", (req, res, next) => {
  next(new Error("Endpoint not found"));
});

// Middleware method has to be the last one before the app.listen
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof WeatherError) {
    const msg = err.message || err.rootCauseClass || "Unknown error";
    res
      .status(err.statusCode || 500)
      .json({ error: msg, rootCause: err.rootCauseClass, section: "Weather" })
  }
  res.status(500).json({ error: err.message || "Unknown error" })
});

// port that the server is going to be listening to
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});