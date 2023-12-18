import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

const router = (app) => {
  const paths = express.Router();
  app.use(express.json());
  app.use('/', paths);

  paths.get('/status', (request, response) => AppController.getStatus(request, response));
  paths.get('/stats', (request, response) => AppController.getStats(request, response));
  paths.post('/users', (request, response) => UsersController.postNew(request, response));
  paths.get('/connect', (request, response) => AuthController.getConnect(request, response));
  paths.get('/disconnect', (request, response) => AuthController.getDisconnect(request, response));
  paths.get('/users/me', (request, response) => UserController.getMe(request, response));
};

export default router;
