const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1/Habit_Tracker");
const db=mongoose.connection;

db.on("error",console.error.bind(console,"WTF Error in Moongoose ODM"));
db.once('open',function(){
  console.log("Connected To Databse");
});
module.exports=db;

