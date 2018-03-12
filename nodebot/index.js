var five = require("johnny-five");
var firebase = require('firebase');
var board = new five.Board();

/*Initialize Firebase*/
var config = {
  databaseURL: "https://nodetruck.firebaseio.com/" //Link to my firebase account.
};
var arduino = firebase.initializeApp(config);

/*Reference of the Database on Firebase*/
var db = firebase.database().ref();
dbref_move_orders = db.child('move_orders');
dbref_working_requests = db.child('working_requests');
dbref_working_responses = db.child('working_responses');

board.on("ready", function() {

  // var motor3 = new five.Motor(configs.M3);
  // var motor4 = new five.Motor(configs.M4);

  // var proximity = new five.Proximity({
  //   controller: "HCSR04",
  //   pin: 7
  // });

  // proximity.on("data", function() {
  //   console.log("Proximity: ");
  //   console.log("  cm  : ", this.cm);
  //   console.log("  in  : ", this.in);
  //   console.log("-----------------");
  // });

  // proximity.on("change", function() {
  //   console.log("The obstruction has moved.");
  // });

  /*Register firebase event*/
  listenEvent();
});

// var danceActions = function(){

// }

var listenEvent = function() {
  dbref_move_orders.on('value', function(snapshot) {
    // Blue Led
    //b = new five.Led(13);
    var configs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;
    var motor1 = new five.Motor(configs.M1);
    var motor2 = new five.Motor(configs.M2);
    var movement = snapshot.val();
    console.log("Movement order received: " + movement.move);
    switch (movement.move) {
      case "avanzar":
        console.log("Going front");
        //b.on();
        motor1.forward(255);
        motor2.forward(255);
        break;
      case "derecha":
        console.log("Going right");
        motor2.forward(200);
        motor1.stop();
        //b.on();
        break;
      case "retroceder":
        console.log("Going reverse");
        motor1.reverse(255);
        motor2.reverse(255);
        //b.on();
        break;
      case "izquierda":
        console.log("Going left");
        motor1.forward(200);
        motor2.stop();
        //b.on();
        break;
      case "parar":
        console.log("STOP");
        //b.off();
        motor1.stop();
        motor2.stop();
        break;
      // case "bailar":
      //   console.log("Dancing");
      //   danceActions();
      //   break;
      default:
        console.log("STOP");
        //b.off();
        motor1.stop();
        motor2.stop();
    }
  });
  dbref_working_requests.on('value', function(snapshot) {
    dbref_working_responses.push({
      date: Date.now()
    });
    console.log("Working signal request received: " + Date.now());
  });


};
