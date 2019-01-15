'use strict';

const express = require('express');
const app = express();
const ejs = ('ejs');

//EJS template
app.set('views', `${__dirname}/views`);
app.set('vew engine', ejs);

//Static routes
app.use(express.static(`${__dirname}/public`));

//App middleware
app.use(express.json());

//Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello from</h1>');
});

app.post('/save', (req, res) => {
  res.json(req.body);
});

app.get('/err', (req, res, next) => {
  next('This is a catastrophic error');
});

//404 handling
app.get('*', (req, res) => {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('not-found', {request: req});
});

//Error handling
app.use((err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error: err});
});

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => console.log('Server up on port', port));
  },
}

app.listen(8081, () => console.log('Server up on 8081'));



// // to run in terminal, run nodemon, then enter `http http://localhost:8080/`. Add file names on at the end if you want. Can also be run as `http :8080`

// //Check all your routes!
// // To send data into the save route, enter `echo '{"name":"John"}' | http post :8080/save` into terminal

// // Will then deploy to heroku