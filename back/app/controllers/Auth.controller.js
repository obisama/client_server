var User = require('../models/user.model.js');
var config= require('../../config/database.config');
var jwt    = require('jsonwebtoken'); 


exports.authentificate = function(req, res) {

    // find the user
    User.findOne({
      email: req.body.email
    }, function(err, user) {

      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } 
      else if (user) {
        // check if password matches
        
        if (!user.comparePassword( req.body.password)) {
          res.status(500).json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
        const payload = {
        user: user,
        userType: user.userType
      };
          var user_data={username: user.username, email: user.email, userType: user.UserType, _id:user._id}
          var token = jwt.sign(payload, config.secret,{ expiresIn: '1h' });
          // return the information including token as JSON
          res.json({
            success: true,
            "user": user_data,
            userType:user.userType,
            message: 'Your token is ready, Enjoy your Day!',
            token: token
          });
        }   
  
      }
  
    });
};

exports.register= function(req,res)
{
 if( !req.body.email || !req.body.username || !req.body.password) 
 {
    res.status(403).send(
        {
            message : "missing arguments !"
        })
 }
else {
    var user = new User;
    user.email=req.body.email;
    user.username=req.body.username;
    user.userType='Normal';
    user.password=req.body.password;

    user.save(function(err, data) {
        if(err) {
        console.log(err);
        res.status(403).send({message: "Some error occurred while creating the User."});
        } else {
        res.send({ success:true,data:data });
        }
    });

}};
