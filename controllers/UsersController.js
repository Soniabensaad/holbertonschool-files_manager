// controllers/UsersController.js

import sha1 from 'sha1';
import DBClient from '../utils/db';
import RedisClient from '../utils/redis';

const { ObjectId } = require('mongodb');
const Bull = require('bull');

class UsersController {
  static async postNew(request, response) {
    const userQueue = new Bull('userQueue');

    try {
      const userEmail = request.body.email;
      if (!userEmail) return response.status(400).json({ error: 'Missing email' });

      const userPassword = request.body.password;
      if (!userPassword) return response.status(400).json({ error: 'Missing password' });

      const oldUserEmail = await DBClient.db.collection('users').findOne({ email: userEmail });
      if (oldUserEmail) return response.status(400).json({ error: 'Already exist' });

      const shaUserPassword = sha1(userPassword);
      const result = await DBClient.db.collection('users').insertOne({ email: userEmail, password: shaUserPassword });

      await userQueue.add({
        userId: result.insertedId,
      });

      return response.status(201).json({ id: result.insertedId, email: userEmail });
    } catch (error) {
      console.error(`Error adding new user: ${error}`);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
