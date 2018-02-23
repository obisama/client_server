var accidents = require('../controllers/Accidents.controller.js');
var comments=require('../controllers/comments.controller')
var basic=require('../controllers/basic.controller')
module.exports = function(app) {

    /// Accidents routes 
    //comments 
     // Retrieve all comments for an accident
     app.get('/comments/accidents/:accidentID', comments.findAll);
     //Retrieve all comments of a user
     app.get('/comments/users/:usersId', comments.findAllUID);
     // Retrieve a single comment of an accidentID
     app.get('/comments/:commentId', comments.findOne);
    // get all the Accidents in the Database.
    app.get('/accidents',accidents.findAll);
    app.get('/accidents/id/',accidents.findAll);
    // get a single accident by id:
    app.get('/accidents/id/:id',accidents.findById)
     // get accidents in a circle:
    app.get('/accidents/raduis',accidents.findByRaduis)
     // get accidents between two nodes
    app.get('/accidents/road',accidents.Findbynodes) 
     // get a single accident by the number of accident
    app.get('/accidents/num/:accidentNum',accidents.findByNum)
    app.get('/stats',basic.getstats)
};