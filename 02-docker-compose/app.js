const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
const port = 3000;

const pgPool = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
});

redisClient.connect();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/users', async (req, res) => {
  try {
    const result = await pgPool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/cache/:key', async (req, res) => {
  const value = await redisClient.get(req.params.key);
  res.json({ key: req.params.key, value });
});

app.post('/cache/:key/:value', async (req, res) => {
  await redisClient.set(req.params.key, req.params.value);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
