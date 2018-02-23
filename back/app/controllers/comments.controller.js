var Comment = require('../models/comment.model.js');

that=this;
exports.create = function(req, res) {
    // Create and Save a new user
    if( !req.body.usersId|| !req.body.accidentID || !req.body.content  ) 
        {
            res.status(400).send({message: "Some argument are missing ! {{usersId, accidentID, content}}"});
        }   
    else{
        var comment = new Comment({
            Num_Comment:req.body.Num_Comment || "ToDo",
            date:new Date(),
            usersId:req.body.usersId,
            accidentID:req.body.accidentID,
            accidentNum:req.body.accidentNum,
            content:req.body.content
        })

        comment.save(function(err, data) {
        console.log(data);
        if(err) {
        console.log(err);
        res.status(500).send({success:false ,message: "Some error occurred while creating the Comment.",err:err.errmsg});
        } else {
        res.send({success:true,content:data});
     }
});}
};
exports.findAll = function(req, res) {
    // Retrieve and return all comments from the database.
    Comment.find({ 'accidentID': req.params.accidentID || "000" },function(err, comments){
        if(err) {
            res.status(500).send({success:false,message: "Some error occurred while retrieving comments."});
        } else {
            res.send({success:true,content:comments});
        }
    });
};
exports.findAllUID = function(req, res) {
 // Retrieve and return all comments from the database for a user.
 Comment.find({ 'usersId': req.params.usersId || "000" },function(err, comments){
    if(err) {
        res.status(500).send({success:false,message: "Some error occurred while retrieving comments."});
    } else {
        res.send({success:true,content:comments});
    }});
};

exports.findOne = function(req, res) {
    // Find a single user with a comnentId
    User.findById(req.params.commentId, function(err, data) {
        if(err) {
        res.status(500).send({success:false,message: "Could not retrieve comment with id " + req.params.userid});
         } else {
        res.send({success:true,content:data});
        }
});
};
exports.update = function(req, res) {
   
    User.findById(req.params.commentId || req.body._id, function(err, comment) {
        if(err || !user) {
            res.status(500)
            .send({message: "Could not find any comment with id " + req.params.commentId });
        }
       else {
        comment.content=req.body.content || req.body.content;
        comment.save(function(err, data){
            if(err) {
                res.status(500).send({success:false,message: "Could not update comment with id " + req.params.commentId  
                                      ,erreurCode: err.code
                                    });
            } else {
                res.send({success:true,content:data});
            }
        });
     }});


};

exports.delete = function(req, res) {
    
      User.remove({_id: req.params.commentId}, function(err, data) {
        if(err) {
            res.status(500).send({success:false,message: "Could not delete comment with id " + req.params.commentId});
        } else {
            res.send({success:true,message: "User deleted successfully!"})
        }
    });
};

