import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.get('/', ensureAuthenticated, (request, response) => {
  return response.json({ message: 'Authenticated!' });
});

export default usersRouter;
