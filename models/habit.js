const mongoose=require('mongoose');

const HabitSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true});

const habit= mongoose.model('habit',HabitSchema);
module.exports=habit;