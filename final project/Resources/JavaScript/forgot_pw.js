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
// sending email notification function
function verifySendEmail() {
  const email = document.getElementById("txtEmail").value;
  const auth = firebase.auth();
  
  auth.sendPasswordResetEmail(email).then(function() {
    alert("Email has been sent to you. Please check your email to reset a password.");
  }).catch(function(error) {
    alert("Please enter your Sozentech email.")
  })
  document.getElementById('txtEmail').value = "";
};

