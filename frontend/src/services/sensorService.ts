import api from '../api';

interface Sensor {
  type: 'DHT11' | 'Photosensor' | 'IR Sensor';
  model: string;
}

export const createSensor = async (sensor: Sensor) => {
  const response = await api.post('/sensors', sensor);
  return response.data;
};

export const getSensorById = async (sensorId: number) => {
  const response = await api.get(`/sensors/${sensorId}`);
  return response.data;
};

export const updateSensor = async (sensorId: number, sensor: Partial<Sensor>) => {
  const response = await api.put(`/sensors/${sensorId}`, sensor);
  return response.data;
};

export const deleteSensor = async (sensorId: number) => {
  const response = await api.delete(`/sensors/${sensorId}`);
  return response.data;
};