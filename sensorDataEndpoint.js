module.exports = (app) => {
  // New sensor data endpoint returning mock data
  app.get('/api/sensor-data', (req, res) => {
    const mockSensorData = {
      '1': {
        current: [0.5, 0.6, 0.55, 0.58, 0.6, 0.62, 0.6],
        voltage: [220, 221, 219, 220, 222, 221, 220],
        power: [110, 115, 112, 114, 116, 117, 115],
        amount: [5, 5.2, 5.1, 5.15, 5.3, 5.35, 5.3],
      },
      '2': {
        current: [0.7, 0.75, 0.72, 0.74, 0.76, 0.78, 0.75],
        voltage: [220, 219, 221, 220, 222, 220, 221],
        power: [154, 160, 158, 159, 161, 162, 160],
        amount: [7, 7.2, 7.1, 7.15, 7.3, 7.35, 7.3],
      },
      '3': {
        current: [0.6, 0.62, 0.61, 0.63, 0.65, 0.64, 0.63],
        voltage: [220, 220, 219, 221, 222, 220, 221],
        power: [132, 135, 134, 136, 138, 137, 136],
        amount: [6, 6.1, 6.05, 6.15, 6.3, 6.25, 6.2],
      },
    };
    res.json(mockSensorData);
  });
};
