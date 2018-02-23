module.exports = function(app) {

     var geo = require('../controllers/geolocalisation.controller.js');
     app.post('/localize',geo.getlocation);
     app.post('/directions',geo.getDirections)
 }