import { Gpio } from 'onoff';
import { Gpio as PigpioGpio } from 'pigpio'; // Use pigpio for PWM servo control
const Mfrc522 = require('mfrc522-rpi'); // RFID library

// RFID Module
const mfrc522 = new Mfrc522(); // No need to pass SPI manually

console.log("📡 RFID Scanner Initialized. Bring a card close to scan.");

// Function to test RFID scanning
function testRFID() {
    console.log("📡 Scanning for RFID tags...");

    if (!mfrc522.isNewCardPresent()) {
        console.log("❌ No RFID card detected.");
        return;
    }

    if (!mfrc522.readCardSerial()) {
        console.log("⚠️ Error reading RFID card.");
        return;
    }

    const uid = mfrc522.getUid().uidBytes.map(byte => byte.toString(16).toUpperCase()).join(" ");
    console.log(`✅ RFID Card detected! UID: ${uid}`);
    
    mfrc522.stopCrypto();
}

// Run the RFID test every 2 seconds
setInterval(testRFID, 2000);
