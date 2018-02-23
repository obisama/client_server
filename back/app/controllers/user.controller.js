var User = require('../models/user.model.js');
var config= require('../../config/database.config');
var jwt    = require('jsonwebtoken'); 

exports.create = function(req, res) {
    // Create and Save a new user
    if(!req.body.username|| !req.body.password
        || !req.body.email|| !req.body.type
        ) 
        {
            res.status(400).send({message: "Some argument are missing !"});
        }   
    else{
        console.log("password= "+ req.body.password)
        var user = new User({
                    email:req.body.email, 
                    username: req.body.username ,
                    password: req.body.password,
                    UserType:req.body.type,
                     });

        user.save(function(err, data) {
        console.log(data);
        if(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the User."});
        } else {
        res.send(data);
     }
    
});
    }
};

exports.findAll = function(req, res) {
    // Retrieve and return all users from the database.
    User.find(function(err, users){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving users."});
        } else {
            res.send(users);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single user with a userId
    User.findById(req.params.userid, function(err, data) {
        if(err) {
        res.status(500).send({message: "Could not retrieve user with id " + req.params.userid});
         } else {
        res.send(data);
        }
});
};

exports.update = function(req, res) {
   
    User.findById(req.params.userId || req.body._id, function(err, user) {
        if(err || !user) {
            res.status(500).send({message: "Could not find a user with id " + req.params.userId 
                                  });
        }
       else {
        user.email = req.body.email || user.email
        user.username= req.body.username || user.username,
        user.password = req.body.password || user.password,
        user.UserType = req.body.type || req.body.UserType || user.UserType,
        user.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update user with id " + req.params.userId  
                                      ,erreurCode: err.code
                                    });
            } else {
                res.send(data);
            }
        });
     }});


};

exports.delete = function(req, res) {
    
      User.remove({_id: req.params.userId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete user with id " + req.params.userId});
        } else {
            res.send({message: "User deleted successfully!"})
        }
    });
};


// Authentification ////

exports.authentificate=function(req, res) {

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
          var user_data={username: user.username, email: user.email, userType: user.UserType}
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