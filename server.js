require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize');
const Appliance = require('./models/Appliance');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, passwordHash });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Password recovery endpoint
app.post('/api/password-recovery', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Simulate sending password reset email with token
    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    console.log(`Password reset token for ${email}: ${resetToken}`);
    // In real app, send email with resetToken link
    res.json({ message: 'Password recovery email sent' });
  } catch (error) {
    console.error('Password recovery error:', error);
    res.status(500).json({ error: 'Failed to process password recovery' });
  }
});

// Password reset endpoint
app.post('/api/password-reset', async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await user.update({ passwordHash });
    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

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

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend server running on port ${port}`);
});
