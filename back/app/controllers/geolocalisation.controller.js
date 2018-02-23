var NodeGeocoder = require('node-geocoder');
var geolib= require('geolib')
var Accident=require('../models/accidents.model');
var polyline = require('polyline');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyB7PnFFiKERfOBpzeIgH3RB5knxYFuz0Dw'
  });

var options = {
    provider: 'google',
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: ' AIzaSyB7PnFFiKERfOBpzeIgH3RB5knxYFuz0Dw ', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };
   

exports.getlocation=function(req,res) 
{
    
    var geocoder = NodeGeocoder(options);
       
       
    if( !req.body.addr  ) 
    {
        res.status(400).send({message: "Some argument are missing ! {{addr}}"});
    }   
    else
    {
        geocoder.geocode(req.body.addr)
        .then(function(result) {
            res.status(200).send({result: result,success:true})
            })
        .catch(function(error) {
            res.status(400).send({result:null,success:false})
  });
    }
}

exports.getDirections=function(req,res){
    var tab = [];
    var accidents = [];
    console.log(req.body)
   
    var orig=req.body.origin;
    var dest=req.body.destination;

    if(!req.body.destination || !req.body.origin)
   { res.status(403).send({ success:false,message:"missing arguments"})};

    googleMapsClient
    .directions({ origin: orig, destination: dest }, (err, result) => {
      if(err) {
          res.send({success:false,message:'wrong arguments entries..'})
      }
        console.log(result)
        var routes = result.json.routes;
      var legs = [];
      var steps = [];
      for (var i = 0; i < routes.length; i++) {
        legs = routes[i].legs;
        for (var j = 0; j < legs.length; j++) {
          steps = legs[j].steps;
          for (var k = 0; k < steps.length; k++) {
            tab.push(steps[k].polyline);
          }
        }
      }
      var tab1 = [];
      for (var i = 0; i < tab.length; i++) {
        tab1.push(polyline.decode(tab[i].points));
      }
      var tab2 = [];
      var tab3 = [];
      var z = 0;
      var maxlng,maxltd, minlng,minltd;

      for (var i = 0; i < tab1.length; i++) {
        tab2 = tab1[i];
        if (i === 0) {
          for (j = 0; j < tab2.length; j++) {
            var obj = {};
            obj.latitude = tab2[j][0];
            obj.longitude = tab2[j][1];
            tab3.push(obj);
          }
        } else {
          for (j = 1; j < tab2.length; j++) {
            var obj = {};
            obj.latitude = tab2[j][0];
            obj.longitude = tab2[j][1];
            tab3.push(obj);
          }
        }
      }
      maxlng = tab3[0].longitude;
      minlng = tab3[0].longitude;
      maxltd = tab3[0].latitude;
      minltd = tab3[0].latitude;

      for (var i = 1; i < tab3.length; i++) {
       
          if (tab3[i].longitude > maxlng) {
            maxlng = tab3[i].longitude
          }
          if (tab3[i].longitude < minlng) {
            minlng = tab3[i].longitude;
          }
          if (tab3[i].latitude > maxltd) {
            maxltd = tab3[i].latitude;
          }
          if (tab3[i].latitude < minltd) {
            minltd = tab3[i].latitude;
          }
        }
        console.log(minltd+" "+ maxltd+" "+minlng+" "+maxlng)
        Accident.find({'coord.lat':{"$gte":minltd,"$lte":maxltd},"coord.long":{"$gte":minlng,"$lte":maxlng}},function(err, resultat)
        {
            if(err){res.send(err)}
        for (var i = 0; i < resultat.length; i++) {
          for (var j = 0; j < tab3.length - 1; j++) {
            var isInLine1 = geolib.isPointInCircle({ latitude: resultat[i].coord.lat, longitude: resultat[i].coord.long }, tab3[j], 2000);
            if (isInLine1 == true) {
              var accident = 
              { latitude: resultat[i].coord.lat,
                 longitude: resultat[i].coord.long,
                  grav: resultat[i].indice_gravite,
                   _id: resultat[i]._id };
              accidents.push(accident);
              break;
            }}}

        res.send(accidents);
      })
        
    });

}