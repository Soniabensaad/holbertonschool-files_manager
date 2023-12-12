// controllers/appController.js
class AppController {
    getStatus(req, res) {
      res.json({ "redis": true, "db": true }); 
    }
  
    async getStats(req, res) {
      try {
        const usersCount = await this.db.collection('users').countDocuments();
        const filesCount = await this.db.collection('files').countDocuments();
  
        res.json({ "users": usersCount, "files": filesCount }); 
      } catch (error) {
        console.error(`Error getting stats: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
  
  module.exports = AppController;
  