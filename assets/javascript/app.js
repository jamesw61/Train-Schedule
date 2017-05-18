  var config = {
    apiKey: "AIzaSyCRKdQPHdR5FR3XJUXwXhlNw7p6ylOsbz8",
    authDomain: "bacon-525e9.firebaseapp.com",
    databaseURL: "https://bacon-525e9.firebaseio.com",
    projectId: "bacon-525e9",
    storageBucket: "bacon-525e9.appspot.com",
    messagingSenderId: "724409226390"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  
  var now = moment().format('MMMM Do YYYY, h:mm:ss a');
  var trainName = "";
  var destination = "";
  var trainTime = 0;
  var frequency = 0;

  console.log(now);

  $('#now').html(now);

$("#submitButton").on("click", function() {
      // event.preventDefault();
      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      trainTime = $("#trainTime").val().trim();
      frequency = $("#frequency").val().trim();

      database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
      });

    });

database.ref().on("value", function(snapshot) {
		console.log(snapshot.val());
      $("#one").html(snapshot.val().trainName);
      $("#two").html(snapshot.val().destination);
      $("#four").html(snapshot.val().trainTime);
      $("#three").html(snapshot.val().frequency);
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });