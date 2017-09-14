/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA44m_OyNCRaGV8ntwPjmyv7dys19IOWns",
    authDomain: "maxproject-f5bb6.firebaseapp.com",
    databaseURL: "https://maxproject-f5bb6.firebaseio.com",
    projectId: "maxproject-f5bb6",
    storageBucket: "maxproject-f5bb6.appspot.com",
    messagingSenderId: "621630836312"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var traindestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "hh:mm").format("hh:mm");
  var trainfreq = $("#freq-input").val().trim();
  console.log(trainStart)
  // Creates local "ttrainorary" object for holding train data
  var newtrain = {
    name: trainName,
    destination: traindestination,
    start: trainStart,
    freq: trainfreq
  };

  // Uploads train data to the database
  database.ref().push(newtrain);

  

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var traindestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainfreq = childSnapshot.val().freq;

  // train Info
  console.log(trainName);
  console.log(traindestination);
  console.log(trainStart);
  console.log(trainfreq);

  // Prettify the train start
  var trainStartPretty = moment(trainStart, "hh:mm").subtract(1, "years");




  // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainStartPretty), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainfreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainfreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
     tNextArrival = moment(nextTrain).format("hh:mm");

  


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + traindestination + "</td><td>" +
  trainStart + "</td><td>" + tNextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

document.getElementById("currentDateTime").innerHTML = Date();




// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any atttraint we use mets this test case


