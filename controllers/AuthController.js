const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const crypto = require('crypto');
const redis = require('redis');
const { promisify } = require('util');

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.setex).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

// POST /connect
router.post('/connect', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve user based on email (replace with your actual user retrieval logic)
    const user = getUserByEmail(email);

    if (!user || user.password !== hashPassword(password)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Generate a random string as a token
    const token = uuid.v4();

    // Create a key: auth_<token> and store user ID in Redis for 24 hours
    await setAsync(`auth_${token}`, user.id, 86400);

    // Return the token
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /disconnect
router.get('/disconnect', async (req, res) => {
  try {
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Retrieve user based on the token
    const userId = await getAsync(`auth_${token}`);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Delete the token in Redis
    await delAsync(`auth_${token}`);

    // Respond with status code 204 (No Content)
    res.status(204).send();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function hashPassword(password) {
  return crypto.createHash('sha1').update(password, 'utf-8').digest('hex');
}

function getUserByEmail(email) {
  
  const users = [
    { id: 1, email: 'user@example.com', password: hashPassword('password123') },
    
  ];

  return users.find(user => user.email === email);
}

module.exports = router;
