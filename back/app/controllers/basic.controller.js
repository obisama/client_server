var User = require('../models/user.model.js');
var Accident = require('../models/accidents.model');
var Comment = require('../models/comment.model.js');

module.exports.getstats=function(req,res)
{ 
   
    var_stats={};

    User.count({UserType:'Admin'},function(err,count)
    {
        if( err) {
            res.status(500).send(
                {
                    success:false,
                    message:'Some error occured while treating the request'
                }
            )
        }
        var_stats.nbr_admins=count;
        User.count({UserType:'Normal'},function(err,count)
    {
        if( err) {
            res.status(500).send(
                {
                    success:false,
                    message:'Some error occured while treating the request '
                }
            )
        }
        var_stats.nbr_basic_users=count;
        
    Accident.count({},function(err,count)
    {
        if( err) {
            res.status(500).send(
                {
                    success:false,
                    message:'Some error occured while treating the request (accidents)'
                }
            )
        }
        var_stats.nbr_accidents=count;
        
    Comment.count({},function(err,count)
    {
        if( err) {
            res.status(500).send(
                {
                    success:false,
                    message:'Some error occured while treating the request (comments)'
                }
            )
        }
        var_stats.nbr_comments=count;
        User.count({},function(err,count)
    {
        if( err) {
            res.status(500).send(
                {
                    success:false,
                    message:'Some error occured while treating the request (comments)'
                }
            )
        }
        var_stats.nbr_ttl_users=count;
        res.send( { success:true,
            data:var_stats
            })
            })})})})}) 
}