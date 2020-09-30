//The core Firebase JS SDK is always required and must be listed first 

// TODO: Add SDKs for Firebase products that you want to use
  //   https://firebase.google.com/docs/web/setup#available-libraries 


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDyqvyf4MyVLzv4mlXH-chr5yLtxNO1vgU",
    authDomain: "sozentech-incentive-board.firebaseapp.com",
    databaseURL: "https://sozentech-incentive-board.firebaseio.com",
    projectId: "sozentech-incentive-board",
    storageBucket: "sozentech-incentive-board.appspot.com",
    messagingSenderId: "624774876446",
    appId: "1:624774876446:web:e2038a98dbe03d770f4d0f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



//barchart
const labels = [
  "Completed Tasks",
  "Assigned Tasks"
  
];
const database = firebase.database();

database.ref().child("tasktable").on('value', function(snapshot) 
{
   if (snapshot.exists()) {
     var content1 = 0;
     var content2 = 0;
     var i = 1;
     var j = 1;
     var data1 = [];
     snapshot.forEach(function (data) {
     var val = data.val();
     if(val.status === "completed"){
       content1 += i;
       i++;
     }
  
     if((val.status === "assigned") || (val.status === "request approval")){
       
      content2 += j;
      j++;
     }

     data1 = [content1, content2];
    
       const bar = document.getElementById("barChart").getContext('2d');
       const myChart = new Chart(bar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                   label: "Tasks",
                    data: data1,
                    borderColor: ['#86BADF', '#1C4FC4'],

                    backgroundColor: ['white', '#1C4FC4']
                }
            ]
        },


        responsive: true,
        options: {
            
            title: {
                display: true,
                text: 'Task Based BarChart'
            }
        }
      });
     });
      
   } 
  
           });
  
 

//tasks table

   database.ref().child("tasktable").on('value', function (snapshot) 
   {
   if (snapshot.exists()) {
                  
    var i = 0; 
    snapshot.forEach(function (data) {
     
  if((data.child("status").val() === "") || (data.child("status").val() === "assigned") || (data.child("status").val() === "request approval") || (data.child("status").val() === "completed")) {
 
   
     const taskname = data.child("taskName").val();
     console.log(taskname);
     const points = data.child("points").val();
    console.log(points);
    const status = data.child("status").val();
     console.log(status);
    const expiry = data.child("expiryDate").val();
     console.log(points);
    const description = data.child("taskDescription").val();
   const availability = data.child("availableUntil").val();
    // retrive data from database and append to HTML table
  $("#tasks-table").append(`<tr><td id="taskname${i}">` + taskname + `</td>
  <td id="taskdesc${i}">` + description + `</td>
  <td id="available${i}">` + availability + `</td>
  <td id="expiry${i}">` + expiry + `</td><td id="points${i}">` + points +"</td><td>" + status  + `</td><td><a href="#"><i id="edit${i}" class="fa fa-edit" style="color: #1C4FC4"></i></a></td><td><a href='#'><i id='completed${i}' class='fa fa-check-circle' style='color: #1C4FC4'></i></a></td><td><a href="#"><i id="delete${i}" class="fa fa-trash" style="color: #1C4FC4"></i></a></td></tr>`);

  if((data.child("status").val() === "assigned") || (data.child("status").val() === "completed") || (data.child("status").val() === "")){
    $(`#completed${i}`).css({'display': 'none'});
    }
 var name1 = document.getElementById(`taskname${i}`).innerHTML;
var desc1 =  document.getElementById(`taskdesc${i}`).innerHTML; 
var points1 = document.getElementById(`points${i}`).innerHTML;
var expiry1 = document.getElementById(`expiry${i}`).innerHTML;
var availability1 =  document.getElementById(`expiry${i}`).innerHTML;
$(`#delete${i}`).on("click", () => {
//  Modify task, table data to form and back to update database 
$("#tModify").hide();
  var txt;
  if(confirm("Are you sure you want to delete the task?")) {
  txt = "OK";
  } else {
  txt = "Cancel";
  }
  if(txt == "OK"){ 
database.ref("tasktable").child(data.key).remove();
location.reload("#tasks-table");
  }
})
  $(`#edit${i}`).on("click", () => {
    console.log(i);

 $(".bar-graph").hide();

$(".employer-table").hide();
$(".header").hide();
$(".button").hide();
$("#sidebar").hide();
$("#tModify").show();
$(".footer").hide();
document.getElementById("name").value = name1;
document.getElementById("description").value = desc1;
document.getElementById("points").value = points1;
document.getElementById('expiry').value = expiry1;
document.getElementById("availability").value = availability1;
 $("#addModify").on("click", () => {
                  
 const taskName =  document.getElementById("name").value;
 const taskDescription = document.getElementById("description").value;
 const  points = document.getElementById("points").value;
 const expiryDate =  document.getElementById('expiry').value;
const  availableUntil = document.getElementById("availability").value
                   
 database.ref().child("tasktable").child(data.key).update({taskName : taskName, taskDescription : taskDescription, points : points, expiryDate : expiryDate, availableUntil : availableUntil});
 document.getElementById("name").value = null;
 document.getElementById("description").value = null;
 document.getElementById("expiry").value = null;
 document.getElementById("availability").value = null;
 document.getElementById("points").value = null;
                    
 });
  });

  document.getElementById(`completed${i}`).onclick = completedTask;

// approving the task as completed

  function completedTask(){
   if(data.child("status").val() === "request approval"){                       
   
   var txt;
  if(confirm("Are you sure you want to approve?")) {
  txt = "OK";
  } else {
  txt = "Cancel";
  }
  if(txt == "OK"){ 
    var points = 0;
    database.ref('tasktable').child(data.key).update({"status": "completed"});
    database.ref("3rgaP42paCP009E1IKv6pYlAilq1").child("employeeDetails").once("value", (snapshot1) => {
      
   points = Number(snapshot1.child("employeePoints").val()) + Number(data.child("points").val());
  
  database.ref("3rgaP42paCP009E1IKv6pYlAilq1").child("employeeDetails").update({"employeePoints": points});
  location.reload("#tasks-table");
    txt = "";
    return true;
   
    })
  }
 
  }
} 
 
} 
                        
i++;      
 })
  }
                    
                  
  });
// on click close icon go back to employer main page
  document.getElementById("tclose").onclick = function(){
    location.href = "Employer Home.html"
  }
              

    // Logout going to login page
   $("#logout").on('click', () => {
   location.href = "../../login.html";
   })
// hide the modify task form when page loads
$(document).ready(function(){
  $("#tModify").hide();
  });
