const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }

  async isAlive() {
    return new Promise((resolve) => {
      this.client.ping((error, result) => {
        if (error) {
          console.error('Redis ping failed:', error);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  async get(key) {
    try {
      const getAsync = promisify(this.client.get).bind(this.client);
      return await getAsync(key);
    } catch (error) {
      console.error(`Error getting value for key ${key} from Redis:`, error);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      const setAsync = promisify(this.client.set).bind(this.client);
      return await setAsync(key, value, 'EX', duration);
    } catch (error) {
      console.error(`Error setting value for key ${key} in Redis:`, error);
      return false;
    }
  }

  async del(key) {
    try {
      const delAsync = promisify(this.client.del).bind(this.client);
      return await delAsync(key);
    } catch (error) {
      console.error(`Error deleting value for key ${key} from Redis:`, error);
      return false;
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
