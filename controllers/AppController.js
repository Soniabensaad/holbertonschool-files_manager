// controllers/appController.js
class AppController {
  async getStatus(req, res) {
    try {
      // Your existing code
      res.json({ "redis": true, "db": true });
    } catch (error) {
      console.error(`Error getting status: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  async getStats(req, res) {
    try {
      // Your existing code
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
  