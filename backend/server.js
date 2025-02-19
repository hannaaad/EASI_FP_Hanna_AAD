const express = require('express');
const bodyParser = require('body-parser');
const gpio = require('rpi-gpio');
const sensor = require('node-dht-sensor');
const cors = require('cors');
const mysql = require('mysql2');

// Initialize Express app
const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// GPIO pin numbers (using BCM numbering)
const PINS = {
    PHOTOSENSOR: 17,
    FAN: 18,
    LED: 27,
    IR_SENSOR: 22,
    WATER_DISPENSER: 23
};

// Setup GPIO pins
const setupPins = async () => {
    try {
        // Set GPIO to use BCM pin numbering
        gpio.setMode(gpio.MODE_BCM);
        
        // Setup input pins
        await gpio.promise.setup(PINS.PHOTOSENSOR, gpio.DIR_IN);
        await gpio.promise.setup(PINS.IR_SENSOR, gpio.DIR_IN);
        
        // Setup output pins
        await gpio.promise.setup(PINS.FAN, gpio.DIR_OUT);
        await gpio.promise.setup(PINS.LED, gpio.DIR_OUT);
        await gpio.promise.setup(PINS.WATER_DISPENSER, gpio.DIR_OUT);
        
        console.log('GPIO pins initialized successfully');
    } catch (error) {
        console.error('Error setting up GPIO pins:', error);
        process.exit(1);
    }
};

// Initialize pins
setupPins();

const DHT_PIN = 4;
const TEMPERATURE_THRESHOLD = 27;

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
    if (err) console.error('Error creating table:', err.message);
});

// Read sensors
const readHumidityAndTemp = () => {
    return new Promise((resolve, reject) => {
        sensor.read(11, DHT_PIN, (err, temperature, humidity) => {
            if (err) {
                console.error('Error reading DHT sensor:', err);
                resolve({ temperature: null, humidity: null });
            } else {
                resolve({ temperature, humidity });
            }
        });
    });
};

const readPhotosensorValue = () => {
    return gpio.promise.read(PINS.PHOTOSENSOR);
};

const readIRSensorValue = () => {
    return gpio.promise.read(PINS.IR_SENSOR);
};

// Control functions
const controlFan = async (temperature) => {
    try {
        const state = temperature > TEMPERATURE_THRESHOLD;
        await gpio.promise.write(PINS.FAN, state);
        console.log(`Fan turned ${state ? 'ON' : 'OFF'}`);
    } catch (error) {
        console.error('Error controlling fan:', error);
    }
};

const controlLEDs = async (lightLevel) => {
    try {
        const state = !lightLevel; // Turn on LEDs when dark
        await gpio.promise.write(PINS.LED, state);
        console.log(`LEDs turned ${state ? 'ON' : 'OFF'}`);
    } catch (error) {
        console.error('Error controlling LEDs:', error);
    }
};

const controlWaterDispenser = async (fireDetected) => {
    try {
        await gpio.promise.write(PINS.WATER_DISPENSER, fireDetected);
        console.log(`Water dispenser turned ${fireDetected ? 'ON' : 'OFF'}`);
    } catch (error) {
        console.error('Error controlling water dispenser:', error);
    }
};

// Endpoint to get sensor data
app.get('/sensor-data', async (req, res) => {
    try {
        const { temperature, humidity } = await readHumidityAndTemp();
        const lightLevel = await readPhotosensorValue();
        const fireDetected = await readIRSensorValue();

        // Control actuators if sensor readings are valid
        if (temperature !== null) await controlFan(temperature);
        if (lightLevel !== null) await controlLEDs(lightLevel);
        if (fireDetected !== null) await controlWaterDispenser(fireDetected);

        // Save to database if readings are valid
        if (temperature !== null && humidity !== null && lightLevel !== null && fireDetected !== null) {
            db.query(
                `INSERT INTO sensor_data (temperature, humidity, light_level, fire_detected) 
                 VALUES (?, ?, ?, ?)`,
                [temperature, humidity, lightLevel ? 1 : 0, fireDetected ? 1 : 0],
                (err) => {
                    if (err) console.error('Error saving sensor data:', err.message);
                }
            );
        }

        res.json({
            temperature,
            humidity,
            lightLevel: lightLevel ? 1 : 0,
            fireDetected: fireDetected ? 1 : 0,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Error in /sensor-data endpoint:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Cleanup on exit
process.on('SIGINT', () => {
    console.log('Cleaning up...');
    gpio.destroy(() => {
        console.log('GPIO pins cleaned up');
        process.exit();
    });
});