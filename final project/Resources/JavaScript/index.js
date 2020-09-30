// Firebase realtime Database access

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


// After page loading hide and show html content on the pages

$(document).ready(() => {
    
        $(".tasks-table").hide();
        $("#pointslog-table").hide();
       
        $("#rewards-table").hide();
      
        $('#employee').show();
        $(".tasks-table").hide();
        $("#pointslog-table").hide();
        $(".grid-container").show();
        $("#rewards-table").hide();
 
  $("#dashboard").on("click", () => {
  
    $(".tasks-table").hide();
    $("#rewards-table").hide();
    $("#pointslog-table").hide();
    $("#first-page").show();
  
    $(".emp-table").show();
    
    $(".bar-chart").show();
    $(".pie-chart").show();
  })
  $("#button").on("click", () => {
    
    $(".emp-table").hide();
    $(".bar-chart").hide();
    $(".pie-chart").hide();
    $("#pointslog-table").hide();
    $("#firstpage").hide()
    $("#rewards-table").hide();
    $(".tasks-table").show();
  })
  $("#tasks").on("click", () => {
    
    $("#first-page").hide();
    $("#pointslog-table").hide();
    $("#pointslog-table").hide();
    $("#rewards-table").hide();
    $(".tasks-table").show();
  })
  $("#points").on("click", () => {
    
    $("#first-page").hide();
    $("#rewards-table").hide();
    $(".tasks-table").hide();
    
    $("#pointslog-table").show();
  })
  $("#rewards").on("click", () => {
    
    $("#first-page").hide();
    $(".tasks-table").hide();
    $("#pointslog-table").hide();
    $("#rewards-table").show();
  })
//  firebase database function into varible 
const db = firebase.database();
//  After user login handlebars to display name and points
 firebase.auth().onAuthStateChanged(function(user) {
 if(user){
   const email = user.email;
   console.log(email);
db.ref().once("value", (snapshot) => {
  snapshot.forEach( (data) => {
   
   if (email === data.child("employeeDetails").child("Email").val())
   {
    const source = document.getElementById('employeeDetails').innerHTML;
    const template = Handlebars.compile(source);
    const context = {
      employee: [
        {
          name: data.child("employeeDetails").child("Name").val(),
          personalPoints: data.child("employeeDetails").child("employeePoints").val(),
          companyPoints: data.child('CompanyPoints').val()
        }
       
      ]
    };
    const compiledHtml = template(context);

  const displayDetails = document.getElementById('sidebar-header');
  displayDetails.innerHTML = compiledHtml;
    
  } 
  })
});

// Charts Pie-chart and bar-chart

const labels = [
  "Tasks completed", 
  "Tasks pending",
  
];



db.ref().child("tasktable").on('value', function(snapshot) 
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
     const pie = document.getElementById("pieChart").getContext('2d');
       const bar = document.getElementById("barChart").getContext('2d');

       const myChart1 = new Chart(pie, {
         type: 'pie',
         data: {
             labels: labels,
             datasets: [
                 {
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
                 text: "Task Based PieChart"
             }
         }
       });

       const myChart2 = new Chart(bar, {
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
  
 
    // Available Tasks Table
 db.ref("tasktable").once('value', (snapshot) => {
 
    if (snapshot.exists()) {
        var i = 0;                       
      snapshot.forEach((data) => {
     
      const name = data.child("taskName").val();
      const taskDescription = data.child("taskDescription").val();
      const points = data.child("points").val();
      const expiry = data.child("expiryDate").val();
      const availableUntil = data.child("availableUntil").val();
// Appending task table
      $("#tasks-table").append(`<tr id="rowhide${i}"><td id="taskname${i}" class="w3-tooltip">` + name + "<i class='fa fa-info-circle' style='color: #1C4FC4'></i><br><span class='w3-text' style='word-wrap: break-word;'>"+taskDescription+"</span></td><td>" + points + "</td><td>" + expiry +"</td><td>"
       + availableUntil + `</td><td style="text-align: center;"><a href="#"><i id="assign${i}"  class="fa fa-plus-circle" style="color: #1C4FC4" data-container="body" data-trigger="hover" data-toggle="popover" data-placement="top" data-content="Assign Task"></i></a></td></tr>`);


  // Hide task after assigned 
 

      if((data.child("status").val() === "assigned") || (data.child("status").val() === "request approval") || (data.child("status").val() === "completed")){
     
       $(`#rowhide${i}`).css({'display':'none'});
       
        }
  // function on click for assigning task
       document.getElementById(`assign${i}`).onclick = assign_click;
      function assign_click(){
         
        var txt;
        // confirmation popup 
          if (confirm("Are you sure you want to assign this task?")) {
            txt = "OK";
          } else {
          txt = "Cancel";
            }
          if(txt === "OK"){ 
           
            db.ref(user.uid).child("employeeDetails").once('value', function (snap) 
  {
            var set = {
              taskname: data.child("taskName").val(),
              taskPoints: data.child("points").val(),
              employeePoints: snap.child("employeePoints").val()         
            }
      // pushing data into firebase
          db.ref(user.uid).child("taskDetails").push(set);
          
          db.ref("tasktable").child(data.key).update({"status": "assigned"});
            location.reload("#current-tasks-table");
        }) 
      }
   
     }
    
        
  i++; 
  
    })
  
    }
 
})

  // my current tasks table
                //  retrieving the content from database and display on table
db.ref("tasktable").once('value', (snapshot) =>{
  if(snapshot.exists()) {
    var i = 0;
     snapshot.forEach(function (data) {
       console.log(data.key);
     
     db.ref(user.uid).child("taskDetails").once('value', function(snapshot1) {
        
      snapshot1.forEach((data1) => {
            
    
  
      if (data.child("taskName").val() === data1.child("taskname").val()){     
         
          const taskname = data.child("taskName").val();
         const points = data.child("points").val();
         const expiry = data.child("expiryDate").val();
         const status = data.child("status").val(); 
         const taskDescription = data.child("taskDescription").val();        
        if(data.child("status").val() === "assigned") {      
  $('#current-tasks-table').append(`<tr id="rowApproval${i}"><td id="taskname${i}" class="w3-tooltip">` + taskname + "<i class='fa fa-info-circle' style='color: #1C4FC4'></i><br><span class='w3-text' style='word-wrap: break-word;'>"+taskDescription+"</span></td><td>" + expiry + "</td><td>" + points +"</td><td>"
  + status + `</td><td style="text-align: center;"><a href='#'><i id='approval${i}' class='fa fa-check-circle' style='color: #1C4FC4'></i></a></td><td style="text-align: center;"><a href='#'><i id='delete${i}' class='fa fa-trash' style='color: #1C4FC4'></i></a></td></tr>`);
        } else {
  $('#current-tasks-table').append(`<tr id="rowApproval${i}"><td id="taskname${i}" class="w3-tooltip">` + taskname + "<i class='fa fa-info-circle' style='color: #1C4FC4'></i><br><span class='w3-text' style='word-wrap: break-word;'>"+taskDescription+"</span></td><td>" + expiry + "</td><td>" + points +"</td><td>"
  + status + `</td><td></td><td style="text-align: center;"><a href='#'><i id='delete${i}' class='fa fa-trash' style='color: #1C4FC4'></i></a></td></tr>`);

} 
 
 
  
// on clicking trash icon task has to be deleted
 document.getElementById(`delete${i}`).onclick = deleteTask;
 function deleteTask(){
   var txt;
   if (confirm("Are you sure you want to delete the task?")) {
   txt = "OK";
  } else {
  txt = "Cancel";
  }
  if(txt == "OK"){ 
 
  db.ref(user.uid).child("taskDetails").child(data1.key).remove();
   db.ref("tasktable").child(data.key).update({'status': ""});
   location.reload("#current-tasks-table");
 }
  }
 
  // on clicking check-circle icon send task for approval
  document.getElementById(`approval${i}`).onclick = approvalTask; 
 
 function approvalTask() {
  
  var txt;
  if(data.child("status").val() === "assigned"){
  if (confirm("Are you sure you want to send for approval?")) {
    txt = "OK";
  } else {
   txt = "Cancel";
   }
 if(txt == "OK"){ 
   
 db.ref().child("tasktable").child(data.key).update({"status": "request approval"});
 location.reload("#current-tasks-table");
 
 } 
   
        }
      }
      }
   
 })
   
    })
    i++;
  })
  
}
})
//Rewards tables

db.ref().child("rewardstable").once('value', function (snapshot) 
{
   if (snapshot.exists()) {
    var i = 0;
     snapshot.forEach(function (data) {
    
       const rewardName = data.child("rewardName").val();
        const points = data.child("points").val();
        const category = data.child("category").val();
         
         if(data.child("category").val() === "personal"){
      $('#personal-rewards').append('<tr><td></td><td>' + rewardName + "</td><td>" + points + "</td><td>" + category +`</td><td style="text-align: center;"><a href='#'><i id="assignreward${i}" class='fa fa-plus-circle' style='color: #1C4FC4'></i></a></td></tr>`);
       document.getElementById(`assignreward${i}`).onclick = assignReward;
      
      } else {
        
      $("#company-rewards").append('<tr><td></td><td>' + rewardName + "</td><td>" + points + "</td><td>" + category + "</td></tr>");
      }

 function assignReward(){
  if (confirm("Are you sure you want to use this reward?")) {
    var txt;
    txt = "OK";
  } else {
  txt = "Cancel";
    }
  if(txt === "OK"){ 
    
  db.ref(user.uid).child("employeeDetails").once('value', function (snap) 
  {
    
        if(snap.child("employeePoints").val() < data.child("points").val()) {
          alert("Your personal points are less than redeemable points")
          } else {
            
            var total = 0;
         total = snap.child("employeePoints").val() - data.child("points").val();
         var set = {
          rewardPoints: data.child("points").val(),
          rewardname:  data.child("rewardName").val(),
          employeePoints: total
         }
          
         db.ref(user.uid).child('rewardDetails').push(set);
          db.ref(user.uid).child("employeeDetails").update({'employeePoints':total});
          location.reload("#sidebar-header");
          // location.reload("#pointslog");
       
          }
         
      })
    
  }
          }
          i++;
      })

           }
         });
// points History Table

db.ref(user.uid).child("taskDetails").once("value", (snapshot1) => {

  snapshot1.forEach(function (data1) {
   
    const category = "task";
    const name = data1.child("taskname").val();
    console.log(name)
    const totalPoints = data1.child("employeePoints").val();
   const addDeduct = data1.child("taskPoints").val();
  
    $('#pointslog').append('<tr><td>' + category + '</td><td>'
+ name + '</td><td>' + "+" + addDeduct +  "</td><td>" + totalPoints + "</td></tr>");
})
})

db.ref(user.uid).child("rewardDetails").once("value", (snapshot2) => {

snapshot2.forEach(function (data2) {
    const category = "reward";
    const name = data2.child("rewardname").val();
    
     const totalPoints = data2.child("employeePoints").val();
   const addDeduct = data2.child("rewardPoints").val();
  
    $('#pointslog').append('<tr><td>' + category + '</td><td>'
+ name + '</td><td>' + "-" + addDeduct +  "</td><td>" + totalPoints + "</td></tr>");

 })
})


  }
})
// logout from the webpage
         $("#logout").on('click', () => {
          $("#login").show();
          $(".grid-container").hide();
          $("#pointslog-table").hide();
          $("#rewards-table").hide();
          $(".tasks-table").hide();
        
         }) 
        
        });