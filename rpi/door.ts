import { Gpio } from 'onoff';
import { Mfrc522 } from 'mfrc522-rpi';
import { Keypad } from 'rpi-keypad';
import { Servo } from 'rpi-softpwm'; // Library for controlling servo motors

// RFID constants
const SS_PIN = 8; // GPIO 8 (SPI0 CE0)
const RST_PIN = 25; // GPIO 25 for RST

// LED & Buzzer constants
const LED_G = 16; // GPIO 16 for Green LED
const LED_R = 20; // GPIO 20 for Red LED
const BUZZER = 21; // GPIO 21 for Buzzer

// Servo constants
const SERVO_PIN = 12; // GPIO 12 (PWM0)
const servo = new Servo(SERVO_PIN); // Initialize servo

const mfrc522 = new Mfrc522(SS_PIN, RST_PIN);
let personEntered = false;
let adminEntered = false;

// Keypad constants
const ROWS = 4;
const COLS = 4;
const hexaKeys = [
  ['1', '2', '3', 'A'],
  ['4', '5', '6', 'B'],
  ['7', '8', '9', 'C'],
  ['*', '0', '#', 'D']
];

const rowPins = [17, 27, 22 , 5]; // GPIO pins for rows
const colPins = [6, 13, 19 ,26 ]; // GPIO pins for columns
const keypad = new Keypad(rowPins, colPins, hexaKeys);

let enteredPasscode = ""; // Store entered passcode

// Initialize GPIO pins
const greenLed = new Gpio(LED_G, 'out');
const redLed = new Gpio(LED_R, 'out');
const buzzer = new Gpio(BUZZER, 'out');

// Servo control functions
function openDoor() {
  console.log("Door opened");
  servo.setAngle(90); // Rotate servo to 90 degrees (open position)
}

function closeDoor() {
  console.log("Door closed");
  servo.setAngle(0); // Rotate servo to 0 degrees (closed position)
}

function checkRFID() {
  if (mfrc522.isNewCardPresent() && mfrc522.readCardSerial()) {
    const uid = mfrc522.getUid();
    console.log(`UID tag: ${uid}`);

    if (uid === "A1 3D F0 1D") { // Authorized UID
      console.log("Authorized access by RFID");
      adminEntered = true;
      greenLed.writeSync(1);
      buzzer.writeSync(1);
      setTimeout(() => {
        buzzer.writeSync(0);
        greenLed.writeSync(0);
      }, 300);
      openDoor();
    } else {
      console.log("Access denied by RFID");
      redLed.writeSync(1);
      buzzer.writeSync(1);
      setTimeout(() => {
        buzzer.writeSync(0);
        redLed.writeSync(0);
      }, 1000);
    }
  }
}

function checkKeypad() {
  const correctPasscode = "111*";
  const key = keypad.getKey();

  if (key) {
    if (key === 'D') {
      if (enteredPasscode === correctPasscode) {
        console.log("Correct passcode entered.");
        greenLed.writeSync(1);
        buzzer.writeSync(1);
        openDoor();
        setTimeout(() => {
          buzzer.writeSync(0);
          greenLed.writeSync(0);
        }, 300);
        personEntered = true;
        setTimeout(closeDoor, 5000); // Close door after 5 seconds
      } else {
        console.log("Wrong passcode. Please reenter:");
        redLed.writeSync(1);
        buzzer.writeSync(1);
        setTimeout(() => {
          buzzer.writeSync(0);
          redLed.writeSync(0);
        }, 1000);
        enteredPasscode = "";
      }
      enteredPasscode = "";
    } else {
      if (enteredPasscode.length < 8) {
        enteredPasscode += key;
        console.log(`Entered passcode: ${enteredPasscode}`);
      }
    }
  }
}

function mainLoop() {
  checkRFID();
  checkKeypad();

  if (adminEntered) {
    console.log("Admin entered");
    openDoor();
    setTimeout(() => {
      closeDoor();
      adminEntered = false;
      console.log("Admin out");
    }, 5000);
  } else if (personEntered) {
    console.log("Person entered");
    setTimeout(() => {
      openDoor();
      console.log("Person out");
      personEntered = false;
    }, 40000);
  }

  setTimeout(mainLoop, 100); // Run the loop every 100ms
}

// Initialize and start the main loop
mfrc522.init();
mainLoop();
