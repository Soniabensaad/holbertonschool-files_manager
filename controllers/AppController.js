class AppController {
    constructor(redisClient, dbClient) {
      this.redisClient = redisClient;
      this.dbClient = dbClient;
    }
  
    getStatus(req, res) {
      const redisStatus = this.redisClient.isAlive();
      const dbStatus = this.dbClient.isAlive();
      res.status(200).json({ redis: redisStatus, db: dbStatus });
    }
  
    async getStats(req, res) {
      try {
        const usersCount = await this.dbClient.nbUsers();
        const filesCount = await this.dbClient.nbFiles();
  
        res.status(200).json({ users: usersCount, files: filesCount });
      } catch (error) {
        console.error(`Error getting stats: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
  
  module.exports = AppController;
  