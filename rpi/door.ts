import { Gpio } from 'onoff';
import { Gpio as PigpioGpio } from 'pigpio'; // Use pigpio for PWM servo control
const Mfrc522 = require('mfrc522-rpi'); // RFID library
import * as spi from 'spi-device'; // Import spi-device for SPI communication

// RFID constants
const SS_PIN = 8; // GPIO 8 (SPI0 CE0)
const RST_PIN = 25; // GPIO 25 for RST

// LED & Buzzer constants
const LED_G = 16; // GPIO 16 for Green LED
const LED_R = 20; // GPIO 20 for Red LED
const BUZZER = 21; // GPIO 21 for Buzzer
const spiDevice = spi.openSync(0, 0); // SPI bus 0, device 0 (CE0)
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

// Mock Keypad implementation (replace with actual keypad library if available)
class Keypad {
  constructor(private rowPins: number[], private colPins: number[], private keys: string[][]) {}

  getKey(): string | null {
    // Mock implementation: Replace with actual keypad logic
    return null;
  }
}

const keypad = new Keypad(rowPins, colPins, hexaKeys);

let enteredPasscode = ""; // Store entered passcode

// Initialize GPIO pins
const greenLed = new Gpio(LED_G, 'out');
const redLed = new Gpio(LED_R, 'out');
const buzzer = new Gpio(BUZZER, 'out');

// Servo control
const SERVO_PIN = 12;
const servo = new PigpioGpio(SERVO_PIN, { mode: PigpioGpio.OUTPUT });

function openDoor() {
  console.log("Door opened");
  servo.servoWrite(1500); // 1500 µs pulse width for 90 degrees
}

function closeDoor() {
  console.log("Door closed");
  servo.servoWrite(1000); // 1000 µs pulse width for 0 degrees
}

function checkRFID() {
  if (mfrc522.isNewCardPresent() && mfrc522.readCardSerial()) {
    const uidData = mfrc522.getUid();
    const uid = uidData.uidBytes.map((byte: number) => byte.toString(16).toUpperCase()).join(" ");

    console.log(`UID tag: ${uid}`); // Display the scanned card's UID in output

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