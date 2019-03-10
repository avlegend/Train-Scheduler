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

    console.log(newTrain.name);
    console.log(newTrain.destination)
  
   // alert("added successfully")

  //clear the input fields
  $("#name-input").text("");
  $("#destination-input").text("");
  $("#time-input").text("");
  $("#frequency-input").text("");
});

//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (snapshot) {
  console.log(snapshot.val());
  //var monthsWorked = monthsElapsed(snapshot.val().startDate);  //Calculate months worked using current date
  
  // Store everything into a variable.
  var name = snapshot.val().name;
  var trainDestination = snapshot.val().destination;
  var trainStartTime = snapshot.val().startTime;
  var trainFrequency = snapshot.val().frequency;
   console.log(name)
   // the moment starts here
   // we "split" the time into hours and mins
   var startTimeArray = trainStartTime.split(':');
  var hours = startTimeArray[0];
  var mins = startTimeArray[1];
  var trainTime = moment().hours(hours).minutes(mins);
  console.log(trainTime.format("hh:mm A"));
  var maxMoment = moment.max(moment(), trainTime);

  var nextTrainArrival;
  var minutesAway;

  if(maxMoment === trainTime) {
    //the trains start time is already  the future and we can asume the start time is the next arrival
    //and the difference between the start time and the current moment is our minutes away
    nextTrainArrival = trainTime.format("hh:mm A");
    minutesAway = trainTime.diff(moment(), 'minutes');
  }
  else {
    //we need to do some math to figure out when the net arrival is and how many minutes away that is
    console.log('We hit the else nad nothing should be working becasue we havent written this code')
    //
    var minutesSinceTrainLeft = moment().diff(trainTime, 'minutes');
    var minutesRemaining = minutesSinceTrainLeft % trainFrequency;
    minutesAway = trainFrequency - minutesRemaining;
    nextTrainArrival = moment().add(minutesAway,'m').format("hh:mm A");
    

  }
  
  var row = $("<tr>");
  row.append($("<th>").text(name));
  row.append($("<th>").text(trainDestination));
  row.append($("<th>").text(trainStartTime));
  row.append($("<th>").text(trainFrequency));
  row.append($("<th>").text(nextTrainArrival));
  row.append($("<th>").text(minutesAway));
  // min next arrival
  
  // min away

  $("#train-data").append(row);
});

// console.log(name, destination, time, startTime)
