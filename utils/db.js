const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Get host, port, and database from environment variables or use default values
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Create the MongoDB URI
    const uri = `mongodb://${host}:${port}/${database}`;

    // Create a new MongoClient
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Connect to the MongoDB server
    this.connected = false;

    // Set up the 'ready' event to indicate a successful connection
    this.client.once('ready', () => {
      this.connected = true;
      console.log('Connected to MongoDB!');
    });

    // Set up error handling
    this.client.on('error', this.handleMongoError.bind(this));
  }

  handleMongoError(error) {
    console.error(`MongoDB connection error: ${error}`);
  }

  isAlive() {
    return this.connected;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB!');
    } catch (error) {
      console.error(`MongoDB connection error: ${error}`);
    }
  }

  async nbUsers() {
    try {
      // Access the "users" collection
      const collection = this.client.db().collection('users');

      // Count the number of documents in the collection
      const userCount = await collection.countDocuments();

      console.log(`Number of users: ${userCount}`);
      return userCount;
    } catch (error) {
      console.error(`Error retrieving number of users: ${error}`);
      throw error;
    }
  }

  async nbFiles() {
    try {
      // Access the "files" collection
      const collection = this.client.db().collection('files');

      // Count the number of documents in the collection
      const fileCount = await collection.countDocuments();

      console.log(`Number of files: ${fileCount}`);
      return fileCount;
    } catch (error) {
      console.error(`Error retrieving number of files: ${error}`);
      throw error;
    }
  }

  closeConnection() {
    // Close the connection when needed
    this.client.close();
    console.log('MongoDB connection closed.');
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
