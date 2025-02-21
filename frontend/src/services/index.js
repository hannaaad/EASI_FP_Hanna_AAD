"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sqlite3_1 = require("sqlite3");
var sqlite_1 = require("sqlite");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var app = (0, express_1.default)();
var port = 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Open SQLite database
function openDb() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, sqlite_1.open)({
                    filename: './EASI.db', // Path to your SQLite database file
                    driver: sqlite3_1.default.Database,
                })];
        });
    });
}
// Start the server
app.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
});
// Routes for each table
// Users
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all('SELECT * FROM users')];
            case 2:
                users = _a.sent();
                res.json(users);
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get('SELECT * FROM users WHERE user_id = ?', [req.params.id])];
            case 2:
                user = _a.sent();
                res.json(user);
                return [2 /*return*/];
        }
    });
}); });
app.post('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO users (username, password_hash, email, first_name, last_name, phone_number, address, country, date_of_birth, sex, status, role) \n     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                        req.body.username,
                        req.body.password_hash,
                        req.body.email,
                        req.body.first_name,
                        req.body.last_name,
                        req.body.phone_number,
                        req.body.address,
                        req.body.country,
                        req.body.date_of_birth,
                        req.body.sex,
                        req.body.status,
                        req.body.role,
                    ])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.put('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("UPDATE users SET \n     username = ?, password_hash = ?, email = ?, first_name = ?, last_name = ?, phone_number = ?, address = ?, country = ?, date_of_birth = ?, sex = ?, status = ?, role = ?\n     WHERE user_id = ?", [
                        req.body.username,
                        req.body.password_hash,
                        req.body.email,
                        req.body.first_name,
                        req.body.last_name,
                        req.body.phone_number,
                        req.body.address,
                        req.body.country,
                        req.body.date_of_birth,
                        req.body.sex,
                        req.body.status,
                        req.body.role,
                        req.params.id,
                    ])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.delete('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run('DELETE FROM users WHERE user_id = ?', [req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
// Courts
app.get('/courts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, courts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all('SELECT * FROM courts')];
            case 2:
                courts = _a.sent();
                res.json(courts);
                return [2 /*return*/];
        }
    });
}); });
app.get('/courts/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, court;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get('SELECT * FROM courts WHERE court_id = ?', [req.params.id])];
            case 2:
                court = _a.sent();
                res.json(court);
                return [2 /*return*/];
        }
    });
}); });
app.post('/courts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO courts (name, section_name, section_type, open_time, close_time) \n     VALUES (?, ?, ?, ?, ?)", [
                        req.body.name,
                        req.body.section_name,
                        req.body.section_type,
                        req.body.open_time,
                        req.body.close_time,
                    ])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.put('/courts/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("UPDATE courts SET \n     name = ?, section_name = ?, section_type = ?, open_time = ?, close_time = ?\n     WHERE court_id = ?", [
                        req.body.name,
                        req.body.section_name,
                        req.body.section_type,
                        req.body.open_time,
                        req.body.close_time,
                        req.params.id,
                    ])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.delete('/courts/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run('DELETE FROM courts WHERE court_id = ?', [req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
// Locations
app.get('/locations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, locations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all('SELECT * FROM locations')];
            case 2:
                locations = _a.sent();
                res.json(locations);
                return [2 /*return*/];
        }
    });
}); });
app.get('/locations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, location;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get('SELECT * FROM locations WHERE location_id = ?', [req.params.id])];
            case 2:
                location = _a.sent();
                res.json(location);
                return [2 /*return*/];
        }
    });
}); });
app.post('/locations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO locations (court_id, location_name, description) \n     VALUES (?, ?, ?)", [req.body.court_id, req.body.location_name, req.body.description])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.put('/locations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("UPDATE locations SET \n     court_id = ?, location_name = ?, description = ?\n     WHERE location_id = ?", [req.body.court_id, req.body.location_name, req.body.description, req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.delete('/locations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run('DELETE FROM locations WHERE location_id = ?', [req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
// Reservations
app.get('/reservations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, reservations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all('SELECT * FROM reservations')];
            case 2:
                reservations = _a.sent();
                res.json(reservations);
                return [2 /*return*/];
        }
    });
}); });
app.get('/reservations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, reservation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get('SELECT * FROM reservations WHERE reservation_id = ?', [req.params.id])];
            case 2:
                reservation = _a.sent();
                res.json(reservation);
                return [2 /*return*/];
        }
    });
}); });
app.post('/reservations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO reservations (date, start_time, end_time, token, number_of_people, user_id, court_id, status) \n     VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [
                        req.body.date,
                        req.body.start_time,
                        req.body.end_time,
                        req.body.token,
                        req.body.number_of_people,
                        req.body.user_id,
                        req.body.court_id,
                        req.body.status,
                    ])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.put('/reservations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("UPDATE reservations SET \n     date = ?, start_time = ?, end_time = ?, token = ?, number_of_people = ?, user_id = ?, court_id = ?, status = ?\n     WHERE reservation_id = ?", [
                        req.body.date,
                        req.body.start_time,
                        req.body.end_time,
                        req.body.token,
                        req.body.number_of_people,
                        req.body.user_id,
                        req.body.court_id,
                        req.body.status,
                        req.params.id,
                    ])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.delete('/reservations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run('DELETE FROM reservations WHERE reservation_id = ?', [req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
// Reviews
app.get('/reviews', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, reviews;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all('SELECT * FROM reviews')];
            case 2:
                reviews = _a.sent();
                res.json(reviews);
                return [2 /*return*/];
        }
    });
}); });
app.get('/reviews/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, review;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get('SELECT * FROM reviews WHERE review_id = ?', [req.params.id])];
            case 2:
                review = _a.sent();
                res.json(review);
                return [2 /*return*/];
        }
    });
}); });
app.post('/reviews', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO reviews (rating, comment, reservation_id) \n     VALUES (?, ?, ?)", [req.body.rating, req.body.comment, req.body.reservation_id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.put('/reviews/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("UPDATE reviews SET \n     rating = ?, comment = ?, reservation_id = ?\n     WHERE review_id = ?", [req.body.rating, req.body.comment, req.body.reservation_id, req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.delete('/reviews/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run('DELETE FROM reviews WHERE review_id = ?', [req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
// Sensors
app.get('/sensors', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, sensors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all('SELECT * FROM sensors')];
            case 2:
                sensors = _a.sent();
                res.json(sensors);
                return [2 /*return*/];
        }
    });
}); });
app.get('/sensors/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, sensor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get('SELECT * FROM sensors WHERE sensor_id = ?', [req.params.id])];
            case 2:
                sensor = _a.sent();
                res.json(sensor);
                return [2 /*return*/];
        }
    });
}); });
app.post('/sensors', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO sensors (type, model) \n     VALUES (?, ?)", [req.body.type, req.body.model])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.put('/sensors/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("UPDATE sensors SET \n     type = ?, model = ?\n     WHERE sensor_id = ?", [req.body.type, req.body.model, req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.delete('/sensors/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run('DELETE FROM sensors WHERE sensor_id = ?', [req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
// Sensor Locations
app.get('/sensor-locations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, sensorLocations;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all('SELECT * FROM sensor_locations')];
            case 2:
                sensorLocations = _a.sent();
                res.json(sensorLocations);
                return [2 /*return*/];
        }
    });
}); });
app.get('/sensor-locations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, sensorLocation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get('SELECT * FROM sensor_locations WHERE sensor_location_id = ?', [req.params.id])];
            case 2:
                sensorLocation = _a.sent();
                res.json(sensorLocation);
                return [2 /*return*/];
        }
    });
}); });
app.post('/sensor-locations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO sensor_locations (sensor_id, location_id) \n     VALUES (?, ?)", [req.body.sensor_id, req.body.location_id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.delete('/sensor-locations/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run('DELETE FROM sensor_locations WHERE sensor_location_id = ?', [req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
// Sensor Readings
app.get('/sensor-readings', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, sensorReadings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all('SELECT * FROM sensor_readings')];
            case 2:
                sensorReadings = _a.sent();
                res.json(sensorReadings);
                return [2 /*return*/];
        }
    });
}); });
app.get('/sensor-readings/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, sensorReading;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.get('SELECT * FROM sensor_readings WHERE reading_id = ?', [req.params.id])];
            case 2:
                sensorReading = _a.sent();
                res.json(sensorReading);
                return [2 /*return*/];
        }
    });
}); });
app.post('/sensor-readings', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run("INSERT INTO sensor_readings (sensor_id, location_id, temperature, humidity, light_level, fire_detected) \n     VALUES (?, ?, ?, ?, ?, ?)", [
                        req.body.sensor_id,
                        req.body.location_id,
                        req.body.temperature,
                        req.body.humidity,
                        req.body.light_level,
                        req.body.fire_detected,
                    ])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.delete('/sensor-readings/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.run('DELETE FROM sensor_readings WHERE reading_id = ?', [req.params.id])];
            case 2:
                result = _a.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
