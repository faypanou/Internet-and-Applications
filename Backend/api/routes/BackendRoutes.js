'use strict';

const { Router } = require('express');

module.exports = function(app) {
  var project = require('../controllers/BackendController');

  // Routes
  app.route('/articles/:virus/:from/:to')
    .get(project.articles)
    


  app.route('/year/:input')
    .get(project.year)


  app.route('/histog/:input')
  .get(project.histog)


};

