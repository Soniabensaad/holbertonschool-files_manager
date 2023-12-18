import sha1 from 'sha1';
import { promisify } from 'util';
import redis from 'redis';
import DBClient from '../utils/db';
import Bull from 'bull';

class UsersController {
  static async postNew(request, response) {
    // ... (existing code for creating a new user)

    return response.status(201).json({ id: result.insertedId, email: userEmail });
  }

  static async getMe(request, response) {
    try {
      const token = request.headers.authorization;

      if (!token) {
        return response.status(401).json({ error: 'Unauthorized' });
      }

      // Check if the token exists in Redis
      const userId = await getAsync(`auth_${token}`);

      if (!userId) {
        return response.status(401).json({ error: 'Unauthorized' });
      }

      // Retrieve the user based on the user ID (replace with your actual logic)
      const user = await DBClient.db.collection('users').findOne({ _id: ObjectId(userId) });

      if (!user) {
        return response.status(401).json({ error: 'Unauthorized' });
      }

      // Return the user object (email and id only)
      return response.status(200).json({ id: user._id, email: user.email });
    } catch (error) {
      console.error('Error:', error.message);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
