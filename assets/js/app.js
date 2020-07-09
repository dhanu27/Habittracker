console.log("hello");
// let habitLists=[];
// let getAllHabits=function(){   
//     $.ajax({
//         type:"get",
//         url:'/',
//         success:function(data){
//             console.log(data);
//         },error:function(err){
//            console.log("error",err);
//         }
//     });
// }
// getAllHabits();
// function formatDate(date){
//     var dd = date.getDate();
//     var mm = date.getMonth()+1;
//     var yyyy = date.getFullYear();
//     if(dd<10) {dd='0'+dd}
//     if(mm<10) {mm='0'+mm}
//     date = mm+'/'+dd+'/'+yyyy;
//     return date
//  }
//  let status=[]; 
//  let result = [];
// function Last7Days () {
//     for (var i=0; i<7; i++) {
//         var d = new Date();
//         d.setDate(d.getDate() - i);

//         result.push( formatDate(d) )
//     }
//     return(result.join(','));
// }
// let weeklylink=$("#weekly");
// weeklylink.click(function(e){
//    e.preventDefault();
//    $.ajax({
//        method:"GET",
//        url:weeklylink.prop('href'),
//        success:function(data){
//            console.log(data);
//        },error:function(error){
//            console.log(error);
//        }
//    })
// })
// let curr = new Date 
// let week = []
// var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// let caption=document.getElementById("month");
// console.log(caption);
// console.log(months[curr.getMonth()]+" "+curr.getFullYear());
// caption.innerHTML=months[curr.getMonth()]+" "+curr.getFullYear();
// var daylist = ["Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday","Sunday"];
// let dayListRow=document.getElementById("days-list");
// for (let i = 1; i <= 7; i++) {
//   let first = curr.getDate() - curr.getDay() + i 
//   let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
//   week.push(day)
// }
// let firstday=curr.getDay();
// for(let i=0; i<7; i++){
//     console.log("Today is : " + daylist[firstday+i] + ".");
//     var th=document.createElement('td');
//         th.innerHTML ='<th>'+daylist[firstday+i]+'</th>';
//         dayListRow.appendChild(th);
// }

let updateHabit =function(deletelink){
    $(deletelink).click(function(e){
        console.log("Inside");
        e.preventDefault();
        $.ajax({
            type:"post",
            url:$(deletelink).prop('href'),
            success:function(data){
                // $(deletelink).toggleClass("Done NotDone");
                console.log("uuio",data);
                $(deletelink).html(data.status);
              
            },error:function(error){
               console.log("kmew");
            }
        });
    });
 }
 let statusbttn=document.getElementsByClassName("statuslink");
   
 for(let i=0; i<statusbttn.length; i++){
     console.log(i);
     updateHabit(statusbttn[i]);
 }



console.log(week);
 




 
