const Habit=require('../models/habit');
const Progress=require('../models/progress');
const progress = require('../models/progress');
const moment =require('moment');
module.exports.create=async function(req,res){
    
    try{
        let habit= await Habit.create({
            name:req.body.habit
          });
         let progress=await Progress.create({date:Date.now(),habit_id:habit._id,status:'None'});
          console.log("Newprogress",progress);
          return res.redirect('back');
    }catch(error){
       console.log("Error",error);
    }

}

module.exports.habits=async function(req,res){
    try{
        let habits= await Habit.find();
        if(req.xhr){
         return res.json({
             data:habits
         });
        }
        
          return res.render('home',{
              title:"Habits",
              habits:habits  
          });
    }catch(error){
       console.log("Error",error);
    }
}

module.exports.creatProgress=async function(req,res){
    try{
        // console.log(req.body.date+"T00:00:00.000Z");
        let habit=await Progress.findOne({habit:req.params.id,day:req.body.date+"T00:00:00.000Z"});
        if(habit){
            habit.status=req.body.status;
            console.log("%%%%%%HAbit",habit);
            habit.save();
        }
       else{
          let week=await Progress.create({
            habit_id:req.params.id,
            date:req.body.date,
            status:req.body.status
           });
        //    console.log(week);
       } 
        return res.redirect('back');

    }catch(err){
       console.log("Error",err);
    }
};
let week=[];
let curr = new Date 
for (let i = 0; i <= 7; i++) {
    let first = curr.getDate() - curr.getDay() + i 
          let day =new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    // let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
    week.push(day)
  }
module.exports.last6dayProgress=async function(req,res){
    try{
        // let habits= await Habit.find();
       let data=await Progress.aggregate([
            {$match:{ "date": {$gte: (new Date((new Date()).getTime() - (7 * 24 * 60 * 60 * 1000)))}}},
            {$group: {
                     _id: '$habit_id',
                      dates: {"$push":{
                       "$toString": "$date"     
                      }},
                      status:{"$push":"$status"},
                 }
            },
            {$project: {_id:0 , habit_id: '$_id', dates: "$dates",status:"$status"}}
            ])  
        data= await Progress.populate(data, {path: "habit_id"});
        // if(data.length==0){
        //     let habits= await Habit.find();
        //     habits.forEach((habit)=>{
                
        //     })
        // }
    
        data.forEach((Data)=>{
            Data.mymap=new Map();
            week.forEach((i)=>{
                let str=i+'T00:00:00.000Z';
                 if(!Data.dates.includes(str)){
                     Data.mymap.set(i,"None");
                 }
                else{
                    let indx=Data.dates.indexOf(str);
                    Data.mymap.set(i,Data.status[indx]);
                } 
                });   
        }) 
        console.log("data",data);
        return res.render('weekly',{
            details:data
        });
    }catch(error){
       console.log("Error",error);
    }
}

module.exports.updateStatus=async function(req,res){
    try{
      let progress= await Progress.findOne({date:req.query.date+"T00:00:00.000Z",habit_id:req.query.id});
      console.log("ioooo",progress);
      if(progress){
        if(progress.status=='Done'){
            progress.status='NotDone';
            progress.save();
        }
        else{
            progress.status='Done';
            progress.save();
        }
        console.log("update",progress);
    }else{
        progress=await Progress.create({date:req.query.date+"T00:00:00.000Z",habit_id:req.query.id,status:'Done'});
    }  
    console.log("update",progress);
       return res.json({
           message:"Successfully updated",
           data:progress
       }); 
    }catch(err){
      console.log("Error while updation",err);
      return ;
    }
}
//[ {id :"",name:"",progress:["{date:"",status:" "}","","","","","",""]},]