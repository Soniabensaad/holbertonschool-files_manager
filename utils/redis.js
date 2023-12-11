const redis = require('redis');
const util = require('util');

class RedisClient {
  constructor(redisOptions) {
    // Create a Redis client
    this.client = redis.createClient(redisOptions);
    this.connected = false;

    // Set up the 'ready' event to indicate a successful connection
    this.client.once('ready', () => {
      this.connected = true;
      console.log('Connected to Redis!');
    });

    // Set up error handling
    this.client.on('error', this.handleRedisError.bind(this));

    // Promisify Redis methods
    this.getAsync = util.promisify(this.client.get).bind(this.client);
    this.setAsync = util.promisify(this.client.setex).bind(this.client);
    this.delAsync = util.promisify(this.client.del).bind(this.client);
  }

  handleRedisError(error) {
    console.error(`Redis connection error: ${error}`);
    // You can use this.connected or any other class properties/methods here if needed
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    if (!this.connected) {
      throw new Error('Not connected to Redis');
    }

    try {
      const value = await this.getAsync(key);
      console.log(`Value for key "${key}": ${value}`);
      return value;
    } catch (error) {
      console.error(`Error getting value for key "${key}": ${error}`);
      throw error;
    }
  }

  async set(key, value, durationInSeconds) {
    if (!this.connected) {
      throw new Error('Not connected to Redis');
    }

    try {
      const result = await this.setAsync(key, durationInSeconds, value);
      console.log(`Key "${key}" set with value "${value}" and expiration ${durationInSeconds}s. Result: ${result}`);
      return result;
    } catch (error) {
      console.error(`Error setting key "${key}": ${error}`);
      throw error;
    }
  }

  async del(key) {
    if (!this.connected) {
      throw new Error('Not connected to Redis');
    }

    try {
      const result = await this.delAsync(key);
      console.log(`Key "${key}" deleted. Result: ${result}`);
      return result;
    } catch (error) {
      console.error(`Error deleting key "${key}": ${error}`);
      throw error;
    }
  }

  closeConnection() {
    // Close the connection when needed
    this.client.quit();
  }
}

const redisClient = new RedisClient({
  // provide your Redis options here
  host: 'localhost',
  port: 6379,
});

module.exports = redisClient;
