"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var onoff_1 = require("onoff");
var pigpio_1 = require("pigpio"); // Use pigpio for PWM servo control
var Mfrc522 = require('mfrc522-rpi'); // RFID library
var spi = require("spi-device"); // Import spi-device for SPI communication
// RFID constants
var SS_PIN = 8; // GPIO 8 (SPI0 CE0)
var RST_PIN = 25; // GPIO 25 for RST
// LED & Buzzer constants
var LED_G = 16; // GPIO 16 for Green LED
var LED_R = 20; // GPIO 20 for Red LED
var BUZZER = 21; // GPIO 21 for Buzzer
var spiDevice = spi.openSync(0, 0); // SPI bus 0, device 0 (CE0)
var mfrc522 = new Mfrc522(SS_PIN, RST_PIN);
var personEntered = false;
var adminEntered = false;
// Keypad constants
var ROWS = 4;
var COLS = 4;
var hexaKeys = [
    ['1', '2', '3', 'A'],
    ['4', '5', '6', 'B'],
    ['7', '8', '9', 'C'],
    ['*', '0', '#', 'D']
];
var rowPins = [17, 27, 22, 5]; // GPIO pins for rows
var colPins = [6, 13, 19, 26]; // GPIO pins for columns
// Mock Keypad implementation (replace with actual keypad library if available)
var Keypad = /** @class */ (function () {
    function Keypad(rowPins, colPins, keys) {
        this.rowPins = rowPins;
        this.colPins = colPins;
        this.keys = keys;
    }
    Keypad.prototype.getKey = function () {
        // Mock implementation: Replace with actual keypad logic
        return null;
    };
    return Keypad;
}());
var keypad = new Keypad(rowPins, colPins, hexaKeys);
var enteredPasscode = ""; // Store entered passcode
// Initialize GPIO pins
var greenLed = new onoff_1.Gpio(LED_G, 'out');
var redLed = new onoff_1.Gpio(LED_R, 'out');
var buzzer = new onoff_1.Gpio(BUZZER, 'out');
// Servo control
var SERVO_PIN = 12;
var servo = new pigpio_1.Gpio(SERVO_PIN, { mode: pigpio_1.Gpio.OUTPUT });
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
        var uidData = mfrc522.getUid();
        var uid = uidData.uidBytes.map(function (byte) { return byte.toString(16).toUpperCase(); }).join(" ");
        console.log("UID tag: ".concat(uid)); // Display the scanned card's UID in output
        if (uid === "A1 3D F0 1D") { // Authorized UID
            console.log("Authorized access by RFID");
            adminEntered = true;
            greenLed.writeSync(1);
            buzzer.writeSync(1);
            setTimeout(function () {
                buzzer.writeSync(0);
                greenLed.writeSync(0);
            }, 300);
            openDoor();
        }
        else {
            console.log("Access denied by RFID");
            redLed.writeSync(1);
            buzzer.writeSync(1);
            setTimeout(function () {
                buzzer.writeSync(0);
                redLed.writeSync(0);
            }, 1000);
        }
    }
}
function checkKeypad() {
    var correctPasscode = "111*";
    var key = keypad.getKey();
    if (key) {
        if (key === 'D') {
            if (enteredPasscode === correctPasscode) {
                console.log("Correct passcode entered.");
                greenLed.writeSync(1);
                buzzer.writeSync(1);
                openDoor();
                setTimeout(function () {
                    buzzer.writeSync(0);
                    greenLed.writeSync(0);
                }, 300);
                personEntered = true;
                setTimeout(closeDoor, 5000); // Close door after 5 seconds
            }
            else {
                console.log("Wrong passcode. Please reenter:");
                redLed.writeSync(1);
                buzzer.writeSync(1);
                setTimeout(function () {
                    buzzer.writeSync(0);
                    redLed.writeSync(0);
                }, 1000);
                enteredPasscode = "";
            }
            enteredPasscode = "";
        }
        else {
            if (enteredPasscode.length < 8) {
                enteredPasscode += key;
                console.log("Entered passcode: ".concat(enteredPasscode));
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
        setTimeout(function () {
            closeDoor();
            adminEntered = false;
            console.log("Admin out");
        }, 5000);
    }
    else if (personEntered) {
        console.log("Person entered");
        setTimeout(function () {
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
