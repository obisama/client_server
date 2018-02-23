var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({

Num_Comment: {
    type: String,
    required: true,
    trim: true
  },
date: {
    type: Date,
    unique: false,
    required: true,
    trim: false
  },
usersId: {
    type: String,
    required:true
  },
accidentID: {
    type: String,
    required:true
  },
accidentNum: {
    type: String,
    default:"null"
  },
content: {
    type: String,
    required:true,    
}

});


var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;