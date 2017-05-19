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
  var now = moment().format('MMMM Do YYYY, HH:mm');
  console.log(now);
  
  
  var trainName = "";
  var destination = "";
  var trainTime = "13:25";
  var rowCount = 1;
  
  // console.log(now);
  // console.log(trainTime);
  var frequency = 0;



var diff = moment.utc(moment(trainTime,"HH:mm").diff(moment(now,"HH:mm"))).format("HH:mm");
console.log(diff);


 

  $('#now').html(now);

$("#submitButton").on("click", function() {
      // event.preventDefault();
      
      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      trainTime = $("#trainTime").val().trim();
      frequency = $("#frequency").val().trim();
      now = moment().format('MMMM Do YYYY, h:mm:ss a');
      $('#now').html(now);
      database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
      });
      $('input').val("");


    });


database.ref().on("child_added", function(snapshot,) {
  var newPost = snapshot.val();
  console.log("trainName retrieved: " + newPost.trainName);
  console.log("destination retrieved: " + newPost.destination);
  console.log("frequency: " + newPost.frequency);
  var newRow = $("<tr></tr>");
  var nameCell = $("<td></td");
  var destCell = $("<td></td");
  var freqCell = $("<td></td");
  var nextCell = $("<td></td");
  var minCell = $("<td></td");
  nameCell.html(newPost.trainName);  
  destCell.html(newPost.destination);
  freqCell.html(newPost.frequency);
  newRow.append(nameCell).append(destCell).append(freqCell);
  $('#trainTable > tbody:last-child').append(newRow);




  // var newData = $("<h3></h3>");
  // newData.html("Train:  " + newPost.trainName + "  destination:  " + newPost.destination);
  // $('#test2').append(newData);
});



// database.ref().on("value", function(snapshot) {
// 		// console.log(snapshot.val());
//       $("#one").html(snapshot.val().trainName);
//       $("#two").html(snapshot.val().destination);
//       $("#four").html(snapshot.val().trainTime);
//       $("#three").html(snapshot.val().frequency);
//     }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
//     });