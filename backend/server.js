const express = require('express');
const bodyParser = require('body-parser');
const Gpio = require('onoff').Gpio;
const sensor = require('node-dht-sensor');
const cors = require('cors');  // Import CORS

// Initialize Express app
const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize GPIO pins
const photosensorPin = new Gpio(17, 'in'); // Example GPIO pin for photosensor
const DHT_PIN = 4; // Example GPIO pin for DHT11 sensor
const fanPin = new Gpio(18, 'out'); // Example GPIO pin for fan
const ledPin = new Gpio(27, 'out'); // Example GPIO pin for LEDs
const irSensorPin = new Gpio(22, 'in'); // Example GPIO pin for IR sensor
const waterDispenserPin = new Gpio(23, 'out'); // Example GPIO pin for water dispenser

// Temperature threshold for fan control
const TEMPERATURE_THRESHOLD = 27; // Example threshold in °C
const mysql = require('mysql2');

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'sensorDataDB'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Create table if it doesn't exist
db.query(`CREATE TABLE IF NOT EXISTS sensor_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    temperature FLOAT,
    humidity FLOAT,
    light_level INT,
    fire_detected INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    }
});

// Function to read humidity and temperature using DHT11
const readHumidityAndTemp = () => {
    return new Promise((resolve, reject) => {
        const DHT_TYPE = 11; // DHT11 sensor type
        sensor.read(DHT_TYPE, DHT_PIN, (err, temperature, humidity) => {
            if (err) {
                console.log('Error reading humidity and temperature: ' + err);
                reject('Error reading humidity and temperature: ' + err);
            } else {
                console.log(`Temperature: ${temperature}°C, Humidity: ${humidity}%`);
                resolve({ temperature, humidity });
            }
        });
    });
};

// Function to read photosensitive sensor value (digital mode)
const readPhotosensorValue = () => {
    return new Promise((resolve, reject) => {
        photosensorPin.read((err, value) => {
            if (err) {
                reject('Error reading photo sensor value: ' + err);
            } else {
                console.log(`Photo Sensor Value: ${value}`);
                resolve(value);
            }
        });
    });
};

// Function to read IR sensor value (digital mode)
const readIRSensorValue = () => {
    return new Promise((resolve, reject) => {
        irSensorPin.read((err, value) => {
            if (err) {
                reject('Error reading IR sensor value: ' + err);
            } else {
                console.log(`IR Sensor Value: ${value}`);
                resolve(value);
            }
        });
    });
};

// Function to control fan based on temperature
const controlFan = (temperature) => {
    if (temperature > TEMPERATURE_THRESHOLD) {
        fanPin.writeSync(1); // Turn on fan
        console.log('Fan turned ON');
    } else {
        fanPin.writeSync(0); // Turn off fan
        console.log('Fan turned OFF');
    }
};

// Function to control LEDs based on photosensor
const controlLEDs = (lightLevel) => {
    if (lightLevel === 1) { // Assuming 1 means light is detected
        ledPin.writeSync(0); // Turn off LEDs
        console.log('LEDs turned OFF');
    } else {
        ledPin.writeSync(1); // Turn on LEDs
        console.log('LEDs turned ON');
    }
};

// Function to control water dispenser based on IR sensor
const controlWaterDispenser = (fireDetected) => {
    if (fireDetected === 1) { // Assuming 1 means fire is detected
        waterDispenserPin.writeSync(1); // Turn on water dispenser
        console.log('Water dispenser turned ON');
    } else {
        waterDispenserPin.writeSync(0); // Turn off water dispenser
        console.log('Water dispenser turned OFF');
    }
};

// Endpoint to get sensor data and control actuators
app.get('/sensor-data', async (req, res) => {
    try {
        const { temperature, humidity } = await readHumidityAndTemp();
        const lightLevel = await readPhotosensorValue();
        const fireDetected = await readIRSensorValue();

        // Control fan, LEDs, and water dispenser based on sensor readings
        controlFan(temperature);
        controlLEDs(lightLevel);
        controlWaterDispenser(fireDetected);

        db.query(
          `INSERT INTO sensor_data (temperature, humidity, light_level, fire_detected) VALUES (?, ?, ?, ?)`,
          [temperature, humidity, lightLevel, fireDetected],
          (err, results) => {
              if (err) {
                  console.error('Error saving sensor data:', err.message);
              } else {
                  console.log(`Sensor data saved with ID ${results.insertId}`);
              }
          }
      );
      

        res.json({ temperature, humidity, lightLevel, fireDetected });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Cleanup GPIO on exit
process.on('SIGINT', () => {
    photosensorPin.unexport();
    fanPin.unexport();
    ledPin.unexport();
    irSensorPin.unexport();
    waterDispenserPin.unexport();
    process.exit();
});