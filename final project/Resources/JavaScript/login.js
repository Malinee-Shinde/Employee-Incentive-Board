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
// Login authentication and connecting to respective pages
   $("#btnLogin").on("click", () => {
    const email = document.getElementById("txtEmail").value;
    const password = document.getElementById("txtPassword").value;
    const auth = firebase.auth();

   auth.signInWithEmailAndPassword(email, password).then(function () {
      
      if (email === "antoinette.gaisie@gmail.com" && password === "111111") { 
        location.href = "Employer Home.html" //should be employer page        
      } else { 
        //  employee page

        location.href = "index.html" 
      }
          
    }).catch(function(error) {
        alert("Please enter your Sozentech email and password. " + error)
    })
    document.getElementById("txtEmail").value = "";
    document.getElementById("txtPassword").value = ""; 
  })
  
