var accidents = require('../controllers/Accidents.controller.js');
module.exports = function(app) {
  
    // create an accident.
    app.post('/accidents',accidents.create)
    app.post('/accidents/id/',accidents.create)
    app.post('/accidents/num/',accidents.create)
    
   
    
    // update a single accideent by id
    app.put('/accidents/id/:id',accidents.updateByid)
    // delete a single accident by id: 
    app.delete('/accidents/id/:id',accidents.deleteById)
     // update an accident identified by num
    app.put('/accidents/num/:accidentNum',accidents.updateByNum)
    // delete an accidents
    app.delete('/accidents/num/:accidentNum',accidents.deleteByNum)

}