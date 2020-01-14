// Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyBayLFfDurA0OkvPu7Gksk3ywol0JjFPgQ",
    authDomain: "presidential-29357.firebaseapp.com",
    databaseURL: "https://presidential-29357.firebaseio.com",
    projectId: "presidential-29357",
    storageBucket: "presidential-29357.appspot.com",
    messagingSenderId: "521503005949",
    appId: "1:521503005949:web:1e9ca494fcb74aef423294",
    measurementId: "G-VKCEWDLV4Z"
    
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  
  var database = firebase.database();

  //This initiates the variables, but only if they do not exist
  if(total == null){
    var total = 0;
    var approval = 0;
	var submitted = false;
  }
  //funtion rating(true/false)
  //If the input is true, the approval and total are both incremented
  //If the input is false, only the toal is incremented
  function rating(approved) {
	
	 //Gets the form from the HTML above
     var form = document.getElementById("form");
	 //Total is always incremented
     total++;
     
	
	
	//Initializes the firebase database and sets the table to be the default at '/'
	var ref = firebase.database().ref('/');
	
	//Initializes the two values this program will change, total and approval
	var totalRef = ref.child('total');
	var approvalRef = ref.child('approval');
	
	//If the user has not submitted a rating yet, they can rate, otherwise they cannot affect the rating
	if(!submitted){
	
	//a transaction - Takes the value total in the table and adds one to it
	totalRef.transaction(function(total) {
			return total + 1;
		});
	//Does the same as above, but the transaction (increment) occurs when the approval button is pressed
	if(approved){
       approvalRef.transaction(function(approval) {
		return approval + 1;
		});
		}
		submitted = true;
		}
	//This prints the rating using values from the table
	ref.on("value", function(snapshot) {
  document.getElementById("rating").innerHTML = "Approval Rating: " + Math.floor((snapshot.val().approval/snapshot.val().total)*100) + "%";
  
});
	
    
  }
