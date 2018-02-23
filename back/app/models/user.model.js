var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({
  
 email: {
    type: String,
    unique: true,
    //required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    //required: true,
    trim: true
  },
  password: {
    type: String,
    //required: true,
  },

  UserType:{
      type:String,
      enum : ['Admin','Normal'],
      default: 'Normal',
      //required:true
  }
});

UserSchema.pre('save', function (next) {
      var user = this;
      bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      })
    });

UserSchema.methods.comparePassword = function(password) {
    console.log(this.password +" "+password)
        if(!password || !this.password) {return false;}
        return bcrypt.compareSync(password, this.password);
      };
    
var User = mongoose.model('User', UserSchema);
module.exports = User;