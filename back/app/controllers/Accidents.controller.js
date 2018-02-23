var Accident = require('../models/accidents.model');
var geolib= require('geolib')
const circleToPolygon = require('circle-to-polygon');


exports.create = function(req, res) {
        // Create and Save a new Accident
     if(!req.body.Num_acc || !req.body.coord.lat || !req.body.coord.long)        
        {
         res.status(400).send({message: "Some argument are missing ! {{coord.lat,coord.long,Num_acc}}"});
        }   
     else{
            var accident = new Accident;
            
            accident.Num_acc=req.body.Num_acc
            accident.coord.lat = req.body.coord.lat
            accident.coord.long = req.body.coord.long

            
                if( req.body.categorie_route)
                {accident.categorie_route=req.body.categorie_route}
            
                if( req.body.lumiere)
                {accident.lumiere=req.body.lumiere}
            
                if( req.body.condition_atm)
                {accident.condition_atm=req.body.condition_atm}
            
                if( req.body.type_collision)
                {accident.type_collision=req.body.type_collision}
            
                if( req.body.nbr_morts)
                { accident.nbr_morts=req.body.nbr_morts}
            
                if( req.body.nbr_blessures)
                {  accident.nbr_blessures=req.body.nbr_blessures}
           
                if( req.body.departement)
                { accident.departement=req.body.departement}
            
                if( req.body.code_INSEE)
                { accident.code_INSEE=req.body.code_INSEE}
            
                if( req.body.situation)
                {accident.situation=req.body.situation}
           
            accident.save(function(err, data) {
            if(err) {
            res.send({message: "Some error occurred while creating the Accident.",
                                   erreur: err.errmsg   });
            } else {
            res.send(data);
            }
            });
        }
    };
    
     // Retrieve and return all accidents from the database.

     exports.findAll = function(req, res) {
        var limits;
        var offsets; 
        if( parseInt(req.query.limit))
         {
            limits=parseInt(req.query.limit);
         }
            else{
             limits=15;
         }
         if(parseInt(req.query.offset))
         {
             offsets=parseInt(req.query.offset)
         } else{
             offsets=0;
         }
        console.log(offsets + " "+ limits)
        Accident
        .find()
        .limit(limits)
        .skip(offsets)
        .sort('+Num_acc')
        .exec(function(err, posts) {
            if(err) {
                res.status(500).send({message: "Some error occurred while retrieving accidents."});
            } else {
            console.log(posts)
            res.send(posts);
            }
});
    };
     // Find a single  accident with a numAccident
exports.findByNum = function(req, res) {
       console.log("i'm in findbynum" + req.params.accidentNum)
        Accident.findOne({ Num_acc: req.params.accidentNum }, function(err, data) {
            if(err || !data ) {
            res.status(500).send({message: "Could not retrieve accident with Num " +req.params.accidentNum});
             } else {
            res.send(data);
            }
    });
    };

    // Find a single accident with an id 
exports.findById = function(req, res) {
        
        Accident.findById( req.params.id , function(err, data) {
            if(err || !data) {
            res.status(500).send({message: "Could not retrieve accident with id " +req.params.id});
             } else {
            res.send(data);
            }
    });
    };
    
 

exports.updateByid = function(req, res) {
        Accident.findById(req.params.id || req.body._id, function(err, accident) {
            if(err || !accident) {
                res.status(500).send({message: "Could not find any accident with id: " + req.params.id});
            }
           else {

                if( req.body.coord.lat)
                 { accident.coord.lat = req.body.coord.lat}

                if( req.body.coord.long)
                 {accident.coord.long = req.body.coord.long}

                if( req.body.categorie_route)
                {accident.categorie_route=req.body.categorie_route}
            
                if( req.body.lumiere)
                {accident.lumiere=req.body.lumiere}
            
                if( req.body.condition_atm)
                {accident.condition_atm=req.body.condition_atm}
            
                if( req.body.type_collision)
                {accident.type_collision=req.body.type_collision}
            
                if( req.body.nbr_morts)
                { accident.nbr_morts=req.body.nbr_morts}
            
                if( req.body.nbr_blessures)
                {  accident.nbr_blessures=req.body.nbr_blessures}
           
                if( req.body.departement)
                { accident.departement=req.body.departement}          
               
                if( req.body.code_INSEE)
                { accident.code_INSEE=req.body.code_INSEE}
            
                if( req.body.situation)
                {accident.situation=req.body.situation}

            accident.save(function(err, data){
                if(err) {
                    res.status(500).send({message: "Could not update accident with id " + req.params.id || req.body._id  
                                          ,erreurCode: err.code
                                        });
                } else {
                    res.send(data);
                }
            });
         }});
    }; 

    exports.updateByNum = function(req, res) {
        if(req.params.accidentNum){
        Accident.findOne({ Num_acc: req.params.accidentNum }, function(err, accident) {
            if(err || !accident) {
                res.status(500).send({message: "Could not find any accident with Num_Accident: " + req.params.accidentNum});
            }
           else {
             if( req.body.coord.lat)
                 { accident.coord.lat = req.body.coord.lat}

                if( req.body.coord.long)
                 {accident.coord.long = req.body.coord.long}

                if( req.body.categorie_route)
                {accident.categorie_route=req.body.categorie_route}
            
                if( req.body.lumiere)
                {accident.lumiere=req.body.lumiere}
            
                if( req.body.condition_atm)
                {accident.condition_atm=req.body.condition_atm}

                if( req.body.indice_gravite)
                {accident.indice_gravite=req.body.indice_gravite}
            
                if( req.body.type_collision)
                {accident.type_collision=req.body.type_collision}
            
                if( req.body.nbr_morts)
                { accident.nbr_morts=req.body.nbr_morts}
            
                if( req.body.nbr_blessures)
                {  accident.nbr_blessures=req.body.nbr_blessures}
           
                if( req.body.departement)
                { accident.departement=req.body.departement}
            
                if( req.body.code_INSEE)
                { accident.code_INSEE=req.body.code_INSEE}
            
                if( req.body.situation)
                {accident.situation=req.body.situation}

            accident.save(function(err, data){
                if(err) {
                    res.status(500).send({message: "Could not update accident with id " + req.params.id || req.body._id  
                                          ,erreurCode: err.code
                                        });
                } else {
                    res.send(data);
                }
            });
         }});
        }
        else{
            res.status(500).send({message: "Could not find any accident with Num_Accident"})
        }   
    }; 
exports.deleteById = function(req, res) {
    
        Accident.remove({_id: req.params.id}, function(err, data) {
          if(err) {
              res.status(500).send({message: "Could not delete user with id " + req.params.id});
          } else {
              res.send({message: "Accident deleted successfully!"})
          }
      });
  };

exports.deleteByNum = function(req, res) {    
    Accident.remove({Num_acc: req.params.accidentNum}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete user with num " 
                                    + req.params.accidentNum});
        } else {
            res.send({ message: "Accident deleted successfully!" })
        }
    });  
   };

   
// request example :  {lat: 51.5103, long: 7.49347 , raduis: 222000 //meters}, 
// find by raduis
exports.findByRaduis=function(req, res) {
    //console.log(geolib.getBounds([51.5103,7.49347]))
    if( !req.query.lat || !req.query.long || !req.query.raduis)
    {
        res.send({ message: " latitiude and longitude missing [lat, long, raduis]"})
    }
    var long=parseFloat(req.query.long)
    var lat =parseFloat(req.query.lat)
    var raduis=parseInt(req.query.raduis)

    console.log(" long :"+long + " lat : "+lat + " raduis:"+raduis)

    coordinates = [lat,long]; //[ lat,lon] 
    radius = raduis;                           // in meters 
    numberOfEdges = 32; 
    let polygon = circleToPolygon(coordinates, radius, numberOfEdges);
    console.log(polygon)
    var max_lat,min_lat,max_long,min_long;
    max_lat=parseFloat(polygon.coordinates[0][1][0])
    min_lat=parseFloat(polygon.coordinates[0][1][0])
    max_long=parseFloat(polygon.coordinates[0][1][1])
    min_long=parseFloat(polygon.coordinates[0][1][1])

   for (var i=0; i<polygon.coordinates[0].length;i++)
    { 
        var floatlat = parseFloat(polygon.coordinates[0][i][0])
        var floatlong=parseFloat(polygon.coordinates[0][i][1])

        if( min_lat>=floatlat)
            min_lat=floatlat
        
        if(max_lat<=floatlat)
            max_lat=floatlat
        
        if(min_long>= floatlong)
            min_long=floatlong

        if(max_long<= floatlong)
            max_long=floatlong

    }
    console.log(min_lat+" ,"+ min_long + ";;;; "+ max_lat + ","+max_long)
    
    Accident.find({'coord.lat':{"$gte":min_lat,"$lte":max_lat},"coord.long":{"$gte":min_long,"$lte":max_long}},function(err, data)
    {
        if(err)
        {
            console.log(err)
        }
        else {
            var results= new Array();
            for( var i = 0 ; i<data.length;i++)
            {
                console.log( "{latitude:" + data[i].coord.lat +", longitude:"+data[i].coord.long+"}    {latitude:"+ coordinates[0]+", longitude:" + coordinates[1]+"}")
                console.log(geolib.isPointInCircle(
                    {latitude:  data[i].coord.lat, longitude:data[i].coord.long},
                        {latitude: coordinates[0], longitude:  coordinates[1]},       
                        radius
                    ))
                if( geolib.isPointInCircle(
                {latitude:  data[i].coord.lat, longitude:data[i].coord.long},
                    {latitude: coordinates[0], longitude:  coordinates[1]},        
                    radius
                ))
                {results.push(data[i])}
            }
            res.send({result: results})
        }})
    };
    
exports.Findbynodes=function(req, res) {
        res.send({message:"Not supported Yet, Will be here soon!"})
    };