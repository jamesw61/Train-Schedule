 $( document ).ready(function() {
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
  var trainName = "";
  var destination = "";
  var trainTime = "01:00";
  var frequency = 10;

  function calculateMinTilArrival() {
      var trainTimeConvert = moment(trainTime, 'hh:mm');
      var delta = moment().diff(moment(trainTimeConvert), 'minutes');
      var modMinutes = delta % frequency;
      var minTilArrival = frequency - modMinutes;
      var addToTime = moment().add(minTilArrival, 'minutes');
      var arrivalTime = moment(addToTime).format('HH:mm');
      if (modMinutes === 0) {
          minTilArrival = "Arrived";
      }
      return [minTilArrival, arrivalTime];
  }

  $('#now').html(now);

  $("#submitButton").on("click", function() {

      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      trainTime = $("#trainTime").val().trim();
      frequency = $("#frequency").val().trim();
      now = moment().format('MMMM Do YYYY, HH:mm');
      $('#now').html(now);
      database.ref('train').push({
          trainName: trainName,
          destination: destination,
          trainTime: trainTime,
          frequency: frequency
      });
      $('input').val("");
  });


  database.ref('train').on("child_added", function(snapshot) {
      var newPost = snapshot.val();
      trainTime = newPost.trainTime;
      frequency = newPost.frequency;

      var newRow = $("<tr></tr>");
      var nameCell = $("<td></td");
      var destCell = $("<td></td");
      var freqCell = $("<td></td");
      var nextCell = $("<td></td");
      var minCell = $("<td></td");

      nameCell.html(newPost.trainName);
      destCell.html(newPost.destination);
      freqCell.html(newPost.frequency);

      nextArrival = calculateMinTilArrival()[1];
      minTilArrival = calculateMinTilArrival()[0];
      minCell.html(minTilArrival);
      nextCell.html(nextArrival);
      
      newRow.append(nameCell).append(destCell).append(freqCell).append(nextCell).append(minCell);
      $('#trainTable > tbody:last-child').append(newRow);

  });
});