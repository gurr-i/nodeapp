// const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
var file1 = require('./myfirstmodule');

const express = require('express') //================================================================ Creating http server with Expressjs
const express_application = express()
var fs = require("fs");

var newuser = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

express_application.get('/', (req, res) => {
    res.send('Hello World!')
})

//Router to get list of our users
express_application.get('/listUsers', (req, res) => {
    fs.readFile(__dirname + "/" + "Db.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

//Router to add a new User
express_application.post('/adduser', (req, res) => {
    // First read existing users.
    fs.readFile(__dirname + "/" + "Db.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["user4"] = newuser["user4"];
        // console.log(data);
        res.end(JSON.stringify(data));
        console.log(data);
    });
})

//Router to get specific User details by user ID
express_application.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "Db.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var user = users["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    });
})

//Router to delete a user
express_application.delete('/deleteUser/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "Db.json", 'utf8', function (err, data) {
        var data = JSON.parse(data);
        delete data["user" + req.params.id];

        console.log(data);
        res.end(JSON.stringify(data));
    });
})

var srvr = express_application.listen(port, hostname, () => {
    var hostaddress = srvr.address().address
    var port = srvr.address().port
    console.log("express_application listening at http://%s : %s", hostaddress, port)
    // console.log(`express_application listening on port ${ port, hostname}`)
})

// {const server = http.createServer((req, res) => {   <================================================================= Create http Server without Expressjs
//     // res.statusCode = 200;
//     // res.setHeader('Content-Type', 'text/plain');
//     // res.end('Hello Worldfeeefef');
//     var a = 5, b = 5;
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     // console.log("Addition : " + file1.add(a, b));
//     res.write("The date and time is currently: "+ file1.add(a, b));
//     res.end();
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });}

// const add = require('./myfirstmodule')

// console.log(add(25, 10))
// console.log(__dirname)






