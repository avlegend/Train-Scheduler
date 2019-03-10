// Initialize Firebase
var config = {
  apiKey: "AIzaSyCqIq6Sd2CcG3oNHAfig8eycIdpExHGE6A",
  authDomain: "train-scheduler-cf922.firebaseapp.com",
  databaseURL: "https://train-scheduler-cf922.firebaseio.com",
  projectId: "train-scheduler-cf922",
  storageBucket: "train-scheduler-cf922.appspot.com",
  messagingSenderId: "292519811756"
};
firebase.initializeApp(config);
var database = firebase.database();

// Button for adding train Info
$("#add-train").on("click", function (event) {
  // prevents the page from reloading when clicked
  event.preventDefault();

  // grabs user input
    var name = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStartTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    // add moment.js here

    // creates local "temporary" object for holding
    var newTrain = {
      name: name,
      destination: trainDestination,
      startTime: trainStartTime,
      frequency: trainFrequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    console.log(name.name);
    console.log(destination.trainDestination)
  
   // alert("added successfully")

  //clear the input fields
  $("#name-input").text("");
  $("#destination-input").text("");
  $("#time-input").text("");
  $("#frequency-input").text("");
});

//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childsnapshot) {
  console.log(childsnapshot.val());
  //var monthsWorked = monthsElapsed(snapshot.val().startDate);  //Calculate months worked using current date
  
  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStartTime = childSnapshot.val().startTime;
  var trainFrequency = childSnapshot.val().frequency;
   console.log(name)


  var row = $("<tr>");
  row.append($("<th>").text(snapshot.val().name));
  //row.append($("<th>").text(snapshot.val().role));
  row.append($("<th>").text(snapshot.val().destination));
  //row.append($("<th>").text(monthsWorked));
  row.append($("<th>").text(snapshot.val().startTime));
  //row.append($("<th>").text(monthsWorked * parseInt(snapshot.val().rate)));

  $("#train-data").append(row);
});

// console.log(name, destination, time, startTime)
