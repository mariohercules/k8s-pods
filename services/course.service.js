const Course = require('../models/Course');
const courseList = new Array();

courseList.push(new Course(1,'The Complete Node.js Developer Course','Andrew Mead, Rob Percival','Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!','Node.js','https://codingthesmartway.com/courses/nodejs/'));
courseList.push(new Course(2,'Node.js, Express & MongoDB Dev to Deployment','Brad Traversy','Learn by example building & deploying real-world Node.js applications from absolute scratch','Node.js','https://codingthesmartway.com/courses/nodejs-express-mongodb/'));
courseList.push(new Course(3,'JavaScript: Understanding The Weird Parts','Anthony Alicea','An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.','JavaScript','https://codingthesmartway.com/courses/understand-javascript/'));

const filterCourse = (args) => {
    const { id } = args;
    const course = courseList.find(course => course.id === Number.parseInt(id));
    if (!!course) {
      return course;
    }
    return null;
  };

  const getAll = () => {
    if (courseList.length > 0) 
      return courseList;
    return null;
  };


module.exports = {
    courseList,
    filterCourse,
    getAll,
}