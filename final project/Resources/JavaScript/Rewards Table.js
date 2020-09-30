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


var database = firebase.database();

// rewards table
database.ref().child("rewardstable").once('value', function (snapshot) 
   {
   if (snapshot.exists()) {
                  
    var i = 0; 
    snapshot.forEach(function (data) {
             
   
     const rewardname = data.child("rewardName").val();
    const points = data.child("points").val();
    console.log(points);
    const category = data.child("category").val();
   
   //retrieving data from database and appending to HTML table 
$("#rewards-table").append(`<tr><td id="rewardname${i}">` + rewardname + `</td><td id="category${i}">` + category + `</td><td id="points${i}">` + points +`</td><td><i id="edit${i}" class="fa fa-edit" style="color: #1C4FC4"></i></td><td><a href='#'><i id='delete${i}' class='fa fa-trash' style='color: #1C4FC4'></i></a></td></tr>`);

var name1 = document.getElementById(`rewardname${i}`).innerHTML;

var points1 = document.getElementById(`points${i}`).innerHTML;
var category1 = document.getElementById(`category${i}`).innerHTML;

// modifying existing reward
$(`#edit${i}`).on("click", () => {
  
$(".employer-table").hide();
$(".logo1").hide();
$("#title").hide();
$("#add1").hide();
$("#sidebar").hide();
$(".footer").hide();
$("#rModify").show();
$(".button").hide();
document.getElementById("name").value = name1;

document.getElementById("points").value = points1;
document.getElementById('rewardtype').value = category1;

 $("#modifyadd").on("click", () => {
                  
 const rewardName =  document.getElementById("name").value;
 
 const  points = document.getElementById("points").value;
 const rewardtype =  document.getElementById('rewardtype').value;

                   
 database.ref().child("rewardstable").child(data.key).update({rewardName : rewardName, points : points, category : rewardtype});
 document.getElementById("name").value = null;
 document.getElementById("rewardtype").value = null;
 
 document.getElementById("points").value = null;
                    
 });
  });
$(`#delete${i}`).on("click", () => {
  var txt;
  // confirmation popup 
    if (confirm("Are you sure you want to delete this reward?")) {
      txt = "OK";
    } else {
    txt = "Cancel";
      }
    if(txt === "OK"){ 
      
     database.ref("rewardstable").child(data.key).remove();
     location.reload("#rewards-table");
    }
})

i++; 
})
                        
     
 
  }
                    
                  
  });


  $(document).ready(function(){
    $("#rModify").hide();
    });
    document.getElementById("rclose").onclick = function(){
      location.href = "Employer Rewards.html"
    } 






