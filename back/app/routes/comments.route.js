module.exports = function(app) {

    var comments = require('../controllers/comments.controller.js');
    
    //add a new comment
    app.post('/comments/accidents',comments.create);
    
    // Update a comment
    app.put('/comments/:commentId', comments.update);
    app.put('/comments/accidents/:commentId', comments.update);
    // Delete a comment
    app.delete('/comments/:commentId', comments.delete);
    app.delete('/comments/:commentId', comments.delete);
}