import api from '../api';

interface SensorLocation {
  sensor_id: number;
  location_id: number;
}

export const createSensorLocation = async (sensorLocation: SensorLocation) => {
  const response = await api.post('/sensor-locations', sensorLocation);
  return response.data;
};

export const getSensorLocationById = async (sensorLocationId: number) => {
  const response = await api.get(`/sensor-locations/${sensorLocationId}`);
  return response.data;
};

export const deleteSensorLocation = async (sensorLocationId: number) => {
  const response = await api.delete(`/sensor-locations/${sensorLocationId}`);
  return response.data;
};