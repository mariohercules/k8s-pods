var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var path = require('path');

const courseService = require('../../services/course.service')

var getCourse = function(args) {     
    return courseService.filterCourse(args);
}
var getCourses = function() {
    return courseService.getAll();
}

var app = express();

const API_PATH = 'api';
const API_PATH_VERSION = 'v1';
const ENDPOINT = 'course';

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '../../static/index.html'));
});

app.get('/explorer', function(req, res) {
    res.sendFile(path.join(__dirname + '../../static/explorer.html'));
});

app.get(`/${API_PATH}/${API_PATH_VERSION}/${ENDPOINT}`, (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(getCourses());
});

app.get(`/${API_PATH}/${API_PATH_VERSION}/${ENDPOINT}/:id`, (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    var result = getCourse(req.params);
    res.json(result);
});

app.post(`/${API_PATH}/${API_PATH_VERSION}/${ENDPOINT}/:id`, (req, res, next) => {
    var message = {message:'The book #ID: ' + req.params.id +' was updated'};
    res.json(message);
});

app.delete(`/${API_PATH}/${API_PATH_VERSION}/${ENDPOINT}/:id`, (req, res, next) => {
    var message = {message:'The book #ID: ' + req.params.id +' was deleted'};
    res.json(message);
});

app.listen(4000, () => console.log('REST API now running on 0.0.0.0:4000/'));