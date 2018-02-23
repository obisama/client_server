module.exports = function(app) {

    var users = require('../controllers/user.controller.js');
    
    
    // Create a new user
    app.post('/user', users.create);
    // Retrieve all users
    app.get('/user', users.findAll);
    // Retrieve a single user 
    app.get('/user/:userId', users.findOne);
    // Update a user
    app.put('/user/:userId', users.update);
    // Delete a user
    app.delete('/user/:userId', users.delete);

}