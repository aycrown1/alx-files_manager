import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus(request, response) {
    try {
      const redisStatus = await redisClient.isAlive();
      const dbStatus = await dbClient.isAlive();
      response.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (error) {
      console.error('Error getting status:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getStats(request, response) {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();
      response.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      console.error('Error getting stats:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;
