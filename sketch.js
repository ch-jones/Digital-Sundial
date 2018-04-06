/*
Serial write example
Sends a byte to a webSocket server which sends the same byte
out through a serial port.
You can use this with the included Arduino example called PhysicalPixel.
Works with P5 editor as the socket/serial server, version 0.5.5 or later.
written 2 Oct 2015
by Tom Igoe
*/

/*
Additional Weather API Sunrise/Sunset code by Caleb Jones, Tryston Hoyes, and Blayne Robinson. The Sunrise/Sunset sun dial electronics project and code created for DESN37900 at Sheridan College © 2018
*/

let timer = 10;     //sets timer starting value in seconds
var weather;
var currentTime;
var position;

function preload() {
    //Oakville, Canada
    var url = 'http://api.openweathermap.org/data/2.5/weather?id=4839921&APPID=8e283002f41c7797f4dcdd9b20e8a572';

    //Honolulu, USA
//        var url = 'http://api.openweathermap.org/data/2.5/weather?id=5856195&APPID=8e283002f41c7797f4dcdd9b20e8a572'; 

    //Reykjavik, Iceland
//        var url = 'http://api.openweathermap.org/data/2.5/weather?id=6692263&APPID=8e283002f41c7797f4dcdd9b20e8a572'; 

    //weather loads the weather API JSON data
    weather = loadJSON(url);
}

// Declare a "SerialPort" object
var serial;
var options = {
    baudrate: 9600
}; // set baudrate to 9600; must match Arduino baudrate

var portName = '/dev/cu.usbmodem145241'; // fill in your serial port name here

// this is the message that will be sent to the Arduino:
var outMessage = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // make an instance of the SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results. See gotList, below:
    serial.list();

    // Assuming our Arduino is connected,  open the connection to it
    serial.open(portName);

    // When you get a list of serial ports that are available
    serial.on('list', gotList);

    // When you some data from the serial port
    serial.on('data', gotData);
}

// Got the list of ports
function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}

// Called when there is data available from the serial port
function gotData() {
    var currentString = serial.readLine();
    console.log(currentString);
}

function draw() {
    background(255);
    var sunrise = weather.sys.sunrise;
    var sunset = weather.sys.sunset;
    var currentTime = weather.dt;


    textAlign(CENTER, CENTER);
    textSize(100);
    //text("Oakville", width / 2, height / 2);
    text(timer, width/2, height/2);

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
    }
    if (timer == 0) {
        weather; //reloads the JSON url/API data

        //maps the Current Time as a value between sunrise(0) and sunset(180) and rounds this value
        var position = round(map(currentTime, sunrise, sunset, 0, 180));

        sendData(position); //sends the current time/position data
        timer = 600; //resets timer to 10 minutes

        //        console.log("sunrise: " + sunrise);
        //        console.log("current time: " + currentTime);
        //        console.log("sunset: " + sunset);

    }
}

function sendData(position) {
    //server sends the position data to the serial port
    serial.write(position);
}
