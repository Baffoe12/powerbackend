require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize');
const Appliance = require('./models/Appliance');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Connect to PostgreSQL
sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('PostgreSQL connection error:', err));

// Sync models
sequelize.sync();

// Get all appliances
app.get('/api/appliances', async (req, res) => {
  try {
    const appliances = await Appliance.findAll();
    res.json(appliances);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appliances' });
  }
});

// Add new appliance
app.post('/api/appliances', async (req, res) => {
  const { type } = req.body;
  if (!type) {
    return res.status(400).json({ error: 'Appliance type is required' });
  }
  try {
    const newAppliance = await Appliance.create({ type });
    res.status(201).json(newAppliance);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add appliance' });
  }
});

// Update appliance status or data
app.put('/api/appliances/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const appliance = await Appliance.findByPk(id);
    if (!appliance) {
      return res.status(404).json({ error: 'Appliance not found' });
    }
    await appliance.update(req.body);
    res.json(appliance);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update appliance' });
  }
});

// Delete appliance
app.delete('/api/appliances/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const appliance = await Appliance.findByPk(id);
    if (!appliance) {
      return res.status(404).json({ error: 'Appliance not found' });
    }
    await appliance.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete appliance' });
  }
});

// Endpoint to receive sensor data from ESP32 (example)
app.post('/api/sensor-data', (req, res) => {
  // Process sensor data here
  // For now, just log and respond
  console.log('Received sensor data:', req.body);
  res.status(200).json({ message: 'Sensor data received' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend server running on port ${port}`);
});
