//This the server listener :
var jwt    = require('jsonwebtoken'); 
var express = require('express');
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var app = express();
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');
var apiRoutes = express.Router(); 

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//connecting to Mongodb.
mongoose.connect(dbConfig.url, {});
mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
    
})

// Setting the corse headers...
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


//routes ::
require('./app/routes/Authentification.route')(app);

// ////verify token
// app.use(function(req, res, next) {
//   console.log(req.headers);
//   console.log(req.headers['x-access-token'])
//   console.log(req.query.token)
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];  
//   // decode token
//   if (token) {        
//     // verifies secret and checks exp
//     jwt.verify(token, dbConfig.secret, function(err, decoded) {      
//       if (err) {
//         return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;    
//         next();
//       }
//     });
//   } else {
//     // if there is no token
//     // return an error
//     return res.status(403).send({ 
//         success: false, 
//         message: 'No token provided.' 
//     });
//   }})



require('./app/routes/user_accidents.routes')(app);
require('./app/routes/comments.route')(app);
require('./app/routes/geolocalisation.routes')(app);

// //verify Role: 
// app.use(function(req, res, next) 
// {
//   if(req.decoded.UserType === "Admin"){
//     next();
//   }else{
//     res.status(401).send({message: "You don't have the priviledges",success:true});
//   }
// });

require('./app/routes/user.routes.js')(app);
require('./app/routes/accidents.routes')(app);

// listener
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});