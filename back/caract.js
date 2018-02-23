#!/usr/bin/env node

console.log("Here is me first fucking line in this project")
var Accident = require('./app/models/accidents.model');
var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var Papa= require('papaparse')
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
var mongoose = require('mongoose');
// Retrieve
var MongoClient = require('mongodb').MongoClient;

mongoose.connect("mongodb://localhost:27017/Traffic_accidents", {});
mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
    var instream = fs.createReadStream('/home/obisama/Downloads/accidents-corporels-de-la-circulation-en-france.csv');
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    var count = 0
    var count2 = 0
    var lin
    var doc
    rl.on('line', function(line) {
      // process line here
      lin=Array.from(line.split(";"));
     if( lin[38])
     {var accident = new Accident;

       
      accident.Num_acc= ++count
      accident.lumiere=lin[1]
      accident.condition_atm=lin[4]
      accident.type_collision=lin[5]
      accident.categorie_route=lin[7]
      lnt=Array.from(lin[38].split(","))
      accident.coord.lat=parseFloat(lnt[0])
      accident.coord.long=parseFloat(lnt[1])
      accident.nbr_morts=lin[20]
      accident.nbr_blessures=lin[21]+lin[22]
      accident.indice_gravite=lin[29]
      accident.departement=lin[6]
      accident.code_INSEE=lin[35]
      accident.situation=lin[19]
       
       accident.save(function(err, data) {
        console.log(count);
        if(err) {
        console.log({message: "Some error occurred while creating the User.", erreur:err});
        }
        else{
      
        }
      });}
     
    });

    rl.on('close', function() {
      // do something on finish here
      console.log("file ended")
    });
  
})
