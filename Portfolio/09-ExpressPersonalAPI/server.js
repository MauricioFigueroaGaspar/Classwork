const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './html'));

let names = [];
let tasks = [];


app.get('/', (req, res) => {
    res.render('index', { names: names, tasks: tasks });
});

app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name);
    }
    res.redirect('/');
});

app.get('/greet/:name', (req, res, next) => {
    const name = req.params.name;
    if (!names.includes(name)) {
        const err = new Error('User not found in registration list!');
        return next(err);
    }
    res.render('wazzup', { name: name });
});

app.put('/greet/:name', (req, res) => {
    const name = req.params.name;
    names.push(name);
    res.json(names);
});


app.post('/task', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
    }
    res.redirect('/');
});

app.get('/task', (req, res) => {
    res.json(tasks);
});

app.get('/task/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < tasks.length) {
        tasks.splice(id, 1);
    }
    res.redirect('/');
});

app.get('/task/up/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id > 0 && id < tasks.length) {
        [tasks[id - 1], tasks[id]] = [tasks[id], tasks[id - 1]];
    }
    res.redirect('/');
});

app.get('/task/down/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < tasks.length - 1) {
        [tasks[id], tasks[id + 1]] = [tasks[id + 1], tasks[id]];
    }
    res.redirect('/');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.render('index', {
        names: names,
        tasks: tasks,
        error: err.message
    });
});

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);
});