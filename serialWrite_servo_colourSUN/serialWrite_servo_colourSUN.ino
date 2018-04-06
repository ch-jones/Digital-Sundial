/*
 Code built on Physical Pixel example code in the public domain.
 http://www.arduino.cc/en/Tutorial/PhysicalPixel

/*
Additional Weather API Sunrise/Sunset code by 
Caleb Jones, Tryston Hoyes,and Blayne Robinson.
The Sunrise/Sunset sun dial electronics project and code
created for DESN37900 at Sheridan College © 2018.

Uses the  Servo library.
https://playground.arduino.cc/ComponentLib/Servo
*/

#include <Servo.h>
Servo myservo;  // create servo object to control a servo

int pos = 0;    // variable to store the servo position

int incomingByte;         // a variable to read incoming serial data into
const int R = 6;
const int G = 5;
const int B = 3;
int rValue  = 0;
int gValue  = 0;
int bValue  = 0;

void setup() {
  // initialize serial communication:
  Serial.begin(9600);
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  myservo.write(pos);
}

void loop() {
  // see if there's incoming serial data:
  if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();
    Serial.println(incomingByte);
  }
  pos = incomingByte;         //sets position as incomingByte
  myservo.write(pos);         //writes position to servo motor
  colourSet();                // sets the colour of the RGB LED
}

//Set the colour of the LED
void colourSet(){
    if ((pos>0 && pos< 26)||(pos>155 && pos<= 180)){
      riseSet();
    } else if ((pos>=26 && pos< 52)||(pos>129 && pos<=155)){
      risingSetting();
    } else if ((pos>=52 && pos< 77)||(pos>103 && pos<= 129)){
      day();
    } else if (pos>=77 && pos<= 103){
      midday();
    } else {
      twilight();
    }
    analogWrite(R,rValue);
    analogWrite(G,gValue);
    analogWrite(B,bValue);
  }
  
//Colour choices
void twilight(){
  rValue=248;
  gValue=0;
  bValue=157;
}

void riseSet(){
  rValue=128;
  gValue=86;
  bValue=144;
}
 
void risingSetting(){
  rValue=212;
  gValue=111;
  bValue=147;
}
 
void day(){
  rValue=249;
  gValue=220;
  bValue=144;
}

void midday(){
  rValue=253;
  gValue=241;
  bValue=205;
}
