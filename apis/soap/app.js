var soap = require('soap');
var http = require('http');
var express = require('express');
const bodyParser = require('body-parser');

const courseService = require('../../services/course.service')

var getCourse = function(args) {     
    return courseService.filterCourse(args);
}
var getCourses = function(args) {
    return courseService.getAll();
}

var myService = {
    wsservice: {
        wsservicePort: {

            courses: function(args) {
                return getCourses(args);
            },
            course: function(args) {
                return getCourse(args);
            }          
        }
    }
};

var xml = require('fs').readFileSync('./apis/soap/wsdl-schema/Courses.wsdl', 'utf8');

var server = http.createServer(function(request,response) {
    response.end('404: Not Found: ' + request.url);
});

var app = express();

app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(8001, function(){

    let server = soap.listen(app, {
        path: '/wsdl',
        services: myService,
        xml: xml,
        callback: function (err, res) {
            console.log('===================SOAP SERVER INITIALIZED===================');
        },
        postProcess: () => {
            console.log("===================POSTPROCESS===================")
        }
    });

    server.log = ((type, data) => {
        // console.log(type,"\n")
        if(type == "replied"){
            console.log("\n", "===========================================RESPONSE==========================================");
            console.log(data.replace(new RegExp(">", 'g'),">\n"), "\n=============================================================================================");
        }
    })
    server.on("request", (request, methodName) => {
        console.log("\n", "===========================================REQUEST===========================================");
        console.log(request,'\n');
        console.log("\n", "=============================================================================================" ,'\n');
    });


});