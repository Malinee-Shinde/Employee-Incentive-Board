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


  //Add new Reward
    document.getElementById("rform").addEventListener("submit", (event) => {
      event.preventDefault();
        var set = {
          rewardName: document.getElementById("name").value,
          category: document.getElementById("rewardtype").value,
          points: document.getElementById("points").value
        }
            
        db.ref().child("rewardstable").push(set);
        
        document.getElementById("name").value = null;
        document.getElementById("rewardtype").value = null;
        document.getElementById("points").value = null;
        

      });
    
// close the form


  document.getElementById("rclose").onclick = function() {
     location.href="Employer Rewards.html"
    };