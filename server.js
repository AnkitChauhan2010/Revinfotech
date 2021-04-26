const express = require("express");
const  bodyParser=require("body-parser");
const app = express()
const db=require('./Mongodb/mongodb')

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(bodyParser.json());

app.use('/users',require('./Router/router'));
 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, http");
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

var swaggerDefinition = {
    info: {
        title: 'TestApp',
        version: '2.0.0',
        description: 'Documentation of Test Application',
    },
    host: 'localhost:8084',
    basePath: '/',
};
var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./Router/*.js']
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);

});  

// initialize swagger-jsdoc 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(8084,()=>{
    console.log("running at port no. 8084")
})

module.exports={app}