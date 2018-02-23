var auth = require('../controllers/Auth.controller.js');
    
module.exports = function(app) {
    app.post('/authentificate',auth.authentificate);
    app.post('/register',auth.register);
}