const express=require('express');

console.log("Routers Loaded");
const routes =express.Router();
const habitController=require('../controllers/habit'); 
routes.get("/", habitController.habits);
routes.post('/add',habitController.create);
routes.post('/changestatus/:id',habitController.creatProgress);
routes.post('/habits/progress',habitController.updateStatus); 
routes.get('/weeklydata',habitController.last6dayProgress);
module.exports=routes;