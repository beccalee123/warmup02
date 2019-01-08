'use strict';

//these are the typical names for these dependencies
const express = require('express');
const app = express();

// EJS template setup
app.set('views', `${__dirname}/views`); //this provides the full server path
app.set('view engine', 'ejs'); //this sets you up to do ejs templates. This line of code acts as a way to set the dependency for EJS

// Static Routes
app.use(express.static(`${__dirname}/public`));

// App Middleware
app.use(express.json()); //if you send a json object to the server in a post, this will parse the object and let you use it

// Routes
app.get('/', (req, res)=> {
  res.send('<h1>Hello From/</h1>');
});

app.post('/save', (req, res) => { //if you send a json object in it will send one back
  res.json(req.body);
});

app.get('/err', (req, res, next) => {
  next('This is a catastrophic error'); //If there is middleware, and you call next with something, it'll create a catastrophic error
});

// 404 handling
app.get('*', (req, res) => {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('not-found', {request: req}); // render will render and ejs file. Send would not!
});

// Error handling
app.use((err, req, res, next) => { // express knows this will be an error message based on the params
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error:err}); 
});

module.exports = {
  server: app, 
  start: (port) => {
    app.listen(port, () => console.log('Server up on port', port));
  },
};

// app.listen(8081, () => console.log('Server up on 8081'));

// to run in terminal, run nodemon, then enter `http http://localhost:8080/`. Add file names on at the end if you want. Can also be run as `http :8080`

//Check all your routes!
// To send data into the save route, enter `echo '{"name":"John"}' | http post :8080/save` into terminal

// Will then deploy to heroku