import { Gpio } from 'onoff';
import { Mfrc522 } from 'mfrc522-rpi';
import { PIGPIO } from 'pigpio';
import { Keypad } from 'rpi-keypad';

// RFID constants
const SS_PIN = 24; // GPIO pin for SS (Slave Select)
const RST_PIN = 25; // GPIO pin for RST (Reset)
const LED_G = 18; // Green LED pin (GPIO 18)
const LED_R = 23; // Red LED pin (GPIO 23)
const BUZZER = 24; // Buzzer pin (GPIO 24)

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
const rowPins = [17, 27, 22, 5]; // GPIO pins for rows
const colPins = [6, 13, 19, 26]; // GPIO pins for columns
const keypad = new Keypad(rowPins, colPins, hexaKeys);

let enteredPasscode = ""; // Store entered passcode

// Initialize GPIO pins
const greenLed = new Gpio(LED_G, 'out');
const redLed = new Gpio(LED_R, 'out');
const buzzer = new Gpio(BUZZER, 'out');

function openDoor() {
  console.log("Door opened");
  // Implement door opening mechanism if needed
}

function closeDoor() {
  console.log("Door closed");
  // Implement door closing mechanism if needed
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
        closeDoor();
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
    console.log("admin entered");
    openDoor();
    setTimeout(() => {
      closeDoor();
      adminEntered = false;
      console.log("admin out");
    }, 5000);
  } else if (personEntered) {
    console.log("person entered");
    setTimeout(() => {
      openDoor();
      console.log("person out");
      personEntered = false;
    }, 40000);
  }

  setTimeout(mainLoop, 100); // Run the loop every 100ms
}

// Initialize and start the main loop
mfrc522.init();
mainLoop();