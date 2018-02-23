#!/usr/bin/env node

console.log("Here is me first fucking line in this project")

var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var fs = require('fs');
var readline = require('readline');
var stream = require('stream');
const assert = require('assert');
// Retrieve
var MongoClient = require('mongodb').MongoClient;


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/Traffic_accidents", function(err, db) {
 
  
  if(err) {
      console.log(err);
     return console.dir(err); 
  }
  const myawesomeDb=db.db("Traffic_accidents")
  var collection = myawesomeDb.collection('Vehicules');
  var Accidents= myawesomeDb.collection('Accidents');
  
//for( var j=2005;j<=2016;j++)
//{
    var instream = fs.createReadStream('DATA/Csv_DATA/test.csv');
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    var count = 0
    var count2 = 0
    var lin
    var doc
    rl.on('line', function(line) {
      
      if(count==0)
     {
       console.log("first line")
       console.log(line)
       count++
     }
    lin=Array.from(line.split(","));
    console.log(lin[0])
    Accidents.findOne({Num_acc:{$eq:lin[0]}}, function(err, doc) {
     
        
      if( err){return console.dir(err); }
      if(doc){ 
        
        document= {
            "id_accident":doc._id,
            "Num_Acc":lin[0],
            "catv": lin[2],
            "obstacle": lin[2], 
            "ObsMobile": lin[5],
             "choc":lin[6],
            }
        console.log("i'm doc"+ doc)
        collection.insert(document)
        
      }
        
      });
    
    });
   /* 
    docc= {
      "id_accident":1,
      "Num_Acc":lin[0],
      "catv": lin[2],
      "obstacle": lin[2], 
      "ObsMobile": lin[5],
       "choc":lin[6],
      }
  console.log("i'm doc"+ doc)
  query={Num_acc:{$ne:'"'+lin[0]+'"'}};
  console.log("query"+ JSON.stringify(query))
  Accidents.findOne(query, function(err, doc) {
    if (doc) {
       // console.log("result: "+doc._id + "  "+doc.Num_Acc)
       for (var property in doc) {
       var output = property + ': ' + doc[property]+'; ';
       console.log(output)
      }
          }                   
    });
    */
  
  //collection.insert(doc)
   
    rl.on('close', function() {
      // do something on finish here
      console.log("file ended")
    });
  });

/*"

La rubrique VÉHICULES
Num_Acc
Identifiant de l’accident identique à celui du fichier "rubrique CARACTERISTIQUES " repris pour chacun des véhicules
décrits impliqués dans l’accident

catv
Catégorie du véhicule :
01 - Bicyclette
02 - Cyclomoteur <50cm3
03 - Voiturette (Quadricycle à moteur carrossé) (anciennement "voiturette ou tricycle à moteur")
04 - Référence plus utilisée depuis 2006 (scooter immatriculé)
05 - Référence plus utilisée depuis 2006 (motocyclette)
06 - Référence plus utilisée depuis 2006 (side-car)
07 - VL seul
08 - Catégorie plus utilisée (VL + caravane)
09 - Catégorie plus utilisée (VL + remorque)
10 - VU seul 1,5T <= PTAC <= 3,5T avec ou sans remorque (anciennement VU seul 1,5T <= PTAC <=3,5T)
11 - Référence plus utilisée depuis 2006 (VU (10) + caravane)
12 - Référence plus utilisée depuis 2006 (VU (10) + remorque)
13 - PL seul 3,5T <PTCA <= 7,5T
14 - PL seul > 7,5T
15 - PL > 3,5T + remorque
16 - Tracteur routier seul
17 - Tracteur routier + semi-remorque
18 - Référence plus utilisée depuis 2006 (transport en commun)
19 - Référence plus utilisée depuis 2006 (tramway)
20 - Engin spécial
21 - Tracteur agricole
30 - Scooter < 50 cm3
31 - Motocyclette > 50 cm et <= 125 cm
32 - Scooter > 50 cm et <= 125 cm
33 - Motocyclette > 125 cm
34 - Scooter > 125 cm
35 - Quad léger <= 50 cm (Quadricycle à moteur non carrossé)
36 - Quad lourd > 50 cm (Quadricycle à moteur non carrossé)
37 - Autobus
38 - Autocar
39 - Train
40 - Tramway
99 - Autre véhicule


obs
Obstacle fixe heurté :
1 – Véhicule en stationnement
2 – Arbre
3 – Glissière métallique
4 – Glissière béton
5 – Autre glissière
6 – Bâtiment, mur, pile de pont
7 – Support de signalisation verticale ou poste d’appel d’urgence
8 – Poteau
9 – Mobilier urbain
710 – Parapet
11 – Ilot, refuge, borne haute
12 – Bordure de trottoir
13 – Fossé, talus, paroi rocheuse
14 – Autre obstacle fixe sur chaussée
15 – Autre obstacle fixe sur trottoir ou accotement
16 – Sortie de chaussée sans obstacle

obsm
Obstacle mobile heurté :
1 – Piéton
2 – Véhicule
4 – Véhicule sur rail
5 – Animal domestique
6 – Animal sauvage
9 – Autre
choc
Point de choc initial :
1 - Avant
2 – Avant droit
3 – Avant gauche
4 – Arrière
5 – Arrière droit
6 – Arrière gauche
7 – Côté droit
8 – Côté gauche
9 – Chocs multiples (tonneaux)

La rubrique USAGERS
Num_Acc
Identifiant de l’accident identique à celui du fichier "rubrique CARACTERISTIQUES " repris pour chacun des usagers
décrits impliqués dans l’accident

La rubrique USAGERS: 
tout les gens qui sont morts.... maybe i have to amke another collection for this...

catu
Catégorie d'usager :
1 - Conducteur
2 - Passager
3 - Piéton
4 - Piéton en roller ou en trottinette
grav
Gravité de l'accident : Les usagers accidentés sont classés en trois catégories de victimes plus les indemnes
1 - Indemne
2 - Tué
3 - Blessé hospitalisé
4 - Blessé léger
sexe
Sexe de l'usager : pour savoir si c'est un masculin ou feminin
1 - Masculin
2 – Féminin 
An_nais: pour prendre l'age.

"*/