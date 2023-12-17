// controllers/UsersController.js
import sha1 from 'sha1';

class UsersController {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  async postNew(req, res) {
    try {
      // Extract user data from the request body
      const { email, password } = req.body;

      // Validate email and password presence
      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }

      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      // Check if the email already exists in the database
      const existingUser = await this.dbClient.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password using SHA1
      const hashedPassword = sha1(password);

      // Create a new user object
      const newUser = {
        email: email,
        password: hashedPassword,
      };

      // Add the new user to the database
      const result = await this.dbClient.addNewUser(newUser);

      // Return the new user with only email and id
      const responseData = {
        id: result.insertedId,
        email: newUser.email,
      };

      res.status(201).json(responseData);
    } catch (error) {
      console.error(`Error adding new user: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
