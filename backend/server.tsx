import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import gpio from 'rpi-gpio';
import sensor from 'node-dht-sensor';
import cors from 'cors';
import sqlite3 from 'sqlite3';

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
    WATER_DISPENSER: 23,
};

// Setup GPIO pins
const setupPins = async (): Promise<void> => {
    try {
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
        throw error;
    }
};

// Initialize pins
setupPins()
    .then(() => {
        console.log('GPIO setup complete');
    })
    .catch((error) => {
        console.error('Error setting up GPIO pins:', error);
        process.exit(1);
    });

const DHT_PIN = 4;
const TEMPERATURE_THRESHOLD = 27;

// Create SQLite database connection
const db = new sqlite3.Database('../sensorDataDB.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create table if it doesn't exist
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS sensor_readings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature REAL,
        humidity REAL,
        light_level INTEGER,
        fire_detected INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;

db.run(createTableQuery, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Table `sensor_readings` is ready.');
    }
});

// Sensor reading types
interface SensorReading {
    temperature: number | null;
    humidity: number | null;
    lightLevel: boolean;
    fireDetected: boolean;
}

// Read sensors
const readHumidityAndTemp = async (): Promise<{ temperature: number | null; humidity: number | null }> => {
    return new Promise((resolve) => {
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

const readPhotosensorValue = async (): Promise<boolean> => {
    return gpio.promise.read(PINS.PHOTOSENSOR);
};

const readIRSensorValue = async (): Promise<boolean> => {
    return gpio.promise.read(PINS.IR_SENSOR);
};

// Control functions
const controlFan = async (temperature: number | null): Promise<void> => {
    try {
        if (temperature !== null) {
            const state = temperature > TEMPERATURE_THRESHOLD;
            await gpio.promise.write(PINS.FAN, state);
            console.log(`Fan turned ${state ? 'ON' : 'OFF'}`);
        }
    } catch (error) {
        console.error('Error controlling fan:', error);
    }
};

const controlLEDs = async (lightLevel: boolean): Promise<void> => {
    try {
        const state = !lightLevel; // Turn on LEDs when dark
        await gpio.promise.write(PINS.LED, state);
        console.log(`LEDs turned ${state ? 'ON' : 'OFF'}`);
    } catch (error) {
        console.error('Error controlling LEDs:', error);
    }
};

const controlWaterDispenser = async (fireDetected: boolean): Promise<void> => {
    try {
        await gpio.promise.write(PINS.WATER_DISPENSER, fireDetected);
        console.log(`Water dispenser turned ${fireDetected ? 'ON' : 'OFF'}`);
    } catch (error) {
        console.error('Error controlling water dispenser:', error);
    }
};

// Endpoint to get sensor data
app.get('/sensor-data', async (req: Request, res: Response) => {
    try {
        const { temperature, humidity } = await readHumidityAndTemp();
        const lightLevel = await readPhotosensorValue();
        const fireDetected = await readIRSensorValue();

        // Control actuators if sensor readings are valid
        await controlFan(temperature);
        await controlLEDs(lightLevel);
        await controlWaterDispenser(fireDetected);

        // Save to database if readings are valid
        if (temperature !== null && humidity !== null) {
            const insertQuery = `
                INSERT INTO sensor_readings (temperature, humidity, light_level, fire_detected)
                VALUES (?, ?, ?, ?)
            `;
            db.run(
                insertQuery,
                [temperature, humidity, lightLevel ? 1 : 0, fireDetected ? 1 : 0],
                function (err) {
                    if (err) {
                        console.error('Error saving sensor data:', err.message);
                    } else {
                        console.log(`Sensor data saved with ID: ${this.lastID}`);
                    }
                }
            );
        }

        res.json({
            temperature,
            humidity,
            lightLevel: lightLevel ? 1 : 0,
            fireDetected: fireDetected ? 1 : 0,
            timestamp: new Date(),
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
        db.close((err) => {
            if (err) {
                console.error('Error closing SQLite database:', err.message);
            } else {
                console.log('SQLite database connection closed.');
            }
            process.exit();
        });
    });
});