
 
   // Initialize Firebase
   var config = {
     apiKey: "AIzaSyAnZQPEKTlELWyQhK6Kqsodobx4IxSO7P4",
     authDomain: "train-time-5cd31.firebaseapp.com",
     databaseURL: "https://train-time-5cd31.firebaseio.com",
     projectId: "train-time-5cd31",
     storageBucket: "train-time-5cd31.appspot.com",
     messagingSenderId: "928327254016"
   };
   firebase.initializeApp(config);


   var database = firebase.database();

    $("#submit-button").on("click", function(event) {
      event.preventDefault();
      var name = $("#add-train").val().trim();
      var destination = $("#add-destination").val().trim();
      var startDate = moment($("#add-date").val().trim(), "HH:mm").format("");
      var frequency = $("#add-frequency").val().trim();
      
      database.ref().push({
        name: name,
        destination: destination,
        startDate: startDate,
        frequency: frequency
        
      });

      $("#add-train").val("");
      $("#add-destination").val("");
      $("#add-date").val("");
      $("#add-frequency").val("");

    });

    function update(){

   
      setInterval(function(){

        var updateMinsAways = $(".minutes-away");

        updateMinsAways.each(function(){
          var timeNow = parseint($(this).text());
          var newTime = timeNow - 1;
          $(this).text(newTime)

        })



      }, 60000);


    };

    console.log(update());

    database.ref().on("child_added", function(childSnapshot) {

    // console.log(childSnapshot.val().name);
    // console.log(childSnapshot.val().desination);
    // console.log(childSnapshot.val().startDate);
    // console.log(childSnapshot.val().frequency);

  

    var startDate = childSnapshot.val().startDate;
    var frequency = childSnapshot.val().frequency;
    var train = childSnapshot.val().name;
    var destinationData = childSnapshot.val().destination;
    

    var firstTimeConverted = moment(startDate, "HH:mm").subtract(1, "years");

    console.log(firstTimeConverted);
     

    var currentTime = moment();

 
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


    var timeRemainder = diffTime % frequency;

    console.log(timeRemainder);

  
    var timeMinutesTillTrain = frequency - timeRemainder;
    console.log(timeMinutesTillTrain);


    var nextTrain = moment().add(timeMinutesTillTrain, "minutes");
    var nextTrainConverted = moment(nextTrain).format("hh:mm a");
    console.log(nextTrainConverted);

    var markup = "<tr><td>" + train + "</td><td>" + destinationData + "</td><td>" +
        frequency + "</td><td>" + nextTrainConverted + "</td><td>" + timeMinutesTillTrain + "</td><td>"

    $("#train-table tbody").append(markup);

   });

  update();


