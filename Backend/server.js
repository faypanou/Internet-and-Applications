var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/BackendModel'), //created model loading here
  bodyParser = require('body-parser');
  
  // mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/virus', { useNewUrlParser: true, useUnifiedTopology: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", null); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routes = require('./api/routes/BackendRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('RESTful API server started on: ' + port);
