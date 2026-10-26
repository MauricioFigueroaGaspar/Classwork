const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/calculate', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (isNaN(weight) || isNaN(height)) {
        return res.send('Please provide valid numbers for weight and height.');
    }

    const bmi = (weight / (height * height)) * 10000;
    res.send(`Your BMI is: ${bmi.toFixed(2)}`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});