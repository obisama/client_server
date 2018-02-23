var mongoose = require('mongoose');
var AccidentScheme = new mongoose.Schema({

Num_acc: {
    type: String,
    unique: true,
    required: true,
  },
  categorie_route:{
      type: String,
      default:''
  },
lumiere: {
    type: String,
    default:''
  },
condition_atm: {
    type: String,
    default:''
  },
type_collision: {
    type: String,
    default:'NaN'
  },
coord: { 
   lat:{type:Number,required:true , index:true},
   long:{type:Number,required:true,index:true}
  },
nbr_morts: {type:String,
            default:'0'}
            ,
nbr_blessures:{type:String,default:'0'},
indice_gravite:{type:String,default:'0'},

departement:{
    type:String,
    default:''
},

code_INSEE:{
    type:String,
    default:""
},

situation:{
    type:String,
    default:''
}
});


var Accident = mongoose.model('Accident', AccidentScheme);
module.exports = Accident;