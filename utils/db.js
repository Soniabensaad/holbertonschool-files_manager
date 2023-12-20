import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        const url = `mongodb://${host}:${port}/${database}`;

        this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

        this.client.connect((err) => {
            if (err) console.error(`MongoDB connection error: ${err}`);
        });
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        const db = this.client.db();
        const users = db.collection('users');
        return users.countDocuments();
    }

    async nbFiles() {
        const db = this.client.db();
        const files = db.collection('files');
        return files.countDocuments();
    }
}

const dbClient = new DBClient();

export default dbClient;
