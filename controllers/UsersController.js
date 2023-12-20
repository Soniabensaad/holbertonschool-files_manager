import dbClient from '../utils/db';
import sha1 from 'sha1';

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Missing email' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }

        try {
            // Check if the email already exists
            const existingUser = await dbClient.collection('users').findOne({ email });

            if (existingUser) {
                return res.status(400).json({ error: 'Already exist' });
            }

            // Hash the password (Using SHA1 for demonstration, consider using a stronger hashing algorithm like bcrypt)
            const hashedPassword = sha1(password);

            // Save the new user to the database
            const newUser = await dbClient.collection('users').insertOne({
                email,
                password: hashedPassword,
            });

            return res.status(201).json({ id: newUser.insertedId, email: newUser.ops[0].email });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default UsersController;
