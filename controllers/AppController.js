// controllers/AppController.js
import RedisClient from '../utils/redis';
import DBClient from '../utils/db';

class AppController {
  static getStatus(request, response) {
    const status = {
      redis: RedisClient.isAlive(),
      db: DBClient.isAlive(),
    };
    return response.status(200).send(status);
  }

  static async getStats(request, response) {
    try {
      const stats = {
        users: await DBClient.nbUsers(),
        files: await DBClient.nbFiles(),
      };
      return response.status(200).send(stats);
    } catch (error) {
      console.error(`Error getting stats: ${error}`);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;
