var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var os = require('os'); 
var networkInterfaces = os.networkInterfaces( );
const ip = networkInterfaces['eth0'][0].address; 

const courseService = require('../../services/course.service')

var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

var getCourse = function(args) {     
    return courseService.filterCourse(args);
}
var getCourses = function() {
    return courseService.getAll();
}

var root = {
    course: getCourse,
    courses: getCourses
};

var app = express();

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('GraphQL server now running on ' + ip + ':4000/graphql'));