import { ObjectID } from 'mongodb';
import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static async postNew(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }

      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      const userEmail = await dbClient.getUserByEmail(email);
      if (userEmail) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = sha1(password);

      const result = await dbClient.insertUser({ email, password: hashedPassword });

      const user = { _id: result.insertedId, email };
      return res.status(201).json(user);
    } catch (error) {
      console.error('Error creating new user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getMe(req, res) {
    try {
      const token = req.header('X-Token');
      if (!token) return res.status(401).json({ error: 'Unauthorized' });
      const userId = await redisClient.get(`auth_${token}`);
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const idObject = new ObjectID(userId);

      const user = await dbClient.getUserById(idObject);

      return res.status(200).json({ id: userId, email: user.email });
    } catch (error) {
      console.error('Error getting user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
