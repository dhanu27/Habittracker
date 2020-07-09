const mongoose =require('mongoose');
// const Habit = require('./habit');

const progressSchema=new mongoose.Schema({
    date:{
      type:Date,
      default:Date.now()
    },
    habit_id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'habit'
        },
    status:{
           type:String
        }
},
{timestamp:true},);

const progress= mongoose.model('progress',progressSchema);
module.exports=progress;