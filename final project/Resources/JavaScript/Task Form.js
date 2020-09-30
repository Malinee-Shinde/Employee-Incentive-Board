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
  
  const db = firebase.database();
  //Add Task
 
document.getElementById('add1').onclick = function() {
 
  document.getElementById("tPage").style.display = "block";
          };
          document.getElementById("tform").addEventListener("submit", (event) => {
            event.preventDefault();
              var set = {
                taskName: document.getElementById("name").value,
                taskDescription: document.getElementById("description").value,
                expiryDate: document.getElementById("expiry").value,
                availableUntil: document.getElementById("availability").value,
                points: document.getElementById("points").value,
                status: ""
              }
              console.log(set);
                  
              db.ref().child("tasktable").push(set);
              document.getElementById("name").value = null;
              document.getElementById("description").value = null;
              document.getElementById("expiry").value = null;
              document.getElementById("availability").value = null;
              document.getElementById("points").value = null;
              
            });
    
// close the form
      document.getElementById("tClose").onclick = function() {
        location.href="Employer Home.html";
      }

